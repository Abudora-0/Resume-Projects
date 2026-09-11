"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

const MIN_THUMB = 28;

/**
 * Replaces the native page scrollbar entirely.
 *
 * Windows 11's Fluent overlay scrollbar renders its own arrow buttons outside
 * the page's box model, so no amount of ::-webkit-scrollbar-button CSS can
 * remove them there. The only way to guarantee the theme owns every pixel of
 * the scrollbar, on every platform, is to hide the native one (see globals.css)
 * and draw this instead. Keyboard and wheel scrolling are untouched, since
 * this never intercepts them, only the drag and click-to-jump affordances are
 * new.
 *
 * Skipped entirely on coarse pointers: touch scrolling already has its own
 * platform-native indicator, and a mouse-drag thumb has nothing to do there.
 */
export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const supported = useMediaQuery("(pointer: fine)");
  const [metrics, setMetrics] = useState({ height: 0, top: 0, trackHeight: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef(0);

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const viewport = window.innerHeight;
    const scrollable = doc.scrollHeight;
    const trackHeight = viewport;

    if (scrollable <= viewport + 1) {
      setMetrics({ height: 0, top: 0, trackHeight });
      return;
    }

    const thumbHeight = Math.max(MIN_THUMB, (viewport / scrollable) * trackHeight);
    const maxScroll = scrollable - viewport;
    const maxThumbTravel = trackHeight - thumbHeight;
    const top = maxScroll > 0 ? (window.scrollY / maxScroll) * maxThumbTravel : 0;

    setMetrics({ height: thumbHeight, top, trackHeight });
  }, []);

  useEffect(() => {
    if (!supported) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        measure();
        frame = 0;
      });
    };

    // Deferred through the same rAF the scroll handler uses, rather than
    // measuring synchronously here, so mounting never sets state mid-render.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Content height changes from things scroll alone never reports: the work
    // index toggling views, images finishing load, a section expanding.
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [supported, measure]);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const doc = document.documentElement;
      const viewport = window.innerHeight;
      const scrollable = doc.scrollHeight;
      const thumbHeight = Math.max(MIN_THUMB, (viewport / scrollable) * trackRect.height);
      const maxThumbTravel = trackRect.height - thumbHeight;
      const rawTop = event.clientY - trackRect.top - dragOffset.current;
      const clampedTop = Math.min(Math.max(rawTop, 0), maxThumbTravel);
      const maxScroll = scrollable - viewport;
      window.scrollTo(0, maxThumbTravel > 0 ? (clampedTop / maxThumbTravel) * maxScroll : 0);
    };
    const onUp = () => setDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  if (!supported || metrics.height === 0) return null;

  const onThumbDown = (event: React.PointerEvent) => {
    event.preventDefault();
    const thumbRect = event.currentTarget.getBoundingClientRect();
    dragOffset.current = event.clientY - thumbRect.top;
    setDragging(true);
  };

  // A click on the bare track (not the thumb) jumps one viewport toward it,
  // the same convention native scrollbar tracks use.
  const onTrackDown = (event: React.PointerEvent) => {
    if (event.target !== trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = event.clientY - trackRect.top;
    const direction = clickY < metrics.top ? -1 : 1;
    window.scrollBy({ top: direction * window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div
      ref={trackRef}
      className="cscroll-track"
      aria-hidden
      onPointerDown={onTrackDown}
    >
      <div
        className={`cscroll-thumb ${dragging ? "is-dragging" : ""}`}
        style={{ height: metrics.height, top: metrics.top }}
        onPointerDown={onThumbDown}
      />
    </div>
  );
}
