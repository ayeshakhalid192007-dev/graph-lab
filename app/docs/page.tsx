import type { Metadata } from "next";
import { getDoc, getPrevNext } from "@/lib/docs.ts";
import { renderMarkdown } from "@/lib/markdown.ts";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { DocFooterNav } from "@/components/docs/DocFooterNav";

// docs/README.md owns /docs/. Its slug array is empty, which a catch-all route
// cannot match under `output: "export"`, so it is emitted from here instead.
export async function generateMetadata(): Promise<Metadata> {
  return { title: getDoc([]).title };
}

export default async function DocsIndex() {
  const doc = getDoc([]);
  const { content } = await renderMarkdown(doc.body, doc.repoPath);
  const { next } = getPrevNext([]);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 md:grid-cols-[16rem_minmax(0,1fr)]">
      <DocSidebar activeRoute="/docs/" />
      <article className="min-w-0">
        <div className="prose-blueprint">{content}</div>
        <DocFooterNav prev={null} next={next} />
      </article>
    </div>
  );
}
