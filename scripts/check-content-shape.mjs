/**
 * Asserts the quiz and flashcard structures the site's parsers depend on.
 *
 * These are the only two places where a page reads *structure* out of course
 * markdown rather than just rendering it. A future content edit that changes the
 * shape must produce a red build, never a silently empty quiz page.
 *
 * Imports lib/parse-content.ts directly — Node >=23.6 strips the types — so the
 * check and the rendered page can never disagree about what parses.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseQuiz, parseFlashcards } from "../lib/parse-content.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(root, "content", "docs");

// Verified against the shipped content on 2026-08-07. Part 6 has no flashcards
// file — that is intentional per the master plan, not a gap.
const EXPECTED_QUIZ = { 1: 3, 2: 2, 3: 3, 4: 2, 5: 3, 6: 2, 7: 2 };
const EXPECTED_CARDS = { 1: 6, 2: 3, 3: 6, 4: 5, 5: 7, 7: 3 };

const parts = (await readdir(DOCS, { withFileTypes: true }))
  .filter((e) => e.isDirectory() && /^\d+-part-(\d+)-/.test(e.name))
  .map((e) => ({ dir: e.name, part: Number(e.name.match(/^\d+-part-(\d+)-/)[1]) }))
  .sort((a, b) => a.part - b.part);

const failures = [];

for (const { dir, part } of parts) {
  try {
    const questions = parseQuiz(await readFile(join(DOCS, dir, "quiz.md"), "utf8"));
    if (questions.length !== EXPECTED_QUIZ[part]) {
      failures.push(`${dir}/quiz.md: parsed ${questions.length}, expected ${EXPECTED_QUIZ[part]}`);
    }
    for (const q of questions) {
      if (!q.question) failures.push(`${dir}/quiz.md: question ${q.n} has an empty body`);
      if (!q.answer) failures.push(`${dir}/quiz.md: question ${q.n} has an empty answer`);
    }
  } catch (err) {
    failures.push(`${dir}/quiz.md: ${err.message}`);
  }

  if (!(part in EXPECTED_CARDS)) continue;
  try {
    const cards = parseFlashcards(await readFile(join(DOCS, dir, "flashcards.md"), "utf8"));
    if (cards.length !== EXPECTED_CARDS[part]) {
      failures.push(`${dir}/flashcards.md: parsed ${cards.length}, expected ${EXPECTED_CARDS[part]}`);
    }
  } catch (err) {
    failures.push(`${dir}/flashcards.md: ${err.message}`);
  }
}

if (parts.length !== 7) failures.push(`found ${parts.length} part directories, expected 7`);

if (failures.length) {
  console.error("Content shape check failed:\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log(`check:content-shape OK — 7 quizzes, 6 flashcard sets parse as expected`);
