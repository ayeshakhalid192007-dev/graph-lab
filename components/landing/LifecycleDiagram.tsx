/**
 * Three-Stage Lifecycle Diagram
 * Shows how facts move through extraction, resolution, and provenance
 */
export function LifecycleDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 240"
        className="w-full max-w-5xl min-w-[700px]"
        aria-label="Three-stage lifecycle: extraction, resolution, provenance"
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,5 L6,2.5 z" fill="#8C7B63" />
          </marker>
          <marker id="arrow-secondary" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,5 L6,2.5 z" fill="#6B8C75" />
          </marker>
          <marker id="arrow-tertiary" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,5 L6,2.5 z" fill="#8C6B72" />
          </marker>
        </defs>

        {/* Title */}
        <text x="400" y="32" textAnchor="middle" fill="#1A1A1A" style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', fontSize: '15px' }}>
          THE LIFECYCLE OF A FACT
        </text>

        {/* Stage 1: Extraction */}
        <g transform="translate(80, 65)">
          {/* Box with clean styling - solid white background */}
          <rect x="0" y="0" width="160" height="80" rx="8" fill="#FFFFFF" stroke="#8C7B63" strokeWidth="1.5" />
          {/* Icon */}
          <rect x="12" y="12" width="36" height="36" rx="4" fill="#F0EFEA" />
          <path d="M24 24H36M30V24V36M24 30H36" stroke="#8C7B63" strokeWidth="1.5" strokeLinecap="round" />
          {/* Label - centered in box */}
          <text x="80" y="28" textAnchor="middle" dy="0.35em" fill="#1A1A1A" style={{ fontFamily: 'var(--font-mono)', fontWeight: '500', fontSize: '13px' }}>
            extraction
          </text>
          <text x="80" y="48" textAnchor="middle" dy="0.35em" fill="#6A6A6A" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>
            prose in, schema out
          </text>
          {/* Arrow */}
          <line x1="160" y1="40" x2="200" y2="40" stroke="#8C7B63" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrow)" opacity="0.8" />
        </g>

        {/* Stage 2: Resolution */}
        <g transform="translate(320, 65)">
          {/* Box with clean styling - solid white background */}
          <rect x="0" y="0" width="160" height="80" rx="8" fill="#FFFFFF" stroke="#6B8C75" strokeWidth="1.5" />
          {/* Icon - merge symbol */}
          <circle cx="24" cy="18" r="10" fill="#EAEDE8" />
          <circle cx="54" cy="42" r="10" fill="#EAEDE8" />
          <path d="M24 18C24 18 36 30 54 42" stroke="#6B8C75" strokeWidth="1.5" strokeLinecap="round" />
          {/* Label - centered in box */}
          <text x="80" y="28" textAnchor="middle" dy="0.35em" fill="#1A1A1A" style={{ fontFamily: 'var(--font-mono)', fontWeight: '500', fontSize: '13px' }}>
            resolution
          </text>
          <text x="80" y="48" textAnchor="middle" dy="0.35em" fill="#6A6A6A" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>
            merge, keep the trail
          </text>
          {/* Arrow */}
          <line x1="160" y1="40" x2="200" y2="40" stroke="#6B8C75" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrow-secondary)" opacity="0.8" />
        </g>

        {/* Stage 3: Provenance */}
        <g transform="translate(560, 65)">
          {/* Box with clean styling - solid white background */}
          <rect x="0" y="0" width="160" height="80" rx="8" fill="#FFFFFF" stroke="#8C6B72" strokeWidth="1.5" />
          {/* Icon - receipt/certificate */}
          <path d="M24 18H48V22H24V18ZM24 26H48V40H24V26ZM24 44H48V50H24V44Z" fill="#F0EAE8" />
          <path d="M36 20V38" stroke="#8C6B72" strokeWidth="1.5" strokeLinecap="round" />
          {/* Label - centered in box */}
          <text x="80" y="28" textAnchor="middle" dy="0.35em" fill="#1A1A1A" style={{ fontFamily: 'var(--font-mono)', fontWeight: '500', fontSize: '13px' }}>
            provenance
          </text>
          <text x="80" y="48" textAnchor="middle" dy="0.35em" fill="#6A6A6A" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>
            every edge has a receipt
          </text>
        </g>

        {/* Definition Box */}
        <g transform="translate(200, 170)">
          <rect x="0" y="0" width="400" height="35" rx="17.5" fill="#FFFFFF" stroke="#E8E6E3" strokeWidth="1" />
          <text x="200" y="20" textAnchor="middle" dy="0.35em" fill="#4A4A4A" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            Facts flow through these stages in order
          </text>
        </g>
      </svg>
    </div>
  );
}
