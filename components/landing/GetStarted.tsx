import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";

const CLONE = "npx @graph-engineering-kits/graph-kit document-to-facts";

/** Copy drafted in loops/loop-4-landing/state.md → "Landing copy" (C2). */
export function GetStarted() {
  return (
    <div className="max-w-3xl">
      <h2 className="mono text-2xl text-ink">Three steps in</h2>

      <ol className="mt-8 space-y-6">
        <li className="border-l border-rule pl-5">
          <p className="mono text-xs tracking-widest text-muted">01</p>
          <p className="mono mt-1 text-base text-ink">
            <Link href="/docs/00-start-here/" className="hover:text-accent">
              Read Start here
            </Link>
          </p>
          <p className="mt-2 text-sm text-graphite">
            Two or three questions about what you have already built, and it points
            you at the page to open first.
          </p>
        </li>

        <li className="border-l border-rule pl-5">
          <p className="mono text-xs tracking-widest text-muted">02</p>
          <p className="mono mt-1 text-base text-ink">
            <Link href="/tracks/" className="hover:text-accent">
              Pick a track
            </Link>
          </p>
          <p className="mt-2 text-sm text-graphite">
            G1 through G4, beginner to expert. Each finishes where the next one
            assumes you are.
          </p>
        </li>

        <li className="border-l border-rule pl-5">
          <p className="mono text-xs tracking-widest text-muted">03</p>
          <p className="mono mt-1 text-base text-ink">
            <Link href="/patterns/" className="hover:text-accent">
              Clone a starter kit
            </Link>
          </p>
          <p className="mt-2 text-sm text-graphite">
            One command, no API keys, no build.
          </p>
          <div className="mt-3 flex items-center gap-3 border border-rule bg-surface px-3 py-2">
            <code className="mono min-w-0 flex-1 truncate text-xs text-ink">{CLONE}</code>
            <CopyButton text={CLONE} />
          </div>
        </li>
      </ol>
    </div>
  );
}
