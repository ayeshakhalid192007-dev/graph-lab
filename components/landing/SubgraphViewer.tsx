"use client";
import { useMemo, useState } from "react";
import { ScrollAnimator } from "@/components/ui/ScrollAnimator";

export type Graph = { nodes: string[]; edges: [string, string][] };

/**
 * The whole graph, and the slice a worker actually gets.
 *
 * Toggling dims everything outside the subgraph rather than removing it — a
 * colour transition, never a layout change, so nothing reflows and the reader can
 * see exactly what was withheld. Landing page only (C5).
 *
 * Node positions come from a fixed circular layout computed from the node count,
 * so the same input always draws the same picture and there is no layout engine
 * or randomness in the render path.
 */
export function SubgraphViewer({
  fullGraph,
  subgraphNodeIds,
}: {
  fullGraph: Graph;
  subgraphNodeIds: string[];
}) {
  const [bounded, setBounded] = useState(false);
  const inScope = useMemo(() => new Set(subgraphNodeIds), [subgraphNodeIds]);

  const positions = useMemo(() => {
    const cx = 300;
    const cy = 130;
    const r = 96;
    return new Map(
      fullGraph.nodes.map((id, i) => {
        const angle = (i / fullGraph.nodes.length) * Math.PI * 2 - Math.PI / 2;
        return [id, { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }];
      }),
    );
  }, [fullGraph.nodes]);

  const hiddenCount = fullGraph.nodes.length - subgraphNodeIds.length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={bounded}
          onClick={() => setBounded((b) => !b)}
          className={`mono border px-3 py-1 text-xs ${
            bounded
              ? "border-accent bg-accent text-paper"
              : "border-rule text-graphite hover:border-accent"
          }`}
        >
          {bounded ? "Bounded subgraph" : "Full graph"}
        </button>
        <p className="mono text-xs text-muted" aria-live="polite">
          {bounded
            ? `${subgraphNodeIds.length} of ${fullGraph.nodes.length} nodes in scope — ${hiddenCount} withheld`
            : `${fullGraph.nodes.length} nodes, ${fullGraph.edges.length} edges`}
        </p>
      </div>

      <ScrollAnimator className="diagram mt-4">
        <svg
          viewBox="0 0 600 260"
          className="h-auto w-full"
          role="img"
          aria-label={`A graph of ${fullGraph.nodes.length} nodes. Toggling to the bounded subgraph dims everything outside the ${subgraphNodeIds.length} nodes a worker is given, leaving ${hiddenCount} nodes visible but out of scope.`}
        >
          {fullGraph.edges.map(([from, to], i) => {
            const a = positions.get(from)!;
            const b = positions.get(to)!;
            const dim = bounded && !(inScope.has(from) && inScope.has(to));
            return (
              <line
                key={`${from}-${to}`}
                className={`edge${dim ? " dimmed" : ""}`}
                pathLength={1}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--accent)"
                strokeWidth={1.25}
                style={{ transitionDelay: `${i * 70}ms` }}
              />
            );
          })}

          {fullGraph.nodes.map((id, i) => {
            const p = positions.get(id)!;
            const dim = bounded && !inScope.has(id);
            return (
              <g
                key={id}
                className={`node${dim ? " dimmed" : ""}`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={8}
                  fill="var(--surface)"
                  stroke={bounded && inScope.has(id) ? "var(--accent)" : "var(--ink)"}
                  strokeWidth={1.5}
                />
                <text
                  x={p.x}
                  y={p.y - 14}
                  textAnchor="middle"
                  fill="var(--graphite)"
                  style={{ font: '11px var(--font-mono)' }}
                >
                  {id}
                </text>
              </g>
            );
          })}
        </svg>
      </ScrollAnimator>
    </div>
  );
}
