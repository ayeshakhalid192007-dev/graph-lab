import Link from "next/link";
import { getAllPatterns } from "@/lib/patterns.js";
import { GlassButton } from "@/components/ui/GlassButton";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export function PatternGrid() {
  const patterns = getAllPatterns();

  const getPatternDescription = (slug) => {
    const descriptions = {
      "document-to-facts": "Turn any document into structured facts",
      "alias-merge-with-trail":
        "Resolve name conflicts with full history",
      "receipt-per-edge": "Every connection comes with proof",
      "task-scoped-retrieval": "Fetch exactly what your task needs",
      "grounded-triple-checker":
        "Verify each fact against its source",
      "counter-metric-loop": "Measure what matters, act on what breaks",
      "sqlite-backed-graph": "Start small, scale without rewrites",
      "code-change-to-graph": "Track code changes as graph facts",
      "conversation-to-claims":
        "Extract structured claims from chat",
      "confidence-scored-dedup":
        "Deduplicate with confidence scores",
      "reversible-merge-audit": "Merge facts with undo capability",
      "supersession-chain": "Track fact replacement history",
      "versioned-schema-log": "Version your graph schema safely",
      "budget-capped-subgraph":
        "Control query complexity automatically",
      "conflict-aware-bundle": "Bundle facts knowing conflicts exist",
      "contradiction-detector":
        "Find opposing facts automatically",
      "early-victory-guard": "Stop when you've found enough",
      "arbitration-edge": "Resolve conflicts with designated authority",
      "audit-loop": "Self-check your graph quality",
      "anchor-and-freeze": "Lock important facts in place",
      "file-graph-for-small-teams":
        "Simple file-based graph for small teams",
      "postgres-backed-graph":
        "Production-ready PostgreSQL storage",
      "neo4j-at-scale": "Scale to enterprise with Neo4j",
    };
    return descriptions[slug] || "Essential pattern for graph engineering";
  };

  const getCategoryLabel = (category) => {
    const labels = {
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

  const corePatterns = patterns.filter((p) => p.core).slice(0, 6);

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">
          Core Patterns
        </h2>
        <p className="text-graphite text-sm">
          Essential solutions that form the foundation of Graph Engineering.
          <br className="hidden sm:block" />
          Explore all 23 patterns on the patterns page.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          staggerDelay={0.08}
        >
          {corePatterns.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/patterns/${p.slug}/`} className="block h-full">
                <div className="glass-card h-full hover:border-accent-primary/30 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-sm font-semibold text-accent-primary">
                      {p.slug}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-lg font-mono text-muted glass">
                      {p.core ? "Core" : "Extended"}
                    </span>
                  </div>

                  <p className="text-sm text-graphite mb-4 leading-relaxed">
                    {getPatternDescription(p.slug)}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                    <span className="text-xs text-muted uppercase tracking-wider font-mono">
                      {getCategoryLabel(p.category)}
                    </span>
                    <span className="text-accent-primary text-sm">→</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="text-center mt-10">
        <GlassButton
          href="/patterns/"
          variant="outline"
          className="px-6 py-2 text-sm"
        >
          View all 23 patterns
        </GlassButton>
      </div>
    </div>
  );
}
