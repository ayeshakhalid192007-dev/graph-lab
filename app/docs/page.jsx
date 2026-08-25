import { getDoc, getPrevNext } from "@/lib/docs.js";
import { renderMarkdown } from "@/lib/markdown.js";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { DocFooterNav } from "@/components/docs/DocFooterNav";

export async function generateMetadata() {
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
