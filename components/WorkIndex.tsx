"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { projects, type Project } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SheetCard } from "@/components/SheetCard";
import { Reveal } from "@/components/Reveal";
import { Select } from "@/components/ui/Select";
import { createStoredState } from "@/lib/storedState";

type View = "index" | "sheet";
type Sort = "featured" | "alpha" | "live";

const isView = (value: string): value is View => value === "index" || value === "sheet";

const viewStore = createStoredState<View>("portfolio:view", "index", isView);

const SORTS = [
  { value: "featured" as const, label: "Featured" },
  { value: "alpha" as const, label: "A to Z" },
  { value: "live" as const, label: "Live first" },
];

function sortProjects(list: Project[], sort: Sort): Project[] {
  if (sort === "alpha") {
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "live") {
    return [...list].sort((a, b) => Number(Boolean(b.live)) - Number(Boolean(a.live)));
  }
  return list;
}

/**
 * Owns how the eight entries are presented. Everything else on the page stays a
 * server component; the interactivity lives here.
 */
export function WorkIndex() {
  const view = useSyncExternalStore(
    viewStore.subscribe,
    viewStore.get,
    viewStore.getServerSnapshot,
  );
  const [sort, setSort] = useState<Sort>("featured");

  const applyView = useCallback((next: View) => {
    const commit = () => viewStore.set(next);

    // Free FLIP-style crossfade where the browser supports it.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(commit);
    } else {
      commit();
    }
  }, []);

  // The command palette can flip the view from anywhere on the page.
  useEffect(() => {
    const onToggle = () => applyView(view === "index" ? "sheet" : "index");
    window.addEventListener("portfolio:toggle-view", onToggle);
    return () => window.removeEventListener("portfolio:toggle-view", onToggle);
  }, [applyView, view]);

  const ordered = useMemo(() => sortProjects(projects, sort), [sort]);

  return (
    <>
      <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-edge pb-4">
        <h2 className="font-display text-xl font-medium text-ink">Selected work</h2>

        <div className="flex flex-wrap items-center gap-3">
          <Select label="Sort" value={sort} options={SORTS} onChange={setSort} />

          <div className="seg" role="group" aria-label="View">
            <button
              type="button"
              className={`seg-btn ${view === "index" ? "is-on" : ""}`}
              aria-pressed={view === "index"}
              onClick={() => applyView("index")}
            >
              Index
            </button>
            <button
              type="button"
              className={`seg-btn ${view === "sheet" ? "is-on" : ""}`}
              aria-pressed={view === "sheet"}
              onClick={() => applyView("sheet")}
            >
              Sheet
            </button>
          </div>
        </div>
      </Reveal>

      {view === "index" ? (
        <div>
          {ordered.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      ) : (
        <ul className="sheet-grid">
          {ordered.map((project, i) => (
            <Reveal key={project.slug} as="li" delay={i * 45}>
              <SheetCard project={project} index={i} />
            </Reveal>
          ))}
        </ul>
      )}
    </>
  );
}
