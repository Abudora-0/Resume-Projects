"use client";

import { createContext, useCallback, useContext } from "react";

type AccentApi = {
  /** Repaint the page chrome in this colour. */
  possess: (accent: string) => void;
  /** Hand the chrome back to the site's own accent. */
  release: () => void;
};

const AccentContext = createContext<AccentApi>({
  possess: () => {},
  release: () => {},
});

export const useAccent = () => useContext(AccentContext);

/**
 * Accent possession.
 *
 * Everything themable on the page (scrollbar thumb, selection, focus ring,
 * scroll progress, the view toggle) reads a single --pc-active custom property.
 * Hovering or focusing a project entry writes that project's accent into it, so
 * the browser chrome itself takes on the design language you are reading about.
 *
 * Written straight to documentElement.style rather than through React state,
 * because re-rendering the whole page just to change a colour would be wasteful
 * and the CSS transition on each consumer already smooths the change.
 */
export function AccentProvider({ children }: { children: React.ReactNode }) {
  const write = useCallback((value: string | null) => {
    const root = document.documentElement;
    if (value) root.style.setProperty("--pc-active", value);
    else root.style.removeProperty("--pc-active");
  }, []);

  const possess = useCallback((accent: string) => write(accent), [write]);
  const release = useCallback(() => write(null), [write]);

  return (
    <AccentContext.Provider value={{ possess, release }}>
      {children}
    </AccentContext.Provider>
  );
}
