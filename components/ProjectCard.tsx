"use client";

import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "@/components/icons";
import { useAccent } from "@/components/AccentProvider";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { possess, release } = useAccent();
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      id={`project-${project.slug}`}
      className="group relative grid scroll-mt-28 gap-x-10 gap-y-6 border-t border-edge py-12 md:grid-cols-12 md:py-16"
      style={{ ["--pc" as string]: project.accent }}
      onMouseEnter={() => possess(project.accent)}
      onMouseLeave={release}
      onFocus={() => possess(project.accent)}
      onBlur={release}
    >
      {/* accent tick */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-0 bg-[var(--pc)] transition-all duration-500 group-hover:w-full"
      />

      {/* left column, identity */}
      <div className="md:col-span-4 md:pr-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="mono-label">{num}</span>
          <span className="mono-label">{project.year}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink md:text-[2.1rem] md:leading-[1.05]">
          {project.name}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
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
          ) : (
            <span className="mono-label">{project.runNote}</span>
          )}
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

      {/* right column, detail */}
      <div className="md:col-span-8">
        <p className="mono-label text-[var(--pc)]">Design language</p>
        <p className="mt-2 font-display text-lg italic leading-snug text-ink/90 md:text-xl">
          {project.designLanguage}
        </p>

        <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-soft"
            >
              <span
                aria-hidden
                className="mt-[0.55em] size-1 shrink-0 rounded-full bg-[var(--pc)]"
              />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
          {project.stack.map((t) => (
            <li
              key={t}
              className="border border-edge px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-ink-faint"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
