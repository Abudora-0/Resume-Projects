"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "@/components/icons";

/**
 * A captured screenshot of the project, with a live iframe of the real site
 * behind a button.
 *
 * The iframe mounts only while the modal is open. Rendering eight of them on
 * page load would mean loading eight entire sites before the visitor has read a
 * word.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const restoreTo = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setLoaded(false);
  }, []);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      restoreTo.current?.focus?.();
      restoreTo.current = null;
      wasOpen.current = false;
    }
  }, [open]);

  // The command palette can open this project's frame from anywhere on the page.
  useEffect(() => {
    const onRequest = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== project.slug) return;
      document.getElementById(`project-${project.slug}`)?.scrollIntoView({ block: "center" });
      setOpen(true);
    };
    window.addEventListener("portfolio:preview", onRequest);
    return () => window.removeEventListener("portfolio:preview", onRequest);
  }, [project.slug]);

  // Escape closes, and the page behind must not scroll while the frame is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  if (!project.preview) return null;

  const canFrame = project.live && project.embeddable;
  const host = project.live?.replace(/^https:\/\//, "").replace(/\/$/, "");

  return (
    <div className="pv" style={{ ["--pc" as string]: project.accent }}>
      <div className="pv-shot">
        <Image
          src={project.preview}
          alt={`Screenshot of ${project.name}`}
          width={1200}
          height={750}
          sizes="(max-width: 768px) 100vw, 640px"
          className="pv-img"
        />
        <span className="pv-glow" aria-hidden />
      </div>

      <div className="pv-actions">
        {canFrame ? (
          <button
            type="button"
            className="pv-btn"
            onClick={(event) => {
              restoreTo.current = event.currentTarget;
              setOpen(true);
            }}
          >
            <span className="pv-dot" aria-hidden />
            Live preview
          </button>
        ) : project.live ? (
          <a href={project.live} target="_blank" rel="noreferrer" className="pv-btn">
            <span className="pv-dot" aria-hidden />
            Open live site
            <ArrowUpRight className="size-3" />
          </a>
        ) : (
          <span className="mono-label">{project.runNote}</span>
        )}

        {project.live && !project.embeddable ? (
          <span className="mono-label pv-note">Blocks embedding</span>
        ) : null}
      </div>

      {open && project.live ? (
        <div className="pv-backdrop" onMouseDown={close}>
          <div
            className="pv-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Live preview of ${project.name}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="pv-chrome">
              <span className="pv-lights" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className="pv-url mono-label">{host}</span>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="mono-label pv-chrome-link"
              >
                Open
                <ArrowUpRight className="size-3" />
              </a>
              <button
                ref={closeRef}
                type="button"
                className="pv-close"
                onClick={close}
                aria-label="Close live preview"
              >
                Esc
              </button>
            </div>

            <div className="pv-frame-wrap">
              {!loaded ? <span className="pv-loading mono-label">Loading {host}</span> : null}
              <iframe
                src={project.live}
                title={`${project.name}, live`}
                className={`pv-frame ${loaded ? "is-loaded" : ""}`}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
