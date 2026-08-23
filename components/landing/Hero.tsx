import { getAllDocs } from "@/lib/docs.ts";
import { getAllPatterns, getStarterSlugs } from "@/lib/patterns.ts";
import { PillButton } from "@/components/ui/PillButton";

export function Hero() {
  const docsCount = getAllDocs().length;
  const patternsCount = getAllPatterns().length;
  const starterCount = getStarterSlugs().length;

  return (
    <div className="max-w-4xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-8">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary" />
        </span>
        <span className="mono text-xs font-semibold text-accent-primary uppercase tracking-wider">
          Graph Engineering
        </span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-tight mb-6">
        Build resilient systems that <br className="hidden sm:block" />
        <span className="font-bold text-accent-primary">
          scale across agents
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-graphite leading-relaxed max-w-2xl mb-10">
        Graph Engineering transforms how distributed systems handle complexity. Instead of fragile file-based states, it uses resilient graph structures where multiple workers can coordinate safely. Every attempt is recorded, every truth is verified, and your system stays reliable at any scale—from single-agent tools to multi-agent coordination at enterprise level.
      </p>

      <div className="flex flex-wrap gap-4 mb-16">
        <PillButton href="/docs/00-start-here/" className="px-8 py-4 text-base shadow-lg shadow-accent-primary/15">
          Start Learning
        </PillButton>
        <PillButton href="/tracks/" variant="outline" className="px-8 py-4 text-base">
          View Roadmap
        </PillButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-rule pt-8">
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-ink mb-1">{docsCount}+</div>
          <div className="text-sm sm:text-base text-muted font-medium uppercase tracking-wider">Pages</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-ink mb-1">{patternsCount}+</div>
          <div className="text-sm sm:text-base text-muted font-medium uppercase tracking-wider">Patterns</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-ink mb-1">{starterCount}+</div>
          <div className="text-sm sm:text-base text-muted font-medium uppercase tracking-wider">Starter Kits</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-ink mb-1">17</div>
          <div className="text-sm sm:text-base text-muted font-medium uppercase tracking-wider">Learning Steps</div>
        </div>
      </div>
    </div>
  );
}
