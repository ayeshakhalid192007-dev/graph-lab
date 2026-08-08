import { ScrollAnimator } from "@/components/ui/ScrollAnimator";

const STAGES = [
  { id: "extraction", label: "extraction", note: "prose in, schema out" },
  { id: "resolution", label: "resolution", note: "merge, keep the trail" },
  { id: "provenance", label: "provenance", note: "every edge has a receipt" },
] as const;

/**
 * The three stages a fact passes through, drawn as linked boxes.
 *
 * Landing page only (C5). Same draw-in treatment as the other two diagrams, and
 * the same role="img" plus aria-label, because the animation carries meaning a
 * screen reader would otherwise never receive.
 */
export function LifecycleDiagram({
  activeStage,
}: {
  activeStage?: "extraction" | "resolution" | "provenance";
}) {
  const W = 160;
  const GAP = 40;

  return (
    <ScrollAnimator className="diagram">
      <svg
        viewBox="0 0 600 120"
        className="h-auto w-full"
        role="img"
        aria-label="A fact moves through three stages in order: extraction, where prose becomes schema-shaped records; resolution, where duplicates merge without losing the trail; and provenance, where every edge keeps a receipt for where it came from."
      >
        {STAGES.slice(0, -1).map((_, i) => {
          const x = 20 + (i + 1) * W + i * GAP;
          return (
            <g key={i}>
              <line
                className="edge"
                pathLength={1}
                x1={x}
                y1={54}
                x2={x + GAP}
                y2={54}
                stroke="var(--accent)"
                strokeWidth={1.5}
                style={{ transitionDelay: `${300 + i * 200}ms` }}
              />
              <polygon
                className="node"
                points={`${x + GAP},54 ${x + GAP - 6},50 ${x + GAP - 6},58`}
                fill="var(--accent)"
                style={{ transitionDelay: `${600 + i * 200}ms` }}
              />
            </g>
          );
        })}

        {STAGES.map((stage, i) => {
          const x = 20 + i * (W + GAP);
          const dim = activeStage !== undefined && activeStage !== stage.id;
          return (
            <g
              key={stage.id}
              className={`node${dim ? " dimmed" : ""}`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              <rect
                x={x}
                y={26}
                width={W}
                height={56}
                fill="var(--surface)"
                stroke={activeStage === stage.id ? "var(--accent)" : "var(--rule)"}
                strokeWidth={1.5}
              />
              <text x={x + 14} y={50} fill="var(--ink)" style={{ font: '13px var(--font-mono)' }}>
                {stage.label}
              </text>
              <text x={x + 14} y={68} fill="var(--muted)" style={{ font: '10px var(--font-mono)' }}>
                {stage.note}
              </text>
            </g>
          );
        })}
      </svg>
    </ScrollAnimator>
  );
}
