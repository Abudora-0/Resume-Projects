"use client";

/**
 * A shared IntersectionObserver per distinct threshold/rootMargin
 * configuration, so Reveal, KineticHeading and Odometer don't each construct
 * their own observer. The page mounts roughly 30 instances of those three
 * components; without pooling that is 30 separate observers doing the same
 * kind of bookkeeping for only 3 distinct configs.
 *
 * Behavior is unchanged from the per-component observers this replaces: each
 * caller is unobserved the moment it first intersects, so nothing keeps
 * watching after it fires once.
 */

type Options = Pick<IntersectionObserverInit, "threshold" | "rootMargin">;

type Pool = {
  observer: IntersectionObserver;
  callbacks: WeakMap<Element, () => void>;
};

const pools = new Map<string, Pool>();

function keyFor(options: Options): string {
  return `${options.threshold ?? 0}|${options.rootMargin ?? "0px"}`;
}

function getPool(options: Options): Pool {
  const key = keyFor(options);
  let pool = pools.get(key);
  if (pool) return pool;

  const callbacks = new WeakMap<Element, () => void>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const callback = callbacks.get(entry.target);
      if (!callback) continue;
      callback();
      observer.unobserve(entry.target);
      callbacks.delete(entry.target);
    }
  }, options);

  pool = { observer, callbacks };
  pools.set(key, pool);
  return pool;
}

/**
 * Watches `el` and calls `onIntersect` the first time it enters the viewport
 * under the given threshold/rootMargin, then stops watching it. Returns a
 * cleanup function to cancel early (e.g. on unmount before it ever fires).
 */
export function observeOnce(
  el: Element,
  onIntersect: () => void,
  options: Options,
): () => void {
  const { observer, callbacks } = getPool(options);
  callbacks.set(el, onIntersect);
  observer.observe(el);
  return () => {
    observer.unobserve(el);
    callbacks.delete(el);
  };
}
