# Loop 2 state — Render Layer and the 86 Doc Pages

**Tasks:** 5–9 · **Gate:** `npm run verify:2` · **Status:** not started

Per-task log for this loop. Cross-loop material — gate entries, repairs to earlier loops, decisions binding later loops — goes in `../shared/state.md` instead.

---

## Task log

One entry per completed task, appended as it lands. Template from `../shared/handoff.md`:

```markdown
### Task <n> — <title>

**Date:** YYYY-MM-DD
**Landed:** what now exists that did not before.
**Files:** created / modified, as paths.
**Produces:** exported symbols and types later tasks import by name.
**Verified by:** the command run, and what it actually printed — a count, a
score, a page total. Not "green".
**Next loop needs to know:** anything non-obvious. Delete if nothing.
```

### Task 5 — `lib/content.ts` and `lib/docs.ts`

**Date:** 2026-08-07
**Landed:** The loaders every page in Loops 2–4 imports. `content/` is now addressable as typed data: 86 docs with routes, titles, sections and part numbers; a 17-section sidebar tree; the 7-part / 17-step roadmap; flat prev/next reading order.
**Files:** created `lib/content.ts`, `lib/docs.ts`. Modified `tsconfig.json` (`allowImportingTsExtensions`, see D5).
**Produces — shipped signatures, all exactly as the plan specifies:**
```ts
// lib/content.ts
contentRoot: string
readContent(relPath: string): string
listFiles(tree: string, ext?: string): string[]      // paths relative to content/
getSource(): Source                                   // { repo, commit, syncedAt, files }
firstHeading(body: string, fallback: string): string  // not in the plan's Produces list, but exported and used by docs.ts
type Source = { repo: string; commit: string; syncedAt: string; files: number }

// lib/docs.ts
type DocMeta = { slug: string[]; route: string; title: string; repoPath: string; section: string; part: number | null }
getAllDocs(): DocMeta[]
getDoc(slug: string[]): DocMeta & { body: string }
getSidebarTree(): { section: string; label: string; docs: DocMeta[] }[]
getRoadmap(): { part: number; dir: string; title: string; steps: DocMeta[] }[]
getPrevNext(slug: string[]): { prev: DocMeta | null; next: DocMeta | null }
```
**Verified by:** the plan's Step 3 probe — `docs: 86`, `parts: 7`, `steps: 17`, `untitled: 0`. Per-part step counts are `P1=3 P2=2 P3=3 P4=2 P5=3 P6=2 P7=2`, and `getSidebarTree()` yields 17 non-empty sections. `npm run typecheck` exit 0; `next build` "Compiled successfully in 4.2s".
**Next loop needs to know:**
- **The per-part step counts (3/2/3/2/3/2/2) are identical to the per-part quiz-question counts** Loop 1's `check-content-shape.mjs` asserts. Convenient, and probably not a coincidence in how the course was written — but they are two independent facts. Do not derive one from the other in Loop 3.
- **`getAllDocs()` memoises into a module-level `cache`.** Fine for a static build, where the process is short-lived and `content/` never changes mid-run. A later loop that mutates content at runtime would get a stale read; nothing does.
- **`firstHeading` is exported from `lib/content.ts`** though the plan's Produces block omits it. It is part of the shipped surface.

---

## Blockers

A blocker stops this loop. Record it here, then stop and report — do not invent an answer and do not work around it silently. Blocked ≠ done.

```markdown
### B<n> — <short title>, <date>

**Blocked at:** Task <n>, Step <n>.
**What is needed:** the specific input, decision, or clarification.
**What was tried:** so the user does not repeat it.
**Cannot proceed because:** why guessing would be wrong.
```

_None._

---

## Notes

Working observations that are not yet handoff material — counts seen, oddities noticed, things to confirm. Anything here that turns out to matter to a later loop gets promoted into a task entry's *Next loop needs to know*, or into `../shared/state.md`.

**Entry check:** confirm the Loop 1 row in `../shared/state.md` reads `approved` before Task 5 begins.
