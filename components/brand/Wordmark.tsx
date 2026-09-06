"use client";

import { usePrefersReducedMotion } from "@/lib/hooks";

const NAME = "abudora";

/**
 * The identity: no icon, just the name set in Fraunces with the letters rising
 * one at a time and a chartreuse rule drawing itself underneath.
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
          <span
            key={`${letter}-${i}`}
            className="wm-letter"
            style={reduce ? undefined : { animationDelay: `${60 + i * 55}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className="wm-rule" aria-hidden />
    </span>
  );
}
