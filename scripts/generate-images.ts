/**
 * generate-images.ts (kodagen platform shim)
 *
 * POSTs each prompt file to ${KODAGEN_ASSET_API_URL}/api/asset/image — the
 * server holds Gemini creds, generates the image, uploads to Supabase
 * Storage, and returns the CDN URL. We record it in content/asset-manifest.json.
 */
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { existsSync } from "node:fs";

const API_URL = process.env.KODAGEN_ASSET_API_URL ?? "https://kodagen.com";
const TOKEN = process.env.KODAGEN_BUILD_TOKEN ?? "";
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID ?? "";
if (!TOKEN || !PROJECT_ID) {
  console.error("✗ KODAGEN_BUILD_TOKEN or KODAGEN_PROJECT_ID not set");
  process.exit(1);
}

const MANIFEST_PATH = "content/asset-manifest.json";
const DELAY_MS = parseInt(process.env.IMAGE_DELAY_MS ?? "1200", 10);
const MAX_RETRIES = parseInt(process.env.IMAGE_MAX_RETRIES ?? "3", 10);
const SKIP_EXISTING = (process.env.IMAGE_SKIP_EXISTING ?? "true") !== "false";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Manifest = {
  images: Record<string, string>;
  videos: Record<string, string>;
  frames: Record<string, unknown>;
};

async function loadManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    const m = JSON.parse(raw);
    return { images: m.images ?? {}, videos: m.videos ?? {}, frames: m.frames ?? {} };
  } catch {
    return { images: {}, videos: {}, frames: {} };
  }
}

async function saveManifest(m: Manifest) {
  await mkdir(dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

async function postImage(prompt: string, slot: string, aspectRatio: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/asset/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, slot, aspectRatio, projectId: PROJECT_ID }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as { url?: string };
  if (!json.url) throw new Error(`No url: ${JSON.stringify(json).slice(0, 200)}`);
  return json.url;
}

async function collectJobs() {
  const jobs: { slot: string; promptPath: string; aspectRatio: string }[] = [];
  for (const sceneDir of ["scene-1", "scene-2", "scene-3"]) {
    const dir = join("prompts", sceneDir);
    if (!existsSync(dir)) continue;
    for (const part of ["start", "end"] as const) {
      const p = join(dir, `${part}.txt`);
      if (existsSync(p)) jobs.push({ slot: `${sceneDir}-${part}`, promptPath: p, aspectRatio: "16:9" });
    }
  }
  if (existsSync("prompts")) {
    for (const f of await readdir("prompts")) {
      if (!f.endsWith(".txt")) continue;
      const slot = f.replace(/\.txt$/, "");
      const aspect = slot.startsWith("service-") ? "4:3" : "16:9";
      jobs.push({ slot, promptPath: join("prompts", f), aspectRatio: aspect });
    }
  }
  return jobs;
}

async function main() {
  const manifest = await loadManifest();
  const jobs = await collectJobs();
  console.log(`▶ generate-images: ${jobs.length} prompt(s)`);
  let i = 0;
  for (const job of jobs) {
    i++;
    const tag = `[${i}/${jobs.length}] ${job.slot}`;
    if (SKIP_EXISTING && manifest.images[job.slot]) {
      console.log(`  ${tag}  ↺ skip`);
      continue;
    }
    const prompt = (await readFile(job.promptPath, "utf8")).trim();
    let url: string | null = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`  ${tag}  → POST (attempt ${attempt})`);
        url = await postImage(prompt, job.slot, job.aspectRatio);
        break;
      } catch (err: any) {
        console.log(`  ${tag}  ✗ ${String(err?.message ?? err).slice(0, 200)}`);
        if (attempt < MAX_RETRIES) await sleep(2000 * attempt);
      }
    }
    if (!url) {
      console.log(`  ${tag}  ⚠ giving up`);
      continue;
    }
    manifest.images[job.slot] = url;
    await saveManifest(manifest);
    console.log(`  ${tag}  ✓ ${url.slice(0, 90)}…`);
    await sleep(DELAY_MS);
  }
  console.log(`✓ done. images=${Object.keys(manifest.images).length}`);
}

main().catch((err) => {
  console.error("fatal", err);
  process.exit(1);
});
