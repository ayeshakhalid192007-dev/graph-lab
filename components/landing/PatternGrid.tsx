import Link from "next/link";
import { getAllPatterns } from "@/lib/patterns.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * Clean list layout showing patterns
 */
export function PatternGrid() {
  const patterns = getAllPatterns();

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-ink mb-4">Twenty-Three Patterns</h2>
        <p className="text-graphite">
          Named answers to the problems that show up once a graph is carrying real
          traffic. Each one ships a starter kit that runs under either harness.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-2">
        {patterns.map((p) => (
          <Link
            key={p.slug}
            href={`/patterns/${p.slug}/`}
            className="group flex items-center justify-between p-4 rounded-lg border border-rule hover:border-accent-primary hover:bg-surface/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-ink font-semibold text-lg group-hover:text-accent-primary transition-colors">
                {p.slug}
              </span>
              <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-semibold ${
                p.core
                  ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                  : "bg-accent-tertiary/10 text-accent-tertiary border border-accent-tertiary/20"
              }`}>
                {p.core ? "Core" : "Extended"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted group-hover:text-accent-primary transition-colors">
                {p.category.replace(/^([A-G])-(.*)$/, "$1")}
              </span>
              <span className="text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-4px] group-hover:translate-x-0">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <PillButton href="/patterns/" variant="outline">
          Browse all patterns
        </PillButton>
      </div>
    </div>
  );
}
