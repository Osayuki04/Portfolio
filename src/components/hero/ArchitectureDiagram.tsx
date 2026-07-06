"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type NodeId = "frontend" | "mobile" | "backend" | "apis" | "database";

type Node = {
  id: NodeId;
  label: string;
  cx: number;
  cy: number;
};

const nodes: Node[] = [
  { id: "frontend", label: "Frontend", cx: 168, cy: 96 },
  { id: "mobile", label: "Mobile", cx: 392, cy: 128 },
  { id: "backend", label: "Backend", cx: 150, cy: 256 },
  { id: "apis", label: "APIs", cx: 322, cy: 332 },
  { id: "database", label: "Database", cx: 84, cy: 372 },
];

type Edge = { from: NodeId; to: NodeId; d: string };

const edges: Edge[] = [
  { from: "frontend", to: "mobile", d: "M214,96 H352" },
  { from: "frontend", to: "backend", d: "M168,134 V214" },
  { from: "mobile", to: "backend", d: "M392,166 V256 H214" },
  { from: "backend", to: "apis", d: "M196,268 H322 V300" },
  { from: "backend", to: "database", d: "M150,298 V372 H120" },
  { from: "apis", to: "database", d: "M286,344 H118" },
];

const neighbors: Record<NodeId, Set<NodeId>> = nodes.reduce(
  (acc, n) => ({ ...acc, [n.id]: new Set<NodeId>() }),
  {} as Record<NodeId, Set<NodeId>>
);
edges.forEach((e) => {
  neighbors[e.from].add(e.to);
  neighbors[e.to].add(e.from);
});

export function ArchitectureDiagram() {
  const [active, setActive] = useState<NodeId | null>(null);

  const isNodeHot = (id: NodeId) =>
    active !== null && (active === id || neighbors[active].has(id));
  const isEdgeHot = (e: Edge) =>
    active !== null && (e.from === active || e.to === active);

  return (
    <div className="relative w-full">
      {/* technical frame */}
      <div className="pointer-events-none absolute inset-0 corner-ticks" />
      <div className="overflow-hidden rounded-lg border border-border bg-surface/40">
        {/* schematic header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="label-tech text-faint">system.architecture</span>
          <span className="font-mono text-[10px] tracking-[0.12em] text-faint">
            fig.01
          </span>
        </div>

        <div className="grid-bg p-3 sm:p-4">
          <svg
            viewBox="0 0 460 440"
            className="h-full w-full"
            role="img"
            aria-label="Interactive system architecture: frontend, mobile, backend, APIs and database connected"
          >
            {/* connectors */}
            {edges.map((e, i) => {
              const hot = isEdgeHot(e);
              return (
                <g key={i}>
                  <path
                    d={e.d}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={hot ? 0.9 : 0.35}
                    strokeWidth={1.5}
                    strokeDasharray="2 5"
                    strokeLinecap="round"
                    className={
                      hot ? "text-accent animate-dashflow" : "text-faint"
                    }
                  />
                </g>
              );
            })}

            {/* nodes */}
            {nodes.map((n, i) => (
              <Glyph
                key={n.id}
                node={n}
                hot={isNodeHot(n.id)}
                active={active === n.id}
                delay={0.15 + i * 0.1}
                onEnter={() => setActive(n.id)}
                onLeave={() => setActive(null)}
              />
            ))}
          </svg>
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-4 py-2.5">
          {nodes.map((n) => (
            <button
              key={n.id}
              type="button"
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                isNodeHot(n.id) ? "text-accent" : "text-faint"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Glyph({
  node,
  hot,
  active,
  delay,
  onEnter,
  onLeave,
}: {
  node: Node;
  hot: boolean;
  active: boolean;
  delay: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const strokeOpacity = hot ? 1 : 0.55;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
      className={hot ? "text-accent" : "text-faint"}
    >
      {active && (
        <circle
          cx={node.cx}
          cy={node.cy}
          r={36}
          fill="currentColor"
          fillOpacity={0.05}
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeDasharray="2 4"
        />
      )}
      <g
        stroke="currentColor"
        strokeOpacity={strokeOpacity}
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {renderShape(node)}
      </g>
      <text
        x={node.cx}
        y={node.cy + 44}
        textAnchor="middle"
        className={`font-mono ${hot ? "text-content" : "text-faint"}`}
        style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" }}
        fill="currentColor"
        stroke="none"
      >
        {node.label}
      </text>
    </motion.g>
  );
}

function renderShape({ id, cx, cy }: Node) {
  switch (id) {
    case "frontend":
      return (
        <>
          <rect x={cx - 46} y={cy - 28} width={92} height={56} rx={4} />
          <line x1={cx - 46} y1={cy - 14} x2={cx + 46} y2={cy - 14} />
          <circle cx={cx - 38} cy={cy - 21} r={1.4} />
          <circle cx={cx - 31} cy={cy - 21} r={1.4} />
          <circle cx={cx - 24} cy={cy - 21} r={1.4} />
          <path d={`M${cx - 10},${cy} l-7,7 l7,7`} />
          <path d={`M${cx + 10},${cy} l7,7 l-7,7`} />
          <line x1={cx + 2} y1={cy - 2} x2={cx - 2} y2={cy + 16} />
        </>
      );
    case "mobile":
      return (
        <>
          <rect x={cx - 20} y={cy - 34} width={40} height={68} rx={6} />
          <line x1={cx - 8} y1={cy - 28} x2={cx + 8} y2={cy - 28} />
          <line x1={cx - 7} y1={cy + 27} x2={cx + 7} y2={cy + 27} />
          <path d={`M${cx - 4},${cy - 6} l-6,6 l6,6`} />
          <path d={`M${cx + 4},${cy - 6} l6,6 l-6,6`} />
        </>
      );
    case "backend":
      return (
        <>
          <rect x={cx - 46} y={cy - 28} width={92} height={56} rx={4} />
          <line x1={cx - 46} y1={cy - 14} x2={cx + 46} y2={cy - 14} />
          <circle cx={cx - 38} cy={cy - 21} r={1.4} />
          <circle cx={cx - 31} cy={cy - 21} r={1.4} />
          <path d={`M${cx - 30},${cy} l9,8 l-9,8`} />
          <line x1={cx - 14} y1={cy + 16} x2={cx + 6} y2={cy + 16} />
        </>
      );
    case "apis":
      return (
        <>
          <rect x={cx - 28} y={cy - 28} width={56} height={56} rx={6} />
          <path d={`M${cx - 6},${cy - 14} q-8,0 -8,8 q0,6 -5,6 q5,0 5,6 q0,8 8,8`} />
          <path d={`M${cx + 6},${cy - 14} q8,0 8,8 q0,6 5,6 q-5,0 -5,6 q0,8 -8,8`} />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx={cx} cy={cy - 22} rx={26} ry={9} />
          <path d={`M${cx - 26},${cy - 22} V${cy + 16}`} />
          <path d={`M${cx + 26},${cy - 22} V${cy + 16}`} />
          <path d={`M${cx - 26},${cy + 16} a26,9 0 0 0 52,0`} />
          <path d={`M${cx - 26},${cy - 4} a26,9 0 0 0 52,0`} />
        </>
      );
  }
}
