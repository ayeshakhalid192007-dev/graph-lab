# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> navigation links work
- Location: tests/landing.spec.ts:10:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/docs\/00-start-here\/?$/
Received string:  "http://localhost:3000/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    12 × locator resolved to <html lang="en" class="light">…</html>
       - unexpected value "http://localhost:3000/"

```

```yaml
- link "Skip to content":
  - /url: "#main"
- banner:
  - link "Graph Engineering graph-lab":
    - /url: /
    - img "Graph Engineering"
    - text: graph-lab
  - navigation "Main":
    - link "docs":
      - /url: /docs/00-start-here/
    - link "tracks":
      - /url: /tracks/
    - link "patterns":
      - /url: /patterns/
    - link "projects":
      - /url: /projects/
    - link "resources":
      - /url: /resources/
    - link "certification":
      - /url: /certification/
  - text: Graph Engineering
  - button "DARK"
- main:
  - text: Graph Engineering
  - heading "Build resilient systems that scale across agents" [level=1]
  - paragraph: A modern approach to distributed systems. Graph Engineering replaces fragile files with resilient graphs — where attempts and truths coexist, enabling multiple workers to navigate complex data relationships with confidence.
  - link "Start Learning":
    - /url: /docs/00-start-here/
  - link "View Roadmap":
    - /url: /tracks/
  - text: 86+ Pages 23+ Patterns 24+ Starter Kits 17 Learning Steps Core Concept
  - heading "Work History vs. Facts" [level=2]
  - paragraph: Graph Engineering separates what was attempted from what turned out to be true, creating resilient systems that multiple agents can navigate safely.
  - img "Work history graph on left recording what was attempted, fact graph on right recording what turned out to be true": WORK HISTORY attempt 1 attempt 2 attempt 3 FACTS Service Owner Receipt What was attempted What turned out to be true
  - text: How It Works
  - heading "The Fact Lifecycle" [level=2]
  - paragraph: "Facts move through three stages: extraction, resolution, and provenance. Each stage adds value while preserving the trail of what came before."
  - 'img "Three-stage lifecycle: extraction, resolution, provenance"': THE LIFECYCLE OF A FACT extraction prose in, schema out resolution merge, keep the trail provenance every edge has a receipt Facts flow through these stages in order
  - heading "Ready to build?" [level=2]
  - paragraph: Start learning graph engineering in minutes with no setup required.
  - 'figure "A terminal running graph-engineering build: it initializes the dual-agent memory system, creating the attempt graph, truth graph, and reconciliation layers."': graph-lab build graph-engineering build initializing graph engineering environment — building memory systems src/graphs/ attempt.ts — records all attempted operations truth.ts — holds verified facts edges.ts — connects attempts to outcomes lib/ reconcile.ts — consensus layer traverse.ts — graph query engine Memory Ready ████████████ Dual-agent capable finalizing…
  - heading "Seventeen steps, seven parts" [level=2]
  - paragraph: "Steps 1–13 are the core path: they end with a fact graph you can query, hand to a worker in slices, and check answers against. Steps 14–17 are the second read — putting several loops under one set of rules, keeping a graph honest as it grows, and learning to spot the jobs that never needed one."
  - text: Part 1
  - heading "The memory problem" [level=3]
  - list:
    - listitem:
      - link "→ When a Single Memory File Stops Being Enough 3 steps":
        - /url: /docs/03-part-1-the-memory-problem/step-1-why-loops-outgrow-a-single-memory-file/
    - listitem:
      - link "→ Graphs in Plain Terms 3 steps":
        - /url: /docs/03-part-1-the-memory-problem/step-2-graphs-in-plain-terms/
    - listitem:
      - link "→ Keep Your Two Graphs Separate 3 steps":
        - /url: /docs/03-part-1-the-memory-problem/step-3-keep-your-two-graphs-separate/
  - text: Part 2
  - heading "The DAG of work" [level=3]
  - list:
    - listitem:
      - link "→ The Ratchet — Recording Progress Without Losing the Trail 2 steps":
        - /url: /docs/04-part-2-the-dag-of-work/step-4-recording-attempts-without-losing-the-trail/
    - listitem:
      - link "→ Letting Failed Branches Stay Queryable 2 steps":
        - /url: /docs/04-part-2-the-dag-of-work/step-5-letting-failed-branches-stay-queryable/
  - text: Part 3
  - heading "The graph of facts" [level=3]
  - list:
    - listitem:
      - link "→ Extraction — Schema First, Prose Second 3 steps":
        - /url: /docs/05-part-3-the-graph-of-facts/step-6-extraction-schema-first-prose-second/
    - listitem:
      - link "→ Resolution — Merge Without Losing the Evidence 3 steps":
        - /url: /docs/05-part-3-the-graph-of-facts/step-7-resolution-merging-without-losing-the-evidence/
    - listitem:
      - link "→ Provenance — Every Claim Carries a Receipt 3 steps":
        - /url: /docs/05-part-3-the-graph-of-facts/step-8-provenance-every-claim-keeps-a-receipt/
  - text: Part 4
  - heading "Working from the graph" [level=3]
  - list:
    - listitem:
      - link "→ The Grounded Checker 2 steps":
        - /url: /docs/06-part-4-working-from-the-graph/step-10-the-grounded-checker/
    - listitem:
      - link "→ Give a Worker a Slice, Not the Whole Graph 2 steps":
        - /url: /docs/06-part-4-working-from-the-graph/step-9-subgraphs-give-a-worker-a-slice-not-the-graph/
  - text: Part 5
  - heading "The graph of loops" [level=3]
  - list:
    - listitem:
      - link "→ Wiring Loops Together 3 steps":
        - /url: /docs/07-part-5-the-graph-of-loops/step-11-wiring-loops-together/
    - listitem:
      - link "→ The Four Ways a Lone Loop Fails Itself 3 steps":
        - /url: /docs/07-part-5-the-graph-of-loops/step-12-four-ways-a-lone-loop-fails-itself/
    - listitem:
      - link "→ Anchors and Frozen Nodes 3 steps":
        - /url: /docs/07-part-5-the-graph-of-loops/step-13-anchors-and-frozen-nodes/
  - text: Part 6
  - heading "One graph end to end" [level=3]
  - list:
    - listitem:
      - link "→ Six Honest Questions Before You Build 2 steps":
        - /url: /docs/08-part-6-one-graph-end-to-end/step-14-six-questions-before-you-build/
    - listitem:
      - link "→ One Small System, Built Twice 2 steps":
        - /url: /docs/08-part-6-one-graph-end-to-end/step-15-build-the-same-graph-twice/
  - text: Part 7
  - heading "Staying grounded" [level=3]
  - list:
    - listitem:
      - link "→ Recognizing the Skip-It Cases 2 steps":
        - /url: /docs/09-part-7-staying-grounded/step-16-when-to-skip-graph-engineering-entirely/
    - listitem:
      - link "→ How Much Governance the Job Actually Needs 2 steps":
        - /url: /docs/09-part-7-staying-grounded/step-17-complexity-budgets-and-staying-the-engineer/
  - link "View full roadmap":
    - /url: /tracks/
  - heading "Twenty-Three Patterns" [level=2]
  - paragraph: Solutions that emerge once your graph handles real traffic. Each comes with a runnable starter kit.
  - link "document-to-facts Core Turn any document into structured facts Extraction →":
    - /url: /patterns/document-to-facts/
    - text: document-to-facts Core
    - paragraph: Turn any document into structured facts
    - text: Extraction →
  - link "code-change-to-graph Extended Track code changes as graph facts Extraction →":
    - /url: /patterns/code-change-to-graph/
    - text: code-change-to-graph Extended
    - paragraph: Track code changes as graph facts
    - text: Extraction →
  - link "conversation-to-claims Extended Extract structured claims from chat Extraction →":
    - /url: /patterns/conversation-to-claims/
    - text: conversation-to-claims Extended
    - paragraph: Extract structured claims from chat
    - text: Extraction →
  - link "alias-merge-with-trail Core Resolve name conflicts with full history Resolution →":
    - /url: /patterns/alias-merge-with-trail/
    - text: alias-merge-with-trail Core
    - paragraph: Resolve name conflicts with full history
    - text: Resolution →
  - link "confidence-scored-dedup Extended Deduplicate with confidence scores Resolution →":
    - /url: /patterns/confidence-scored-dedup/
    - text: confidence-scored-dedup Extended
    - paragraph: Deduplicate with confidence scores
    - text: Resolution →
  - link "reversible-merge-audit Extended Merge facts with undo capability Resolution →":
    - /url: /patterns/reversible-merge-audit/
    - text: reversible-merge-audit Extended
    - paragraph: Merge facts with undo capability
    - text: Resolution →
  - link "receipt-per-edge Core Every connection comes with proof Provenance →":
    - /url: /patterns/receipt-per-edge/
    - text: receipt-per-edge Core
    - paragraph: Every connection comes with proof
    - text: Provenance →
  - link "supersession-chain Extended Track fact replacement history Provenance →":
    - /url: /patterns/supersession-chain/
    - text: supersession-chain Extended
    - paragraph: Track fact replacement history
    - text: Provenance →
  - link "versioned-schema-log Extended Version your graph schema safely Provenance →":
    - /url: /patterns/versioned-schema-log/
    - text: versioned-schema-log Extended
    - paragraph: Version your graph schema safely
    - text: Provenance →
  - link "task-scoped-retrieval Core Fetch exactly what your task needs Subgraph →":
    - /url: /patterns/task-scoped-retrieval/
    - text: task-scoped-retrieval Core
    - paragraph: Fetch exactly what your task needs
    - text: Subgraph →
  - link "budget-capped-subgraph Extended Control query complexity automatically Subgraph →":
    - /url: /patterns/budget-capped-subgraph/
    - text: budget-capped-subgraph Extended
    - paragraph: Control query complexity automatically
    - text: Subgraph →
  - link "conflict-aware-bundle Extended Bundle facts knowing conflicts exist Subgraph →":
    - /url: /patterns/conflict-aware-bundle/
    - text: conflict-aware-bundle Extended
    - paragraph: Bundle facts knowing conflicts exist
    - text: Subgraph →
  - link "grounded-triple-checker Core Verify each fact against its source Checker →":
    - /url: /patterns/grounded-triple-checker/
    - text: grounded-triple-checker Core
    - paragraph: Verify each fact against its source
    - text: Checker →
  - link "contradiction-detector Extended Find opposing facts automatically Checker →":
    - /url: /patterns/contradiction-detector/
    - text: contradiction-detector Extended
    - paragraph: Find opposing facts automatically
    - text: Checker →
  - link "early-victory-guard Extended Stop when you've found enough Checker →":
    - /url: /patterns/early-victory-guard/
    - text: early-victory-guard Extended
    - paragraph: Stop when you've found enough
    - text: Checker →
  - link "counter-metric-loop Core Measure what matters, act on what breaks Governance →":
    - /url: /patterns/counter-metric-loop/
    - text: counter-metric-loop Core
    - paragraph: Measure what matters, act on what breaks
    - text: Governance →
  - link "arbitration-edge Extended Resolve conflicts with designated authority Governance →":
    - /url: /patterns/arbitration-edge/
    - text: arbitration-edge Extended
    - paragraph: Resolve conflicts with designated authority
    - text: Governance →
  - link "audit-loop Extended Self-check your graph quality Governance →":
    - /url: /patterns/audit-loop/
    - text: audit-loop Extended
    - paragraph: Self-check your graph quality
    - text: Governance →
  - link "anchor-and-freeze Extended Lock important facts in place Governance →":
    - /url: /patterns/anchor-and-freeze/
    - text: anchor-and-freeze Extended
    - paragraph: Lock important facts in place
    - text: Governance →
  - link "sqlite-backed-graph Core Start small, scale without rewrites Storage →":
    - /url: /patterns/sqlite-backed-graph/
    - text: sqlite-backed-graph Core
    - paragraph: Start small, scale without rewrites
    - text: Storage →
  - link "file-graph-for-small-teams Extended Simple file-based graph for small teams Storage →":
    - /url: /patterns/file-graph-for-small-teams/
    - text: file-graph-for-small-teams Extended
    - paragraph: Simple file-based graph for small teams
    - text: Storage →
  - link "postgres-backed-graph Extended Production-ready PostgreSQL storage Storage →":
    - /url: /patterns/postgres-backed-graph/
    - text: postgres-backed-graph Extended
    - paragraph: Production-ready PostgreSQL storage
    - text: Storage →
  - link "neo4j-at-scale Extended Scale to enterprise with Neo4j Storage →":
    - /url: /patterns/neo4j-at-scale/
    - text: neo4j-at-scale Extended
    - paragraph: Scale to enterprise with Neo4j
    - text: Storage →
  - link "Browse all patterns":
    - /url: /patterns/
  - heading "Get Started" [level=2]
  - text: Step 1
  - heading "Read Start here" [level=3]
  - paragraph: Two or three questions about what you have already built, and it points you at the page to open first.
  - link "Open Start here →":
    - /url: /docs/00-start-here/
  - text: Step 2
  - heading "Pick a track" [level=3]
  - paragraph: G1 through G4, beginner to expert. Each finishes where the next one assumes you are.
  - link "Browse tracks →":
    - /url: /tracks/
  - text: Step 3
  - heading "Install the core package" [level=3]
  - paragraph: Get the foundation package that powers all Graph Engineering projects.
  - code: $ npm install @graph-engineering/core
  - button "Copy code": Copy
  - text: Step 4
  - heading "Clone a starter kit" [level=3]
  - paragraph: "One command, no API keys, no build. Run this in your terminal:"
  - code: $ npx @graph-engineering-kits/graph-kit document-to-facts
  - button "Copy code": Copy
  - link "View all starter kits →":
    - /url: /patterns/
  - img
  - text: graph-lab
  - paragraph: Learn to build memory systems that scale across multiple agents using Graph Engineering.
  - paragraph: Install
  - code: $ npm install @graph-engineering/core
  - navigation "Footer":
    - paragraph: Course
    - list:
      - listitem:
        - link "Start here":
          - /url: /docs/00-start-here/
          - text: Start here
          - img
      - listitem:
        - link "Tracks":
          - /url: /tracks/
          - text: Tracks
          - img
      - listitem:
        - link "Patterns":
          - /url: /patterns/
          - text: Patterns
          - img
    - paragraph: Learn
    - list:
      - listitem:
        - link "Roadmap":
          - /url: /roadmap/
          - text: Roadmap
          - img
      - listitem:
        - link "Projects":
          - /url: /projects/
          - text: Projects
          - img
      - listitem:
        - link "Resources":
          - /url: /resources/
          - text: Resources
          - img
    - paragraph: Reference
    - list:
      - listitem:
        - link "GitHub":
          - /url: https://github.com/ayeshakhalid192007-dev/graph-engineering-crash-course
          - text: GitHub
          - img
      - listitem:
        - link "MIT License":
          - /url: https://github.com/ayeshakhalid192007-dev/graph-engineering-crash-course/blob/main/LICENSE
          - text: MIT License
          - img
  - paragraph: © 2026 Graph Engineering. MIT licensed.
  - paragraph: af5321e3 synced on 2026-08-08
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('landing page loads correctly', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   await expect(page.getByRole('banner')).toBeVisible();
  6  |   await expect(page.getByRole('heading', { name: /Build resilient systems that.*scale across agents/ })).toBeVisible();
  7  |   await expect(page.getByRole('link', { name: 'Start Learning' })).toBeVisible();
  8  | });
  9  | 
  10 | test('navigation links work', async ({ page }) => {
  11 |   await page.goto('/');
  12 | 
  13 |   // Test docs link
  14 |   await page.getByRole('link', { name: 'docs' }).click();
> 15 |   await expect(page).toHaveURL(/\/docs\/00-start-here\/?$/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  16 |   await expect(page.getByRole('heading', { name: 'Start here' })).toBeVisible();
  17 | });
  18 | 
  19 | test('search button is accessible', async ({ page }) => {
  20 |   await page.goto('/');
  21 |   // Search button has role="button" and aria-label="Search"
  22 |   await expect(page.getByRole('button', { name: 'Search' }).first()).toBeVisible();
  23 | });
  24 | 
```