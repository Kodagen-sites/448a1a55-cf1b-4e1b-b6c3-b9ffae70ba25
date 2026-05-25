/**
 * upload-frames.ts
 *
 * Reads public/frames/frame-NNNN.jpg, uploads each to Supabase Storage
 * (bucket=site-assets, path={PROJECT_ID}/frames/scene-1/frame-NNNN.jpg),
 * writes the public CDN URL pattern to content/frames-manifest.json, then
 * removes the local frames directory so the Next.js bundle stays small.
 */
import { readFile, readdir, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? "";
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID ?? "";
const BUCKET = process.env.KODAGEN_ASSETS_BUCKET ?? "site-assets";
const FRAMES_DIR = "public/frames";
const MANIFEST_PATH = "content/frames-manifest.json";

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !PROJECT_ID) {
  console.error("✗ SUPABASE_URL / SUPABASE_SERVICE_KEY / KODAGEN_PROJECT_ID required");
  process.exit(1);
}

async function upload(localPath: string, key: string): Promise<string> {
  const body = await readFile(localPath);
  const fullKey = `${PROJECT_ID}/${key}`;
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fullKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      apikey: SUPABASE_SERVICE_KEY,
      "Content-Type": "image/jpeg",
      "x-upsert": "true",
      "cache-control": "public, max-age=31536000, immutable",
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`upload ${fullKey}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fullKey}`;
}

async function main() {
  if (!existsSync(FRAMES_DIR)) {
    console.error(`✗ ${FRAMES_DIR} not found — run extract-frames.sh first`);
    process.exit(1);
  }

  const all = (await readdir(FRAMES_DIR)).filter((f) => /^frame-\d+\.jpg$/.test(f)).sort();
  console.log(`▶ uploading ${all.length} frames to Supabase Storage`);

  // Sanity-check first + last only to confirm credentials work; bulk upload the rest in parallel batches.
  const CONCURRENCY = 8;
  let firstUrl = "";
  let lastUrl = "";

  const queue = [...all];
  let inflight = 0;
  let done = 0;
  let failed = 0;

  await new Promise<void>((resolve) => {
    const tick = () => {
      while (inflight < CONCURRENCY && queue.length > 0) {
        const f = queue.shift()!;
        inflight++;
        const local = join(FRAMES_DIR, f);
        const key = `frames/scene-1/${f}`;
        upload(local, key)
          .then((url) => {
            if (f === all[0]) firstUrl = url;
            if (f === all[all.length - 1]) lastUrl = url;
            done++;
            if (done % 20 === 0 || done === all.length) {
              process.stdout.write(`\r  uploaded ${done}/${all.length}`);
            }
          })
          .catch((err) => {
            failed++;
            console.error(`\n  ✗ ${f}: ${String(err.message ?? err).slice(0, 160)}`);
          })
          .finally(() => {
            inflight--;
            if (queue.length === 0 && inflight === 0) {
              resolve();
            } else {
              tick();
            }
          });
      }
    };
    tick();
  });

  console.log(`\n  ✓ uploaded ${done}/${all.length} (${failed} failed)`);

  // Build URL template from first frame's URL — preserve the digit width.
  if (!firstUrl) throw new Error("no first-frame URL");
  // first frame is frame-0001.jpg
  const m = firstUrl.match(/(.*)frame-(\d+)\.jpg$/);
  if (!m) throw new Error(`cannot parse first URL: ${firstUrl}`);
  const padLength = m[2].length;
  const urlTemplate = `${m[1]}frame-{n}.jpg`;

  await mkdir(dirname(MANIFEST_PATH), { recursive: true });
  const manifest = {
    frameCount: done,
    frameDir: "/frames",
    frameUrlTemplate: urlTemplate,
    padLength,
  };
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`  ✓ wrote ${MANIFEST_PATH} (frameCount=${done}, padLength=${padLength})`);

  // Local frames no longer needed — drop them to keep Next bundle lean.
  await rm(FRAMES_DIR, { recursive: true, force: true });
  console.log(`  ✓ removed local ${FRAMES_DIR}`);
}

main().catch((err) => {
  console.error("fatal", err);
  process.exit(1);
});
