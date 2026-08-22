/**
 * The Two Graphs Diagram - illustrating work history vs facts
 * A core concept in Graph Engineering showing how attempts and truths are separated
 */
export function TwoGraphsDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 320"
        className="w-full max-w-5xl min-w-[700px]"
        aria-label="Work history graph on left recording what was attempted, fact graph on right recording what turned out to be true"
      >
        {/* Title for Work History Graph - centered over its section */}
        <text x="150" y="40" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
          WORK HISTORY
        </text>

        {/* Work History Graph - Left Side */}
        <g transform="translate(0, 60)">
          {/* Nodes */}
          <circle cx="150" cy="60" r="24" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="150" cy="150" r="24" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="150" cy="240" r="24" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />

          {/* Node Labels - centered using dy attribute */}
          <text x="150" y="60" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            attempt 1
          </text>
          <text x="150" y="150" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            attempt 2
          </text>
          <text x="150" y="240" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            attempt 3
          </text>

          {/* Edges */}
          <line x1="150" y1="84" x2="150" y2="126" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="174" x2="150" y2="216" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Title for Fact Graph - centered over its section */}
        <text x="550" y="40" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
          FACTS
        </text>

        {/* Fact Graph - Right Side */}
        <g transform="translate(400, 60)">
          {/* Nodes */}
          <circle cx="150" cy="60" r="24" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
          <circle cx="250" cy="150" r="24" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
          <circle cx="50" cy="150" r="24" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />

          {/* Node Labels - centered using dy attribute */}
          <text x="150" y="60" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            Service
          </text>
          <text x="250" y="150" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            Owner
          </text>
          <text x="50" y="150" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            Receipt
          </text>

          {/* Edges */}
          <line x1="166" y1="74" x2="234" y2="136" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="134" y1="74" x2="66" y2="136" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="84" x2="150" y2="126" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Separator line between graphs */}
        <line x1="380" y1="60" x2="380" y2="280" stroke="var(--rule)" strokeWidth="1" />

        {/* Explanatory Labels - positioned below each graph */}
        <g transform="translate(400, 280)">
          <rect x="0" y="0" width="200" height="30" rx="15" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="1" />
          <text x="100" y="20" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            What turned out to be true
          </text>
        </g>
        <g transform="translate(0, 280)">
          <rect x="0" y="0" width="200" height="30" rx="15" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="1" />
          <text x="100" y="20" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            What was attempted
          </text>
        </g>
      </svg>
    </div>
  );
}
