import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="max-w-2xl py-24">
      <div className="text-center">
        <p className="mono text-7xl font-bold text-accent-primary mb-4">404</p>
        <h1 className="mono mt-4 text-2xl text-ink">No page at that address.</h1>
        <p className="mt-4 text-graphite text-lg">
          The course moved a file, or the link was mistyped. Both are recoverable.
        </p>
        <ul className="mt-8 space-y-3">
          <li>
            <Link
              href="/"
              className="mono text-sm text-accent-primary hover:text-accent-secondary underline underline-offset-4 transition-colors"
            >
              The landing page
            </Link>
          </li>
          <li>
            <Link
              href="/docs/00-start-here/"
              className="mono text-sm text-accent-primary hover:text-accent-secondary underline underline-offset-4 transition-colors"
            >
              Start here — the course router
            </Link>
          </li>
        </ul>
        <p className="mono mt-8 text-xs text-muted">
          Or press <kbd className="border border-rule-strong px-1.5 py-0.5 rounded-lg glass">⌘K</kbd> to search all 86 pages.
        </p>
      </div>
    </Section>
  );
}
