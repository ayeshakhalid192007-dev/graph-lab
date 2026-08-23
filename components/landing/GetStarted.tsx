import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";

const CLONE = "npx @graph-engineering-kits/graph-kit document-to-facts";
const INSTALL = "npm install @graph-engineering/core";

/**
 * Minimal getting started guide
 */
export function GetStarted() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
        <h2 className="text-xl font-bold text-ink">Get Started</h2>
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="group relative pl-8 border-l-2 border-rule hover:border-accent-primary transition-colors">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-accent-primary group-hover:scale-125 transition-transform" />
          <span className="mono text-[10px] uppercase tracking-widest text-accent-primary font-semibold mb-2 block">
            Step 1
          </span>
          <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-accent-primary transition-colors">
            Read Start here
          </h3>
          <p className="text-graphite mb-3">
            Two or three questions about what you have already built, and it points
            you at the page to open first.
          </p>
          <Link
            href="/docs/00-start-here/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-primary hover:gap-2 transition-all"
          >
            Open Start here <span>→</span>
          </Link>
        </div>

        {/* Step 2 */}
        <div className="group relative pl-8 border-l-2 border-rule hover:border-accent-primary transition-colors">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-accent-secondary group-hover:scale-125 transition-transform" />
          <span className="mono text-[10px] uppercase tracking-widest text-accent-secondary font-semibold mb-2 block">
            Step 2
          </span>
          <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-accent-secondary transition-colors">
            Pick a track
          </h3>
          <p className="text-graphite mb-3">
            G1 through G4, beginner to expert. Each finishes where the next one
            assumes you are.
          </p>
          <Link
            href="/tracks/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-secondary hover:gap-2 transition-all"
          >
            Browse tracks <span>→</span>
          </Link>
        </div>

        {/* Step 3 */}
        <div className="group relative pl-8 border-l-2 border-rule hover:border-accent-primary transition-colors">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-accent-vibrant group-hover:scale-125 transition-transform" />
          <span className="mono text-[10px] uppercase tracking-widest text-accent-vibrant font-semibold mb-2 block">
            Step 3
          </span>
          <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-accent-vibrant transition-colors">
            Install the core package
          </h3>
          <p className="text-graphite mb-3">
            Get the foundation package that powers all Graph Engineering projects.
          </p>
          <div className="bg-surface-soft border border-rule rounded-lg p-4 hover:border-accent-primary transition-colors group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-primary to-accent-vibrant opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between gap-3 relative z-10">
              <code className="mono text-sm text-ink flex-1 break-all font-mono">
                <span className="text-muted">$</span> {INSTALL}
              </code>
              <CopyButton text={INSTALL} />
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="group relative pl-8 border-l-2 border-rule hover:border-accent-primary transition-colors">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-accent-vibrant group-hover:scale-125 transition-transform" />
          <span className="mono text-[10px] uppercase tracking-widest text-accent-vibrant font-semibold mb-2 block">
            Step 4
          </span>
          <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-accent-vibrant transition-colors">
            Clone a starter kit
          </h3>
          <p className="text-graphite mb-3">
            One command, no API keys, no build. Run this in your terminal:
          </p>
          <div className="bg-surface-soft border border-rule rounded-lg p-4 hover:border-accent-primary transition-colors group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-primary to-accent-vibrant opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between gap-3 relative z-10">
              <code className="mono text-sm text-ink flex-1 break-all font-mono">
                <span className="text-muted">$</span> {CLONE}
              </code>
              <CopyButton text={CLONE} />
            </div>
          </div>
          <Link
            href="/patterns/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-vibrant hover:gap-2 transition-all"
          >
            View all starter kits <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
