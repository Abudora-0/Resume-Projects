"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Digit column roll. Each digit is a strip of 0 to 9 inside a 1em tall window
 * translated to -Nem, so the number physically rolls into place like a till.
 *
 * The rolling columns are aria-hidden and the true value sits in a visually
 * hidden span, so a screen reader hears the number once rather than every frame
 * of it. role="text" would be neater but only Safari implements it.
 */
export function Odometer({ value, className = "" }: { value: number; className?: string }) {
  const reduce = usePrefersReducedMotion();
  const [rolled, setRolled] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;

    // Anything already on screen rolls straight away, and so does everything
    // if the browser has no observer to wait on.
    const onScreen = node.getBoundingClientRect().top < window.innerHeight;
    if (onScreen || typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setRolled(true), 60);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRolled(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  const digits = String(value).split("");
  const settled = reduce || rolled;

  return (
    <span ref={ref} className={`odo ${className}`}>
      <span className="sr-only">{value}</span>
      {digits.map((digit, index) => (
        <span key={`${index}-${digits.length}`} className="odo-window" aria-hidden>
          <span
            className="odo-strip"
            style={{
              transform: `translateY(-${settled ? Number(digit) : 0}em)`,
              transitionDelay: reduce ? "0ms" : `${index * 90}ms`,
              transitionDuration: reduce ? "0ms" : undefined,
            }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="odo-digit">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
