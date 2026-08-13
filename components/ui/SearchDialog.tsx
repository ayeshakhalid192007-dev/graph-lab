"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/base-path.ts";
import { groupBySection, search, type SearchIndex } from "@/lib/search.ts";

/**
 * Site search. No external service, no third-party script — the whole matcher is
 * lib/search.ts and the whole corpus is one JSON file this repo generates.
 *
 * The index is fetched on first open or first keystroke and never on page load;
 * that is the entire point of the design, so a reader who never searches pays
 * nothing for it. A real <dialog> with showModal() gives focus trapping, the
 * backdrop, and Esc from the platform rather than from hand-rolled key handling.
 */
export function SearchDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "error">("idle");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const load = useCallback(() => {
    // One fetch per page load, guarded by the state machine rather than a ref so
    // a failed attempt can be retried by typing again.
    setLoadState((prev) => {
      if (prev === "loading") return prev;
      fetch(withBasePath("/search-index.json"))
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json() as Promise<SearchIndex>;
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
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
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
    [index, query],
  );
  const groups = useMemo(() => groupBySection(hits), [hits]);
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);

  function go(route: string) {
    dialogRef.current?.close();
    setQuery("");
    router.push(route);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
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
      // <input type="search"> eats the first Escape to clear itself, so the
      // platform's own "Escape closes a modal dialog" never fires while the
      // reader has typed anything — which is every real use. Close it here and
      // suppress the clear, so one press always means one dismissal.
      event.preventDefault();
      dialogRef.current?.close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="mono flex items-center gap-2 border border-rule px-2 py-1 text-xs text-graphite hover:border-accent"
      >
        Search
        <kbd className="mono border border-rule px-1 text-[10px] text-muted">⌘K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the course"
        onClose={() => {
          setQuery("");
          setActive(0);
        }}
        className="mt-[10vh] w-[min(40rem,92vw)] border border-rule bg-surface p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="border-b border-rule p-3">
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

        <p className="mono border-b border-rule px-3 py-1 text-[11px] text-muted" aria-live="polite">
          {loadState === "loading" && !index
            ? "Loading the index…"
            : loadState === "error"
              ? "The search index could not be loaded."
              : query.trim()
                ? `${flat.length} ${flat.length === 1 ? "result" : "results"}`
                : "Type to search titles, headings, and body text."}
        </p>

        <div id="search-results" role="listbox" aria-label="Search results" className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() && index && flat.length === 0 && (
            <p className="p-3 text-sm text-graphite">
              Nothing matches <span className="mono text-ink">{query}</span>.
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
                    className={`block w-full px-2 py-2 text-left ${
                      i === active ? "bg-paper" : ""
                    }`}
                  >
                    <span className="mono block text-sm text-ink">{hit.record.title}</span>
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
