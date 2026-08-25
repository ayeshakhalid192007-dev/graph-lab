"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/base-path.js";
import { groupBySection, search } from "@/lib/search.js";

export function SearchDialog() {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [index, setIndex] = useState(null);
  const [loadState, setLoadState] = useState("idle");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const load = useCallback(() => {
    setLoadState((prev) => {
      if (prev === "loading") return prev;
      fetch(withBasePath("/search-index.json"))
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then((data) => {
          setIndex(data);
          setLoadState("idle");
        })
        .catch(() => setLoadState("error"));
      return "loading";
    });
  }, []);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    load();
  }, [load]);

  useEffect(() => {
    function onKeyDown(event) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const hits = useMemo(
    () => (index && query.trim() ? search(index, query, 20) : []),
    [index, query]
  );
  const groups = useMemo(() => groupBySection(hits), [hits]);
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);

  function go(route) {
    dialogRef.current?.close();
    setQuery("");
    router.push(route);
  }

  function onInputKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && flat[active]) {
      event.preventDefault();
      go(flat[active].record.route);
    } else if (event.key === "Escape") {
      event.preventDefault();
      dialogRef.current?.close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 text-xs text-graphite hover:text-ink hover:border-accent-primary/30 transition-all"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <kbd className="mono border border-rule-strong px-1 text-[10px] text-muted rounded">
          ⌘K
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the course"
        onClose={() => {
          setQuery("");
          setActive(0);
        }}
        className="mt-[10vh] w-[min(40rem,92vw)] glass-strong rounded-2xl p-0 text-ink backdrop:bg-black/60"
      >
        <div className="border-b border-glass-border p-3">
          <label htmlFor="site-search" className="sr-only">
            Search the course
          </label>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="Search 86 pages…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              if (!index) load();
            }}
            onKeyDown={onInputKeyDown}
            className="mono w-full bg-transparent px-1 py-1 text-sm outline-none"
          />
        </div>

        <p
          className="mono border-b border-glass-border px-3 py-1 text-[11px] text-muted"
          aria-live="polite"
        >
          {loadState === "loading" && !index
            ? "Loading the index…"
            : loadState === "error"
            ? "The search index could not be loaded."
            : query.trim()
            ? `${flat.length} ${flat.length === 1 ? "result" : "results"}`
            : "Type to search titles, headings, and body text."}
        </p>

        <div
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {query.trim() && index && flat.length === 0 && (
            <p className="p-3 text-sm text-graphite">
              Nothing matches{" "}
              <span className="mono text-ink">{query}</span>.
            </p>
          )}
          {groups.map((group) => (
            <div key={group.section} className="mt-2 first:mt-0">
              <p className="mono px-2 py-1 text-[10px] uppercase tracking-wider text-muted">
                {group.section}
              </p>
              {group.hits.map((hit) => {
                const i = flat.indexOf(hit);
                return (
                  <button
                    key={hit.record.route}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onClick={() => go(hit.record.route)}
                    onMouseEnter={() => setActive(i)}
                    className={`block w-full px-2 py-2 text-left rounded-lg transition-colors ${
                      i === active ? "bg-surface-soft" : ""
                    }`}
                  >
                    <span className="mono block text-sm text-ink">
                      {hit.record.title}
                    </span>
                    {hit.record.excerpt && (
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {hit.record.excerpt}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
