import Link from "next/link";
import { getRoadmap } from "@/lib/docs.ts";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

/**
 * Curriculum as numbered accordion showing learning path
 */
export function Curriculum() {
  const roadmap = getRoadmap();

  const accordionItems = roadmap.map((part) => ({
    id: part.dir,
    number: part.part,
    title: part.title.replace(/^Part \d+ · /, ""),
    content: (
      <div className="space-y-4">
        <p className="text-graphite text-sm">{part.steps.length} steps to master this part</p>
        <ul className="space-y-2">
          {part.steps.map((step) => (
            <li key={step.route}>
              <Link
                href={step.route}
                className="flex items-center gap-3 text-sm text-accent-primary hover:text-accent-secondary transition-colors group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span className="flex-1">{step.title.replace(/^Step \d+ · /, "")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

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

      <div className="max-w-4xl mx-auto">
        <Accordion items={accordionItems} />
      </div>

      <div className="text-center mt-12">
        <Button href="/tracks/" variant="outline">
          View full roadmap
        </Button>
      </div>
    </div>
  );
}
