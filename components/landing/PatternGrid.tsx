import Link from "next/link";
import { getAllPatterns } from "@/lib/patterns.ts";
import { PillButton } from "@/components/ui/PillButton";

/** Copy drafted in loops/loop-4-landing/state.md → "Landing copy" (C2). */
export function PatternGrid() {
  const patterns = getAllPatterns();

  return (
    <div>
      <h2 className="mono text-2xl text-ink">Twenty-three patterns</h2>
      <p className="mt-3 max-w-2xl text-graphite">
        Named answers to the problems that show up once a graph is carrying real
        traffic. Each one ships a starter kit that runs under either harness.
      </p>

      {/* Hairline per chip rather than a gap-px grid over a ruled background: 23
          patterns never fill a 3-column row, and that technique paints the empty
          24th cell as a solid block of rule colour. */}
      <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((p) => (
          <li key={p.slug} className="border border-rule bg-surface">
            <Link
              href={`/patterns/${p.slug}/`}
              className="mono block px-3 py-2 text-xs text-graphite hover:border-accent hover:bg-paper hover:text-accent"
            >
              <span className="block truncate text-ink">{p.slug}</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-muted">
                {p.category.replace(/^([A-G])-(.*)$/, "$1 · $2")} · {p.core ? "core" : "extended"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <PillButton href="/patterns/" variant="outline">
          Browse and filter
        </PillButton>
      </div>
    </div>
  );
}
