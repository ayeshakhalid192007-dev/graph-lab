import Link from "next/link";
import { getAllPatterns } from "@/lib/patterns.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * Premium pattern showcase - elegant grid with meaningful descriptions
 */
export function PatternGrid() {
  const patterns = getAllPatterns();

  // Premium one-liners that highlight the value, not just the name
  const getPatternDescription = (slug: string, category: string, core: boolean) => {
    const descriptions: Record<string, string> = {
      // Core patterns
      "document-to-facts": "Turn any document into structured facts",
      "alias-merge-with-trail": "Resolve name conflicts with full history",
      "receipt-per-edge": "Every connection comes with proof",
      "task-scoped-retrieval": "Fetch exactly what your task needs",
      "grounded-triple-checker": "Verify each fact against its source",
      "counter-metric-loop": "Measure what matters, act on what breaks",
      "sqlite-backed-graph": "Start small, scale without rewrites",
      // Extended - extraction
      "code-change-to-graph": "Track code changes as graph facts",
      "conversation-to-claims": "Extract structured claims from chat",
      // Extended - resolution
      "confidence-scored-dedup": "Deduplicate with confidence scores",
      "reversible-merge-audit": "Merge facts with undo capability",
      // Extended - provenance
      "supersession-chain": "Track fact replacement history",
      "versioned-schema-log": "Version your graph schema safely",
      // Extended - subgraph
      "budget-capped-subgraph": "Control query complexity automatically",
      "conflict-aware-bundle": "Bundle facts knowing conflicts exist",
      // Extended - checker
      "contradiction-detector": "Find opposing facts automatically",
      "early-victory-guard": "Stop when you've found enough",
      // Extended - governance
      "arbitration-edge": "Resolve conflicts with designated authority",
      "audit-loop": "Self-check your graph quality",
      "anchor-and-freeze": "Lock important facts in place",
      // Extended - storage
      "file-graph-for-small-teams": "Simple file-based graph for small teams",
      "postgres-backed-graph": "Production-ready PostgreSQL storage",
      "neo4j-at-scale": "Scale to enterprise with Neo4j",
    };
    return descriptions[slug] || (core ? "Essential pattern for all graphs" : "Specialized pattern for specific cases");
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "A-extraction": "Extraction",
      "B-resolution": "Resolution",
      "C-provenance": "Provenance",
      "D-subgraph": "Subgraph",
      "E-checker": "Checker",
      "F-governance": "Governance",
      "G-storage": "Storage",
    };
    return labels[category] || category;
  };

  return (
    <div>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-ink mb-4 tracking-tight">Twenty-Three Patterns</h2>
        <p className="text-graphite text-lg">
          Solutions that emerge once your graph handles real traffic.
          Each comes with a runnable starter kit.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patterns.map((p) => (
            <Link
              key={p.slug}
              href={`/patterns/${p.slug}/`}
              className="group relative flex flex-col p-5 rounded-xl border border-rule bg-surface hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-lg font-bold text-ink group-hover:text-accent-primary transition-colors">
                  {p.slug}
                </span>
                <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                  p.core
                    ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                    : "bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20"
                }`}>
                  {p.core ? "Core" : "Extended"}
                </span>
              </div>

              <p className="text-sm text-graphite mb-4 flex-1 leading-relaxed">
                {getPatternDescription(p.slug, p.category, p.core)}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-rule/50 group-hover:border-accent-primary/20 transition-colors">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                  {getCategoryLabel(p.category)}
                </span>
                <span className="text-accent-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <PillButton href="/patterns/" variant="outline" className="px-8 py-3 text-base">
          Browse all patterns
        </PillButton>
      </div>
    </div>
  );
}
