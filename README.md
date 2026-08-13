# graph-lab

This is the Graph Engineering course website - a fully static Next.js site.

## What's here

- **86 doc pages** covering the Graph Engineering curriculum
- **23 patterns** with **24 starter kits** for hands-on practice
- **7 interactive quizzes** and **6 flashcard sets**
- **8 practice projects** and **10 attributed sources**
- **Site search** across titles, headings, and body text
- **Graph Ready** certification flow

## Content is generated

The `content/` directory is a build artifact copied from the [graph-engineering-course](https://github.com/ayeshakhalid192007-dev/graph-engineering-course) repo. It is never hand-edited here.

To refresh content, run:

```bash
npm run sync:latest
```

## Development

```bash
npm run dev     # Start local dev server
npm run build   # Build static export to out/
npm run verify:all  # Run all checks
```

## Verification commands

| Command | Purpose |
|---------|---------|
| `npm run sync:check` | Verify content matches source |
| `npm run check:content-shape` | Validate quizzes and flashcards |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Check code quality |
| `npm run build` | Build static site |
| `npm run check:links` | Verify all internal links |

## Live site

[https://ayeshakhalid192007-dev.github.io/graph-lab/](https://ayeshakhalid192007-dev.github.io/graph-lab/)
# graph-lab
