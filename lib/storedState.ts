"use client";

/**
 * A tiny external store backed by localStorage, so a persisted preference can
 * be read through useSyncExternalStore instead of hydrated with a setState
 * inside an effect. That keeps the first client render correct and avoids the
 * cascading re-render the React lint rule warns about.
 *
 * Every localStorage touch is guarded: it throws outright in a private window
 * or with site data blocked, and the page has to work anyway.
 */
export function createStoredState<T extends string>(
  key: string,
  fallback: T,
  isValid: (value: string) => value is T,
) {
  const listeners = new Set<() => void>();
  let cache: T | null = null;

  const read = (): T => {
    if (cache !== null) return cache;
    try {
      const stored = window.localStorage.getItem(key);
      cache = stored !== null && isValid(stored) ? stored : fallback;
    } catch {
      cache = fallback;
    }
    return cache;
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    get: read,
    /** The server has no storage, so it always renders the default. */
    getServerSnapshot: () => fallback,
    set(value: T) {
      cache = value;
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* the preference simply will not persist */
      }
      listeners.forEach((listener) => listener());
    },
  };
}
