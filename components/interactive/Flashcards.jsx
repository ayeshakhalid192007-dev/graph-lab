"use client";
import { useState } from "react";

function shuffled(items) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function Flashcards({ part, cards }) {
  const [order, setOrder] = useState(cards);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = order[i];

  function go(delta) {
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
        className="glass-card mt-3 flex min-h-52 w-full flex-col justify-center p-8 text-left transition-all duration-200 hover:border-accent-primary/30 rounded-2xl"
        style={{
          transform: flipped ? "rotateX(0.5deg)" : "none",
        }}
      >
        <span className="mono text-[11px] uppercase tracking-wider text-muted">
          {flipped ? "Definition" : "Term"}
        </span>
        <span
          className={
            flipped
              ? "mt-3 text-base text-graphite"
              : "mono mt-3 text-2xl text-ink"
          }
        >
          {flipped ? card.definition : card.term}
        </span>
        <span className="mono mt-4 text-[11px] text-muted">
          {flipped
            ? "Click or press Enter to hide"
            : "Click or press Enter to reveal"}
        </span>
      </button>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={i === 0}
          className="mono glass border border-glass-border px-3 py-1 text-sm hover:border-accent-primary/30 disabled:opacity-40 rounded-xl transition-colors"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={i >= order.length - 1}
          className="mono glass border border-glass-border px-3 py-1 text-sm hover:border-accent-primary/30 disabled:opacity-40 rounded-xl transition-colors"
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
          className="mono ml-auto glass border border-glass-border px-3 py-1 text-sm hover:border-accent-primary/30 rounded-xl transition-colors"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
