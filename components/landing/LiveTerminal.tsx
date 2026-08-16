"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "cmd" | "info" | "dir" | "file" | "head" | "beat";
type Line = { kind: Kind; text: string; note?: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "graph-engineering build" },
  { kind: "info", text: "initializing graph engineering environment", note: "building memory systems" },
  { kind: "dir", text: "src/graphs/" },
  { kind: "file", text: "attempt.ts", note: "records all attempted operations" },
  { kind: "file", text: "truth.ts", note: "holds verified facts" },
  { kind: "file", text: "edges.ts", note: "connects attempts to outcomes" },
  { kind: "dir", text: "lib/" },
  { kind: "file", text: "reconcile.ts", note: "consensus layer" },
  { kind: "file", text: "traverse.ts", note: "graph query engine" },
  { kind: "head", text: "Memory Ready  ████████████  Dual-agent capable" },
  { kind: "head", text: "Graph Engineering initialized:" },
  { kind: "beat", text: "Build memory that more than one agent can trust." },
];

const FILE_COUNT = SCRIPT.filter((l) => l.kind === "file").length;
const DWELL: Record<Kind, number> = {
  cmd: 680,
  info: 460,
  dir: 240,
  file: 190,
  head: 340,
  beat: 560,
};

const SPINNER = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

function LineRow({
  line,
  active,
  done,
  spin,
}: {
  line: Line;
  active: boolean;
  done: boolean;
  spin: string;
}) {
  const writing = line.kind === "file" && active && !done;

  let glyph: React.ReactNode = " ";
  let glyphClass = "text-muted";
  if (line.kind === "cmd") {
    glyph = "$";
    glyphClass = "text-muted";
  } else if (line.kind === "dir") {
    glyph = "▸";
    glyphClass = "text-accent";
  } else if (line.kind === "file") {
    glyph = writing ? spin : "✓";
    glyphClass = writing ? "text-accent" : "text-ink";
  } else if (line.kind === "info") {
    glyph = active && !done ? spin : "›";
    glyphClass = "text-muted";
  } else if (line.kind === "head") {
    glyph = "◇";
    glyphClass = "text-accent";
  } else if (line.kind === "beat") {
    glyph = "●";
    glyphClass = "text-accent";
  }

  const textClass =
    line.kind === "cmd"
      ? "text-ink"
      : line.kind === "head"
        ? "text-accent"
        : line.kind === "beat"
          ? "text-ink"
          : writing
            ? "text-muted"
            : line.kind === "dir"
              ? "text-ink"
              : "text-muted";

  return (
    <div className="term-line flex items-baseline gap-2.5 leading-relaxed">
      <span aria-hidden="true" className={`w-3 shrink-0 text-center font-mono ${glyphClass}`}>
        {glyph}
      </span>
      <span className="min-w-0">
        <span className={textClass}>{line.text}</span>
        {line.note && <span className="text-muted/60"> — {line.note}</span>}
        {line.kind === "cmd" && active && !done && (
          <span className="animate-pulse" aria-hidden="true">▌</span>
        )}
      </span>
    </div>
  );
}

export function LiveTerminal() {
  const [shown, setShown] = useState(SCRIPT.length);
  const [running, setRunning] = useState(false);
  const [frame, setFrame] = useState(0);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;
    let played = false;

    const step = (n: number) => {
      setShown(n);
      if (n < SCRIPT.length) {
        timer = setTimeout(() => step(n + 1), DWELL[SCRIPT[n - 1].kind]);
      } else {
        setRunning(false);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true;
          io.disconnect();
          setShown(0);
          setRunning(true);
          timer = setTimeout(() => step(1), 260);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setFrame((f) => f + 1), 80);
    return () => clearInterval(id);
  }, [running]);

  const done = shown >= SCRIPT.length;
  const spin = SPINNER[frame % SPINNER.length];
  const newest = shown - 1;

  const filesWritten = SCRIPT.slice(0, shown).filter((l) => l.kind === "file").length;
  let status: string;
  if (done) {
    status = `complete · ${FILE_COUNT} files · multi-agent ready`;
  } else {
    const current = SCRIPT[newest];
    if (!current || current.kind === "cmd") status = "building graph engineering…";
    else if (current.kind === "info") status = current.text;
    else if (current.kind === "dir") status = `creating ${current.text}`;
    else if (current.kind === "file")
      status = `writing ${current.text}  ·  ${filesWritten} / ${FILE_COUNT} files`;
    else status = "finalizing…";
  }

  return (
    <figure
      ref={root}
      aria-label="A terminal running graph-engineering build: it initializes the dual-agent memory system, creating the attempt graph, truth graph, and reconciliation layers."
      className="not-prose overflow-hidden rounded-xl border border-rule bg-surface/40 shadow-sm"
    >
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
        </span>
        <span className="ml-2 font-mono text-[11px] uppercase tracking-widest text-muted">
          graph-lab — build
        </span>
      </div>

      <div className="px-4 py-4 text-left font-mono text-[13px] sm:text-sm">
        {SCRIPT.slice(0, Math.max(shown, 0)).map((line, i) => (
          <LineRow key={i} line={line} active={i === newest} done={done} spin={spin} />
        ))}
        {done && (
          <div className="mt-1 flex items-baseline gap-2.5">
            <span aria-hidden="true" className="w-3 shrink-0 text-center text-muted">
              $
            </span>
            <span aria-hidden="true" className="text-muted">▌</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-rule px-4 py-2 font-mono text-[11px] text-muted">
        <span aria-hidden="true" className={done ? "text-ink" : "text-accent"}>
          {done ? "✓" : running ? spin : "›"}
        </span>
        <span className="min-w-0 truncate">{status}</span>
      </div>
    </figure>
  );
}
