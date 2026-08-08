"use client";
import { useState } from "react";
import type { Flashcard } from "@/lib/parse-content.ts";

/** Fisher-Yates, on a copy — the prop array belongs to the server component. */
function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * One card at a time: term, flip, definition.
 *
 * The card itself is the <button>, so Space and Enter flip it without a separate
 * control and without a keydown handler. The flip is a CSS transform that
 * `prefers-reduced-motion` turns off — the definition still appears, it just does
 * not rotate on the way (C13).
 */
export function Flashcards({ part, cards }: { part: number; cards: Flashcard[] }) {
  const [order, setOrder] = useState<Flashcard[]>(cards);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = order[i];

  function go(delta: number) {
    setI((n) => Math.min(Math.max(n + delta, 0), order.length - 1));
    setFlipped(false);
  }

  return (
    <div>
      <p className="mono text-sm text-muted" aria-live="polite">
        PART {part} · CARD {i + 1} OF {order.length}
      </p>

      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
        className="tick relative mt-3 flex min-h-52 w-full flex-col justify-center border border-rule bg-surface p-8 text-left transition-transform duration-200 hover:border-accent"
        style={{ transform: flipped ? "rotateX(0.5deg)" : "none" }}
      >
        <span className="mono text-[11px] uppercase tracking-wider text-muted">
          {flipped ? "Definition" : "Term"}
        </span>
        <span
          className={flipped ? "mt-3 text-base text-graphite" : "mono mt-3 text-2xl text-ink"}
        >
          {flipped ? card.definition : card.term}
        </span>
        <span className="mono mt-4 text-[11px] text-muted">
          {flipped ? "Click or press Enter to hide" : "Click or press Enter to reveal"}
        </span>
      </button>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={i === 0}
          className="mono border border-rule px-3 py-1 text-sm hover:border-accent disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={i >= order.length - 1}
          className="mono border border-rule px-3 py-1 text-sm hover:border-accent disabled:opacity-40"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => {
            setOrder(shuffled(order));
            setI(0);
            setFlipped(false);
          }}
          className="mono ml-auto border border-rule px-3 py-1 text-sm hover:border-accent"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
