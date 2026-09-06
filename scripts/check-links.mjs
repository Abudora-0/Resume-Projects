/**
 * Requests every live and source URL in lib/projects.ts and fails on anything
 * that is not 2xx or 3xx.
 *
 * This exists because four dead 404 links once shipped to production: the
 * project domains were renamed on Vercel and nothing caught it.
 *
 * Run with `npm run check:links`. Pass --offline to skip when there is no
 * network, which keeps a plane journey from failing the build.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const OFFLINE = process.argv.includes("--offline");
const TIMEOUT_MS = 20000;

const source = readFileSync(join(process.cwd(), "lib", "projects.ts"), "utf8");

const urls = [];
const re = /^\s*(live|source):\s*"([^"]+)"/gm;
let match;
while ((match = re.exec(source)) !== null) {
  urls.push({ field: match[1], url: match[2] });
}

if (urls.length === 0) {
  console.error("No live or source URLs found in lib/projects.ts. Did the shape change?");
  process.exit(1);
}

if (OFFLINE) {
  console.log(`Skipped ${urls.length} URL checks (--offline).`);
  process.exit(0);
}

async function head(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Some hosts reject HEAD, so fall back to a GET that is abandoned early.
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    }
    return { status: response.status, ok: response.status < 400 };
  } catch (error) {
    return { status: 0, ok: false, error: error.name === "AbortError" ? "timed out" : error.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = await Promise.all(
  urls.map(async (entry) => ({ ...entry, ...(await head(entry.url)) })),
);

let failures = 0;
for (const result of results) {
  const label = result.ok ? "ok  " : "DEAD";
  if (!result.ok) failures += 1;
  console.log(
    `${label} ${String(result.status).padStart(3)}  ${result.field.padEnd(6)} ${result.url}${
      result.error ? `  (${result.error})` : ""
    }`,
  );
}

if (failures > 0) {
  console.error(`\n${failures} of ${results.length} links are dead. Fix lib/projects.ts.`);
  process.exit(1);
}

console.log(`\nAll ${results.length} links resolve.`);
