import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="max-w-2xl">
      <p className="mono text-6xl text-accent">404</p>
      <h1 className="mono mt-4 text-2xl text-ink">No page at that address.</h1>
      <p className="mt-3 text-graphite">
        The course moved a file, or the link was mistyped. Both are recoverable.
      </p>
      <ul className="mt-8 space-y-2">
        <li>
          <Link href="/" className="mono text-sm text-accent underline underline-offset-2">
            The landing page
          </Link>
        </li>
        <li>
          <Link href="/docs/00-start-here/" className="mono text-sm text-accent underline underline-offset-2">
            Start here — the course router
          </Link>
        </li>
      </ul>
      <p className="mono mt-8 text-xs text-muted">
        Or press <kbd className="border border-rule px-1">⌘K</kbd> to search all 86 pages.
      </p>
    </Section>
  );
}
