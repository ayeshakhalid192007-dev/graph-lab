import { getAllDocs, getDoc, getPrevNext } from "@/lib/docs.js";
import { renderMarkdown } from "@/lib/markdown.js";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { DocToc } from "@/components/docs/DocToc";
import { DocBreadcrumbs } from "@/components/docs/DocBreadcrumbs";
import { DocFooterNav } from "@/components/docs/DocFooterNav";

export function generateStaticParams() {
  return getAllDocs()
    .filter((d) => d.slug.length > 0)
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  return { title: doc.title };
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const { content, headings } = await renderMarkdown(doc.body, doc.repoPath);
  const { prev, next } = getPrevNext(slug);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)_14rem]">
      <DocSidebar activeRoute={doc.route} />
      <article className="min-w-0">
        <DocBreadcrumbs doc={doc} />
        <div className="prose-blueprint mt-6">{content}</div>
        <DocFooterNav prev={prev} next={next} />
      </article>
      <DocToc headings={headings} />
    </div>
  );
}
