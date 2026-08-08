import Link from "next/link";
import { getRoadmap } from "@/lib/docs.ts";
import { Panel } from "@/components/ui/Panel";
import { PillButton } from "@/components/ui/PillButton";

/** Copy drafted in loops/loop-4-landing/state.md → "Landing copy" (C2). */
export function Curriculum() {
  const roadmap = getRoadmap();

  return (
    <div>
      <h2 className="mono text-2xl text-ink">Seventeen steps, seven parts</h2>
      <p className="mt-3 max-w-2xl text-graphite">
        Steps 1–13 are the core path: they end with a fact graph you can query, hand
        to a worker in slices, and check answers against. Steps 14–17 are the second
        read — putting several loops under one set of rules, keeping a graph honest
        as it grows, and learning to spot the jobs that never needed one.
      </p>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roadmap.map((part) => (
          <li key={part.dir}>
            <Panel className="h-full">
              <p className="mono text-xs tracking-widest text-muted">
                PART {part.part}
              </p>
              <p className="mono mt-1 text-base text-ink">
                {part.title.replace(/^Part \d+ · /, "")}
              </p>
              <p className="mono mt-3 text-xs text-muted">
                {part.steps.length} {part.steps.length === 1 ? "step" : "steps"}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {part.steps.map((step) => (
                  <li key={step.route}>
                    <Link
                      href={step.route}
                      className="text-graphite underline-offset-2 hover:text-accent hover:underline"
                    >
                      {step.title.replace(/^Step \d+ · /, "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <PillButton href="/tracks/" variant="outline">
          The full roadmap
        </PillButton>
      </div>
    </div>
  );
}
