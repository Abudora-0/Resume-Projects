"use client";

import { usePrefersReducedMotion } from "@/lib/hooks";

const NAME = "abudora";

/**
 * The identity: no icon, just the name set in Fraunces. Each letter rides up
 * out of a clipped mask, the same reveal used by KineticHeading elsewhere on
 * the page, so the logo and the section headings read as one system.
 *
 * The letters are aria-hidden and the real string sits on the parent, because
 * split text reads as seven separate characters to a screen reader.
 */
export function Wordmark({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "lg" | "xl";
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <span
      className={`wm wm-${size} ${reduce ? "" : "is-setting"} ${className}`}
      aria-label="Abudora"
      role="img"
    >
      <span className="wm-letters" aria-hidden>
        {NAME.split("").map((letter, i) => (
          <span key={`${letter}-${i}`} className="wm-mask">
            <span
              className="wm-letter"
              style={reduce ? undefined : { animationDelay: `${90 + i * 60}ms` }}
            >
              {letter}
            </span>
          </span>
        ))}
      </span>
      <span className="wm-rule" aria-hidden />
    </span>
  );
}
