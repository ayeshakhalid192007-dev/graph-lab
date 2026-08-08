"use client";
import { useState } from "react";
import type { QuizQuestion } from "@/lib/parse-content.ts";

/**
 * One question at a time, reveal the answer, running tally.
 *
 * Self-assessment, not grading: the reader says whether they got it, because the
 * course's answers are prose judgments, not multiple choice. The tally is honest
 * about that — it counts what the reader claimed, and nothing is sent anywhere.
 */
export function Quiz({ part, questions }: { part: number; questions: QuizQuestion[] }) {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scored, setScored] = useState<boolean[]>([]);
  const q = questions[i];
  const done = i >= questions.length;

  if (done) {
    const right = scored.filter(Boolean).length;
    return (
      <div className="tick relative border border-rule bg-surface p-6">
        <p className="mono text-sm text-muted">PART {part} · COMPLETE</p>
        <p className="mt-2 text-2xl text-ink">
          You marked {right} of {questions.length} correct.
        </p>
        <button
          type="button"
          onClick={() => {
            setI(0);
            setRevealed(false);
            setScored([]);
          }}
          className="mono mt-4 border border-rule px-3 py-1 text-sm hover:border-accent"
        >
          Start over
        </button>
      </div>
    );
  }

  function record(correct: boolean) {
    setScored((s) => [...s, correct]);
    setRevealed(false);
    setI((n) => n + 1);
  }

  return (
    <div className="tick relative border border-rule bg-surface p-6">
      <p className="mono text-sm text-muted" aria-live="polite">
        PART {part} · QUESTION {i + 1} OF {questions.length} ·{" "}
        {scored.filter(Boolean).length} marked correct so far
      </p>
      <h2 className="mono mt-2 text-lg text-ink">
        {q.n}. {q.title}
      </h2>
      <p className="mt-4 whitespace-pre-line text-graphite">{q.question}</p>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mono mt-6 bg-accent px-4 py-2 text-sm text-paper"
        >
          Reveal the answer
        </button>
      ) : (
        <div className="mt-6 border-t border-rule pt-4">
          <p className="whitespace-pre-line text-graphite">{q.answer}</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => record(true)}
              className="mono border border-rule px-3 py-1 text-sm hover:border-accent"
            >
              I had it
            </button>
            <button
              type="button"
              onClick={() => record(false)}
              className="mono border border-rule px-3 py-1 text-sm hover:border-accent"
            >
              I didn&apos;t
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
