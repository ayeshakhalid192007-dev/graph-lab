"use client";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown.ts";

/**
 * The on-this-page list, with the heading currently in view marked.
 *
 * The highlight tracks scroll position, so it is not motion and stays on under
 * prefers-reduced-motion — what is suppressed is animating the change, which is
 * why the marker is a colour and a border rather than a transition.
 *
 * A page with fewer than two headings gets no TOC; a list of one is furniture.
 */
export function DocToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length < 2) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // Bias the band to the top of the viewport so the marked heading is the one
      // being read, not whichever happens to be lowest on screen.
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="hidden lg:sticky lg:top-4 lg:block lg:self-start">
      <p className="mono mb-2 text-[11px] uppercase tracking-wider text-muted">On this page</p>
      <ul>
        {headings.map((heading) => {
          const current = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={current ? "true" : undefined}
                className={`block border-l py-1 text-xs ${heading.depth === 3 ? "pl-6" : "pl-3"} ${
                  current
                    ? "border-accent text-accent"
                    : "border-rule text-graphite hover:border-accent hover:text-ink"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
