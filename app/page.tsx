import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { WorkIndex } from "@/components/WorkIndex";
import { HeroCycler } from "@/components/HeroCycler";
import { CommandPalette } from "@/components/CommandPalette";
import { KineticHeading } from "@/components/KineticHeading";
import { Wordmark } from "@/components/brand/Wordmark";
import { SpecimenField } from "@/components/art/SpecimenField";
import { PlateRule, AboutPlate, ColophonPlate } from "@/components/art/Plates";
import { Odometer } from "@/components/ui/Odometer";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRight, GithubMark, LinkedinMark, MailMark } from "@/components/icons";
import { projects, techCount, liveCount, EMAIL, GITHUB, LINKEDIN } from "@/lib/projects";

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

const SOCIALS = [
  { href: GITHUB, label: "GitHub", handle: "Abudora-0", Icon: GithubMark },
  { href: LINKEDIN, label: "LinkedIn", handle: "m-abdullah", Icon: LinkedinMark },
  { href: `mailto:${EMAIL}`, label: "Email", handle: EMAIL, Icon: MailMark },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <CommandPalette />

      <main id="top">
        {/* ============================================ hero ============= */}
        <section className="hero">
          <SpecimenField />

          <div className="shell hero-inner">
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
              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
                <Magnetic>
                  <a
                    href="#work"
                    className="mono-label inline-flex items-center gap-1.5 border border-edge-strong px-4 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    See the work
                    <ArrowUpRight className="size-3" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="mono-label inline-flex items-center gap-2 px-3 py-2.5 transition-colors hover:text-ink"
                  >
                    <GithubMark className="size-4" />
                    Abudora-0
                  </a>
                </Magnetic>
              </div>
            </Reveal>

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
          </div>
        </section>

        {/* ============================================ work ============= */}
        <section id="work" className="shell scroll-mt-24 pb-8">
          <Reveal>
            <PlateRule index="01" label="Selected work" />
          </Reveal>
          <WorkIndex />
        </section>

        {/* ============================================ about ============ */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-edge bg-bg-raised/40 py-20 md:py-28"
        >
          <div className="shell">
            <Reveal>
              <PlateRule index="02" label="About" />
            </Reveal>

            <div className="mt-12 grid gap-12 md:grid-cols-12">
              <div className="md:col-span-7">
                <KineticHeading
                  as="h2"
                  text="I care about the whole surface: the data model, the render path, and the exact spring on a dropdown"
                  punctuation="."
                  className="font-display text-2xl font-light leading-snug text-ink md:text-[1.9rem]"
                />

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
                      This site is built the same way. No animation library and no
                      UI kit. The wordmark, the illustrations, the counters, the
                      listbox and the command palette are all hand rolled from CSS
                      keyframes and a few small hooks, which is why the whole page
                      still ships as static HTML.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <p className="mt-8 border-l-2 border-accent pl-4 text-[0.95rem] leading-relaxed text-ink-soft">
                    <span className="mono-label mr-2 text-accent">Currently</span>
                    Open to frontend and full-stack roles, and building things that
                    take the interface as seriously as the data behind it.
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {SOCIALS.map(({ href, label, handle, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={href.startsWith("mailto") ? undefined : "_blank"}
                          rel="noreferrer"
                          className="social"
                        >
                          <Icon className="size-4 shrink-0" />
                          <span className="social-label">{label}</span>
                          <span className="social-handle">{handle}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal className="md:col-span-5" delay={120}>
                <AboutPlate />
              </Reveal>
            </div>

            <div className="mt-14 space-y-6">
              {SKILLS.map((row, i) => (
                <Reveal
                  key={row.group}
                  delay={i * 60}
                  className="grid gap-2 border-t border-edge pt-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <p className="mono-label">{row.group}</p>
                  <ul className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                    {row.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ contact ========= */}
        <section id="contact" className="shell scroll-mt-24 py-24 text-center md:py-32">
          <Reveal>
            <p className="mono-label">Contact</p>
          </Reveal>

          <KineticHeading
            as="h2"
            text="Have something that needs building"
            punctuation="?"
            className="mx-auto mt-6 max-w-3xl justify-center font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-6xl"
          />

          <Reveal delay={160}>
            <div className="mt-10 flex justify-center">
              <Magnetic>
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-underline inline-block px-2 py-1 font-display text-xl text-ink md:text-2xl"
                >
                  {EMAIL}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        {/* ============================================ footer ========== */}
        <footer className="border-t border-edge bg-bg-sunken/60">
          <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-20">
            <div className="md:col-span-4">
              <Wordmark size="lg" />
              <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-ink-soft">
                An exhibition catalogue of eight products, each built inside its
                own design language.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="foot-icon"
                      aria-label={label}
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="md:col-span-2" aria-label="Footer">
              <p className="mono-label">Index</p>
              <ul className="mt-4 space-y-2">
                {["Work", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[0.9rem] text-ink-soft transition-colors hover:text-ink"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#top"
                    className="text-[0.9rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    Back to top
                  </a>
                </li>
              </ul>
            </nav>

            <div className="md:col-span-3">
              <p className="mono-label">Colophon</p>
              <dl className="mt-4 space-y-2 text-[0.85rem] text-ink-soft">
                {[
                  ["Display", "Fraunces"],
                  ["Text", "Inter"],
                  ["Mono", "JetBrains Mono"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-ink-faint">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="md:col-span-3 flex items-end">
              <ColophonPlate />
            </div>
          </div>

          <div className="border-t border-edge">
            <div className="shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
              <p className="mono-label">2026 Muhammad Abdullah</p>
              <a href="#top" className="mono-label transition-colors hover:text-ink">
                Back to top
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
