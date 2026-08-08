import Link from "next/link";
import type { getPrevNext } from "@/lib/docs.ts";

/**
 * Previous and next in the flat reading order, at the foot of every doc page.
 *
 * Each side renders only when it exists, so the first and last pages of the
 * course get one block rather than an empty half. The "next" block keeps its
 * right-hand position either way, which is why the grid is declared with two
 * columns and the missing side is simply absent.
 */
export function DocFooterNav({ prev, next }: ReturnType<typeof getPrevNext>) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Course pagination" className="mt-12 grid gap-4 border-t border-rule pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.route}
          className="tick relative border border-rule bg-surface p-4 hover:border-accent"
        >
          <span className="mono block text-[11px] uppercase tracking-wider text-muted">
            ← Previous
          </span>
          <span className="mt-1 block text-sm text-ink">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={next.route}
          className="tick relative border border-rule bg-surface p-4 text-right hover:border-accent"
        >
          <span className="mono block text-[11px] uppercase tracking-wider text-muted">
            Next →
          </span>
          <span className="mt-1 block text-sm text-ink">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
