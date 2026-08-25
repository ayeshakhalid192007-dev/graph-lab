import Link from "next/link";
import { getSidebarTree } from "@/lib/docs.js";

export function DocBreadcrumbs({ doc }) {
  const group = getSidebarTree().find(
    (g) => g.section === doc.section
  );
  const sectionIndex = doc.section
    ? `/docs/${doc.section}/`
    : "/docs/";
  const sectionHasIndex =
    group?.docs.some((d) => d.route === sectionIndex) ?? false;
  const isIndex = doc.route === sectionIndex;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="mono flex flex-wrap items-center gap-x-2 text-[11px] text-muted">
        <li>
          <Link
            href="/docs/"
            className="hover:text-accent-primary transition-colors"
          >
            graph-lab
          </Link>
        </li>
        {group && !isIndex ? (
          <li className="flex items-center gap-x-2">
            <span aria-hidden="true" className="text-rule-strong">
              /
            </span>
            {sectionHasIndex ? (
              <Link
                href={sectionIndex}
                className="hover:text-accent-primary transition-colors"
              >
                {group.label}
              </Link>
            ) : (
              <span>{group.label}</span>
            )}
          </li>
        ) : null}
        <li className="flex items-center gap-x-2">
          <span aria-hidden="true" className="text-rule-strong">
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
