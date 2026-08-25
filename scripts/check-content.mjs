/**
 * Content consistency checker.
 *
 * Six cases only read as one body of work if they are written to the same
 * shape. This script enforces that shape so drift is caught before it
 * reaches the page. Run it with `npm run check:content`.
 *
 * It reads content/profile.ts as text and scans it with a small bracket
 * matcher, so it needs no build step and no dependencies.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "content/profile.ts"), "utf8");

/* ---------------------------------------------------------------- rules */

const RULES = {
  title: { max: 60 },
  problem: { min: 25, max: 60 },
  approach: { min: 35, max: 90 },
  result: { min: 18, max: 55 },
  stack: { min: 3, max: 5 },
};

const CONTEXT_PATTERN = /^.+ · \d{4} — (\d{4}|present)$/;

/** Words that promise instead of state. */
const HYPE = [
  "cutting-edge",
  "state-of-the-art",
  "world-class",
  "revolutionary",
  "groundbreaking",
  "seamless",
  "leverage",
  "synergy",
  "passionate",
  "expert in",
  "extensive experience",
  "proven track record",
];

/* -------------------------------------------------------------- scanning */

/**
 * Returns the text between the bracket at `openIndex` and its match,
 * skipping over anything inside a string literal.
 */
function matchBracket(text, openIndex, open, close) {
  let depth = 0;
  let quote = null;
  for (let i = openIndex; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === "\\") i++;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
    } else if (char === open) {
      depth++;
    } else if (char === close) {
      depth--;
      if (depth === 0) return text.slice(openIndex + 1, i);
    }
  }
  return null;
}

/**
 * Body of `export const <name> = [ ... ]`, brackets excluded.
 * Anchors on the assignment, so a type annotation such as
 * `: readonly Case[] =` does not get mistaken for the opening bracket.
 */
function arrayBody(name) {
  const start = source.indexOf(`export const ${name}`);
  if (start === -1) return null;
  const assignment = source.slice(start).match(/=\s*\[/);
  if (!assignment) return null;
  const open = start + assignment.index + assignment[0].length - 1;
  return matchBracket(source, open, "[", "]");
}

/** Every top-level `{ ... }` object inside an array body. */
function objects(body) {
  const found = [];
  let index = 0;
  while (index < body.length) {
    const open = body.indexOf("{", index);
    if (open === -1) break;
    const inner = matchBracket(body, open, "{", "}");
    if (inner === null) break;
    found.push(inner);
    index = open + inner.length + 2;
  }
  return found;
}

/** Value of a `key: "…"` pair, ignoring commented-out lines. */
function field(chunk, key) {
  const active = chunk.replace(/^\s*\/\/.*$/gm, "");
  const match = active.match(
    new RegExp(`(?:^|\\n)\\s*${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`),
  );
  return match ? match[1].replace(/\\"/g, '"') : null;
}

function tagsOf(chunk) {
  const start = chunk.indexOf("stack:");
  if (start === -1) return [];
  const open = chunk.indexOf("[", start);
  const inner = matchBracket(chunk, open, "[", "]") ?? "";
  return [...inner.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

/* -------------------------------------------------------------- checking */

const problems = [];
const warnings = [];
const usedTags = new Set();

const vocabulary = new Set(
  [...(arrayBody("TAGS") ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]),
);

const caseChunks = objects(arrayBody("cases") ?? "");

if (vocabulary.size === 0) problems.push("could not read the TAGS vocabulary");
if (caseChunks.length === 0) problems.push("could not read any cases");

for (const chunk of caseChunks) {
  const id = field(chunk, "id") ?? "<unnamed case>";
  const fail = (message) => problems.push(`${id}: ${message}`);
  const warn = (message) => warnings.push(`${id}: ${message}`);

  const title = field(chunk, "title");
  if (!title) fail("missing title");
  else if (title.length > RULES.title.max) {
    fail(`title is ${title.length} characters (max ${RULES.title.max})`);
  }

  const context = field(chunk, "context");
  if (!context) fail("missing context");
  else if (!CONTEXT_PATTERN.test(context)) {
    fail(`context "${context}" should read "Where · YYYY — YYYY|present"`);
  }

  for (const key of ["problem", "approach", "result"]) {
    const text = field(chunk, key);
    if (!text) {
      fail(`missing ${key}`);
      continue;
    }

    const count = countWords(text);
    const { min, max } = RULES[key];
    if (count < min) fail(`${key} is ${count} words (min ${min})`);
    else if (count > max) fail(`${key} is ${count} words (max ${max})`);

    const lower = text.toLowerCase();
    for (const phrase of HYPE) {
      if (lower.includes(phrase)) fail(`${key} contains "${phrase}"`);
    }
  }

  const tags = tagsOf(chunk);
  if (tags.length < RULES.stack.min || tags.length > RULES.stack.max) {
    fail(
      `stack has ${tags.length} tags (want ${RULES.stack.min}–${RULES.stack.max})`,
    );
  }
  for (const tag of tags) {
    if (!vocabulary.has(tag)) fail(`tag "${tag}" is not in TAGS`);
    usedTags.add(tag);
  }

  if (!/\n\s*figures:\s*\[/.test(chunk.replace(/^\s*\/\/.*$/gm, ""))) {
    warn("no figure — a case with a picture gets read far more often");
  }
}

/* Referenced media must exist, or the page renders a broken image. */
const active = source.replace(/^\s*\/\/.*$/gm, "");
for (const [, src] of active.matchAll(/\n\s*src:\s*"(\/[^"]+)"/g)) {
  if (!existsSync(join(root, "public", src))) {
    problems.push(`figure file missing: public${src}`);
  }
}

const portrait = active.match(/portrait:\s*"([^"]+)"/);
if (portrait && !existsSync(join(root, "public", portrait[1]))) {
  problems.push(`portrait file missing: public${portrait[1]}`);
}

for (const tag of vocabulary) {
  if (!usedTags.has(tag)) warnings.push(`tag "${tag}" is defined but unused`);
}

/* --------------------------------------------------------------- report */

console.log(`checked ${caseChunks.length} cases against the house rules\n`);

if (warnings.length) {
  console.log("warnings");
  for (const warning of warnings) console.log(`  · ${warning}`);
  console.log("");
}

if (problems.length) {
  console.log("problems");
  for (const problem of problems) console.log(`  ✗ ${problem}`);
  console.log(`\n${problems.length} problem(s) to fix.`);
  process.exit(1);
}

console.log("✓ all cases consistent");
