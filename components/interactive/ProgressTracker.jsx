"use client";
import Link from "next/link";
import { useStoredSet } from "@/lib/use-stored-set.js";

const KEY = "graph-lab:progress";

export function ProgressTracker({ steps }) {
  const { values: done, toggle } = useStoredSet(KEY);
  const count = steps.filter((s) => done.has(s.route)).length;

  return (
    <div>
      <p className="mono text-sm text-graphite" aria-live="polite">
        Step {count} of {steps.length}
      </p>
      <div
        className="mt-2 h-1.5 w-full glass rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-label="Course progress"
      >
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-300"
          style={{ width: `${(count / steps.length) * 100}%` }}
        />
      </div>
      <ul className="mt-4 space-y-1">
        {steps.map((s) => (
          <li key={s.route} className="flex items-start gap-2">
            <input
              id={`p-${s.route}`}
              type="checkbox"
              checked={done.has(s.route)}
              onChange={() => toggle(s.route)}
              className="mt-1 accent-[var(--accent-primary)]"
            />
            <label
              htmlFor={`p-${s.route}`}
              className="text-sm text-graphite"
            >
              {s.title}
            </label>
            <Link
              href={s.route}
              className="mono ml-auto shrink-0 text-xs text-muted hover:text-accent-primary transition-colors"
            >
              read
              <span className="sr-only"> {s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
