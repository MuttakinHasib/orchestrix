import { useId } from "react";
import { cn } from "cn";

import {
  HUB_CANVAS,
  INTEGRATION_MARKS,
} from "../../constants/integration-marks";

/** Where connectors meet the hub card's left and right edges. */
const HUB_EDGE = { left: 470, right: 630 } as const;
/** Half a node's width: connectors start at the node's inner edge. */
const NODE_HALF_WIDTH = 70;
/** How far each curve's control points pull away from its ends. */
const PULL = { node: 140, hub: 90 } as const;

/** Dashed curves from each tool to the hub, with events flowing toward it. */
export function HubConnectors() {
  const gradientId = useId();
  const { width, height, centerY } = HUB_CANVAS;

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
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--primary)", stopOpacity: 0.25 }}
          />
          <stop offset="0.5" style={{ stopColor: "var(--accent-text)" }} />
          <stop
            offset="1"
            style={{ stopColor: "var(--primary)", stopOpacity: 0.25 }}
          />
        </linearGradient>
      </defs>
      {INTEGRATION_MARKS.map(({ name, x, y }) => {
        const isLeft = x < HUB_CANVAS.centerX;
        const direction = isLeft ? 1 : -1;
        const nodeEdge = x + direction * NODE_HALF_WIDTH;
        const hubEdge = isLeft ? HUB_EDGE.left : HUB_EDGE.right;

        return (
          <path
            key={name}
            d={`M${nodeEdge} ${y} C ${nodeEdge + direction * PULL.node} ${y}, ${hubEdge - direction * PULL.hub} ${centerY}, ${hubEdge} ${centerY}`}
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className={cn({
              "motion-safe:animate-dash-in": isLeft,
              "motion-safe:animate-dash-out": !isLeft,
            })}
          />
        );
      })}
    </svg>
  );
}
