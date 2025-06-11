import { useRef, useCallback } from "react";

/**
 * useThrottle hook
 * @param callback Function to throttle
 * @param limit Number of allowed calls per interval
 * @param interval Interval in ms
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  limit: number,
  interval: number = 1000
): T {
  const callCountRef = useRef(0);
  const lastResetRef = useRef(Date.now());

  return useCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastResetRef.current > interval) {
      callCountRef.current = 0;
      lastResetRef.current = now;
    }
    if (callCountRef.current < limit) {
      callCountRef.current++;
      callback(...args);
    }
    // else: ignore call
  }, [callback, limit, interval]) as T;
}
