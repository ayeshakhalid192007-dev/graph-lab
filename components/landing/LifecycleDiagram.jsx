/**
 * Professional Lifecycle Diagram
 * Shows how facts move through extraction, resolution, and provenance
 */
export function LifecycleDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 840 340"
        className="w-full max-w-5xl mx-auto"
        aria-label="Three-stage lifecycle: extraction, resolution, and provenance"
      >
        <defs>
          <linearGradient id="extractGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="resolveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="provGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-success)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent-success)" stopOpacity="0.03" />
          </linearGradient>
          <filter id="cardShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.08" />
          </filter>
          <marker id="arrowA" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <path d="M0,0 L10,4 L0,8" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinejoin="round" />
          </marker>
          <marker id="arrowB" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <path d="M0,0 L10,4 L0,8" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinejoin="round" />
          </marker>
          <marker id="arrowC" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <path d="M0,0 L10,4 L0,8" fill="none" stroke="var(--accent-success)" strokeWidth="1.5" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* ── Stage 1: Extraction ── */}
        <g transform="translate(20, 40)">
          {/* Card */}
          <rect x="0" y="0" width="230" height="200" rx="16" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" filter="url(#cardShadow)" />

          {/* Top accent */}
          <line x1="24" y1="0" x2="100" y2="0" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Step number */}
          <g transform="translate(24, 24)">
            <circle cx="16" cy="16" r="16" fill="var(--accent-primary)" fillOpacity="0.12" stroke="var(--accent-primary)" strokeWidth="1" />
            <text x="16" y="20" textAnchor="middle" fill="var(--accent-primary)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700' }}>
              1
            </text>
          </g>

          {/* Title */}
          <text x="52" y="36" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '700' }}>
            Extraction
          </text>

          {/* Description */}
          <text x="24" y="64" fill="var(--graphite)" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
            Parse raw input and pull out
          </text>
          <text x="24" y="80" fill="var(--graphite)" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
            structured facts from prose.
          </text>

          {/* Icon area */}
          <g transform="translate(24, 100)">
            <rect x="0" y="0" width="182" height="80" rx="8" fill="var(--surface-soft)" stroke="var(--rule)" strokeWidth="0.5" />
            {/* Document icon */}
            <rect x="30" y="16" width="32" height="44" rx="4" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <line x1="36" y1="28" x2="56" y2="28" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.5" />
            <line x1="36" y1="36" x2="56" y2="36" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.5" />
            <line x1="36" y1="44" x2="48" y2="44" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.5" />
            {/* Arrow */}
            <line x1="72" y1="38" x2="100" y2="38" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.4" />
            {/* Schema icon */}
            <rect x="108" y="16" width="44" height="44" rx="4" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <circle cx="120" cy="30" r="4" fill="var(--accent-primary)" fillOpacity="0.3" />
            <circle cx="140" cy="30" r="4" fill="var(--accent-primary)" fillOpacity="0.3" />
            <circle cx="130" cy="46" r="4" fill="var(--accent-primary)" fillOpacity="0.3" />
            <line x1="120" y1="34" x2="130" y2="42" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.5" />
            <line x1="140" y1="34" x2="130" y2="42" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.5" />
            <text x="91" y="72" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
              prose → schema
            </text>
          </g>
        </g>

        {/* ── Arrow 1→2 ── */}
        <g transform="translate(250, 130)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrowA)" />
          <text x="30" y="-8" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
            emits
          </text>
        </g>

        {/* ── Stage 2: Resolution ── */}
        <g transform="translate(310, 40)">
          {/* Card */}
          <rect x="0" y="0" width="230" height="200" rx="16" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" filter="url(#cardShadow)" />

          {/* Top accent */}
          <line x1="24" y1="0" x2="100" y2="0" stroke="var(--accent-secondary)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Step number */}
          <g transform="translate(24, 24)">
            <circle cx="16" cy="16" r="16" fill="var(--accent-secondary)" fillOpacity="0.12" stroke="var(--accent-secondary)" strokeWidth="1" />
            <text x="16" y="20" textAnchor="middle" fill="var(--accent-secondary)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700' }}>
              2
            </text>
          </g>

          {/* Title */}
          <text x="52" y="36" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '700' }}>
            Resolution
          </text>

          {/* Description */}
          <text x="24" y="64" fill="var(--graphite)" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
            Merge new facts with existing ones.
          </text>
          <text x="24" y="80" fill="var(--graphite)" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
            Conflicts are flagged, not silently dropped.
          </text>

          {/* Icon area */}
          <g transform="translate(24, 100)">
            <rect x="0" y="0" width="182" height="80" rx="8" fill="var(--surface-soft)" stroke="var(--rule)" strokeWidth="0.5" />
            {/* Merge symbol */}
            <circle cx="60" cy="25" r="12" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" />
            <circle cx="120" cy="25" r="12" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" />
            <path d="M60 25 L90 45 L120 25" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" opacity="0.5" />
            {/* Checkmark */}
            <circle cx="90" cy="55" r="10" fill="var(--accent-secondary)" fillOpacity="0.15" stroke="var(--accent-secondary)" strokeWidth="1" />
            <path d="M84 55 L88 59 L96 51" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="91" y="72" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
              merge + trail
            </text>
          </g>
        </g>

        {/* ── Arrow 2→3 ── */}
        <g transform="translate(540, 130)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="var(--accent-secondary)" strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrowB)" />
          <text x="30" y="-8" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
            resolves
          </text>
        </g>

        {/* ── Stage 3: Provenance ── */}
        <g transform="translate(600, 40)">
          {/* Card */}
          <rect x="0" y="0" width="230" height="200" rx="16" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" filter="url(#cardShadow)" />

          {/* Top accent */}
          <line x1="24" y1="0" x2="100" y2="0" stroke="var(--accent-success)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Step number */}
          <g transform="translate(24, 24)">
            <circle cx="16" cy="16" r="16" fill="var(--accent-success)" fillOpacity="0.12" stroke="var(--accent-success)" strokeWidth="1" />
            <text x="16" y="20" textAnchor="middle" fill="var(--accent-success)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700' }}>
              3
            </text>
          </g>

          {/* Title */}
          <text x="52" y="36" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '700' }}>
            Provenance
          </text>

          {/* Description */}
          <text x="24" y="64" fill="var(--graphite)" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
            Every fact carries a receipt showing
          </text>
          <text x="24" y="80" fill="var(--graphite)" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
            where it came from and who verified it.
          </text>

          {/* Icon area */}
          <g transform="translate(24, 100)">
            <rect x="0" y="0" width="182" height="80" rx="8" fill="var(--surface-soft)" stroke="var(--rule)" strokeWidth="0.5" />
            {/* Receipt icon */}
            <rect x="55" y="10" width="72" height="56" rx="4" fill="none" stroke="var(--accent-success)" strokeWidth="1.5" />
            <line x1="65" y1="24" x2="117" y2="24" stroke="var(--accent-success)" strokeWidth="0.8" opacity="0.4" />
            <line x1="65" y1="34" x2="117" y2="34" stroke="var(--accent-success)" strokeWidth="0.8" opacity="0.4" />
            <line x1="65" y1="44" x2="100" y2="44" stroke="var(--accent-success)" strokeWidth="0.8" opacity="0.4" />
            <circle cx="91" cy="24" r="3" fill="var(--accent-success)" fillOpacity="0.3" />
            <circle cx="91" cy="34" r="3" fill="var(--accent-success)" fillOpacity="0.3" />
            {/* Seal */}
            <circle cx="145" cy="50" r="14" fill="var(--accent-success)" fillOpacity="0.12" stroke="var(--accent-success)" strokeWidth="1" />
            <path d="M139 50 L143 54 L151 46" fill="none" stroke="var(--accent-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="91" y="72" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
              receipt per edge
            </text>
          </g>
        </g>

        {/* ── Bottom flow indicator ── */}
        <g transform="translate(20, 280)">
          <rect x="0" y="0" width="810" height="40" rx="20" fill="var(--surface-soft)" stroke="var(--rule)" strokeWidth="0.5" />

          {/* Progress dots */}
          <circle cx="100" cy="20" r="5" fill="var(--accent-primary)" />
          <line x1="105" y1="20" x2="370" y2="20" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
          <circle cx="375" cy="20" r="5" fill="var(--accent-secondary)" />
          <line x1="380" y1="20" x2="650" y2="20" stroke="var(--accent-secondary)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
          <circle cx="655" cy="20" r="5" fill="var(--accent-success)" />

          <text x="100" y="34" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
            extract
          </text>
          <text x="375" y="34" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
            resolve
          </text>
          <text x="655" y="34" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
            provenance
          </text>

          <text x="405" y="24" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '600' }}>
            facts flow through all three stages in order
          </text>
        </g>
      </svg>
    </div>
  );
}
