import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contentRoot, readContent } from "@/lib/content.ts";
import { getRoadmap } from "@/lib/docs.ts";
import { parseFlashcards } from "@/lib/parse-content.ts";
import { Flashcards } from "@/components/interactive/Flashcards";
import { Section } from "@/components/ui/Section";

/**
 * Six pages, not seven. Part 6 ships no flashcards.md — it is quiz-only by design,
 * per the master plan, and check-content-shape.mjs asserts 6 sets in CI.
 *
 * The filter tests for the file rather than hardcoding `part !== 6`, so a Part that
 * gains or loses a set in the course repo changes this route by re-syncing.
 */
function partsWithFlashcards() {
  return getRoadmap().filter((p) =>
    existsSync(join(contentRoot, "docs", p.dir, "flashcards.md")),
  );
}

export function generateStaticParams() {
  return partsWithFlashcards().map((p) => ({ part: String(p.part) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}): Promise<Metadata> {
  const { part } = await params;
  const entry = partsWithFlashcards().find((p) => String(p.part) === part);
  return { title: entry ? `${entry.title} — Flashcards` : "Flashcards" };
}

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;
  const entry = partsWithFlashcards().find((p) => String(p.part) === part);
  if (!entry) notFound();
  const cards = parseFlashcards(readContent(`docs/${entry.dir}/flashcards.md`));
  if (cards.length === 0) {
    throw new Error(`docs/${entry.dir}/flashcards.md parsed to 0 cards`);
  }

  return (
    <Section className="max-w-3xl">
      <p className="mono text-xs tracking-wider text-muted">
        <Link href={`/docs/${entry.dir}/`} className="hover:text-accent">
          part {entry.part}
        </Link>
        {" / flashcards"}
      </p>
      <h1 className="mono mt-3 text-2xl text-ink">{entry.title} — Flashcards</h1>
      <p className="mt-2 text-sm text-muted">
        {cards.length} cards, drawn from the Part&apos;s own glossary table.
      </p>
      <div className="mt-8">
        <Flashcards part={entry.part} cards={cards} />
      </div>
      <p className="mono mt-8 text-sm text-muted">
        <Link href={`/quiz/${entry.part}/`} className="hover:text-accent">
          → quiz for this part
        </Link>
      </p>
    </Section>
  );
}
