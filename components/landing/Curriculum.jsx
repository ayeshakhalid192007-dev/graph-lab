import Link from "next/link";
import { getRoadmap } from "@/lib/docs.js";
import { GlassButton } from "@/components/ui/GlassButton";
import { Accordion } from "@/components/ui/Accordion";

export function Curriculum() {
  const roadmap = getRoadmap();

  const accordionItems = roadmap.map((part) => ({
    id: part.dir,
    number: part.part,
    title: part.title.replace(/^Part \d+ · /, ""),
    content: (
      <div className="space-y-4">
        <p className="text-graphite text-sm">
          {part.steps.length} steps to master this part
        </p>
        <ul className="space-y-2">
          {part.steps.map((step) => (
            <li key={step.route}>
              <Link
                href={step.route}
                className="flex items-center gap-3 text-sm text-accent-primary hover:text-accent-secondary transition-colors group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
                <span className="flex-1">
                  {step.title.replace(/^Step \d+ · /, "")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <Accordion items={accordionItems} />
      </div>

      <div className="text-center mt-12">
        <GlassButton href="/tracks/" variant="outline">
          View full roadmap
        </GlassButton>
      </div>
    </div>
  );
}
