import { getAllDocs } from "@/lib/docs.ts";
import { getAllPatterns, getStarterSlugs } from "@/lib/patterns.ts";
import { getRoadmap } from "@/lib/docs.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * The one place in this project where new prose is written (C2). The wording is
 * drafted and independence-checked in loops/loop-4-landing/state.md under
 * "Landing copy" — change it there first, not here.
 *
 * Every number in the stat strip is computed. Typed literals rot the moment the
 * course repo gains a page, and a landing page that lies about its own size is
 * worse than one that shows no numbers at all.
 */
export function Hero() {
  const stats = [
    [getAllDocs().length, "PAGES"],
    [getAllPatterns().length, "PATTERNS"],
    [getStarterSlugs().length, "STARTER KITS"],
    [getRoadmap().length, "QUIZZES"],
  ] as const;

  return (
    <div className="max-w-3xl">
      <p className="mono text-xs uppercase tracking-[0.2em] text-muted">
        Graph Engineering
      </p>
      <h1 className="mono mt-4 text-3xl leading-tight text-ink sm:text-5xl">
        Build memory that more than one agent can trust.
      </h1>
      <p className="mt-6 text-base leading-relaxed text-graphite sm:text-lg">
        A file holds up fine while one loop owns it start to finish. Bring in a
        second worker and you can no longer say who wrote a line, when it landed,
        or whether anybody checked it. Graph Engineering swaps that file for two
        graphs — one recording what was attempted, one holding what turned out to
        be true — so work that runs in parallel stays auditable afterwards.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <PillButton href="/docs/00-start-here/">Start here</PillButton>
        <PillButton href="/tracks/" variant="outline">
          Pick a track
        </PillButton>
      </div>

      {/* A plain list, not a <dl>: the visible label already names the number, so a
          sr-only <dt> would only make a screen reader say "PAGES, 86 PAGES". */}
      <ul className="mono mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-5 text-xs tracking-wider text-muted">
        {stats.map(([n, label]) => (
          <li key={label}>
            <span className="text-ink">{n}</span> {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
