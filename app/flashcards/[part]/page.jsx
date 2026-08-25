import Link from "next/link";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contentRoot, readContent } from "@/lib/content.js";
import { getRoadmap } from "@/lib/docs.js";
import { parseFlashcards } from "@/lib/parse-content.js";
import { Flashcards } from "@/components/interactive/Flashcards";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";

function partsWithFlashcards() {
  return getRoadmap().filter((p) =>
    existsSync(join(contentRoot, "docs", p.dir, "flashcards.md"))
  );
}

export function generateStaticParams() {
  return partsWithFlashcards().map((p) => ({ part: String(p.part) }));
}

export async function generateMetadata({ params }) {
  const { part } = await params;
  const entry = partsWithFlashcards().find(
    (p) => String(p.part) === part
  );
  return { title: entry ? `${entry.title} — Flashcards` : "Flashcards" };
}

export default async function FlashcardsPage({ params }) {
  const { part } = await params;
  const entry = partsWithFlashcards().find(
    (p) => String(p.part) === part
  );
  if (!entry) notFound();

  const cards = parseFlashcards(
    readContent(`docs/${entry.dir}/flashcards.md`)
  );
  if (cards.length === 0) {
    throw new Error(
      `docs/${entry.dir}/flashcards.md parsed to 0 cards`
    );
  }

  return (
    <Section className="max-w-3xl">
      <FadeIn>
        <p className="mono text-xs tracking-wider text-muted">
          <Link
            href={`/docs/${entry.dir}/`}
            className="hover:text-accent-primary transition-colors"
          >
            part {entry.part}
          </Link>
          {" / flashcards"}
        </p>
        <h1 className="mono mt-3 text-2xl text-ink">
          {entry.title} — Flashcards
        </h1>
        <p className="mt-2 text-sm text-muted">
          {cards.length} cards, drawn from the Part&apos;s own glossary table.
        </p>
        <div className="mt-8">
          <Flashcards part={entry.part} cards={cards} />
        </div>
        <p className="mono mt-8 text-sm text-muted">
          <Link
            href={`/quiz/${entry.part}/`}
            className="hover:text-accent-primary transition-colors"
          >
            → quiz for this part
          </Link>
        </p>
      </FadeIn>
    </Section>
  );
}
