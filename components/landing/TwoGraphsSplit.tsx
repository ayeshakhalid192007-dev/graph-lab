import { ScrollAnimator } from "@/components/ui/ScrollAnimator";

type Node = { id: string; x: number; y: number; label: string };

/**
 * The course's central distinction, drawn rather than described: a work-history
 * graph on the left, a fact graph on the right, split by a hairline rule.
 *
 * Hand-built inline SVG, not mermaid — this is site chrome with an animation, and
 * mermaid renders at runtime into markup we do not control. Landing page only
 * (C5): putting it in a doc page would need a marker convention inside docs/,
 * which is a course-content change.
 */

const WORK: Node[] = [
  { id: "w1", x: 60, y: 34, label: "attempt 1" },
  { id: "w2", x: 60, y: 96, label: "attempt 2" },
  { id: "w3", x: 60, y: 158, label: "attempt 3" },
];
const WORK_EDGES: [string, string][] = [
  ["w1", "w2"],
  ["w2", "w3"],
];

const FACT: Node[] = [
  { id: "f1", x: 70, y: 40, label: "Service" },
  { id: "f2", x: 190, y: 40, label: "Owner" },
  { id: "f3", x: 130, y: 140, label: "Receipt" },
];
const FACT_EDGES: [string, string][] = [
  ["f1", "f2"],
  ["f1", "f3"],
  ["f2", "f3"],
];

function Graph({ nodes, edges, dim }: { nodes: Node[]; edges: [string, string][]; dim: boolean }) {
  const at = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <g className={dim ? "dimmed" : undefined}>
      {edges.map(([from, to], i) => {
        const a = at(from);
        const b = at(to);
        return (
          <line
            key={`${from}-${to}`}
            className="edge"
            pathLength={1}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--accent)"
            strokeWidth={1.5}
            style={{ transitionDelay: `${i * 140}ms` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={n.id} className="node" style={{ transitionDelay: `${200 + i * 120}ms` }}>
          <circle cx={n.x} cy={n.y} r={7} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.5} />
          <text
            x={n.x + 14}
            y={n.y + 4}
            fill="var(--graphite)"
            style={{ font: '11px var(--font-mono)' }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </g>
  );
}

export function TwoGraphsSplit({
  highlightSide,
}: {
  highlightSide?: "work-history" | "fact";
}) {
  return (
    <ScrollAnimator className="diagram">
      <svg
        viewBox="0 0 560 200"
        className="h-auto w-full"
        role="img"
        aria-label="Two graphs side by side. On the left, a work-history graph: three attempts chained in order, recording what was tried. On the right, a fact graph: a Service node and an Owner node, each linked to a shared Receipt node, recording what turned out to be true."
      >
        <g transform="translate(0,0)">
          <text x={16} y={16} fill="var(--muted)" style={{ font: '10px var(--font-mono)', letterSpacing: "0.1em" }}>
            WORK HISTORY
          </text>
          <Graph nodes={WORK} edges={WORK_EDGES} dim={highlightSide === "fact"} />
        </g>

        <line x1={280} y1={8} x2={280} y2={192} stroke="var(--rule)" strokeWidth={1} />

        <g transform="translate(300,0)">
          <text x={16} y={16} fill="var(--muted)" style={{ font: '10px var(--font-mono)', letterSpacing: "0.1em" }}>
            FACTS
          </text>
          <Graph nodes={FACT} edges={FACT_EDGES} dim={highlightSide === "work-history"} />
        </g>
      </svg>
    </ScrollAnimator>
  );
}
