/**
 * Three-Stage Lifecycle Diagram
 * Shows how facts move through extraction, resolution, and provenance
 */
export function LifecycleDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 220"
        className="w-full max-w-5xl min-w-[700px]"
        aria-label="Three-stage lifecycle: extraction, resolution, provenance"
      >
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-primary)" />
          </marker>
          <marker id="arrow-secondary" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-secondary)" />
          </marker>
          <marker id="arrow-tertiary" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="var(--accent-tertiary)" />
          </marker>
        </defs>

        {/* Title */}
        <text x="400" y="35" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '18px' }}>
          THE LIFECYCLE OF A FACT
        </text>

        {/* Stage 1: Extraction */}
        <g transform="translate(80, 70)">
          {/* Box - explicit fill to prevent black patches */}
          <rect x="0" y="0" width="160" height="60" rx="8" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          {/* Icon */}
          <rect x="12" y="12" width="36" height="36" rx="4" fill="var(--accent-primary/20)" />
          <path d="M24 24H36M30V24V36M24 30H36" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
          {/* Label - centered in box */}
          <text x="80" y="28" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
            extraction
          </text>
          <text x="80" y="46" textAnchor="middle" dy="0.35em" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            prose in, schema out
          </text>
          {/* Arrow */}
          <line x1="160" y1="30" x2="200" y2="30" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrow)" />
        </g>

        {/* Stage 2: Resolution */}
        <g transform="translate(320, 70)">
          {/* Box - explicit fill to prevent black patches */}
          <rect x="0" y="0" width="160" height="60" rx="8" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
          {/* Icon - merge symbol */}
          <circle cx="24" cy="18" r="10" fill="var(--accent-secondary/20)" />
          <circle cx="54" cy="42" r="10" fill="var(--accent-secondary/20)" />
          <path d="M24 18C24 18 36 30 54 42" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
          {/* Label - centered in box */}
          <text x="80" y="28" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
            resolution
          </text>
          <text x="80" y="46" textAnchor="middle" dy="0.35em" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            merge, keep the trail
          </text>
          {/* Arrow */}
          <line x1="160" y1="30" x2="200" y2="30" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrow-secondary)" />
        </g>

        {/* Stage 3: Provenance */}
        <g transform="translate(560, 70)">
          {/* Box - explicit fill to prevent black patches */}
          <rect x="0" y="0" width="160" height="60" rx="8" fill="var(--surface)" stroke="var(--accent-tertiary)" strokeWidth="2" />
          {/* Icon - receipt/certificate */}
          <path d="M24 18H48V22H24V18ZM24 26H48V40H24V26ZM24 44H48V50H24V44Z" fill="var(--accent-tertiary/20)" />
          <path d="M36 20V38" stroke="var(--accent-tertiary)" strokeWidth="2" strokeLinecap="round" />
          {/* Label - centered in box */}
          <text x="80" y="28" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
            provenance
          </text>
          <text x="80" y="46" textAnchor="middle" dy="0.35em" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            every edge has a receipt
          </text>
        </g>

        {/* Definition Box */}
        <g transform="translate(200, 150)">
          <rect x="0" y="0" width="400" height="30" rx="15" fill="var(--surface)" stroke="var(--rule)" strokeWidth="1" />
          <text x="200" y="18" textAnchor="middle" dy="0.35em" fill="var(--graphite)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            Facts flow through these stages in order
          </text>
        </g>
      </svg>
    </div>
  );
}
