import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { WorkIndex } from "@/components/WorkIndex";
import { HeroCycler } from "@/components/HeroCycler";
import { CommandPalette } from "@/components/CommandPalette";
import { Odometer } from "@/components/ui/Odometer";
import { ArrowUpRight, GithubMark } from "@/components/icons";
import { projects, techCount, liveCount } from "@/lib/projects";

const EMAIL = "m.abdullah21306@gmail.com";
const GITHUB = "https://github.com/Abudora-0";

const STATS = [
  { value: projects.length, label: "Products shipped" },
  { value: projects.length, label: "Design languages" },
  { value: liveCount, label: "Live deployments" },
  { value: techCount, label: "Technologies used" },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Languages and frameworks",
    items: ["TypeScript", "React 19", "Next.js 14 to 16", "Python", "Node.js"],
  },
  {
    group: "Interface and graphics",
    items: ["Tailwind CSS v4", "Framer Motion", "Canvas 2D", "three.js", "Lenis", "Design systems"],
  },
  {
    group: "Backend and data",
    items: ["FastAPI", "Route handlers", "PostgreSQL", "Prisma", "Supabase", "Sanity CMS", "LanceDB"],
  },
  {
    group: "APIs, auth and AI",
    items: ["NextAuth", "GitHub REST and GraphQL", "Groq", "Ollama", "RAG", "SSE streaming"],
  },
  {
    group: "Craft and delivery",
    items: ["Accessibility", "Reduced motion", "SEO and JSON-LD", "PWA", "Vercel", "Lighthouse"],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <CommandPalette />

      <main id="top">
        {/* ============================================ hero ============= */}
        <section className="shell pt-20 pb-20 md:pt-28 md:pb-24">
          <Reveal>
            <p className="mono-label">
              Muhammad Abdullah, frontend and full-stack engineer
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 max-w-4xl font-display text-[2rem] font-light leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Eight products.
              <br />
              Each one <HeroCycler />
              <br />
              One engineer
              <span className="text-accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              I build web products where the interface is not an afterthought.
              Every piece below was shipped inside its own deliberate visual
              system, because the way a thing feels is part of what it does.
              Hover any entry and this page takes on its colours, right down to
              the scrollbar.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#work"
                className="mono-label inline-flex items-center gap-1.5 border border-edge-strong px-4 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                See the work
                <ArrowUpRight className="size-3" />
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="mono-label inline-flex items-center gap-2 transition-colors hover:text-ink"
              >
                <GithubMark className="size-4" />
                Abudora-0
              </a>
            </div>
          </Reveal>

          {/* stats strip */}
          <Reveal delay={300}>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-edge pt-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-4xl font-light text-ink md:text-5xl">
                    <Odometer value={stat.value} />
                  </dd>
                  <dt className="mono-label mt-2">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ============================================ work ============= */}
        <section id="work" className="shell scroll-mt-24 pb-8">
          <WorkIndex />
        </section>

        {/* ============================================ about ============ */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-edge bg-bg-raised/40 py-24 md:py-32"
        >
          <div className="shell grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <h2 className="mono-label">About</h2>
            </Reveal>
            <div className="md:col-span-8">
              <Reveal>
                <p className="font-display text-2xl font-light leading-snug text-ink md:text-3xl">
                  I care about the whole surface: the data model, the render
                  path, and the exact spring on a dropdown.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  <p>
                    My work spans zero-backend static apps that merge open
                    datasets at runtime, full-stack products with Postgres,
                    Prisma and OAuth, and a local-first RAG pipeline running
                    entirely on-device. The common thread is finish: reduced
                    motion fallbacks, real loading states, structured metadata,
                    keyboard support and a point of view on how the product
                    should look.
                  </p>
                  <p>
                    This site is built the same way. No animation library, no UI
                    kit. The mark, the counters, the listbox and the command
                    palette are all hand rolled from CSS keyframes and a few
                    small hooks, which is why the whole page ships as static
                    HTML.
                  </p>
                </div>
              </Reveal>

              <div className="mt-12 space-y-6">
                {SKILLS.map((row, i) => (
                  <Reveal
                    key={row.group}
                    delay={i * 60}
                    className="grid gap-2 border-t border-edge pt-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <p className="mono-label">{row.group}</p>
                    <ul className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                      {row.items.map((item) => (
                        <li
                          key={item}
                          className="border border-edge px-2 py-0.5 font-mono text-[0.72rem] text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ contact ========= */}
        <section
          id="contact"
          className="shell scroll-mt-24 py-24 text-center md:py-36"
        >
          <Reveal>
            <p className="mono-label">Contact</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-6xl">
              Have something that needs building
              <span className="text-accent">?</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline font-display text-xl text-ink md:text-2xl"
              >
                {EMAIL}
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="mono-label inline-flex items-center gap-2 transition-colors hover:text-ink"
              >
                <GithubMark className="size-4" />
                GitHub
              </a>
            </div>
          </Reveal>
        </section>

        {/* ============================================ footer ========== */}
        <footer className="border-t border-edge">
          <div className="shell flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
            <p className="mono-label">2026 Muhammad Abdullah</p>
            <p className="mono-label">
              Next.js, no animation dependencies, static output
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
