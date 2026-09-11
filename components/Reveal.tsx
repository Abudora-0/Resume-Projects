"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { observeOnce } from "@/lib/observerPool";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in ms, applied only on first reveal. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Fades content up as it scrolls into view. The visible state lives on the DOM
 * node as a class rather than in React state, so nothing else re-renders and
 * the CSS in globals.css owns the transition.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add("is-visible");

    if (reduce || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    // Anything already on screen at mount reveals straight away, so the fold is
    // never left blank waiting on an observer callback.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      show();
      return;
    }

    return observeOnce(node, show, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    });
  }, [reduce]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
