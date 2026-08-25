"use client";

import { motion } from "framer-motion";

const NODE_R = 22;
const ease = [0.25, 0.46, 0.45, 0.94];

function WorkNode({ cx, cy, label, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={NODE_R}
        fill="url(#cgWorkGrad)"
        filter="url(#cgNodeShadow)"
        className="diagram-node"
      />
      <circle
        cx={cx}
        cy={cy}
        r={NODE_R}
        fill="var(--surface)"
        stroke="var(--accent-primary)"
        strokeWidth="1.5"
        className="diagram-node-ring"
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="var(--muted)"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "7.5px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        attempt
      </text>
      <text
        x={cx}
        y={cy + 7}
        textAnchor="middle"
        fill="var(--ink)"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {label}
      </text>
    </motion.g>
  );
}

function FactNode({ cx, cy, label, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={NODE_R}
        fill="url(#cgFactGrad)"
        filter="url(#cgGlowFact)"
        className="diagram-node fact"
      />
      <circle
        cx={cx}
        cy={cy}
        r={NODE_R}
        fill="var(--surface)"
        stroke="var(--accent-success)"
        strokeWidth="1.5"
        className="diagram-node-ring fact"
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="var(--muted)"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "7.5px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        entity
      </text>
      <text
        x={cx}
        y={cy + 7}
        textAnchor="middle"
        fill="var(--ink)"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: "600",
        }}
      >
        {label}
      </text>
    </motion.g>
  );
}

function Badge({ x, y, text, accent = false, delay = 0 }) {
  const w = text.length * 5.8 + 18;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease }}
    >
      <rect
        x={x - w / 2}
        y={y - 10}
        width={w}
        height={20}
        rx={10}
        fill={accent ? "var(--accent-primary)" : "var(--surface-soft)"}
        fillOpacity={accent ? 0.12 : 1}
        stroke={accent ? "var(--accent-primary)" : "var(--rule)"}
        strokeWidth="0.5"
      />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fill={accent ? "var(--accent-primary)" : "var(--muted)"}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "8.5px",
          fontWeight: accent ? "600" : "400",
        }}
      >
        {text}
      </text>
    </motion.g>
  );
}

export function CombinedGraphDiagram() {
  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 700 400"
        className="w-full h-auto"
        aria-label="Combined graph showing work history on the left and verified facts on the right, connected by the latest attempt"
      >
        <defs>
          <linearGradient id="cgWorkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cgFactGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-success)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent-success)" stopOpacity="0.02" />
          </linearGradient>

          <filter id="cgNodeShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
          </filter>
          <filter id="cgGlowFact">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="var(--accent-success)" floodOpacity="0.25" />
          </filter>

          <marker id="cgWorkArrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent-primary)" strokeWidth="0.8" />
          </marker>
          <marker id="cgFactArrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent-success)" strokeWidth="0.8" />
          </marker>
          <marker id="cgBridgeArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="none" stroke="var(--muted)" strokeWidth="0.9" />
          </marker>
        </defs>

        {/* ══════ WORK HISTORY PANEL ══════ */}
        <g>
          <rect x="8" y="8" width="210" height="384" rx="14" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" />
          <line x1="26" y1="8" x2="120" y2="8" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" />

          <text x="26" y="38" fill="var(--ink)" style={{ fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "12px", letterSpacing: "0.08em" }}>
            WORK HISTORY
          </text>
          <text x="26" y="53" fill="var(--muted)" style={{ fontFamily: "var(--font-mono)", fontSize: "9px" }}>
            What was attempted
          </text>

          {/* Vertical guide */}
          <line x1="113" y1="72" x2="113" y2="378" stroke="var(--rule)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />

          {/* Edges */}
          <motion.line x1="113" y1="100" x2="113" y2="162" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.45" markerEnd="url(#cgWorkArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3, ease }} />
          <motion.line x1="113" y1="210" x2="113" y2="272" stroke="var(--accent-primary)" strokeWidth="1.5" opacity="0.45" markerEnd="url(#cgWorkArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.45, ease }} />

          {/* Attempt 1 */}
          <WorkNode cx={113} cy={130} label="1" delay={0.2} />
          {/* Attempt 2 */}
          <WorkNode cx={113} cy={238} label="2" delay={0.35} />
          {/* Attempt 3 (latest) */}
          <WorkNode cx={113} cy={346} label="3" delay={0.5} />

          {/* Badges */}
          <Badge x={175} y={130} text="superseded" delay={0.4} />
          <Badge x={175} y={238} text="superseded" delay={0.5} />
          <Badge x={178} y={346} text="latest attempt" accent delay={0.6} />
        </g>

        {/* ══════ BRIDGE CONNECTION ══════ */}
        <motion.path
          d="M 218 346 C 260 346, 260 210, 310 210"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.3"
          strokeDasharray="5 3"
          opacity="0.45"
          markerEnd="url(#cgBridgeArrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
        />
        <motion.text
          x="264"
          y="268"
          textAnchor="middle"
          fill="var(--muted)"
          style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.04em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          reads facts
        </motion.text>

        {/* ══════ FACTS GRAPH ══════ */}
        <g>
          <rect x="310" y="8" width="382" height="384" rx="14" fill="var(--surface)" stroke="var(--card-border)" strokeWidth="1" />
          <line x1="328" y1="8" x2="410" y2="8" stroke="var(--accent-success)" strokeWidth="2.5" strokeLinecap="round" />

          <text x="328" y="38" fill="var(--ink)" style={{ fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "12px", letterSpacing: "0.08em" }}>
            FACTS
          </text>
          <text x="328" y="53" fill="var(--muted)" style={{ fontFamily: "var(--font-mono)", fontSize: "9px" }}>
            What turned out to be true
          </text>

          {/* Edges */}
          <motion.line x1="500" y1="115" x2="580" y2="220" stroke="var(--accent-success)" strokeWidth="1.5" opacity="0.45" markerEnd="url(#cgFactArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5, ease }} />
          <motion.line x1="465" y1="115" x2="390" y2="220" stroke="var(--accent-success)" strokeWidth="1.5" opacity="0.45" markerEnd="url(#cgFactArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.55, ease }} />
          <motion.line x1="408" y1="250" x2="562" y2="250" stroke="var(--accent-success)" strokeWidth="1.5" opacity="0.45" markerEnd="url(#cgFactArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6, ease }} />

          {/* Service (top) */}
          <FactNode cx={500} cy={86} label="Service" delay={0.45} />
          {/* Owner (right) */}
          <FactNode cx={580} cy={250} label="Owner" delay={0.55} />
          {/* Receipt (left) */}
          <FactNode cx={390} cy={250} label="Receipt" delay={0.65} />

          {/* Verified badge */}
          <Badge x={500} y={330} text="verified fact" accent delay={0.75} />
        </g>
      </svg>
    </div>
  );
}
