/**
 * Professional Two Graphs Diagram
 * Illustrates the core Graph Engineering distinction: work history vs facts
 */
export function TwoGraphsDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 840 420"
        className="w-full max-w-5xl mx-auto"
        aria-label="Two graphs side by side: work history on the left records what was attempted, facts on the right records what turned out to be true"
      >
        <defs>
          <linearGradient id="workGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="factGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-success)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-success)" stopOpacity="0.03" />
          </linearGradient>
          <filter id="nodeShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
          </filter>
          <filter id="glowWork">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="var(--accent-primary)" floodOpacity="0.3" />
          </filter>
          <filter id="glowFact">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="var(--accent-success)" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ── Work History Panel ── */}
        <g transform="translate(20, 20)">
          {/* Panel background */}
          <rect x="0" y="0" width="370" height="380" rx="16" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" />

          {/* Header accent line */}
          <line x1="24" y1="0" x2="140" y2="0" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />

          {/* Title */}
          <text x="24" y="36" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '13px', letterSpacing: '0.08em' }}>
            WORK HISTORY
          </text>
          <text x="24" y="54" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            What was attempted
          </text>

          {/* Graph area */}
          <g transform="translate(0, 80)">
            {/* Subtle grid */}
            <line x1="100" y1="0" x2="100" y2="260" stroke="var(--rule)" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="250" y1="0" x2="250" y2="260" stroke="var(--rule)" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Edges with arrow markers */}
            <defs>
              <marker id="workArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="none" stroke="var(--accent-primary)" strokeWidth="1" />
              </marker>
            </defs>

            {/* Edge: attempt 1 → attempt 2 */}
            <line x1="175" y1="50" x2="175" y2="100" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#workArrow)" />
            {/* Edge: attempt 2 → attempt 3 */}
            <line x1="175" y1="160" x2="175" y2="210" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#workArrow)" />

            {/* Node: attempt 1 */}
            <circle cx="175" cy="25" r="22" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="1.5" filter="url(#nodeShadow)" />
            <circle cx="175" cy="25" r="22" fill="url(#workGrad)" />
            <text x="175" y="22" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.05em' }}>
              ATTEMPT
            </text>
            <text x="175" y="34" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '600' }}>
              1
            </text>

            {/* Node: attempt 2 */}
            <circle cx="175" cy="130" r="22" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="1.5" filter="url(#nodeShadow)" />
            <circle cx="175" cy="130" r="22" fill="url(#workGrad)" />
            <text x="175" y="127" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.05em' }}>
              ATTEMPT
            </text>
            <text x="175" y="138" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '600' }}>
              2
            </text>

            {/* Node: attempt 3 */}
            <circle cx="175" cy="235" r="22" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="1.5" filter="url(#nodeShadow)" />
            <circle cx="175" cy="235" r="22" fill="url(#workGrad)" />
            <text x="175" y="232" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.05em' }}>
              ATTEMPT
            </text>
            <text x="175" y="243" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '600' }}>
              3
            </text>

            {/* Status badges */}
            <g transform="translate(220, 13)">
              <rect x="0" y="0" width="72" height="22" rx="11" fill="var(--surface-soft)" stroke="var(--rule)" strokeWidth="0.5" />
              <text x="36" y="14" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
                superseded
              </text>
            </g>
            <g transform="translate(220, 118)">
              <rect x="0" y="0" width="72" height="22" rx="11" fill="var(--surface-soft)" stroke="var(--rule)" strokeWidth="0.5" />
              <text x="36" y="14" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>
                superseded
              </text>
            </g>
            <g transform="translate(220, 223)">
              <rect x="0" y="0" width="82" height="22" rx="11" fill="var(--accent-primary)" fillOpacity="0.12" stroke="var(--accent-primary)" strokeWidth="0.5" />
              <text x="41" y="14" textAnchor="middle" fill="var(--accent-primary)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: '600' }}>
                latest attempt
              </text>
            </g>
          </g>
        </g>

        {/* ── Center divider ── */}
        <g transform="translate(400, 60)">
          <line x1="20" y1="0" x2="20" y2="300" stroke="var(--rule-strong)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="20" cy="150" r="14" fill="var(--surface)" stroke="var(--rule-strong)" strokeWidth="1" />
          <text x="20" y="154" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '700' }}>
            VS
          </text>
        </g>

        {/* ── Facts Panel ── */}
        <g transform="translate(440, 20)">
          {/* Panel background */}
          <rect x="0" y="0" width="380" height="380" rx="16" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" />

          {/* Header accent line */}
          <line x1="24" y1="0" x2="120" y2="0" stroke="var(--accent-success)" strokeWidth="2" strokeLinecap="round" />

          {/* Title */}
          <text x="24" y="36" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '13px', letterSpacing: '0.08em' }}>
            FACTS
          </text>
          <text x="24" y="54" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            What turned out to be true
          </text>

          {/* Graph area - triangle layout */}
          <g transform="translate(0, 70)">
            {/* Subtle grid */}
            <line x1="190" y1="10" x2="190" y2="270" stroke="var(--rule)" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Edges */}
            <defs>
              <marker id="factArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="none" stroke="var(--accent-success)" strokeWidth="1" />
              </marker>
            </defs>

            {/* Edge: Service → Owner */}
            <line x1="210" y1="55" x2="290" y2="145" stroke="var(--accent-success)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#factArrow)" />
            {/* Edge: Service → Receipt */}
            <line x1="170" y1="55" x2="90" y2="145" stroke="var(--accent-success)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#factArrow)" />
            {/* Edge: Owner → Receipt */}
            <line x1="100" y1="200" x2="280" y2="200" stroke="var(--accent-success)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#factArrow)" />

            {/* Node: Service (top) */}
            <circle cx="190" cy="30" r="22" fill="var(--surface)" stroke="var(--accent-success)" strokeWidth="1.5" filter="url(#nodeShadow)" />
            <circle cx="190" cy="30" r="22" fill="url(#factGrad)" />
            <text x="190" y="27" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.05em' }}>
              ENTITY
            </text>
            <text x="190" y="38" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '600' }}>
              Service
            </text>

            {/* Node: Owner (right) */}
            <circle cx="305" cy="175" r="22" fill="var(--surface)" stroke="var(--accent-success)" strokeWidth="1.5" filter="url(#nodeShadow)" />
            <circle cx="305" cy="175" r="22" fill="url(#factGrad)" />
            <text x="305" y="172" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.05em' }}>
              ENTITY
            </text>
            <text x="305" y="183" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '600' }}>
              Owner
            </text>

            {/* Node: Receipt (left) */}
            <circle cx="75" cy="175" r="22" fill="var(--surface)" stroke="var(--accent-success)" strokeWidth="1.5" filter="url(#nodeShadow)" />
            <circle cx="75" cy="175" r="22" fill="url(#factGrad)" />
            <text x="75" y="172" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.05em' }}>
              ENTITY
            </text>
            <text x="75" y="183" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: '600' }}>
              Receipt
            </text>

            {/* Verified badge */}
            <g transform="translate(145, 240)">
              <rect x="0" y="0" width="90" height="24" rx="12" fill="var(--accent-success)" fillOpacity="0.12" stroke="var(--accent-success)" strokeWidth="0.5" />
              <text x="45" y="15" textAnchor="middle" fill="var(--accent-success)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '600' }}>
                verified fact
              </text>
            </g>
          </g>
        </g>

        {/* ── Bottom legend ── */}
        <g transform="translate(20, 410)">
          <text x="420" y="0" textAnchor="middle" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
            Work history records attempts. Facts record what is true. Agents read facts; they do not replay history.
          </text>
        </g>
      </svg>
    </div>
  );
}
