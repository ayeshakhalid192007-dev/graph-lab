import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";
import { StepCard } from "@/components/ui/StepCard";

const CLONE = "npx @graph-engineering-kits/graph-kit document-to-facts";
const INSTALL = "npm install @graph-engineering/core";

/**
 * Getting started guide with numbered step cards
 */
export function GetStarted() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-ink mb-12">Get Started</h2>

      <div className="space-y-4">
        <StepCard
          number={1}
          title="Read Start here"
          description="Two or three questions about what you have already built, and it points you at the page to open first."
        >
          <Link
            href="/docs/00-start-here/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-secondary transition-colors"
          >
            Open Start here <span className="text-xs">→</span>
          </Link>
        </StepCard>

        <StepCard
          number={2}
          title="Pick a track"
          description="G1 through G4, beginner to expert. Each finishes where the next one assumes you are."
        >
          <Link
            href="/tracks/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-secondary transition-colors"
          >
            Browse tracks <span className="text-xs">→</span>
          </Link>
        </StepCard>

        <StepCard
          number={3}
          title="Install the core package"
          description="Get the foundation package that powers all Graph Engineering projects."
        >
          <div className="bg-surface-soft border border-card-border rounded-lg p-4 hover:border-accent-primary transition-colors">
            <div className="flex items-center justify-between gap-3">
              <code className="mono text-sm text-ink flex-1 break-all">
                <span className="text-muted">$</span> {INSTALL}
              </code>
              <CopyButton text={INSTALL} />
            </div>
          </div>
        </StepCard>

        <StepCard
          number={4}
          title="Clone a starter kit"
          description="One command, no API keys, no build. Run this in your terminal:"
        >
          <div className="space-y-4">
            <div className="bg-surface-soft border border-card-border rounded-lg p-4 hover:border-accent-primary transition-colors">
              <div className="flex items-center justify-between gap-3">
                <code className="mono text-sm text-ink flex-1 break-all">
                  <span className="text-muted">$</span> {CLONE}
                </code>
                <CopyButton text={CLONE} />
              </div>
            </div>
            <Link
              href="/patterns/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-secondary transition-colors"
            >
              View all starter kits <span className="text-xs">→</span>
            </Link>
          </div>
        </StepCard>
      </div>
    </div>
  );
}
