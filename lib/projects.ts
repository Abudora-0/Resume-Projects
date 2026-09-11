export type GlyphKey =
  | "globe"
  | "cloche"
  | "tessellation"
  | "caret"
  | "ticker"
  | "folder"
  | "hexagon"
  | "slab";

export type Project = {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  /** The deliberate visual system the project was built inside. */
  designLanguage: string;
  /** Two or three words naming that system, for the hero cycler. */
  languageLabel: string;
  /** Which mark glyph stands for this project. */
  glyph: GlyphKey;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string;
  live?: string;
  source: string;
  /** Shown in place of a live link when there is none. */
  runNote?: string;
  /** Captured screenshot in public/previews. */
  preview?: string;
  /**
   * Whether the live site permits being framed. Dish It sends
   * X-Frame-Options: SAMEORIGIN, so an iframe of it renders blank.
   */
  embeddable?: boolean;
  /** Deeper route worth capturing instead of the landing page. */
  previewPath?: string;
};

export const projects: Project[] = [
  {
    slug: "wanderlens",
    name: "Wanderlens",
    year: "2026",
    tagline: "Spin a 3D globe, drop into any place on Earth, get the trip worth taking.",
    designLanguage:
      "Aperture optics. A photographic lens as the interface: an iris that opens on load, deep space blues, hairline reticles.",
    languageLabel: "an aperture",
    glyph: "globe",
    description:
      "Type a place or click a country on an interactive three.js globe and Wanderlens assembles one briefing: the best places to visit, blended and de-duplicated from Wikivoyage and geo-tagged Wikipedia, live weather with a seven day outlook, and full country context with animated counters. Every data source is fetched independently, so one slow or failing API degrades the page instead of breaking it.",
    highlights: [
      "Interactive WebGL globe with a cobe-rendered fallback",
      "Six open datasets merged, ranked and attributed at runtime",
      "No API keys, no accounts, no trackers, no database",
    ],
    stack: ["Next.js", "React", "TypeScript", "three.js", "Motion", "Lenis", "Tailwind CSS v4"],
    accent: "#38e1c4",
    live: "https://wanderlenss.vercel.app",
    source: "https://github.com/Abudora-0/wanderlens",
    preview: "/previews/wanderlens.webp",
    embeddable: true,
  },
  {
    slug: "dish-it",
    name: "Dish It",
    year: "2026",
    tagline: "Cook the thing you are actually craving.",
    designLanguage:
      "The interface is the food. The scrollbar drips like sauce, counters roll like an old till, the theme switch is a stove dial, dropdowns open like a lifting pot lid.",
    languageLabel: "a working kitchen",
    glyph: "cloche",
    description:
      "An animated recipe kitchen for food, shakes and drinks. Explore by flavour and mood on a draggable craving wheel, follow a full screen cook mode with stacking countdown timers and a screen wake lock, and build layered drinks in a mixer that fills the glass as you drop parts in. A saved cookbook, a categorised shopping list and a drag and drop weekly meal planner all live on-device with no account.",
    highlights: [
      "Full screen cook mode with stacking timers and servings scaling",
      "Drink mixer with live nutrition, a flavour radar and URL-encoded share links",
      "Command palette, per-recipe OG images, Recipe JSON-LD, PWA, a Konami code",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Framer Motion", "Sanity CMS", "Tailwind CSS 4", "PWA"],
    accent: "#e8724c",
    live: "https://dish-itt.vercel.app",
    preview: "/previews/dish-it.webp",
    embeddable: false,
    source: "https://github.com/Abudora-0/Dish-It",
  },
  {
    slug: "tessera",
    name: "Tessera",
    year: "2026",
    tagline: "A generative wallpaper studio. It does not store images, it draws them.",
    designLanguage:
      "Gallery instrument. Warm graphite, a single amber accent, Space Grotesk over Geist Mono, a shelf you curate. Calm chrome around a loud canvas.",
    languageLabel: "a gallery instrument",
    glyph: "tessellation",
    description:
      "Pick one of six drawing families, Waveform, Bauhaus, Halftone, Terrazzo, Ripple or Marble, and a palette, then tune seed, density, contrast, detail and turbulence until the composition is yours. Everything renders deterministically on a 2D canvas with no WebGL dependency, then exports pixel perfect for any phone, tablet or desktop up to 5K.",
    highlights: [
      "Six procedural drawing algorithms driven by simplex noise flow fields",
      "Deterministic seeds, so every wallpaper is a shareable number",
      "Pixel perfect export at device presets or a custom size",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Canvas 2D", "Zustand", "simplex-noise", "Tailwind CSS v4"],
    accent: "#8b7bff",
    live: "https://tesseera.vercel.app",
    preview: "/previews/tessera.webp",
    embeddable: true,
    source: "https://github.com/Abudora-0/tessera",
  },
  {
    slug: "codereview-sys",
    name: "CODEREVIEW.SYS",
    year: "2026",
    tagline: "Paste code, get a structured review in seconds: bugs, security, performance, refactor.",
    designLanguage:
      "Phosphor audit terminal. Warm graphite and an amber CRT accent, all JetBrains Mono, faint scanlines, zero border radius, a segmented instrument gauge, compiler-style diagnostics and a vim status line.",
    languageLabel: "a phosphor terminal",
    glyph: "caret",
    description:
      "An AI code review tool that analyses a snippet and returns an animated quality gauge with a stamped verdict, bug detection with exact line numbers, OWASP-style security findings, performance suggestions and a fully rewritten version of the code. Thirteen languages, a Monaco editor, one-click export of the full report as Markdown, and Ctrl+Enter to run.",
    highlights: [
      "Animated instrument gauge scoring 0 to 100 with a stamped verdict",
      "Line accurate bug, security and performance diagnostics",
      "Groq and Llama 3.3 70B, Monaco editor, Markdown export",
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Monaco Editor", "Groq API", "Llama 3.3 70B"],
    accent: "#ffb000",
    live: "https://codereview-sys.vercel.app",
    preview: "/previews/codereview-sys.webp",
    embeddable: true,
    source: "https://github.com/Abudora-0/CODEREVIEW.SYS",
  },
  {
    slug: "kernal",
    name: "Kernal",
    year: "2026",
    tagline: "Your GitHub activity as a Bloomberg terminal.",
    designLanguage:
      "Financial market terminal. Deep navy-black panels with signal green ticks, IBM Plex Mono readouts with tabular numerals, dotted leader lines, function key tabs and a segmented DEV INDEX gauge.",
    languageLabel: "a market terminal",
    glyph: "ticker",
    description:
      "A GitHub-integrated developer dashboard that turns public activity into a data-rich profile: a letter-grade developer score derived from real metrics, a contribution heatmap, current and longest streaks, a language breakdown, top repositories, an activity feed and an hourly heatmap. Sign in with GitHub for your own dashboard, or look up any public username at a shareable URL.",
    highlights: [
      "Letter-grade DEV INDEX computed from live GitHub REST and GraphQL data",
      "Contribution graph, streak tracking and hourly activity heatmap",
      "GitHub OAuth, shareable public profile pages",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS 3", "NextAuth.js", "PostgreSQL", "Prisma 5", "Recharts"],
    accent: "#2ee889",
    live: "https://kernall.vercel.app",
    preview: "/previews/kernal.webp",
    embeddable: true,
    previewPath: "/u/Abudora-0",
    source: "https://github.com/Abudora-0/Kernal",
  },
  {
    slug: "dossier",
    name: "Dossier",
    year: "2026",
    tagline: "A Kanban job application tracker that looks like a paper dossier desk.",
    designLanguage:
      "Paper dossier desk. Warm cream ground, manila folder columns with real tabs, applications as ruled index cards, priorities as tilted rubber stamps, Courier Prime typewriter labels.",
    languageLabel: "a paper dossier",
    glyph: "folder",
    description:
      "Drag applications through five folders, from Wishlist to Applied to Interview to Offer to Rejected, with deadline tracking that auto-highlights overdue cards in red, colour-coded priority flags, search and filter, and a statistics dashboard of pipeline counts. One-click seed data for demos, GitHub OAuth to keep a board private, and confetti when a card reaches Offer.",
    highlights: [
      "dnd-kit drag and drop across a five stage pipeline",
      "Automatic overdue deadline highlighting and priority stamps",
      "Stats dashboard, GitHub OAuth, one-click demo seed",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS 3", "NextAuth.js", "PostgreSQL", "Prisma 5", "dnd-kit", "Recharts"],
    accent: "#d8a657",
    live: "https://dosssier.vercel.app",
    preview: "/previews/dossier.webp",
    embeddable: true,
    source: "https://github.com/Abudora-0/Dossier",
  },
  {
    slug: "nexus",
    name: "Nexus",
    year: "2026",
    tagline: "Chat with your documents, fully local by default, or try the hosted demo.",
    designLanguage:
      "Neon terminal and data archive. Void black with a drifting circuit grid and cyan-magenta glow, Orbitron over Rajdhani, a hexagonal glitching logo mark, gradient neon scrollbars.",
    languageLabel: "a neon archive",
    glyph: "hexagon",
    description:
      "Upload a PDF or text file and ask questions about it, powered by retrieval augmented generation. Documents are chunked, embedded and stored in LanceDB for vector search. Answers stream token by token over Server-Sent Events with source citations for every claim, plus full document summarisation and browser-persisted chat history. The chat and embedding backends are pluggable: run fully local on Ollama with nothing leaving your machine, or point at a hosted Groq and Gemini pipeline for a zero-cost public demo.",
    highlights: [
      "Pluggable backend, local Ollama by default or hosted Groq and Gemini",
      "Token-streamed answers over SSE with per-chunk source citations",
      "The hosted demo runs on a free Render tier, so a quiet backend can take a moment to wake up",
    ],
    stack: ["FastAPI", "Python", "React 19", "Vite", "TypeScript", "Ollama", "LanceDB"],
    accent: "#22d3ee",
    live: "https://nexus-chatboot.vercel.app",
    source: "https://github.com/Abudora-0/Nexus",
    preview: "/previews/nexus.webp",
    embeddable: true,
  },
  {
    slug: "typeset",
    name: "Typeset",
    year: "2026",
    tagline: "A zero-setup GitHub portfolio generator. Any username, one shareable page.",
    designLanguage:
      "Swiss International Typographic Style. Paper white ground, one red accent, massive Archivo grotesk headlines, an exposed hairline grid, numbered sections and crosshair grid marks.",
    languageLabel: "a Swiss poster",
    glyph: "slab",
    description:
      "Enter any GitHub username and get a print-styled profile page in seconds: a searchable repository grid sortable by stars, forks or last update, a segmented language breakdown, recently active repositories, and a stats overview. No database, no auth, no API key, it runs on the public GitHub API. Every portfolio lives at a shareable URL.",
    highlights: [
      "Instant print-styled portfolio for any GitHub user",
      "Segmented language bar, sortable repo grid, shareable URLs",
      "Zero config on the public GitHub API, no credentials",
    ],
    stack: ["Next.js 16", "React", "TypeScript", "Tailwind CSS 4", "GitHub REST API"],
    accent: "#f04a35",
    live: "https://typedset.vercel.app",
    preview: "/previews/typeset.webp",
    embeddable: true,
    previewPath: "/u/Abudora-0",
    source: "https://github.com/Abudora-0/Typeset",
  },
];

/** Every distinct technology named across the eight projects. */
export const techCount = new Set(projects.flatMap((p) => p.stack)).size;

export const liveCount = projects.filter((p) => p.live).length;

/** Contact details, shared by the page, the footer and the command palette. */
export const EMAIL = "m.abdullah21306@gmail.com";
export const GITHUB = "https://github.com/Abudora-0";
export const LINKEDIN = "https://www.linkedin.com/in/m-abdullah-94367b3a1/";
