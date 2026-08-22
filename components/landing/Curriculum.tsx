import Link from "next/link";
import { getRoadmap } from "@/lib/docs.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * Clean list layout showing the learning path
 */
export function Curriculum() {
  const roadmap = getRoadmap();

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-ink mb-4">Seventeen steps, seven parts</h2>
        <p className="text-graphite">
          Steps 1–13 are the core path: they end with a fact graph you can query, hand
          to a worker in slices, and check answers against. Steps 14–17 are the second
          read — putting several loops under one set of rules, keeping a graph honest
          as it grows, and learning to spot the jobs that never needed one.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {roadmap.map((part) => (
          <div
            key={part.dir}
            className="group relative pl-8 border-l-2 border-rule hover:border-accent-primary transition-colors"
          >
            <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface border-2 border-accent-primary group-hover:scale-125 transition-transform" />
            <div className="flex items-center justify-between pb-4 hover:bg-surface/30 -ml-8 pl-8 pr-4 py-2 rounded-r-lg transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">
                    Part {part.part}
                  </span>
                  <span className="h-px w-8 bg-accent-primary/30" />
                  <h3 className="text-lg font-bold text-ink group-hover:text-accent-primary transition-colors">
                    {part.title.replace(/^Part \d+ · /, "")}
                  </h3>
                </div>
                <ul className="space-y-1">
                  {part.steps.map((step) => (
                    <li key={step.route}>
                      <Link
                        href={step.route}
                        className="flex items-center gap-2 text-sm text-graphite hover:text-accent-primary transition-colors group/link"
                      >
                        <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                        <span className="flex-1">{step.title.replace(/^Step \d+ · /, "")}</span>
                        <span className="mono text-xs text-muted opacity-60">{part.steps.length} steps</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <PillButton href="/tracks/" variant="outline">
          View full roadmap
        </PillButton>
      </div>
    </div>
  );
}
