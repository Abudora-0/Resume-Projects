"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { useIsMac } from "@/lib/hooks";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const mac = useIsMac();
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-edge bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 text-ink transition-opacity hover:opacity-70">
          <Mark />
          <span className="mono-label text-ink">M. Abdullah</span>
        </a>

        <nav className="flex items-center gap-5 sm:gap-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mono-label transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="hdr-k"
            aria-label="Open command palette"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("portfolio:open-palette"))
            }
          >
            <kbd>{mac ? "⌘" : "Ctrl"}</kbd>
            <kbd>K</kbd>
          </button>
        </nav>
      </div>

      {/* scroll progress, tinted by whichever entry is possessed */}
      <span className="hdr-progress" aria-hidden>
        <span ref={barRef} className="hdr-progress-bar" />
      </span>
    </header>
  );
}
