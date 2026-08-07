import { Fragment, createElement, type ReactElement, type ReactNode } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeReact from "rehype-react";
import { visit, SKIP } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";
import { resolveContentLink } from "./links.ts";
import { withBasePath } from "./base-path.ts";

export type Heading = { depth: 2 | 3; id: string; text: string };

/**
 * A ```mermaid fence is not code to highlight — it is a diagram. This runs BEFORE
 * shiki so shiki never sees a language it has no grammar for, and replaces the
 * <pre><code> with a <graph-diagram> element that rehype-react maps to the client
 * component.
 */
function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      );
      const className = (code?.properties?.className as string[] | undefined) ?? [];
      if (!code || !className.includes("language-mermaid")) return;
      parent.children[index] = {
        type: "element",
        tagName: "graph-diagram",
        properties: { chart: toString(code) },
        children: [],
      };
      return SKIP;
    });
  };
}

/**
 * Wraps every remaining fence in a <code-block> carrying the language and the raw
 * source, which rehype-react maps to the CodeBlock frame.
 *
 * This runs BEFORE shiki on purpose. @shikijs/rehype *replaces* the <pre> node
 * with its own highlighted fragment, so anything stashed on that node is thrown
 * away — the raw text has to be captured off to the side first. Wrapping rather
 * than annotating means shiki still finds the untouched <pre> nested inside and
 * highlights it in place, and the highlighted markup arrives at CodeBlock as
 * ordinary React children.
 */
function rehypeCodeBlocks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;
      if (parent.type === "element" && parent.tagName === "code-block") return;
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      );
      if (!code) return;
      const className = (code.properties?.className as string[] | undefined) ?? [];
      const lang = className
        .find((c) => typeof c === "string" && c.startsWith("language-"))
        ?.slice("language-".length);
      parent.children[index] = {
        type: "element",
        tagName: "code-block",
        properties: { lang: lang ?? "text", raw: toString(code) },
        children: [node],
      };
      return SKIP;
    });
  };
}

/** Rewrites every relative markdown link to its site route, per lib/links.ts. */
function rehypeSiteLinks(repoPath: string) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string") return;
      const resolved = resolveContentLink(href, repoPath);
      if (!resolved) return; // left as-is; check-links.mjs reports it against out/
      // These are plain <a> elements, not next/link, so Next never prefixes them
      // and a bare /docs/… would 404 under the /graph-lab basePath (C8).
      node.properties!.href = resolved.external ? resolved.href : withBasePath(resolved.href);
      if (resolved.external) {
        node.properties!.target = "_blank";
        node.properties!.rel = ["noopener", "noreferrer"]; // hast models rel as a list
      }
    });
  };
}

/** Collects h2/h3 into the page's table of contents. rehype-slug has already run. */
function rehypeCollectHeadings(sink: Heading[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      sink.push({ depth: node.tagName === "h2" ? 2 : 3, id, text: toString(node) });
    });
  };
}

/**
 * Shiki themes matched to the Blueprint palette in both modes.
 *
 * Two themes means shiki emits each colour twice, once inline and once as a
 * --shiki-dark custom property; the .dark rule in globals.css is what activates
 * the second set. `defaultLanguage`/`fallbackLanguage` keep an unlabelled or
 * unknown fence rendering as plain text instead of throwing the build.
 */
const SHIKI = {
  themes: { light: "github-light", dark: "github-dark-dimmed" },
  defaultLanguage: "text",
  fallbackLanguage: "text",
} as const;

/**
 * Course markdown to hast, with every rewrite applied and the TOC collected.
 *
 * Kept free of React and of any .tsx import so it can run under bare
 * `node --experimental-strip-types` — that is what Task 6's and Task 7's
 * verification steps use, and what Loop 4's search indexer will want.
 */
export async function toHast(
  body: string,
  repoPath: string,
): Promise<{ tree: Root; headings: Heading[] }> {
  const headings: Heading[] = [];
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // course markdown contains <details>
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings, headings)
    .use(rehypeMermaid)
    .use(rehypeCodeBlocks)
    .use(rehypeSiteLinks, repoPath)
    .use(rehypeShiki, SHIKI);

  const tree = (await processor.run(processor.parse(body))) as Root;
  return { tree, headings };
}

/**
 * Course markdown to React elements, for the doc route and every other surface
 * that renders content.
 *
 * The two client components are imported lazily rather than at module scope so
 * this module stays loadable outside the bundler — a static import of a .tsx is
 * exactly what bare Node cannot resolve.
 */
export async function renderMarkdown(
  body: string,
  repoPath: string,
): Promise<{ content: ReactElement; headings: Heading[] }> {
  const [{ tree, headings }, { GraphDiagram }, { CodeBlock }] = await Promise.all([
    toHast(body, repoPath),
    import("@/components/content/GraphDiagram"),
    import("@/components/content/CodeBlock"),
  ]);

  const content = unified()
    .use(rehypeReact, {
      Fragment,
      jsx: (jsxRuntime as never as { jsx: unknown }).jsx,
      jsxs: (jsxRuntime as never as { jsxs: unknown }).jsxs,
      components: {
        "graph-diagram": ({ chart }: { chart: string }) => createElement(GraphDiagram, { chart }),
        "code-block": ({ lang, raw, children }: { lang?: string; raw?: string; children?: ReactNode }) =>
          createElement(CodeBlock, { lang, raw }, children),
      },
    } as never)
    .stringify(tree as never) as never as ReactElement;

  return { content, headings };
}
