import { useCallback, useEffect, useState } from "react";

const SECOND_MS = 1000;

/** Whole seconds left until a deadline that starts `durationSeconds` from mount. */
export function useCountdown(durationSeconds: number) {
  const durationMs = durationSeconds * SECOND_MS;
  const [deadline, setDeadline] = useState(() => Date.now() + durationMs);
  const [now, setNow] = useState(() => Date.now());

  const remaining = Math.max(0, Math.ceil((deadline - now) / SECOND_MS));
  const isRunning = remaining > 0;

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => setNow(Date.now()), SECOND_MS);
    return () => window.clearInterval(timer);
  }, [deadline, isRunning]);

  const restart = useCallback(() => {
    const startedAt = Date.now();
    setNow(startedAt);
    setDeadline(startedAt + durationMs);
  }, [durationMs]);

  return { remaining, restart };
}
