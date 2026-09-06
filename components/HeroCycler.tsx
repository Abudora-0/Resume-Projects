"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/hooks";

const HOLD = 2200;

/**
 * The headline says the eight projects each have their own design language.
 * This makes the headline prove it: the phrase cycles through all eight, tinted
 * with the real accent and shifted in style to hint at the typography.
 *
 * The eight actual typefaces are deliberately not loaded. Orbitron, Archivo,
 * Courier Prime and friends would cost far more than the effect returns, so the
 * differentiation is colour plus a stylistic shift on the site's own families.
 */
const STYLE: Record<string, string> = {
  "codereview-sys": "font-mono uppercase tracking-[0.06em] text-[0.74em]",
  kernal: "font-mono uppercase tracking-[0.05em] text-[0.74em]",
  typeset: "font-sans font-semibold uppercase tracking-[-0.01em]",
  dossier: "font-mono tracking-[0.02em] text-[0.8em]",
  nexus: "font-sans uppercase tracking-[0.1em] text-[0.72em]",
  tessera: "font-sans tracking-[-0.01em]",
  "dish-it": "font-display italic",
  wanderlens: "font-display italic tracking-[0.01em]",
};

export function HeroCycler() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % projects.length),
      HOLD,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  const longest = projects.reduce(
    (a, b) => (b.languageLabel.length > a.length ? b.languageLabel : a),
    "",
  );

  return (
    <span className="cyc">
      {/* Reserves the width of the longest phrase so nothing reflows mid-cycle. */}
      <span className="cyc-sizer" aria-hidden>
        {longest}.
      </span>
      {projects.map((project, i) => (
        <span
          key={project.slug}
          className={`cyc-item ${STYLE[project.slug] ?? ""} ${
            i === index ? "is-current" : ""
          }`}
          style={{ color: project.accent }}
          aria-hidden={i !== index}
        >
          {project.languageLabel}.
        </span>
      ))}
    </span>
  );
}
