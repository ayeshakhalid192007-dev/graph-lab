"use client";
import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Renders one mermaid fence to SVG in the browser.
 *
 * Mermaid runs client-side, so the diagram is absent from the prerendered HTML —
 * accepted in the spec's risk list. The source text stays in the DOM as a <pre>
 * until the SVG replaces it, so a reader without JavaScript sees the diagram's
 * source rather than a blank space, and a diagram that fails to parse degrades to
 * the same thing instead of throwing.
 *
 * mermaid is imported dynamically so its ~1 MB never enters the initial bundle of
 * the 66 pages that contain no diagram.
 *
 * On dangerouslySetInnerHTML: the markup is mermaid's own SVG output, not user
 * input. The chart text comes from content/, which is copied byte-for-byte from
 * the course repo at a pinned commit and proven un-hand-edited by sync:check on
 * every push, and mermaid renders it under securityLevel "strict", which runs the
 * result through DOMPurify and strips scripts and event handlers. There is no path
 * here for a reader to supply the string.
 */
export function GraphDiagram({ chart }: { chart: string }) {
  // React 19's useId returns «r0»-style ids. Mermaid puts this straight into a
  // DOM id and then selects it, and neither « » nor : is valid in a selector, so
  // everything outside [A-Za-z0-9] goes.
  const id = `d-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      // Explicit dark theme: mermaid's default renders near-black on the dark
      // surface and the diagram becomes unreadable.
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: resolvedTheme === "dark" ? "dark" : "neutral",
        themeVariables:
          resolvedTheme === "dark"
            ? {
                primaryColor: "#141c25",
                primaryTextColor: "#e6edf3",
                lineColor: "#22d3ee",
                fontFamily: "ui-monospace, monospace",
              }
            : {
                primaryColor: "#fffdf8",
                primaryTextColor: "#16324f",
                lineColor: "#1d4ed8",
                fontFamily: "ui-monospace, monospace",
              },
      });
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setSvg(null); // keep the source fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (svg) {
    return (
      <figure
        aria-label="Graph diagram"
        className="tick relative my-6 overflow-x-auto border border-rule bg-surface p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return (
    <figure aria-label="Graph diagram source" className="tick relative my-6 border border-rule bg-surface p-4">
      <pre className="mono overflow-x-auto text-xs text-graphite">{chart}</pre>
    </figure>
  );
}
