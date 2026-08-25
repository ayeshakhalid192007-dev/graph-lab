import Link from "next/link";
import { getSource } from "@/lib/content.js";
import { getAllPatterns, getPatternBySlug } from "@/lib/patterns.js";
import { renderMarkdown } from "@/lib/markdown.js";
import { Section } from "@/components/ui/Section";
import { StarterViewer } from "@/components/interactive/StarterViewer";
import { FadeIn } from "@/components/animations/FadeIn";

export function generateStaticParams() {
  return getAllPatterns().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: getPatternBySlug(slug).title };
}

export default async function PatternPage({ params }) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  const { content } = await renderMarkdown(pattern.body, pattern.repoPath);
  const source = getSource();

  return (
    <Section className="max-w-4xl">
      <FadeIn>
        <p className="mono text-xs tracking-wider text-muted">
          <Link href="/patterns/" className="hover:text-accent-primary transition-colors">
            patterns
          </Link>
          {" / "}
          {pattern.slug}
        </p>

        <dl className="mono mt-4 flex flex-wrap gap-x-4 gap-y-1 glass rounded-xl px-4 py-3 text-xs text-muted">
          <div>
            <dt className="inline">category: </dt>
            <dd className="inline text-graphite">{pattern.category}</dd>
          </div>
          <div>
            <dt className="inline">stage: </dt>
            <dd className="inline text-graphite">{pattern.stage}</dd>
          </div>
          <div>
            <dt className="inline">cost: </dt>
            <dd className="inline text-graphite">{pattern.cost}</dd>
          </div>
          <div>
            <dt className="inline">kit: </dt>
            <dd className="inline text-graphite">
              {pattern.core ? "core" : "extended"}
            </dd>
          </div>
          <div>
            <dt className="inline">tools: </dt>
            <dd className="inline text-graphite">
              {pattern.tools.join(", ") || "—"}
            </dd>
          </div>
        </dl>

        <div className="prose-blueprint mt-8">{content}</div>

        <h2 className="mono mt-16 border-t border-rule-strong pt-6 text-xl text-ink">
          Starter kit
        </h2>
        {pattern.starterSlug ? (
          <StarterViewer
            slug={pattern.starterSlug}
            repo={source.repo}
            commit={source.commit}
          />
        ) : (
          <p className="mono mt-8 text-sm text-muted">
            No starter kit ships with this pattern.
          </p>
        )}
      </FadeIn>
    </Section>
  );
}
