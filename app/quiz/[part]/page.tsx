import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readContent } from "@/lib/content.ts";
import { getRoadmap } from "@/lib/docs.ts";
import { parseQuiz } from "@/lib/parse-content.ts";
import { Quiz } from "@/components/interactive/Quiz";
import { Section } from "@/components/ui/Section";

export function generateStaticParams() {
  return getRoadmap().map((p) => ({ part: String(p.part) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}): Promise<Metadata> {
  const { part } = await params;
  const entry = getRoadmap().find((p) => String(p.part) === part);
  return { title: entry ? `${entry.title} — Quiz` : "Quiz" };
}

export default async function QuizPage({ params }: { params: Promise<{ part: string }> }) {
  const { part } = await params;
  const entry = getRoadmap().find((p) => String(p.part) === part);
  if (!entry) notFound();
  const questions = parseQuiz(readContent(`docs/${entry.dir}/quiz.md`));

  return (
    <Section className="max-w-3xl">
      <p className="mono text-xs tracking-wider text-muted">
        <Link href={`/docs/${entry.dir}/`} className="hover:text-accent">
          part {entry.part}
        </Link>
        {" / quiz"}
      </p>
      <h1 className="mono mt-3 text-2xl text-ink">{entry.title} — Quiz</h1>
      <p className="mt-2 text-sm text-muted">
        {questions.length} questions. You mark your own answers; nothing is scored
        anywhere but this page.
      </p>
      <div className="mt-8">
        <Quiz part={entry.part} questions={questions} />
      </div>
      {entry.part !== 6 && (
        <p className="mono mt-8 text-sm text-muted">
          <Link href={`/flashcards/${entry.part}/`} className="hover:text-accent">
            → flashcards for this part
          </Link>
        </p>
      )}
    </Section>
  );
}
