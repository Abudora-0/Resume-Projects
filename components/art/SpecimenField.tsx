"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The hero backdrop and the site's signature piece.
 *
 * A hairline grid with drifting geometric plates and registration crosshairs.
 * The layers parallax toward the pointer at different depths, so the page has
 * something alive behind the type without ever competing with it.
 *
 * Pointer tracking writes two CSS custom properties on the root node and lets
 * CSS do the transforms. Nothing re-renders, and the whole thing is one
 * decorative SVG with aria-hidden on it.
 */
export function SpecimenField() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;

    // Coarse pointers have no hover, so tracking would only cost battery.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (event.clientX / innerWidth - 0.5) * 2;
        const y = (event.clientY / innerHeight - 0.5) * 2;
        node.style.setProperty("--mx", x.toFixed(3));
        node.style.setProperty("--my", y.toFixed(3));
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div ref={ref} className="field" aria-hidden>
      <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" className="field-svg">
        <defs>
          <pattern id="fieldGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0v48" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          </pattern>
          <radialGradient id="fieldFade" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="fieldMask">
            <rect width="1200" height="760" fill="url(#fieldFade)" />
          </mask>
        </defs>

        {/* depth 1, the grid */}
        <g mask="url(#fieldMask)" className="field-layer field-d1 text-ink">
          <rect width="1200" height="760" fill="url(#fieldGrid)" />
        </g>

        {/* depth 2, plates */}
        <g mask="url(#fieldMask)" className="field-layer field-d2">
          <rect x="118" y="132" width="196" height="196" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <rect x="880" y="96" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.22" transform="rotate(14 955 171)" />
          <circle cx="1010" cy="560" r="104" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          <polygon points="196,600 292,600 244,516" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <rect x="560" y="612" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.16" transform="rotate(-9 620 672)" />
        </g>

        {/* depth 3, accent marks that drift */}
        <g mask="url(#fieldMask)" className="field-layer field-d3">
          <g className="field-drift" style={{ ["--dur" as string]: "34s" }}>
            <rect x="300" y="196" width="9" height="9" fill="var(--pc-active)" opacity="0.55" />
            <rect x="948" y="316" width="7" height="7" fill="var(--pc-active)" opacity="0.4" />
            <rect x="176" y="470" width="6" height="6" fill="var(--pc-active)" opacity="0.45" />
            <rect x="742" y="150" width="5" height="5" fill="var(--pc-active)" opacity="0.35" />
          </g>
          {/* registration crosshairs */}
          <g stroke="var(--pc-active)" strokeWidth="1.1" opacity="0.5">
            <path d="M96 96h18M105 87v18" />
            <path d="M1086 664h18M1095 655v18" />
          </g>
          <g stroke="currentColor" strokeWidth="1" opacity="0.24">
            <path d="M1086 96h18M1095 87v18" />
            <path d="M96 664h18M105 655v18" />
          </g>
        </g>
      </svg>
    </div>
  );
}
