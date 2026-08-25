import Link from "next/link";

export function DocFooterNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Course pagination"
      className="mt-12 grid gap-4 border-t border-rule-strong pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.route}
          className="glass-card hover:border-accent-primary/30 transition-all"
        >
          <span className="mono block text-[11px] uppercase tracking-wider text-muted">
            ← Previous
          </span>
          <span className="mt-1 block text-sm text-ink">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={next.route}
          className="glass-card text-right hover:border-accent-primary/30 transition-all"
        >
          <span className="mono block text-[11px] uppercase tracking-wider text-muted">
            Next →
          </span>
          <span className="mt-1 block text-sm text-ink">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
