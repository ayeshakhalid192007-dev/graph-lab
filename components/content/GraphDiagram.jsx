"use client";
import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export function GraphDiagram({ chart }) {
  const id = `d-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
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
        if (!cancelled) setSvg(null);
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
        className="my-6 glass-card overflow-x-auto p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return (
    <figure
      aria-label="Graph diagram source"
      className="my-6 glass-card p-4"
    >
      <pre className="mono overflow-x-auto text-xs text-graphite">
        {chart}
      </pre>
    </figure>
  );
}
