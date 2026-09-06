/**
 * Fails if an em dash or en dash creeps back into the source copy.
 * Run with `npm run check:dashes`.
 *
 * The two characters are built from their code points rather than typed
 * literally, so this file can scan itself without reporting itself.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const EN = String.fromCharCode(0x2013);
const EM = String.fromCharCode(0x2014);
const BAD = new RegExp(`[${EN}${EM}]`, "g");
const NAMES = { [EN]: "en dash", [EM]: "em dash" };

const ROOT = process.cwd();
const DIRS = ["app", "components", "lib", "scripts"];
const FILES = ["README.md", "package.json"];
const EXT = /\.(tsx?|jsx?|mjs|css|md|json)$/;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXT.test(entry)) out.push(full);
  }
  return out;
}

const targets = [
  ...DIRS.flatMap((d) => walk(join(ROOT, d))),
  ...FILES.map((f) => join(ROOT, f)),
];

let failures = 0;

for (const file of targets) {
  let source;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  source.split("\n").forEach((line, i) => {
    for (const match of line.matchAll(BAD)) {
      failures += 1;
      console.error(
        `${relative(ROOT, file)}:${i + 1}  ${NAMES[match[0]]}  ${line.trim().slice(0, 80)}`,
      );
    }
  });
}

if (failures > 0) {
  console.error(
    `\n${failures} dash${failures === 1 ? "" : "es"} found. Rewrite the copy instead of swapping the glyph.`,
  );
  process.exit(1);
}

console.log(`Clean: no em or en dashes across ${targets.length} files.`);
