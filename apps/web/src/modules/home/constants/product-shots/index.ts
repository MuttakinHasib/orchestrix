import type { StaticImageData } from "next/image";

import workBoardDark from "@/modules/home/assets/product-shots/work-board-dark.webp";
import workBoardLight from "@/modules/home/assets/product-shots/work-board-light.webp";
import workflowBuilderDark from "@/modules/home/assets/product-shots/workflow-builder-dark.webp";
import workflowBuilderLight from "@/modules/home/assets/product-shots/workflow-builder-light.webp";

export interface ProductShot {
  alt: string;
  dark: StaticImageData;
  light: StaticImageData;
}

/**
 * Static captures of the app screens from the design. They stand in until the
 * real Work and Workflow modules exist and can be rendered live.
 */
export const PRODUCT_SHOTS = {
  workBoard: {
    alt: "The Orchestrix work board for an e-commerce project, with issues grouped into Backlog, In Progress, Review and Done.",
    dark: workBoardDark,
    light: workBoardLight,
  },
  workflowBuilder: {
    alt: "The workflow builder showing a Critical Bug Handler workflow: an issue-created trigger, a priority condition, and actions that assign the backend team, send a Slack message and create a GitHub issue.",
    dark: workflowBuilderDark,
    light: workflowBuilderLight,
  },
} as const satisfies Record<string, ProductShot>;
