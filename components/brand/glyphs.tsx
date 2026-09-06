import type { GlyphKey } from "@/lib/projects";

/**
 * One glyph per project, drawn inside a 64x64 box centred on 32,32.
 * Colour comes from the caller so the mark can pull each project's real accent
 * straight out of lib/projects.ts.
 */
export const GLYPHS: Record<GlyphKey, (c: string) => React.ReactNode> = {
  globe: (c) => (
    <g stroke={c} strokeWidth="2.6" fill="none" strokeLinecap="round">
      <circle cx="32" cy="32" r="13" />
      <path d="M19 32h26M32 19c5 6 5 20 0 26M32 19c-5 6-5 20 0 26" />
    </g>
  ),
  cloche: (c) => (
    <g fill={c}>
      <path d="M19 38a13 13 0 0 1 26 0z" />
      <rect x="16" y="40" width="32" height="3.4" rx="1.7" />
    </g>
  ),
  tessellation: (c) => (
    <g fill={c}>
      <polygon points="32,18 46,32 32,32" />
      <polygon points="32,32 46,32 32,46" opacity=".62" />
      <polygon points="18,32 32,18 32,32" opacity=".78" />
      <polygon points="18,32 32,32 32,46" opacity=".45" />
    </g>
  ),
  caret: (c) => (
    <g stroke={c} strokeWidth="2.8" fill="none" strokeLinecap="square">
      <path d="M20 23l8 9-8 9" />
      <rect x="33" y="38" width="12" height="3.4" fill={c} stroke="none" />
    </g>
  ),
  ticker: (c) => (
    <g fill={c}>
      <rect x="18" y="34" width="5" height="12" />
      <rect x="27" y="24" width="5" height="22" />
      <rect x="36" y="30" width="5" height="16" />
      <rect x="45" y="19" width="5" height="27" />
    </g>
  ),
  folder: (c) => (
    <g fill={c}>
      <path d="M16 22h13l3 4h16v22H16z" />
      <rect x="16" y="31" width="32" height="1.6" fill="#0c0c0d" opacity=".5" />
    </g>
  ),
  hexagon: (c) => (
    <g stroke={c} strokeWidth="2.6" fill="none" strokeLinejoin="round">
      <polygon points="32,17 46,25 46,40 32,48 18,40 18,25" />
      <circle cx="32" cy="32" r="4" fill={c} stroke="none" />
    </g>
  ),
  slab: (c) => (
    <g fill={c}>
      <rect x="18" y="18" width="9" height="28" />
      <rect x="31" y="18" width="15" height="4" />
      <rect x="31" y="26" width="15" height="4" opacity=".6" />
      <rect x="31" y="34" width="9" height="4" opacity=".35" />
    </g>
  ),
};
