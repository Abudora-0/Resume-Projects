<div align="center">

<img src=".github/banner.svg" alt="Abudora. Eight products, eight design languages, one engineer." width="100%" />

<br />

**Eight shipped products. Eight deliberately different design languages. One exhibition catalogue.**

[**abudora-resume.vercel.app**](https://abudora-resume.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Animation dependencies](https://img.shields.io/badge/animation_deps-0-c4f042?style=flat-square)](#no-animation-library)
[![Static output](https://img.shields.io/badge/output-fully_static-c4f042?style=flat-square)](#running-it)
[![License: MIT](https://img.shields.io/badge/License-MIT-f2f0ea?style=flat-square)](LICENSE)

`portfolio` &nbsp; `nextjs` &nbsp; `react` &nbsp; `typescript` &nbsp; `tailwindcss` &nbsp; `css-animations` &nbsp; `design-systems` &nbsp; `accessibility`

</div>

---

## Why this exists

Most developer portfolios describe the work. This one performs it.

The eight projects indexed here each shout in a completely different visual
language, so the frame around them is deliberately quiet: a near black ground,
Fraunces for display type, JetBrains Mono for the metadata layer, hairline rules
and numbered entries. The only real colour on the page belongs to the work.

Then it goes one step further. Hover any entry and the whole page takes on that
project's accent, right down to the browser scrollbar. The claim in the headline
is not asserted, it is demonstrated.

## Signature features

| | Feature | What it does |
|---|---|---|
| 01 | **Accent possession** | Hovering or focusing a project repaints the page chrome in its accent: scrollbar thumb, text selection, focus rings and the scroll progress bar all read one `--pc-active` custom property. Written straight to `documentElement` rather than through React state, because this fires on every pointer move. |
| 02 | **The wordmark** | No icon. The name sets itself one letter at a time with a chartreuse rule drawing underneath. The eight project glyphs (globe, cloche, tessellation, caret, ticker, folder, hexagon, Swiss slab) live on the cards instead, pulled from `lib/projects.ts`. |
| 03 | **Hero language cycler** | The headline reads "Each one ..." and then actually cycles through all eight design languages, tinted and restyled per project. Width is reserved by a hidden sizer so nothing reflows mid cycle. |
| 04 | **Kinetic headings** | Section headings ride up out of a mask word by word as they scroll into view, with the real string preserved for screen readers. |
| 05 | **Command palette** | `Cmd` or `Ctrl` plus `K`. Fuzzy search across every project, every live site, every repo, every section, plus copy email and switch view. Full keyboard control, focus trap, focus restored on close. Hand rolled, no dependency. |
| 06 | **Live previews** | Every project shows a real captured screenshot, and the ones that allow framing open the actual running site in an iframe with a browser chrome bar. The frame mounts only when opened, never eight at once on load. |
| 07 | **Two views** | Toggle the index between the editorial list and a dense contact sheet of accent tinted cells. Crossfades through the View Transitions API where the browser supports it, and the choice persists. |
| 08 | **Themed controls** | Nothing is left to browser defaults. Custom scrollbar, a listbox that opens with a clip path wipe, and odometer counters whose digits physically roll into place. |
| 09 | **Drawn, not decorated** | The hero backdrop, the section rules, the about plate and the footer colophon are all hand drawn inline SVG that parallax to the pointer. No stock art, no image files. |

## Design notes

### Controls belong to the theme

The scrollbar is themed at `::-webkit-scrollbar` with a Firefox path behind
`@supports (scrollbar-width: thin)`, and its thumb reads the same possessed
accent as everything else. The sort control is a real `ul[role="listbox"]` with
arrow keys, `Home`, `End`, `Enter` and `Escape`, options at `tabIndex={-1}` so
focus stays on the trigger. The stats counters are digit columns inside a `1em`
window, translated to `-Nem`, so the number rolls like a till.

### No animation library

There is no Motion, no GSAP, no UI kit. Every animation here is CSS keyframes
plus a few small hooks, which is why the whole site still ships as static HTML
with a tiny bundle. The house easing is `cubic-bezier(0.16, 1, 0.3, 1)`, the same
curve the indexed projects use, so the catalogue feels related to its contents.

### Correctness under the polish

- **Reduced motion** is honoured twice: a global CSS kill switch, and a
  `useSyncExternalStore` hook for the JavaScript driven pieces a duration
  override cannot reach.
- **No state set inside effects.** Media queries, document visibility and the
  persisted view preference all come through `useSyncExternalStore`, so the
  first client render is already correct and nothing cascades.
- **Scroll reveals** toggle a class on the DOM node rather than setting React
  state, so 24 reveals cause zero re-renders. Anything above the fold reveals
  immediately instead of waiting on an observer callback.
- **Works without JavaScript.** A `noscript` style makes the whole page
  readable, and every `localStorage` touch is wrapped in `try/catch` because it
  throws outright in a private window.
- **Contrast.** Every accent clears 4.5:1 against the background, verified
  rather than assumed. Two project reds were lightened to get there.
- **No em dashes.** Enforced by `npm run check:dashes`, which fails the build if
  one reappears.
- **No dead links.** `npm run check:links` requests every project URL and fails
  the build on a 404. Four dead links once shipped to production because project
  domains were renamed and nothing caught it.
- **Previews are captured, not embedded live.** The screenshots are committed
  WebP, so the build needs no network and no browser.

## Structure

```
app/
  layout.tsx        Fonts, metadata, accent provider, no-JS fallback
  page.tsx          Hero, stats, work, about, contact. Server component.
  globals.css       Tokens, @layer base, @layer components
  icon.svg          Favicon
components/
  brand/Wordmark.tsx  The abudora wordmark
  brand/glyphs.tsx    One glyph per project
  art/                Hand drawn SVG: hero field, plates, rules
  ProjectPreview      Screenshot plus live iframe modal
  KineticHeading      Headings that set themselves
  ui/Select.tsx     Keyboard driven listbox
  ui/Odometer.tsx   Rolling digit counters
  AccentProvider    Accent possession
  CommandPalette    Cmd+K
  WorkIndex         View and sort state
  ProjectCard       Editorial entry
  SheetCard         Contact sheet cell
  Reveal            Scroll reveal, class based
lib/
  projects.ts       The eight entries. Single source of truth.
  hooks.ts          Media query, visibility, platform
  storedState.ts    localStorage as an external store
scripts/
  check-dashes.mjs      Fails on em and en dashes
  check-links.mjs       Fails on any dead project link
  capture-previews.mjs  Rebuilds public/previews via headless Chromium
public/previews/        Seven captured screenshots, WebP
```

Adding a ninth project means editing `lib/projects.ts` and nothing else. The
mark, the cycler, the palette, the stats and both views all read from it.

## The work

| # | Project | What it is | Live |
|---|---|---|---|
| 01 | [Wanderlens](https://github.com/Abudora-0/wanderlens) | 3D globe travel briefings blended from six open datasets | [live](https://wanderlenss.vercel.app) |
| 02 | [Dish It](https://github.com/Abudora-0/Dish-It) | Animated recipe kitchen with a full screen cook mode | [live](https://dish-itt.vercel.app) |
| 03 | [Tessera](https://github.com/Abudora-0/tessera) | Generative wallpaper studio, drawn from seeds on canvas | [live](https://tesseera.vercel.app) |
| 04 | [CODEREVIEW.SYS](https://github.com/Abudora-0/CODEREVIEW.SYS) | AI code review as a phosphor audit terminal | [live](https://codereview-sys.vercel.app) |
| 05 | [Kernal](https://github.com/Abudora-0/Kernal) | GitHub activity rendered as a financial market terminal | [live](https://kernall.vercel.app) |
| 06 | [Dossier](https://github.com/Abudora-0/Dossier) | Job application Kanban as a paper dossier desk | [live](https://dosssier.vercel.app) |
| 07 | [Nexus](https://github.com/Abudora-0/Nexus) | Local first RAG document chat, no cloud, no API keys | local |
| 08 | [Typeset](https://github.com/Abudora-0/Typeset) | Swiss styled GitHub portfolio generator | [live](https://typedset.vercel.app) |

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. No environment variables, no database.
Deploys to Vercel as is.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run check:dashes` | Fail on em and en dashes |
| `npm run check:links` | Fail on any dead project link |
| `npm run previews` | Recapture the project screenshots |
| `npm run verify` | Dashes, links, lint and build, in order |

## Contact

**Muhammad Abdullah** &nbsp;&middot;&nbsp; [GitHub](https://github.com/Abudora-0) &nbsp;&middot;&nbsp; [LinkedIn](https://www.linkedin.com/in/m-abdullah-94367b3a1/) &nbsp;&middot;&nbsp; m.abdullah21306 [at] gmail.com

## License

[MIT](LICENSE)
