# Goal

**Every loop reads this file before it starts. This is the only definition of "done" in the project. No loop invents its own.**

---

## The one sentence

Ship `graph-lab` — a fully static website where a reader can work through the entire Graph Engineering course in a browser, rendering content that is authored nowhere but the course repo.

---

## The constraint that shapes everything

**The markdown in the course repo's `docs/` is the only place course content is authored.** This site renders that content; it never restates it. If a page reads wrong on the site, the fix belongs in `docs/`, not here.

`content/` in this repo is a *build artifact* — copied in byte-for-byte by `scripts/sync-docs.mjs`, pinned to a commit in `content/SOURCE.json`, and proven un-hand-edited by CI on every push. It is not a second copy anyone authors against.

---

## What ships

A reader arriving at the site can:

| | Surface |
| --- | --- |
| Read | All **86 doc pages**, with sidebar, table of contents, breadcrumbs, and working prev/next |
| Follow | The **17-step roadmap** and the **four skill tracks** (G1–G4) |
| Browse | **23 pattern specs**, filterable, each with its **starter kit's real files** viewable (24 kits) |
| Practice | **7 interactive quizzes** and **6 flashcard sets** (Part 6 is quiz-only by design) |
| Build | **8 practice projects** |
| Cite | **10 attributed sources** plus the anti-patterns summary |
| Find | **Site search** across titles, headings, and body — no external service |
| Certify | The **Graph Ready** checklist, unlocking a downloadable certificate |

Every route prerenders. Every stateful feature is `localStorage` on the reader's own machine.

---

## Definition of Done

Taken verbatim from the spec. Loop 5 Task 21 walks this list line by line and records, for each bullet, **the actual count or the actual observed behaviour** — not the word "done".

- [ ] Every one of the 86 doc pages renders, reachable from the sidebar, with working prev/next.
- [ ] All 20 mermaid diagrams render as SVG in both themes; every fenced code block is syntax highlighted; every internal link resolves.
- [ ] Search returns correct results for a term drawn from a body paragraph, a heading, and a page title.
- [ ] All seven quizzes and six flashcard sets are playable.
- [ ] The pattern browser filters correctly and every starter kit's files are viewable.
- [ ] The Graph Ready checklist unlocks and downloads a certificate.
- [ ] Layout holds at 375, 768, and 1280 pixels; the sidebar collapses below 768.
- [ ] Every interactive element has a visible focus state and an accessible name; a Lighthouse accessibility pass reports no critical issues.
- [ ] Both themes are checked on every page type, including mermaid diagram legibility.
- [ ] `sync:check`, `check-content-shape`, `check-links`, `next build`, and `tsc --noEmit` all pass.

---

## Non-goals

Naming these keeps loops from drifting into them.

- **No backend, database, accounts, authentication, analytics, or comments.** The site is a static export that could be served from any file host.
- **No course content authored here** — one exception, the landing page's own hero and section copy, which is site chrome and must be independently worded from both `README.md` and `docs/README.md`.
- **No MDX.** Course markdown stays plain.
- **`CodeTabs`, `Callout`, `CheckYourself` are not built.** Zero content exercises them; their degraded fallbacks are correct output.
- **The three animated diagrams are landing-page only.** Putting them in doc pages would require a marker convention inside `docs/` — a course-content change, out of scope.

---

## Where it lands

`https://ayeshakhalid192007-dev.github.io/graph-lab/`

GitHub Pages, project site, `basePath` `/graph-lab` supplied through `PAGES_BASE_PATH`. Creating the repo, pushing site code, and enabling Pages all require explicit confirmation at Loop 5 Task 22.

---

## How a loop uses this file

1. Read it at loop start.
2. Ask of your loop's scope: *which lines of the Definition of Done does my loop move toward?* Your `gate.md` names them.
3. Never expand scope to chase a DoD line owned by a later loop. Record the observation in `shared/state.md` and move on.
4. A DoD line is only ticked in Loop 5 Task 21, against the running site, with evidence.
