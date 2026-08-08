"use client";
import Link from "next/link";
import type { DocMeta } from "@/lib/docs.ts";
import { useStoredSet } from "@/lib/use-stored-set.ts";

const KEY = "graph-lab:progress";

/**
 * Reading progress across the 17 roadmap steps, kept in localStorage.
 *
 * No accounts, no backend — the spec's non-goals are explicit about it. The set is
 * a DocMeta.route per completed step, so the caller decides which steps count;
 * Loop 4 reuses this component on the landing page with the same single prop.
 */
export function ProgressTracker({ steps }: { steps: DocMeta[] }) {
  const { values: done, toggle } = useStoredSet(KEY);
  const count = steps.filter((s) => done.has(s.route)).length;

  return (
    <div>
      <p className="mono text-sm text-graphite" aria-live="polite">
        Step {count} of {steps.length}
      </p>
      <div
        className="mt-2 h-1 w-full bg-rule"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-label="Course progress"
      >
        <div
          className="h-full bg-accent"
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
              className="mt-1 accent-[var(--accent)]"
            />
            <label htmlFor={`p-${s.route}`} className="text-sm text-graphite">
              {s.title}
            </label>
            <Link
              href={s.route}
              className="mono ml-auto shrink-0 text-xs text-muted hover:text-accent"
            >
              read<span className="sr-only"> {s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
