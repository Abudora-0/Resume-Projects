"use client";

import type { Project } from "@/lib/projects";
import { useAccent } from "@/components/AccentProvider";
import { GLYPHS } from "@/components/brand/glyphs";
import { ArrowUpRight } from "@/components/icons";

/** The dense contact-sheet cell. One project, reduced to its glyph and claim. */
export function SheetCard({ project, index }: { project: Project; index: number }) {
  const { possess, release } = useAccent();
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="sheet-card group"
      style={{ ["--pc" as string]: project.accent }}
      onMouseEnter={() => possess(project.accent)}
      onMouseLeave={release}
      onFocus={() => possess(project.accent)}
      onBlur={release}
    >
      <div className="sheet-top">
        <svg viewBox="0 0 64 64" className="sheet-glyph" aria-hidden>
          {GLYPHS[project.glyph](project.accent)}
        </svg>
        <span className="mono-label">{num}</span>
      </div>

      <h3 className="mt-4 font-display text-xl font-medium text-ink">{project.name}</h3>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">{project.tagline}</p>
      <p className="mono-label mt-4 text-[var(--pc)]">{project.languageLabel}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="mono-label inline-flex items-center gap-1 text-ink transition-colors hover:text-[var(--pc)]"
          >
            Live
            <ArrowUpRight className="size-3" />
          </a>
        ) : null}
        <a
          href={project.source}
          target="_blank"
          rel="noreferrer"
          className="mono-label inline-flex items-center gap-1 transition-colors hover:text-ink"
        >
          Source
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </article>
  );
}
