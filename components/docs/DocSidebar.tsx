import Link from "next/link";
import { getSidebarTree } from "@/lib/docs.ts";

/**
 * The course contents, every page of it, on every doc page.
 *
 * A server component built from native <details> disclosures, so it costs no
 * JavaScript and works with scripting off.
 *
 * The tree is rendered twice — once collapsed behind a "Contents" disclosure
 * below 768px, once expanded above it — which is the same shape NavBar uses for
 * the same reason. One <details> cannot serve both: CSS can close a disclosure
 * but cannot force one open, so a single element would either bury the sidebar
 * on desktop or push 86 links above the article on a phone. The duplicate markup
 * gzips down to nearly nothing, since it is the same bytes twice.
 */
function SidebarNav({ activeRoute, idPrefix }: { activeRoute: string; idPrefix: string }) {
  return (
    <nav aria-label="Course contents">
      {getSidebarTree().map((group) => {
        const active = group.docs.some((doc) => doc.route === activeRoute);
        return (
          <details
            key={`${idPrefix}-${group.section || "overview"}`}
            open={active}
            className="border-b border-rule/60 last:border-b-0"
          >
            <summary className="mono cursor-pointer py-2 text-[11px] uppercase tracking-wider text-muted marker:text-rule hover:text-accent">
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
                      className={`block border-l py-1 pl-3 text-xs ${
                        current
                          ? "border-accent font-medium text-accent"
                          : "border-rule text-graphite hover:border-accent hover:text-ink"
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

export function DocSidebar({ activeRoute }: { activeRoute: string }) {
  return (
    <>
      {/* Below 768px: one closed disclosure, so the article stays at the top. */}
      <details className="border-b border-rule pb-2 md:hidden">
        <summary className="mono cursor-pointer py-2 text-xs uppercase tracking-wider text-graphite marker:text-rule">
          Contents
        </summary>
        <SidebarNav activeRoute={activeRoute} idPrefix="m" />
      </details>

      {/* 768px and up: a column of its own, sticky from 1024px. */}
      <div className="hidden md:block lg:sticky lg:top-4 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
        <SidebarNav activeRoute={activeRoute} idPrefix="d" />
      </div>
    </>
  );
}
