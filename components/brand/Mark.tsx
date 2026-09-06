"use client";

import { projects } from "@/lib/projects";
import { useDocumentVisible, usePrefersReducedMotion } from "@/lib/hooks";
import { GLYPHS } from "@/components/brand/glyphs";

const STEP = 1.5; // seconds each glyph holds
const CYCLE = projects.length * STEP;

/**
 * The Shapeshifter. A hairline holding frame with the eight project glyphs
 * cycling through it, each in that project's own accent. The site's claim,
 * running in the corner of every page.
 */
export function Mark({ size = 34 }: { size?: number }) {
  const reduce = usePrefersReducedMotion();
  // Never start the cycle in a background tab, or the mark sits frozen part way
  // through its crossfade until the user comes back.
  const visible = useDocumentVisible();

  const animated = visible && !reduce;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="mark"
      role="img"
      aria-label="Muhammad Abdullah"
      style={{ ["--cycle" as string]: `${CYCLE}s` }}
    >
      <rect
        className={animated ? "mark-frame is-drawing" : "mark-frame"}
        x="9"
        y="9"
        width="46"
        height="46"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity=".28"
      />
      {projects.map((project, i) => (
        <g
          key={project.slug}
          className={animated ? "mark-glyph is-cycling" : "mark-glyph"}
          style={
            animated
              ? { animationDelay: `${i * STEP}s` }
              : { opacity: i === 0 ? 1 : 0 }
          }
        >
          {GLYPHS[project.glyph](project.accent)}
        </g>
      ))}
    </svg>
  );
}
