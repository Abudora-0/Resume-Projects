"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";
import { useAccent } from "@/components/AccentProvider";
import { GLYPHS } from "@/components/brand/glyphs";
import { ArrowUpRight } from "@/components/icons";

/** The dense contact sheet cell: screenshot, glyph, claim. */
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
      <div className="sheet-shot">
        {project.preview ? (
          <Image
            src={project.preview}
            alt={`Screenshot of ${project.name}`}
            width={1200}
            height={750}
            sizes="(max-width: 640px) 100vw, 300px"
            className="sheet-img"
          />
        ) : (
          <span className="sheet-empty mono-label">{project.runNote}</span>
        )}
        <svg viewBox="0 0 64 64" className="sheet-glyph" aria-hidden>
          {GLYPHS[project.glyph](project.accent)}
        </svg>
      </div>

      <div className="sheet-body">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-medium text-ink">{project.name}</h3>
          <span className="mono-label">{num}</span>
        </div>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">{project.tagline}</p>
        <p className="mono-label mt-3 text-[var(--pc)]">{project.languageLabel}</p>

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
      </div>
    </article>
  );
}
