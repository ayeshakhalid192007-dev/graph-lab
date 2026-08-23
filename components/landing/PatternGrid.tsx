import Link from "next/link";
import { getAllPatterns } from "@/lib/patterns.ts";
import { PillButton } from "@/components/ui/PillButton";

/**
 * Pattern showcase - concise grid with meaningful descriptions
 * Less prominent on landing page, more exploratory
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

  // Show only a curated selection of core patterns on the landing page
  const corePatterns = patterns.filter((p) => p.core).slice(0, 6);

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">Core Patterns</h2>
        <p className="text-graphite text-sm">
          Essential solutions that form the foundation of Graph Engineering.
          <br className="hidden sm:block" />
          Explore all 23 patterns on the patterns page.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {corePatterns.map((p) => (
            <Link
              key={p.slug}
              href={`/patterns/${p.slug}/`}
              className="group relative flex flex-col p-4 rounded-lg border border-rule bg-surface hover:border-accent-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-ink group-hover:text-accent-primary transition-colors">
                  {p.slug}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-surface-soft text-muted border border-rule">
                  {p.core ? "Core" : "Extended"}
                </span>
              </div>

              <p className="text-xs text-graphite mb-3 leading-relaxed flex-1">
                {getPatternDescription(p.slug, p.category, p.core)}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-rule/30">
                <span className="text-[10px] text-muted uppercase tracking-wider">
                  {getCategoryLabel(p.category)}
                </span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-2px] group-hover:translate-x-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <PillButton href="/patterns/" variant="outline" className="px-6 py-2 text-sm">
          View all 23 patterns
        </PillButton>
      </div>
    </div>
  );
}
