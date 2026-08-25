import Link from "next/link";
import { getSidebarTree } from "@/lib/docs.js";

function SidebarNav({ activeRoute, idPrefix }) {
  return (
    <nav aria-label="Course contents">
      {getSidebarTree().map((group) => {
        const active = group.docs.some(
          (doc) => doc.route === activeRoute
        );
        return (
          <details
            key={`${idPrefix}-${group.section || "overview"}`}
            open={active}
            className="border-b border-rule-strong/60 last:border-b-0"
          >
            <summary className="mono cursor-pointer py-2 text-[11px] uppercase tracking-wider text-muted marker:text-rule-strong hover:text-accent-primary transition-colors">
              {group.label}
            </summary>
            <ul className="mb-2">
              {group.docs.map((doc) => {
                const current = doc.route === activeRoute;
                return (
                  <li key={doc.route}>
                    <Link
                      href={doc.route}
                      aria-current={current ? "page" : undefined}
                      className={`block border-l py-1 pl-3 text-xs transition-colors ${
                        current
                          ? "border-accent-primary font-medium text-accent-primary"
                          : "border-rule-strong text-graphite hover:border-accent-primary hover:text-ink"
                      }`}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}

export function DocSidebar({ activeRoute }) {
  return (
    <>
      <details className="border-b border-rule-strong pb-2 md:hidden">
        <summary className="mono cursor-pointer py-2 text-xs uppercase tracking-wider text-graphite marker:text-rule-strong">
          Contents
        </summary>
        <SidebarNav activeRoute={activeRoute} idPrefix="m" />
      </details>

      <div className="hidden md:block lg:sticky lg:top-4 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
        <SidebarNav activeRoute={activeRoute} idPrefix="d" />
      </div>
    </>
  );
}
