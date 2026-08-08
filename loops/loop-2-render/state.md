# Loop 2 state — Render Layer and the 86 Doc Pages

**Tasks:** 5–9 · **Gate:** `npm run verify:2` · **Status:** gate green, awaiting review — Tasks 5–9 all done

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

### Task 6 — `lib/links.ts`

**Date:** 2026-08-07
**Landed:** The resolver Task 7's rehype plugin calls on every link in every doc page. Course markdown links each other the GitHub way — relative, `.md`-suffixed — and those now become site routes.
**Files:** created `lib/links.ts`.
**Produces:**
```ts
resolveContentLink(href: string, fromRepoPath: string): { href: string; external: boolean } | null
```
Returns `null` when a link resolves to no known page. Task 9's `check-links.mjs` must treat `null` as a failure, not as "skip".

Route mapping, as shipped:

| Link resolves to | Result |
| --- | --- |
| `http(s):` / `mailto:` / `tel:` | unchanged, `external: true` |
| `#anchor`, or an already-absolute `/route` | unchanged, `external: false` |
| a `docs/**.md` file that owns a route | that doc's route + hash |
| a directory holding `README.md` | that README's route |
| `patterns/<slug>.md`, `starters/<slug>[/…]` | `/patterns/<slug>/` — **slug validated against `content/`** |
| `patterns/`, `patterns/README.md`, `starters/`, `starters/README.md` | `/patterns/` (the catalogue is the pattern browser) |
| `resources/README.md`, `resources/sources.md`, `resources/` | `/resources/` + hash |
| a non-`.md` file under `docs/<part>/labs/` | GitHub blob URL at the pinned commit, `external: true` |
| anything else | `null` |

**Verified by:** the plan's Step 2 probe over every link in all 86 docs — **272 links, 0 unresolved**. Negative cases checked by hand: `../../patterns/no-such-pattern.md`, `../../starters/no-such-kit` and `labs/no-such-lab.md` all return `null`, while `../../patterns/anchor-and-freeze.md` → `/patterns/anchor-and-freeze/` and `../../starters/audit-loop/README.md` → `/patterns/audit-loop/`. `npm run typecheck` exit 0; `npm run sync:check` OK against `af5321e3`.
**Next loop needs to know:**
- **Two bugs in the plan's Task 6 code were found and fixed** — both invisible without Step 2, which is why the step exists. See D6 in `../shared/state.md`; the first one is the reason the probe printed 12 `DEAD` lines before it printed 0.
- **`resolveContentLink` emits `/patterns/…` and `/resources/…` routes that do not exist until Loop 3.** Real content links reach them: `docs/README.md` alone links to `patterns/README.md`, `starters/README.md` and `resources/sources.md`. Task 9's `check-links.mjs` will flag these at the Loop 2 gate, alongside the six `NavBar` links Loop 1 already recorded. **This is expected — do not "fix" it by weakening the resolver.** Decide at Task 9 whether the check allowlists the Loop 3/4 routes or the gate accepts a known list of not-yet-built routes.
- **The known-slug sets are cached at module level**, like `getAllDocs()`. Same caveat, same non-issue for a static build.

### Task 7 — `lib/markdown.ts`, `CodeBlock`, `GraphDiagram`

**Date:** 2026-08-08
**Landed:** The render pipeline. Plain course markdown now becomes React elements with build-time syntax highlighting in both themes, client-rendered mermaid diagrams, rewritten links, and a collected TOC. Tasks 8, 11, 13 and 14 all go through this one function.
**Files:** created `lib/markdown.ts`, `components/content/CodeBlock.tsx`, `components/content/GraphDiagram.tsx`, `components/ui/CopyButton.tsx`. Modified `app/globals.css`.
**Produces:**
```ts
// lib/markdown.ts
type Heading = { depth: 2 | 3; id: string; text: string }
renderMarkdown(body: string, repoPath: string): Promise<{ content: ReactElement; headings: Heading[] }>
toHast(body: string, repoPath: string): Promise<{ tree: Root; headings: Heading[] }>   // added, see below

// components
GraphDiagram({ chart: string })                                    // "use client"
CodeBlock({ lang?: string; raw?: string; children?: ReactNode })    // server
CopyButton({ text: string })                                       // "use client"
```
**Verified by:** the pipeline run over **all 86 pages, 0 failures** — not just the one page the plan names. Totals came out exactly as the task table predicts: **20 `graph-diagram`**, **64 `code-block`** (41 markdown, 15 json, 3 yaml, 3 text, 2 jsonl), 41 `<details>` surviving `rehypeRaw`, 501 headings collected, 272 anchors of which 265 rewrote to site routes and 7 became external GitHub links. Then the React half was verified end-to-end through a real `next build` against a temporary probe route rendering `docs/advanced/multi-graph-federation.md`: the emitted HTML held 15 headings, 4 `pre.shiki` frames with correct language labels, 193 `--shiki-dark` custom properties, 4 copy buttons with `aria-label="Copy code"`, the mermaid source fallback, an intact `<details>`/`<summary>`/`<table>`, and **zero** unmapped `<graph-diagram>`/`<code-block>` elements leaking through. Probe route deleted, clean rebuild green. `npm run typecheck` exit 0.
**Next loop needs to know:**
- **Call `renderMarkdown`, not `toHast`, from a page.** `toHast` stops at hast and does no React mapping. It exists because bare Node cannot import `.tsx`; see D7.
- **`toHast` is the hook Loop 4 Task 15 wants.** `scripts/build-search-index.mjs` runs under plain Node and needs markdown reduced to text — that is exactly what `toHast` gives, with links and headings already resolved, and without dragging React into a build script.
- **The hardest page in the content is `docs/advanced/multi-graph-federation.md`**, not the `docs/02-foundations/the-two-graphs.md` the plan's Step 4 names. The plan's page has 2 headings and zero diagrams, code blocks, tables and links — it would have passed while proving almost nothing. Ranked by feature density, use the federation page for any future pipeline change.
- **Mermaid diagrams are absent from the prerendered HTML by design** — they render client-side and the `<pre>` source is what ships in `out/`. Loop 5's Definition of Done line "all 20 mermaid diagrams render as SVG in both themes" must be checked **in a browser**, not by grepping `out/`.
- **Every fence in the content carries a language.** 84 opening fences, 84 labelled. `defaultLanguage`/`fallbackLanguage` are set to `text` anyway so a future unlabelled or unknown fence degrades instead of failing the build.

### Task 8 — The doc route and its chrome

**Date:** 2026-08-08
**Landed:** All 86 doc pages, rendered. The site now has the thing it exists for: the whole course readable in a browser, with contents, breadcrumbs, an on-this-page list, and prev/next.
**Files:** created `app/docs/[...slug]/page.tsx`, `app/docs/page.tsx`, `components/docs/DocSidebar.tsx`, `components/docs/DocToc.tsx`, `components/docs/DocBreadcrumbs.tsx`, `components/docs/DocFooterNav.tsx`. Modified `app/globals.css` (`.prose-blueprint`).
**Produces:**
```tsx
DocSidebar({ activeRoute: string })                        // server, no JS
DocToc({ headings: Heading[] })                            // "use client"
DocBreadcrumbs({ doc: DocMeta })                           // server
DocFooterNav({ prev, next }: ReturnType<typeof getPrevNext>) // server
```
Plus the `.prose-blueprint` class, which is the entire typography layer for course content — no typography plugin, by instruction.
**Verified by:** `npm run build` emitting **86 `index.html` under `out/docs`** and 89 routes overall. Mermaid pages: **20**, and set-compared against the source, the 20 emitted routes are *exactly* the 20 `.md` files containing a ```` ```mermaid ```` fence — no drift in either direction. Chrome coverage across the 86: sidebar nav on 86, prev/next on 86, breadcrumbs on 85 (the `/docs/` index does not render them, per the plan's Step 5), a TOC on 66 (the other 20 have fewer than two headings and correctly render nothing), Shiki-highlighted code on 34. `tsc --noEmit` and `eslint` both clean. Page weight with the sidebar rendered twice: 144 KB of HTML, **16 KB gzipped**.
**Next loop needs to know:**
- **The plan's Step 6 count command over-reports.** `grep -rl 'graph-diagram\|mermaid' out/docs` returns **80**, not 20, because `grep -r` also reads the `.txt` RSC payload sidecars Next writes beside every `index.html`. Add `--include=index.html` and it returns 20. Any later loop counting things in `out/` should restrict to `index.html` or it will be counting each page twice over.
- **`DocSidebar` renders the tree twice**, once for below 768px and once above. This is deliberate — CSS can close a `<details>` but cannot force one open, so one element would either bury the sidebar on desktop or push 86 links above the article on a phone. It is the same shape `NavBar` already uses. Consequence for Loop 5's a11y pass: every doc page contains **two** `nav[aria-label="Course contents"]` and **three** `aria-current` marks (two sidebars plus the breadcrumb); only one of each is in the accessibility tree at any width, since the other is `display: none`.
- **`.prose-blueprint` styles inline code with `:not(pre) > code`.** A bare `code` rule would have put a border and background on every line of every Shiki block. Keep the `:not()` if this block is extended.
- **Loop 3 and Loop 4 should reuse `.prose-blueprint`** for pattern specs, project briefs and resources — they render the same course markdown through the same pipeline, and a second prose class would drift from this one.

### Task 9 — `scripts/check-links.mjs`

**Date:** 2026-08-08
**Landed:** The link check, and with it the Loop 2 gate. Every internal `href`/`src` in the emitted export is now proven to reach a real file on every build, and the routes that are *deliberately* missing are named in one list with an owning task each, rather than being silently tolerated.
**Files:** created `scripts/check-links.mjs`. (`package.json` already carried `"check:links"` and `verify:2` from Loop 1 Task 1.)
**Produces:** exit 0 with `check:links OK — <n> internal links across <m> pages all resolve`, or exit 1 naming the broken links. Wired into `verify:2`, `verify:3`, `verify:4` and `verify:all`.

**Verified by:** `npm run verify:2`, exit 0, end to end:

```
sync:check OK — content/ matches af5321e3
check:content-shape OK — 7 quizzes, 6 flashcard sets parse as expected
tsc --noEmit                       (silent)
next build   ✓ Generating static pages using 6 workers (89/89) in 19.1s
check:links OK — 17534 internal links across 90 pages all resolve
925 links point at 13 routes not built yet
```

Against `gate.md`'s "what green must actually mean": **86** `index.html` under `out/docs` plus the `/docs/` index (89 routes, 90 HTML files counting `/_not-found`); **0** unresolved internal links; `sync:check` **0 files** differing; **7/7** quizzes and **6/6** flashcard sets; `tsc` silent.

**The check was observed going red**, per `../shared/verification.md` — a green light that cannot go red is not verification:

| Probe | Result |
| --- | --- |
| `out/__probe/index.html` holding `<a href="/docs/no-such-page/">` | `check:links FAILED — 1 of 17535 internal links do not resolve`, exit 1, naming `/__probe/index.html -> /docs/no-such-page/` |
| `["/docs/", "PROBE"]` added to `PENDING_ROUTES` (a route that *does* exist) | `check:links FAILED — 1 PENDING_ROUTES entries are now built and must be deleted`, exit 1 |
| both reverted | `check:links OK — 17534 …`, exit 0 |

**Also verified under `basePath`:** rebuilt with `PAGES_BASE_PATH=/graph-lab NEXT_PUBLIC_BASE_PATH=/graph-lab` and re-ran with `PAGES_BASE_PATH=/graph-lab` — **17534 links, 90 pages, same 925 pending**, byte-identical counts to the root build. The prefix-stripping path works, so D9's two-variable arrangement holds against the checker as well as against the browser.

**Spot-check, Step 3 — four pages looked at in a browser, both themes:**

| Page | Observed |
| --- | --- |
| `/docs/00-start-here/` | 17 sidebar sections, `START HERE` auto-expanded with *Start Here* marked current; breadcrumb `graph-lab / Start Here`; 3-item ToC; footer *← Previous: Graph Engineering Course — Docs* / *Next → Environment Setup*. Scrolling to §3 moved the ToC highlight to item 3 — the ToC tracks. |
| `/docs/02-foundations/the-two-graphs/` | Renders, breadcrumb `graph-lab / Foundations / The Two Graphs`, prev *Foundations* / next *Part 1 Flashcards*. **Has no mermaid diagram** — the plan's Step 3 says it does. Task 7 already recorded this; it is 2 headings and nothing else. |
| `/docs/advanced/multi-graph-federation/` | The mermaid page used instead. One `svg.flowchart`, **7 nodes**, 621×191, inside the `<figure>` — rendered client-side in **dark** (cyan edges, slate fills, light labels) and re-rendered legibly in **light** (ink-blue edges on paper white) after toggling. 4 `pre.shiki` blocks, all `shiki-themes github-light github-dark-dimmed`, 49 styled spans in the first, each with a language label and a `COPY` button carrying `aria-label="Copy code"`. |
| `/docs/09-part-7-staying-grounded/quiz/` | 2 questions, 2 `<details>`; clicking *Reveal the answer* expands the answer prose. **3 `aria-current` marks** — the two sidebars plus the breadcrumb, exactly as Task 8 predicted. Clicking *Next →* navigated to `/docs/09-part-7-staying-grounded/`, title and `<h1>` both *Part 7 — Staying Grounded*. |

**Next loop needs to know:**
- **`PENDING_ROUTES` in `check-links.mjs` is the list Loop 3 empties.** Seven hand-written entries plus one per pattern/starter slug derived from `content/`. **Delete each line in the task named beside it** — `/tracks/` in Task 10, `/patterns/` and the per-slug loop in Task 11, `/quizzes/` and `/flashcards/` in Task 12, `/projects/` and `/resources/` in Task 13, `/certification/` in Task 14. Leaving a line in after building the route **fails the check**, deliberately: an exemption list that can only shrink cannot rot into a way to hide real breakage. The list must be empty before Loop 5 Task 21.
- **`/quizzes/` and `/flashcards/` currently take 0 links.** Nothing points at them yet — `NavBar` links the other five. They are listed so Loop 3 Task 12 has a line to delete, not because anything is broken.
- **17,534 links is mostly sidebar.** `DocSidebar` renders 86 links twice per page (Task 8's deliberate dual render) across 90 pages, so the count is dominated by chrome. A future change to the sidebar will move this number by thousands; that is not a regression.
- **The checker only strips the prefix it is told about.** `check-links.mjs` reads `PAGES_BASE_PATH`; run it against a basePath build without that variable set and *every* link fails at once. Loud, but the cause is the environment, not the site — the Task 22 workflow must set the variable for the check as well as for the build.

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
