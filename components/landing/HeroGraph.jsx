"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NODE_COUNT = 18;
const EDGE_PAIRS = [
  [0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 5], [2, 6],
  [3, 7], [4, 8], [5, 8], [5, 9], [6, 9], [7, 10], [8, 11],
  [9, 12], [10, 13], [11, 14], [12, 14], [13, 15], [14, 16],
  [15, 17], [16, 17], [0, 5], [4, 9], [7, 11],
];

function generateNodes(width, height) {
  const nodes = [];
  const padding = 60;
  const w = width - padding * 2;
  const h = height - padding * 2;

  for (let i = 0; i < NODE_COUNT; i++) {
    const angle = (i / NODE_COUNT) * Math.PI * 2;
    const radiusX = w * 0.35 + Math.random() * w * 0.15;
    const radiusY = h * 0.3 + Math.random() * h * 0.15;
    nodes.push({
      id: i,
      x: width / 2 + Math.cos(angle) * radiusX + (Math.random() - 0.5) * 30,
      y: height / 2 + Math.sin(angle) * radiusY + (Math.random() - 0.5) * 30,
      size: 3 + Math.random() * 4,
      pulse: 0.4 + Math.random() * 0.6,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
    });
  }
  return nodes;
}

export function HeroGraph({ className = "" }) {
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const animFrameRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 400;
    const initial = generateNodes(w, h);
    nodesRef.current = initial;
    setNodes(initial);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || nodes.length === 0) return;

    function animate() {
      const current = nodesRef.current;
      const updated = current.map((n) => ({
        ...n,
        x: n.x + n.driftX,
        y: n.y + n.driftY,
      }));
      nodesRef.current = updated;
      setNodes([...updated]);
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [nodes.length, prefersReducedMotion]);

  const connectedNodes = useMemo(() => {
    if (hoveredNode === null) return new Set();
    const connected = new Set([hoveredNode]);
    for (const [a, b] of EDGE_PAIRS) {
      if (a === hoveredNode) connected.add(b);
      if (b === hoveredNode) connected.add(a);
    }
    return connected;
  }, [hoveredNode]);

  if (nodes.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full"
        aria-label="Animated graph network representing connected learning concepts"
        role="img"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlowActive" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGE_PAIRS.map(([a, b], i) => {
          const nodeA = nodes[a];
          const nodeB = nodes[b];
          if (!nodeA || !nodeB) return null;
          const isActive = connectedNodes.has(a) || connectedNodes.has(b);
          return (
            <motion.line
              key={`edge-${i}`}
              x1={nodeA.x}
              y1={nodeA.y}
              x2={nodeB.x}
              y2={nodeB.y}
              stroke={isActive ? "var(--accent-primary)" : "var(--edge-color)"}
              strokeWidth={isActive ? 1.5 : 0.8}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isActive ? 0.8 : 0.3 }}
              transition={{
                pathLength: { duration: 1.5, delay: i * 0.05, ease: "easeOut" },
                opacity: { duration: 0.3 },
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === i;
          const isConnected = connectedNodes.has(i);
          return (
            <g key={`node-${i}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size * 3}
                fill={isHovered ? "url(#nodeGlowActive)" : "url(#nodeGlow)"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isHovered ? 0.8 : isConnected ? 0.4 : 0.15,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill="var(--accent-primary)"
                opacity={isHovered ? 1 : isConnected ? 0.9 : node.pulse}
                filter={isHovered ? "url(#softGlow)" : undefined}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: "pointer" }}
              />
              {isHovered && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 6}
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
