"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects, EMAIL, GITHUB, LINKEDIN } from "@/lib/projects";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: string;
  accent?: string;
  run: () => void;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const commands = useMemo<Command[]>(() => {
    // Built group by group, not project by project: the list renders a header
    // whenever the group changes, so interleaving would repeat every header.
    const jump: Command[] = [];
    const open: Command[] = [];

    for (const project of projects) {
      jump.push({
        id: `go-${project.slug}`,
        label: project.name,
        hint: project.languageLabel,
        group: "Work",
        accent: project.accent,
        run: () => scrollToId(`project-${project.slug}`),
      });
      if (project.live && project.embeddable) {
        open.push({
          id: `frame-${project.slug}`,
          label: `${project.name}: live preview`,
          hint: "Opens in a frame",
          group: "Open",
          accent: project.accent,
          run: () =>
            window.dispatchEvent(
              new CustomEvent("portfolio:preview", { detail: project.slug }),
            ),
        });
      }
      if (project.live) {
        open.push({
          id: `live-${project.slug}`,
          label: `${project.name}: open live site`,
          hint: project.live.replace(/^https:\/\//, ""),
          group: "Open",
          accent: project.accent,
          run: () => window.open(project.live, "_blank", "noopener,noreferrer"),
        });
      }
      open.push({
        id: `src-${project.slug}`,
        label: `${project.name}: open source`,
        hint: "GitHub",
        group: "Open",
        accent: project.accent,
        run: () => window.open(project.source, "_blank", "noopener,noreferrer"),
      });
    }

    const navigate: Command[] = ["work", "about", "contact"].map((section) => ({
      id: `sec-${section}`,
      label: section[0].toUpperCase() + section.slice(1),
      hint: "Section",
      group: "Navigate",
      run: () => scrollToId(section),
    }));

    const actions: Command[] = [
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "m-abdullah",
        group: "Actions",
        run: () => window.open(LINKEDIN, "_blank", "noopener,noreferrer"),
      },
      {
        id: "github",
        label: "Open GitHub profile",
        hint: "Abudora-0",
        group: "Actions",
        run: () => window.open(GITHUB, "_blank", "noopener,noreferrer"),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: EMAIL,
        group: "Actions",
        run: () => navigator.clipboard?.writeText(EMAIL),
      },
      {
        id: "toggle-view",
        label: "Switch index and contact sheet",
        hint: "Work view",
        group: "Actions",
        run: () => window.dispatchEvent(new CustomEvent("portfolio:toggle-view")),
      },
    ];

    return [...jump, ...open, ...navigate, ...actions];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Global shortcut.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        restoreTo.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
    };
    const onRequest = () => {
      restoreTo.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("portfolio:open-palette", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portfolio:open-palette", onRequest);
    };
  }, []);

  // Focus goes into the field on open and back where it came from on close,
  // or a keyboard user is stranded with nothing focused.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      restoreTo.current?.focus?.();
      restoreTo.current = null;
      wasOpen.current = false;
    }
  }, [open]);

  // Keep the highlighted row in view as the selection walks past the fold.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[active];
      if (command) {
        close();
        command.run();
      }
    } else if (event.key === "Tab") {
      // Only one focusable element in here, so the trap is simply: stay put.
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <div className="cp-backdrop" onMouseDown={close}>
      <div
        className="cp"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cp-field">
          <span className="cp-prompt" aria-hidden>
            /
          </span>
          <input
            ref={inputRef}
            className="cp-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search projects, sections, actions"
            aria-label="Search commands"
            aria-controls="cp-list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cp-kbd">Esc</kbd>
        </div>

        <ul id="cp-list" ref={listRef} className="cp-list" role="listbox" aria-label="Commands">
          {results.length === 0 ? (
            <li className="cp-empty">Nothing matches that.</li>
          ) : (
            results.map((command, i) => {
              const header = command.group !== lastGroup ? command.group : null;
              lastGroup = command.group;
              return (
                <li key={command.id}>
                  {header ? <p className="cp-group">{header}</p> : null}
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    data-active={i === active}
                    className="cp-row"
                    style={command.accent ? { ["--pc" as string]: command.accent } : undefined}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      close();
                      command.run();
                    }}
                  >
                    <span className="cp-dot" aria-hidden />
                    <span className="cp-label">{command.label}</span>
                    <span className="cp-hint">{command.hint}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
