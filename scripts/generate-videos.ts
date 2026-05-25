/**
 * generate-videos.ts (kodagen platform shim)
 *
 * For each scene-N with start+end keyframes in content/asset-manifest.json:
 *   1. POST /api/asset/video { prompt, slot, projectId, startFrameUrl, endFrameUrl }
 *   2. Poll GET /api/asset/video?operation=...&projectId=...&slot=... until done
 *   3. Record final URL in content/asset-manifest.json under videos[slot]
 *   4. Also download a local copy to raw/scene-N.mp4 for ffmpeg frame extraction
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";

const API_URL = process.env.KODAGEN_ASSET_API_URL ?? "https://kodagen.com";
const TOKEN = process.env.KODAGEN_BUILD_TOKEN ?? "";
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID ?? "";
if (!TOKEN || !PROJECT_ID) {
  console.error("✗ KODAGEN_BUILD_TOKEN or KODAGEN_PROJECT_ID not set");
  process.exit(1);
}

const MANIFEST_PATH = "content/asset-manifest.json";
const POLL_INTERVAL_MS = parseInt(process.env.VEO_POLL_INTERVAL_MS ?? "10000", 10);
const POLL_MAX = parseInt(process.env.VEO_POLL_MAX ?? "120", 10); // 20 minutes max
const SKIP_EXISTING = (process.env.VEO_SKIP_EXISTING ?? "true") !== "false";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Manifest = {
  images: Record<string, string>;
  videos: Record<string, string>;
  frames: Record<string, unknown>;
};

async function loadManifest(): Promise<Manifest> {
  const raw = await readFile(MANIFEST_PATH, "utf8");
  const m = JSON.parse(raw);
  return { images: m.images ?? {}, videos: m.videos ?? {}, frames: m.frames ?? {} };
}

async function saveManifest(m: Manifest) {
  await mkdir(dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

async function startVideo(
  prompt: string,
  slot: string,
  startFrameUrl: string,
  endFrameUrl: string
): Promise<string> {
  const res = await fetch(`${API_URL}/api/asset/video`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      slot,
      projectId: PROJECT_ID,
      startFrameUrl,
      endFrameUrl,
      aspectRatio: "16:9",
      resolution: "720p",
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = (await res.json()) as { operationId?: string };
  if (!json.operationId) throw new Error(`No operationId: ${JSON.stringify(json).slice(0, 200)}`);
  return json.operationId;
}

async function pollVideo(operationId: string, slot: string): Promise<string> {
  for (let i = 0; i < POLL_MAX; i++) {
    await sleep(POLL_INTERVAL_MS);
    const qs = new URLSearchParams({ operation: operationId, projectId: PROJECT_ID, slot });
    const res = await fetch(`${API_URL}/api/asset/video?${qs.toString()}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`poll HTTP ${res.status}: ${text.slice(0, 300)}`);
    }
    const json = (await res.json()) as { done?: boolean; url?: string; error?: string };
    if (json.error) throw new Error(`op error: ${json.error}`);
    if (json.done) {
      if (!json.url) throw new Error(`done but no url: ${JSON.stringify(json).slice(0, 200)}`);
      return json.url;
    }
    process.stdout.write(`.${i % 10 === 9 ? `(${(i + 1) * POLL_INTERVAL_MS / 1000}s)` : ""}`);
  }
  throw new Error(`timed out after ${POLL_MAX} polls`);
}

async function downloadVideo(url: string, dest: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
}

async function main() {
  const manifest = await loadManifest();

  // Discover scenes from manifest images
  const scenes: string[] = [];
  for (const key of Object.keys(manifest.images)) {
    const m = key.match(/^(scene-\d+)-start$/);
    if (m && manifest.images[`${m[1]}-end`]) {
      if (!scenes.includes(m[1])) scenes.push(m[1]);
    }
  }
  console.log(`▶ generate-videos: ${scenes.length} scene(s) — ${scenes.join(", ")}`);

  for (const scene of scenes) {
    if (SKIP_EXISTING && manifest.videos[scene]) {
      console.log(`  ${scene}  ↺ skip (already in manifest)`);
      continue;
    }

    const promptPath = join("prompts", scene, "motion.txt");
    if (!existsSync(promptPath)) {
      console.log(`  ${scene}  ⚠ no motion.txt — skip`);
      continue;
    }

    const prompt = (await readFile(promptPath, "utf8")).trim();
    const startUrl = manifest.images[`${scene}-start`];
    const endUrl = manifest.images[`${scene}-end`];

    console.log(`  ${scene}  → POST /api/asset/video`);
    const opId = await startVideo(prompt, scene, startUrl, endUrl);
    console.log(`  ${scene}  op=${opId.slice(-40)}`);
    process.stdout.write(`  ${scene}  polling`);
    const url = await pollVideo(opId, scene);
    console.log(`\n  ${scene}  ✓ ${url}`);

    manifest.videos[scene] = url;
    await saveManifest(manifest);

    // Download a local copy for ffmpeg.
    const dest = join("raw", `${scene}.mp4`);
    console.log(`  ${scene}  ⬇ downloading to ${dest}`);
    await downloadVideo(url, dest);
  }

  // For single-scene G/scrub-assemble: copy scene-1.mp4 to final.mp4 so
  // gen:frames can extract from it.
  if (scenes.length === 1 && existsSync("raw/scene-1.mp4")) {
    const { copyFile } = await import("node:fs/promises");
    await copyFile("raw/scene-1.mp4", "raw/final.mp4");
    console.log(`  ✓ raw/final.mp4 ← raw/scene-1.mp4`);
  }

  console.log(`✓ done. videos=${Object.keys(manifest.videos).length}`);
}

main().catch((err) => {
  console.error("fatal", err);
  process.exit(1);
});
