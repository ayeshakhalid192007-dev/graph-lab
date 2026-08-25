import { getSource } from "@/lib/content.js";
/** Copy drafted in loops/loop-4-landing/state.md → "Landing copy" (C2). */
export function Maintainers() {
    const { repo } = getSource();
    return (<div className="max-w-2xl">
      <h2 className="mono text-2xl text-ink">Where this comes from</h2>
      <p className="mt-3 text-graphite">
        Written by the Graph Engineering Course Contributors and released under MIT.
        Every page here is rendered straight from the{" "}
        <a href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer" className="text-accent-primary underline underline-offset-2">
          course repository
        </a>{" "}
        — this site stores no second copy of the material and cannot drift from it.
      </p>
    </div>);
}
