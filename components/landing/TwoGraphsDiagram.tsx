/**
 * The Two Graphs Diagram - illustrating work history vs facts
 * A core concept in Graph Engineering showing how attempts and truths are separated
 */
export function TwoGraphsDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 360"
        className="w-full max-w-6xl min-w-[720px]"
        aria-label="Work history graph on left recording what was attempted, fact graph on right recording what turned out to be true"
      >
        {/* Title for Work History Graph */}
        <text x="150" y="45" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
          WORK HISTORY
        </text>

        {/* Work History Graph - Left Side */}
        <g transform="translate(0, 75)">
          {/* Nodes - with explicit fill */}
          <circle cx="150" cy="70" r="28" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="150" cy="180" r="28" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="150" cy="290" r="28" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />

          {/* Node Labels */}
          <text x="150" y="70" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            attempt 1
          </text>
          <text x="150" y="180" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            attempt 2
          </text>
          <text x="150" y="290" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            attempt 3
          </text>

          {/* Edges */}
          <line x1="150" y1="98" x2="150" y2="152" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="208" x2="150" y2="262" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Title for Fact Graph */}
        <text x="550" y="45" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '14px' }}>
          FACTS
        </text>

        {/* Fact Graph - Right Side */}
        <g transform="translate(400, 75)">
          {/* Nodes - with explicit fill */}
          <circle cx="150" cy="70" r="28" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
          <circle cx="250" cy="180" r="28" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
          <circle cx="50" cy="180" r="28" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />

          {/* Node Labels */}
          <text x="150" y="70" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            Service
          </text>
          <text x="250" y="180" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            Owner
          </text>
          <text x="50" y="180" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
            Receipt
          </text>

          {/* Edges */}
          <line x1="178" y1="92" x2="222" y2="158" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="122" y1="92" x2="78" y2="158" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="98" x2="150" y2="152" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Separator line between graphs */}
        <line x1="380" y1="75" x2="380" y2="325" stroke="var(--rule)" strokeWidth="1" />

        {/* Explanatory Labels - positioned below each graph */}
        <g transform="translate(0, 325)">
          <rect x="0" y="0" width="200" height="35" rx="17.5" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="1" />
          <text x="100" y="20" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            What was attempted
          </text>
        </g>
        <g transform="translate(400, 325)">
          <rect x="0" y="0" width="200" height="35" rx="17.5" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="1" />
          <text x="100" y="20" textAnchor="middle" dy="0.35em" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            What turned out to be true
          </text>
        </g>
      </svg>
    </div>
  );
}
