"use client";
import { useEffect, useRef } from "react";

/**
 * Adds `.in-view` to its wrapper the first time the subtree enters the viewport,
 * then disconnects. One observer implementation shared by all three diagrams.
 *
 * Under `prefers-reduced-motion: reduce` it adds the class immediately on mount and
 * never observes at all (C13). Reduced motion means the *finished* state, not the
 * absence of one — a reader who asks for no animation should still see the diagram
 * drawn, not an empty frame waiting for a scroll event that already happened.
 *
 * The class is set on the DOM node directly rather than through state: this is a
 * one-way visual latch driven by an external observer, and routing it through a
 * render would be the `set-state-in-effect` pattern Loop 2 repaired as R2.
 */
export function ScrollAnimator({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      node.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
