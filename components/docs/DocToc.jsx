"use client";
import { useEffect, useState } from "react";

export function DocToc({ headings }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (headings.length < 2) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el) => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0)
          setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-4 lg:block lg:self-start"
    >
      <p className="mono mb-2 text-[11px] uppercase tracking-wider text-muted">
        On this page
      </p>
      <ul>
        {headings.map((heading) => {
          const current = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={current ? "true" : undefined}
                className={`block border-l py-1 text-xs transition-colors ${
                  heading.depth === 3 ? "pl-6" : "pl-3"
                } ${
                  current
                    ? "border-accent-primary text-accent-primary"
                    : "border-rule-strong text-graphite hover:border-accent-primary hover:text-ink"
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
