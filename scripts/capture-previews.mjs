/**
 * Captures a screenshot of every project that has a live site and writes it to
 * public/previews/<slug>.webp.
 *
 * Run on demand with `npm run previews`, never during a build. The WebP files
 * are committed, so building needs no network and no browser.
 *
 * Primary path is headless Chromium. There is no Chrome or Playwright on the
 * machine this was written on, but Edge is Chromium too, so any of the binaries
 * in BROWSERS will do. If none is found it falls back to the microlink
 * screenshot API.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";

const run = promisify(execFile);

const BROWSERS = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const WIDTH = 1440;
const HEIGHT = 900;
const OUT_WIDTH = 1200;
const OUT_DIR = join(process.cwd(), "public", "previews");

function findBrowser() {
  return BROWSERS.find((path) => existsSync(path)) ?? null;
}

/** Pulls the live URL, slug and optional deeper route straight out of the data file. */
async function readProjects() {
  // Split on the slug field rather than on brace-and-newline: git rewrites this
  // checkout to CRLF, and a whitespace sensitive delimiter silently matches
  // nothing and reports zero projects.
  const source = await readFile(join(process.cwd(), "lib", "projects.ts"), "utf8");
  const blocks = source.split(/slug:\s*"/).slice(1);
  const projects = [];
  for (const block of blocks) {
    const slug = block.match(/^([^"]+)"/)?.[1];
    const live = block.match(/live:\s*"([^"]+)"/)?.[1];
    const path = block.match(/previewPath:\s*"([^"]+)"/)?.[1] ?? "";
    if (slug && live) projects.push({ slug, url: live.replace(/\/$/, "") + path });
  }
  return projects;
}

async function captureWithBrowser(browser, url, target) {
  await run(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      // Fast forwards timers so load animations settle before the shot.
      "--virtual-time-budget=12000",
      `--window-size=${WIDTH},${HEIGHT}`,
      `--screenshot=${target}`,
      url,
    ],
    { timeout: 90000, windowsHide: true },
  );
}

async function captureWithService(url, target) {
  const endpoint =
    "https://api.microlink.io/?url=" +
    encodeURIComponent(url) +
    "&screenshot=true&meta=false&embed=screenshot.url" +
    `&viewport.width=${WIDTH}&viewport.height=${HEIGHT}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`microlink returned ${response.status}`);
  await writeFile(target, Buffer.from(await response.arrayBuffer()));
}

const browser = findBrowser();
console.log(browser ? `Using ${browser}` : "No local Chromium found, falling back to microlink");

await mkdir(OUT_DIR, { recursive: true });
const projects = await readProjects();
console.log(`Capturing ${projects.length} projects at ${WIDTH}x${HEIGHT}\n`);

let failures = 0;

for (const project of projects) {
  const raw = join(tmpdir(), `preview-${project.slug}.png`);
  const out = join(OUT_DIR, `${project.slug}.webp`);
  process.stdout.write(`${project.slug.padEnd(16)} ${project.url} ... `);

  try {
    if (browser) await captureWithBrowser(browser, project.url, raw);
    else await captureWithService(project.url, raw);

    const { size } = await sharp(raw)
      .resize({ width: OUT_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);

    console.log(`${(size / 1024).toFixed(0)} KB`);
  } catch (error) {
    failures += 1;
    console.log(`FAILED: ${error.message.split("\n")[0]}`);
  } finally {
    await rm(raw, { force: true });
  }
}

console.log(
  failures === 0
    ? `\nWrote ${projects.length} previews to public/previews.`
    : `\n${failures} of ${projects.length} captures failed.`,
);
process.exit(failures > 0 ? 1 : 0);
