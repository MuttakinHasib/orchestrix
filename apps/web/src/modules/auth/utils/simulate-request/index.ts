/**
 * Stand-in for a network round trip until the auth service is wired up.
 * Delete with the forms' toast once real submit handlers exist.
 */
export const AUTH_UNAVAILABLE_MESSAGE = "Authentication isn't connected yet.";

export const simulateRequest = (ms = 600) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
