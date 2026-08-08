import Link from "next/link";
import { getSidebarTree, type DocMeta } from "@/lib/docs.ts";

/**
 * graph-lab / <section> / <title>, in mono.
 *
 * The section links to its own index route only when that route exists — a
 * section owns one when the directory has a README.md. Where it does not, the
 * label is plain text rather than a link to a 404.
 */
export function DocBreadcrumbs({ doc }: { doc: DocMeta }) {
  const group = getSidebarTree().find((g) => g.section === doc.section);
  const sectionIndex = doc.section ? `/docs/${doc.section}/` : "/docs/";
  const sectionHasIndex = group?.docs.some((d) => d.route === sectionIndex) ?? false;
  const isIndex = doc.route === sectionIndex;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="mono flex flex-wrap items-center gap-x-2 text-[11px] text-muted">
        <li>
          <Link href="/docs/" className="hover:text-accent">
            graph-lab
          </Link>
        </li>
        {group && !isIndex ? (
          <li className="flex items-center gap-x-2">
            <span aria-hidden="true" className="text-rule">
              /
            </span>
            {sectionHasIndex ? (
              <Link href={sectionIndex} className="hover:text-accent">
                {group.label}
              </Link>
            ) : (
              <span>{group.label}</span>
            )}
          </li>
        ) : null}
        <li className="flex items-center gap-x-2">
          <span aria-hidden="true" className="text-rule">
            /
          </span>
          <span aria-current="page" className="text-graphite">
            {doc.title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
