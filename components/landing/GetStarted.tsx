import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";

const CLONE = "npx @graph-engineering-kits/graph-kit document-to-facts";

/** Getting started guide with interactive steps and command examples */
export function GetStarted() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h2 className="mono text-3xl font-semibold text-ink">Three steps in</h2>
        <p className="mt-2 text-graphite">Start learning graph engineering in minutes</p>
      </div>

      <ol className="space-y-6">
        <li className="border-l-2 border-accent pl-6 py-4 hover:border-primary transition-colors duration-200">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="mono text-xs tracking-widest font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
              STEP 01
            </span>
            <h3 className="mono text-lg font-semibold text-ink">
              Read Start here
            </h3>
          </div>
          <p className="text-sm text-graphite leading-relaxed">
            Two or three questions about what you have already built, and it points
            you at the page to open first.
          </p>
          <Link
            href="/docs/00-start-here/"
            className="inline-block mt-3 mono text-xs font-semibold text-accent hover:text-primary transition-colors duration-200"
          >
            Open Start here →
          </Link>
        </li>

        <li className="border-l-2 border-accent pl-6 py-4 hover:border-primary transition-colors duration-200">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="mono text-xs tracking-widest font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
              STEP 02
            </span>
            <h3 className="mono text-lg font-semibold text-ink">
              Pick a track
            </h3>
          </div>
          <p className="text-sm text-graphite leading-relaxed">
            G1 through G4, beginner to expert. Each finishes where the next one
            assumes you are.
          </p>
          <Link
            href="/tracks/"
            className="inline-block mt-3 mono text-xs font-semibold text-accent hover:text-primary transition-colors duration-200"
          >
            Browse tracks →
          </Link>
        </li>

        <li className="border-l-2 border-accent pl-6 py-4 hover:border-primary transition-colors duration-200">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="mono text-xs tracking-widest font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
              STEP 03
            </span>
            <h3 className="mono text-lg font-semibold text-ink">
              Clone a starter kit
            </h3>
          </div>
          <p className="text-sm text-graphite leading-relaxed mb-4">
            One command, no API keys, no build.
          </p>
          <div className="bg-surface border border-rule rounded-lg p-4 hover:border-accent transition-colors duration-200 group">
            <div className="flex items-center justify-between gap-3">
              <code className="mono text-xs text-graphite flex-1 break-all">
                <span className="text-muted">$</span> {CLONE}
              </code>
              <CopyButton text={CLONE} />
            </div>
          </div>
          <Link
            href="/patterns/"
            className="inline-block mt-3 mono text-xs font-semibold text-accent hover:text-primary transition-colors duration-200"
          >
            View all starter kits →
          </Link>
        </li>
      </ol>
    </div>
  );
}
