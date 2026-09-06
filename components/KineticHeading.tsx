"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Accent colour applied to a trailing full stop or question mark. */
  punctuation?: string;
};

/**
 * Headings that set themselves as they scroll into view: each word rides up out
 * of a mask, staggered.
 *
 * Split text reads as loose characters to a screen reader, so the pieces are
 * aria-hidden and the real string sits on the element via aria-label. The
 * visible state is a class on the DOM node, following components/Reveal.tsx, so
 * nothing re-renders.
 */
export function KineticHeading({
  text,
  as: Tag = "h2",
  className = "",
  punctuation,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add("is-set");

    if (reduce || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    if (node.getBoundingClientRect().top < window.innerHeight) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  const words = text.split(" ");

  return (
    <Tag
      ref={ref as never}
      className={`kin ${className}`}
      aria-label={punctuation ? `${text}${punctuation}` : text}
    >
      {words.map((word, i) => (
        <span className="kin-mask" key={`${word}-${i}`} aria-hidden>
          <span className="kin-word" style={{ transitionDelay: `${i * 55}ms` }}>
            {word}
            {i === words.length - 1 && punctuation ? (
              <span className="text-accent">{punctuation}</span>
            ) : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
