import { useId } from "react";

import {
  COLUMN_X,
  HUB_CANVAS,
  HUB_HALF_WIDTH,
  INTEGRATION_ACTIONS,
  INTEGRATION_TRIGGERS,
  NODE_HALF_WIDTH,
  nodeY,
} from "../../constants/integration-flows";

/** How far a curve's control points pull away from a node and from the hub. */
const PULL = { node: 120, hub: 90 } as const;
/** Room left before a node or the hub so arrowheads don't touch their edge. */
const ARROW_GAP = 6;

interface Point {
  x: number;
  y: number;
}

interface Connector {
  from: Point;
  to: Point;
  /** Control-point pull at each end. */
  pullFrom: number;
  pullTo: number;
}

/** A horizontal S-curve that leaves `from` and arrives at `to` level. */
function connectorPath({ from, to, pullFrom, pullTo }: Connector): string {
  const direction = Math.sign(to.x - from.x);
  return `M${from.x} ${from.y} C ${from.x + direction * pullFrom} ${from.y}, ${to.x - direction * pullTo} ${to.y}, ${to.x} ${to.y}`;
}

const HUB_LEFT: Point = {
  x: HUB_CANVAS.centerX - HUB_HALF_WIDTH - ARROW_GAP,
  y: HUB_CANVAS.centerY,
};
const HUB_RIGHT: Point = {
  x: HUB_CANVAS.centerX + HUB_HALF_WIDTH,
  y: HUB_CANVAS.centerY,
};

/** Triggers flow into the hub; the hub flows out to actions. */
const CONNECTOR_PATHS: readonly string[] = [
  ...INTEGRATION_TRIGGERS.map((_, index) =>
    connectorPath({
      from: {
        x: COLUMN_X.trigger + NODE_HALF_WIDTH,
        y: nodeY(index, INTEGRATION_TRIGGERS.length),
      },
      to: HUB_LEFT,
      pullFrom: PULL.node,
      pullTo: PULL.hub,
    }),
  ),
  ...INTEGRATION_ACTIONS.map((_, index) =>
    connectorPath({
      from: HUB_RIGHT,
      to: {
        x: COLUMN_X.action - NODE_HALF_WIDTH - ARROW_GAP,
        y: nodeY(index, INTEGRATION_ACTIONS.length),
      },
      pullFrom: PULL.hub,
      pullTo: PULL.node,
    }),
  ),
];

/** Dashed curves that carry events in from triggers and out to actions. */
export function HubConnectors() {
  const id = useId();
  const gradientId = `${id}-stroke`;
  const arrowId = `${id}-arrow`;
  const { width, height } = HUB_CANVAS;

  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <defs>
        {/* Sized to the canvas, not each path, so straight connectors still render. */}
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={width}
          y2="0"
        >
          <stop
            offset="0"
            style={{ stopColor: "var(--primary)", stopOpacity: 0.35 }}
          />
          <stop offset="0.5" style={{ stopColor: "var(--accent-text)" }} />
          <stop
            offset="1"
            style={{ stopColor: "var(--primary)", stopOpacity: 0.35 }}
          />
        </linearGradient>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path
            d="M2 1.5 L8 5 L2 8.5"
            fill="none"
            strokeWidth="1.5"
            style={{ stroke: "var(--accent-text)" }}
          />
        </marker>
      </defs>
      {CONNECTOR_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          markerEnd={`url(#${arrowId})`}
          className="motion-safe:animate-dash"
        />
      ))}
    </svg>
  );
}
