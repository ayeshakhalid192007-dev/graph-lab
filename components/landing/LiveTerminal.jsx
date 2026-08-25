"use client";
import { useEffect, useRef, useState } from "react";

const SCRIPT = [
  { kind: "cmd", text: "graph-engineering build" },
  {
    kind: "info",
    text: "initializing graph engineering environment",
    note: "building memory systems",
  },
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
const DWELL = {
  cmd: 680,
  info: 460,
  dir: 240,
  file: 190,
  head: 340,
  beat: 560,
};
const SPINNER = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

function LineRow({ line, active, done, spin }) {
  const writing = line.kind === "file" && active && !done;
  let glyph = " ";
  let glyphClass = "text-ink";

  if (line.kind === "cmd") {
    glyph = "$";
    glyphClass = "text-accent-primary";
  } else if (line.kind === "dir") {
    glyph = "▸";
    glyphClass = "text-accent-primary font-bold";
  } else if (line.kind === "file") {
    glyph = writing ? spin : "✓";
    glyphClass = writing ? "text-accent-secondary" : "text-ink font-semibold";
  } else if (line.kind === "info") {
    glyph = active && !done ? spin : "›";
    glyphClass = "text-accent-tertiary";
  } else if (line.kind === "head") {
    glyph = "◇";
    glyphClass = "text-accent-vibrant font-bold";
  } else if (line.kind === "beat") {
    glyph = "●";
    glyphClass = "text-accent-secondary font-bold";
  }

  const textClass =
    line.kind === "cmd"
      ? "text-ink font-bold"
      : line.kind === "head"
      ? "text-accent-tertiary font-bold"
      : line.kind === "beat"
      ? "text-accent-vibrant italic font-medium"
      : writing
      ? "text-accent-secondary"
      : line.kind === "dir"
      ? "text-accent-primary font-bold"
      : "text-ink";

  return (
    <div className="term-line flex items-baseline gap-2.5 leading-relaxed">
      <span
        aria-hidden="true"
        className={`w-3 shrink-0 text-center font-mono ${glyphClass}`}
      >
        {glyph}
      </span>
      <span className="min-w-0">
        <span className={textClass}>{line.text}</span>
        {line.note && (
          <span className="text-ink/70"> — {line.note}</span>
        )}
        {line.kind === "cmd" && active && !done && (
          <span className="animate-pulse" aria-hidden="true">
            ▌
          </span>
        )}
      </span>
    </div>
  );
}

export function LiveTerminal() {
  const [shown, setShown] = useState(SCRIPT.length);
  const [running, setRunning] = useState(false);
  const [frame, setFrame] = useState(0);
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const el = root.current;
    if (!el) return;
    let timer;
    let played = false;

    const step = (n) => {
      setShown(n);
      if (n < SCRIPT.length) {
        timer = setTimeout(
          () => step(n + 1),
          DWELL[SCRIPT[n - 1].kind]
        );
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
      { threshold: 0.4 }
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
  const filesWritten = SCRIPT.slice(0, shown).filter(
    (l) => l.kind === "file"
  ).length;

  let status;
  if (done) {
    status = `complete · ${FILE_COUNT} files · multi-agent ready`;
  } else {
    const current = SCRIPT[newest];
    if (!current || current.kind === "cmd")
      status = "building graph engineering…";
    else if (current.kind === "info") status = current.text;
    else if (current.kind === "dir")
      status = `creating ${current.text}`;
    else if (current.kind === "file")
      status = `writing ${current.text}  ·  ${filesWritten} / ${FILE_COUNT} files`;
    else status = "finalizing…";
  }

  return (
    <figure
      ref={root}
      aria-label="A terminal running graph-engineering build: it initializes the dual-agent memory system, creating the attempt graph, truth graph, and reconciliation layers."
      className="not-prose overflow-hidden rounded-2xl border border-accent-primary/20 glass-strong shadow-xl shadow-accent-primary/10 dark:shadow-accent-primary/10"
    >
      <div className="flex items-center gap-2 border-b border-accent-primary/10 px-5 py-4 bg-gradient-to-r from-accent-primary/5 to-transparent">
        <span className="flex gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-sm shadow-red-400/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
        </span>
        <span className="ml-2 font-mono text-xs uppercase tracking-widest text-accent-primary font-semibold">
          graph-lab build
        </span>
      </div>

      <div className="px-5 py-5 text-left font-mono text-sm sm:text-base">
        {SCRIPT.slice(0, Math.max(shown, 0)).map((line, i) => (
          <LineRow
            key={i}
            line={line}
            active={i === newest}
            done={done}
            spin={spin}
          />
        ))}
        {done && (
          <div className="mt-2 flex items-baseline gap-2.5">
            <span
              aria-hidden="true"
              className="w-3 shrink-0 text-center text-accent-primary"
            >
              $
            </span>
            <span aria-hidden="true" className="text-accent-primary">
              ▌
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-accent-primary/10 px-5 py-3.5 font-mono text-xs bg-gradient-to-r from-transparent to-accent-secondary/5">
        <span
          aria-hidden="true"
          className={`flex items-center justify-center w-5 h-5 rounded-full ${
            done
              ? "bg-green-400 text-white"
              : "bg-accent-primary text-white animate-pulse"
          }`}
        >
          {done ? "✓" : spin}
        </span>
        <span className="min-w-0 truncate font-semibold text-ink">
          {status}
        </span>
      </div>
    </figure>
  );
}
