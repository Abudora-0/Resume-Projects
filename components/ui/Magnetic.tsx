"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Leans its child toward the cursor and springs back on leave.
 *
 * Offsets are written as CSS custom properties on the wrapper so CSS owns the
 * transform and React never re-renders during the move. Skipped entirely on
 * coarse pointers, where there is no hover to respond to.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
        node.style.setProperty("--mgx", `${dx.toFixed(2)}px`);
        node.style.setProperty("--mgy", `${dy.toFixed(2)}px`);
        frame = 0;
      });
    };

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      node.style.setProperty("--mgx", "0px");
      node.style.setProperty("--mgy", "0px");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, strength]);

  return (
    <span ref={ref} className={`mag ${className}`}>
      {children}
    </span>
  );
}
