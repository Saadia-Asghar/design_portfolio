"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Plus,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  awards,
  capabilities,
  certifications,
  featuredCaseStudy,
  marqueeWords,
  processSteps,
  seedChapters,
  siteMeta,
  stats,
  techStack,
  testimonials,
  tools,
} from "./seedData";
import type { Card, Chapter } from "./types";
import {
  Counter,
  LocalTime,
  Magnetic,
  Marquee,
  RevealText,
  RotatingWord,
  SectionLabel,
  Spotlight,
} from "./UI";
import AddDrawer from "./AddDrawer";
import CustomCursor from "./CustomCursor";
import CommandPalette from "./CommandPalette";

const STORAGE_KEY = "saadia-portfolio-v3";

const accentMap: Record<
  Chapter["accent"],
  { chip: string; dot: string; text: string; bg: string; border: string }
> = {
  blush: {
    chip: "bg-blush/40 text-ink border-blush",
    dot: "bg-[#E9C6B5]",
    text: "text-[#9B5E4A]",
    bg: "from-blush/40 via-cream to-cream",
    border: "border-blush/60",
  },
  sage: {
    chip: "bg-sage/30 text-ink border-sage",
    dot: "bg-[#A8B5A0]",
    text: "text-[#5F6F56]",
    bg: "from-sage/30 via-cream to-cream",
    border: "border-sage/60",
  },
  gold: {
    chip: "bg-gold/25 text-ink border-gold",
    dot: "bg-[#C8A24B]",
    text: "text-[#8A6A20]",
    bg: "from-gold/25 via-cream to-cream",
    border: "border-gold/50",
  },
  ink: {
    chip: "bg-ink/10 text-ink border-ink/40",
    dot: "bg-ink",
    text: "text-ink",
    bg: "from-ink/10 via-cream to-cream",
    border: "border-ink/30",
  },
};

export default function Portfolio() {
  const [chapters, setChapters] = useState<Chapter[]>(seedChapters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Chapter[];
        if (Array.isArray(parsed) && parsed.length > 0) setChapters(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chapters));
    } catch {}
  }, [chapters, hydrated]);

  const addCard = (chapterId: string, card: Card) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, cards: [...c.cards, card] } : c))
    );
  };
  const addChapter = (chapter: Chapter) => setChapters((prev) => [...prev, chapter]);
  const deleteCard = (chapterId: string, cardId: string) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId ? { ...c, cards: c.cards.filter((k) => k.id !== cardId) } : c
      )
    );

  const jumps = [
    { id: "top", label: "Go to top", hint: "Hero", hash: "#top" },
    { id: "work", label: "Selected Work", hint: "Chapters", hash: "#work" },
    { id: "case", label: "Featured Case Study — Vyrothon", hint: "1st place", hash: "#case" },
    { id: "process", label: "How I Work", hint: "Process", hash: "#process" },
    { id: "awards", label: "Awards & Recognition", hint: "Credentials", hash: "#awards" },
    { id: "about", label: "About & Currently", hint: "Personal", hash: "#about" },
    { id: "contact", label: "Contact", hint: "Let's talk", hash: "#contact" },
    {
      id: "resume",
      label: "Download Résumé",
      hint: "PDF",
      action: () => window.open(siteMeta.resume, "_blank"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      hint: "Social",
      action: () => window.open(siteMeta.linkedin, "_blank"),
    },
    ...(siteMeta.github
      ? [
          {
            id: "github",
            label: "Open GitHub",
            hint: "Code",
            action: () => window.open(siteMeta.github!, "_blank"),
          },
        ]
      : []),
    {
      id: "figma",
      label: "Open Vyrothon design on Figma",
      hint: "1st place",
      action: () =>
        window.open(
          "https://www.figma.com/design/Xc06xzZPmShh4pilH9xeHN/Untitled?t=eaDELDis0cGJ7opZ-0",
          "_blank"
        ),
    },
    {
      id: "add",
      label: "Add a new design card",
      hint: "Drawer",
      action: () => setDrawerOpen(true),
    },
  ];

  return (
    <main id="top" className="relative">
      <CustomCursor />
      <TopNav jumps={jumps} onAdd={() => setDrawerOpen(true)} />

      <Hero />
      <MarqueeStrip />
      <Manifesto />
      <Stats />
      <FeaturedCaseStudy />
      <SelectedWork chapters={chapters} onDelete={deleteCard} />
      <Process />
      <Awards />
      <ToolsAndCapabilities />
      <About />
      <Testimonials />
      <Contact />
      <Colophon />

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 h-16 w-16 rounded-full bg-ink text-paper shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] grid place-items-center hover:scale-105 active:scale-95 transition"
        aria-label="Add new design"
      >
        <Plus size={26} />
      </motion.button>

      <AddDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        chapters={chapters}
        onAddCard={addCard}
        onAddChapter={addChapter}
      />
    </main>
  );
}

/* ================================================================== */
/* TOP NAV                                                             */
/* ================================================================== */

function TopNav({
  jumps,
  onAdd,
}: {
  jumps: Parameters<typeof CommandPalette>[0]["jumps"];
  onAdd: () => void;
}) {
  const { scrollY } = useScroll();
  const pad = useTransform(scrollY, [0, 200], [28, 14]);
  const opacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <motion.header
      style={{ paddingTop: pad, paddingBottom: pad }}
      className="sticky top-0 z-50 px-6 md:px-10"
    >
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 -z-10 bg-paper/80 backdrop-blur-md border-b border-ink/10"
      />
      <div className="flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-full bg-ink text-paper grid place-items-center font-serif-display text-lg group-hover:scale-105 transition">
            S
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-serif-display text-lg">{siteMeta.name}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
              {siteMeta.role} · Portfolio
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 text-xs uppercase tracking-[0.22em]">
          {[
            ["Work", "#work"],
            ["Case", "#case"],
            ["Process", "#process"],
            ["Awards", "#awards"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="px-3 py-2 rounded-full hover:bg-ink/5 transition"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette jumps={jumps} />
          <Magnetic strength={0.2}>
            <a
              href={siteMeta.resume}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-paper text-xs uppercase tracking-[0.22em] hover:bg-ink/90 transition"
            >
              <Download size={13} /> <span className="hidden sm:inline">Résumé</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}

/* ================================================================== */
/* HERO                                                                */
/* ================================================================== */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden">
      <Spotlight />

      <div className="relative z-10 px-6 md:px-12 pt-6 md:pt-8 pb-24">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/55">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6E8D5E] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F7D4F]" />
            </span>
            <span>Here to</span>
            <RotatingWord
              words={siteMeta.intentions ?? ["create"]}
              className="text-ink font-medium"
            />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>{siteMeta.location}</span>
            <span>·</span>
            <LocalTime />
            <span>·</span>
            <span>Vol. I · MMXXVI</span>
          </div>
        </div>

        <motion.div style={{ y, opacity }} className="mt-14 md:mt-24">
          <div className="flex items-center gap-4 mb-6 md:mb-10">
            <span className="h-px w-16 bg-ink/40" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              A designer's book of work — {new Date().getFullYear()} edition
            </span>
          </div>

          <h1 className="font-serif-display leading-[0.88] tracking-tight text-[clamp(3.5rem,14vw,13rem)]">
            <RevealText text="Saadia" as="span" className="block" />
            <RevealText
              text="Asghar."
              as="em"
              className="block italic font-light text-ink/90"
              delay={0.15}
            />
          </h1>

          <div className="mt-10 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            <div>
              <RevealText
                text={siteMeta.tagline}
                as="p"
                className="font-serif-display italic text-2xl md:text-3xl leading-snug text-ink/80 max-w-xl"
                delay={0.4}
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href="#work"
                    className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-ink/90 transition"
                  >
                    View Selected Work
                    <ArrowDown
                      size={15}
                      className="transition group-hover:translate-y-0.5"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#case"
                    className="group flex items-center gap-2 px-6 py-3.5 rounded-full border border-ink/25 bg-cream text-sm font-medium hover:bg-ink/5 transition"
                  >
                    <Sparkles size={14} />
                    Read the Vyrothon case study
                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnetic>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-ink/55">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A24B]" />
                  Top 5 · Vyrothon · 500+ globally
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E9C6B5]" />
                  Top 10 · MIT Hack Nation
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A8B5A0]" />
                  3rd · BASED Pakistan
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[22px] overflow-hidden relative border border-ink/10 shadow-card">
                <div className="absolute inset-0 bg-gradient-to-br from-blush via-cream to-sage/60" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-serif-display italic text-[14rem] leading-none text-ink/90 select-none">
                      S.
                    </div>
                    <div className="-mt-4 text-[10px] uppercase tracking-[0.5em] text-ink/60">
                      Volume · I
                    </div>
                  </div>
                </div>
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  <span>※ A book of selected work</span>
                  <span>First Ed.</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  <span>Designer · Storyteller</span>
                  <span>{siteMeta.location}</span>
                </div>
                <div className="absolute inset-5 rounded-[16px] border border-ink/15 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-ink/50">
          <span>Scroll to read</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* MARQUEE                                                             */
/* ================================================================== */

function MarqueeStrip() {
  return (
    <section className="border-y border-ink/15 bg-ink text-paper py-5 md:py-6 overflow-hidden">
      <Marquee
        items={marqueeWords}
        speed={45}
        className="font-serif-display italic text-3xl md:text-5xl"
      />
    </section>
  );
}

/* ================================================================== */
/* MANIFESTO                                                           */
/* ================================================================== */

function Manifesto() {
  return (
    <section className="px-6 md:px-12 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel roman="I" title="Manifesto" />
        <div className="mt-12 grid md:grid-cols-[1fr_0.8fr] gap-12 items-start">
          <div>
            <RevealText
              text="I believe the best products feel like good stationery — calm, confident, and quietly delightful."
              className="font-serif-display text-[clamp(2rem,5vw,4rem)] leading-[1.08] tracking-tight"
            />
            <div className="chapter-rule w-28 my-10" />
            <p className="text-ink/75 leading-relaxed text-lg max-w-xl drop-cap">
              {siteMeta.bio}
            </p>
          </div>

          <aside className="md:border-l border-ink/15 md:pl-10">
            <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-3">
              Principles
            </div>
            <ul className="space-y-3 font-serif-display italic text-xl leading-snug">
              {[
                "Clarity is a form of kindness.",
                "Design like a writer — every pixel earns its place.",
                "Ship, watch, edit. Great work is a second draft.",
                "A system beats a stroke of genius, every time.",
              ].map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-sans not-italic text-[11px] tracking-[0.3em] text-ink/50 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* STATS                                                               */
/* ================================================================== */

function Stats() {
  return (
    <section className="border-y border-ink/15 bg-cream/60">
      <div className="mx-auto max-w-6xl px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/15">
          {stats.map((s, i) => (
            <div key={i} className="px-4 md:px-8 first:pl-0 last:pr-0">
              <div className="font-serif-display text-[clamp(2.5rem,6vw,5rem)] leading-none">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ink/60 leading-relaxed">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FEATURED CASE STUDY                                                 */
/* ================================================================== */

function FeaturedCaseStudy() {
  return (
    <section id="case" className="px-6 md:px-12 py-28 md:py-40 relative">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <SectionLabel roman="II" title="Featured Case Study" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-[11px] uppercase tracking-[0.25em] text-[#8A6A20]">
            <Award size={13} />
            {featuredCaseStudy.award}
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-start">
          <div>
            <h3 className="font-serif-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]">
              {featuredCaseStudy.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.25em] text-ink/55">
              <span>{featuredCaseStudy.client}</span>
              <span>·</span>
              <span>{featuredCaseStudy.year}</span>
              <span>·</span>
              <span>{featuredCaseStudy.role}</span>
            </div>

            <p className="mt-8 font-serif-display italic text-2xl text-ink/80 leading-snug max-w-xl">
              {featuredCaseStudy.summary}
            </p>

            {featuredCaseStudy.link && (
              <div className="mt-6">
                <Magnetic strength={0.2}>
                  <a
                    href={featuredCaseStudy.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink/25 bg-cream text-sm hover:bg-ink hover:text-paper transition"
                  >
                    <ExternalLink size={14} />
                    View the design on Figma
                    <ArrowUpRight size={13} />
                  </a>
                </Magnetic>
              </div>
            )}

            <div className="mt-10 space-y-8">
              <CaseBlock title="The Problem" body={featuredCaseStudy.problem} />
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-3">
                  The Approach
                </div>
                <ol className="space-y-3">
                  {featuredCaseStudy.approach.map((a, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-serif-display text-xl text-ink/40 leading-none pt-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-ink/80 leading-relaxed">{a}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <CaseBlock title="The Outcome" body={featuredCaseStudy.outcome} />
            </div>
          </div>

          <div className="lg:sticky lg:top-28 space-y-6">
            <a
              href={featuredCaseStudy.link ?? "#"}
              target={featuredCaseStudy.link ? "_blank" : undefined}
              rel={featuredCaseStudy.link ? "noreferrer" : undefined}
              className="group relative block aspect-[4/5] rounded-[22px] overflow-hidden border border-ink/10 shadow-card bg-gradient-to-br from-gold/30 via-cream to-blush/40"
            >
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center px-6">
                  <Award className="mx-auto mb-6 text-[#8A6A20]" size={44} />
                  <div className="font-serif-display text-5xl leading-tight">
                    1st
                  </div>
                  <div className="font-serif-display italic text-2xl -mt-1">
                    Product Design Round
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.35em] text-ink/60">
                    Vyrothon
                  </div>
                </div>
              </div>
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/55">
                <span>Case No. 01</span>
                <span>Figma</span>
              </div>
              <div className="absolute inset-5 rounded-[14px] border border-ink/15 pointer-events-none" />
              {featuredCaseStudy.link && (
                <div className="absolute bottom-5 right-5 h-10 w-10 rounded-full bg-ink text-paper grid place-items-center opacity-0 group-hover:opacity-100 transition">
                  <ArrowUpRight size={16} />
                </div>
              )}
            </a>

            {featuredCaseStudy.metrics && (
              <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-ink/10 divide-x divide-y divide-ink/10">
                {featuredCaseStudy.metrics.map((m, i) => (
                  <div
                    key={i}
                    className={`p-5 bg-cream ${
                      i % 2 === 0 ? "" : ""
                    } ${i < 2 ? "" : ""}`}
                  >
                    <div className="font-serif-display text-3xl leading-none">
                      {m.value}
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ink/55">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-3">
        {title}
      </div>
      <p className="text-ink/80 leading-relaxed">{body}</p>
    </div>
  );
}

/* ================================================================== */
/* SELECTED WORK                                                       */
/* ================================================================== */

function SelectedWork({
  chapters,
  onDelete,
}: {
  chapters: Chapter[];
  onDelete: (chapterId: string, cardId: string) => void;
}) {
  return (
    <section id="work" className="px-6 md:px-12 py-28 md:py-40 bg-paper/60">
      <div className="mx-auto max-w-6xl">
        <SectionLabel
          roman="III"
          title="Selected Work"
          kicker="Four chapters. One throughline: design that respects the reader."
        />

        <div className="mt-20 space-y-28">
          {chapters.map((ch, i) => (
            <ChapterBlock
              key={ch.id}
              chapter={ch}
              index={i}
              onDelete={(cardId) => onDelete(ch.id, cardId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterBlock({
  chapter,
  index,
  onDelete,
}: {
  chapter: Chapter;
  index: number;
  onDelete: (cardId: string) => void;
}) {
  const a = accentMap[chapter.accent];
  return (
    <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-8 md:gap-12 items-start">
      <div className="md:sticky md:top-28">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] ${a.chip}`}
        >
          Chapter {chapter.number}
        </div>
        <h3 className="mt-4 font-serif-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.9]">
          {chapter.title}
        </h3>
        {chapter.subtitle && (
          <p className="mt-2 text-sm font-serif-display italic text-ink/65">
            {chapter.subtitle}
          </p>
        )}
        <div className="chapter-rule w-20 my-5" />
        {chapter.intro && (
          <p className="text-ink/70 leading-relaxed max-w-sm">{chapter.intro}</p>
        )}
        <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-ink/45">
          Chapter {String(index + 1).padStart(2, "0")} of {seedChapters.length}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {chapter.cards.map((card, i) => (
          <WorkCard
            key={card.id}
            card={card}
            accent={chapter.accent}
            index={i}
            onDelete={() => onDelete(card.id)}
          />
        ))}
        {chapter.cards.length === 0 && (
          <div className="sm:col-span-2 border border-dashed border-ink/25 rounded-2xl p-10 text-center text-ink/50 italic font-serif-display">
            Use the + button to add your first piece to this chapter.
          </div>
        )}
      </div>
    </div>
  );
}

function WorkCard({
  card,
  accent,
  index,
  onDelete,
}: {
  card: Card;
  accent: Chapter["accent"];
  index: number;
  onDelete: () => void;
}) {
  const a = accentMap[accent];
  const hasImage = !!card.image;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-ink/10 bg-cream shadow-card"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
          hasImage ? "" : `bg-gradient-to-br ${a.bg}`
        }`}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="font-serif-display text-[7rem] leading-none text-ink/20">
              {card.title.slice(0, 1)}
            </div>
          </div>
        )}
        {card.award && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gold/90 text-ink text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full shadow-card">
            <Award size={12} />
            {card.award}
          </div>
        )}
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 h-7 w-7 rounded-full bg-ink/80 text-paper grid place-items-center opacity-0 group-hover:opacity-100 transition text-sm"
          aria-label="Remove card"
          title="Remove"
        >
          ×
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-serif-display text-xl leading-tight">{card.title}</h4>
          {card.link && (
            <a
              href={card.link}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 h-8 w-8 rounded-full bg-ink text-paper grid place-items-center hover:scale-105 transition"
              aria-label="Open link"
            >
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        {card.subtitle && (
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/55">
            {card.subtitle}
          </p>
        )}
        {card.impact && (
          <p className={`mt-3 text-sm ${a.text} italic font-serif-display`}>
            — {card.impact}
          </p>
        )}
        {card.tags && card.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {card.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-ink/15 text-ink/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ================================================================== */
/* PROCESS                                                             */
/* ================================================================== */

function Process() {
  return (
    <section id="process" className="px-6 md:px-12 py-28 md:py-40 bg-ink text-paper">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-paper/60">
          <span className="font-serif-display text-sm not-italic">IV.</span>
          <span className="h-px w-10 bg-paper/40" />
          <span>How I Work</span>
        </div>
        <h2 className="mt-6 font-serif-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-3xl">
          A short loop I run on every project, big or small.
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-x-10 gap-y-14">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative border-t border-paper/20 pt-6"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif-display italic text-lg text-paper/50">
                  {step.number}
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-paper/50">
                  Step {i + 1} / {processSteps.length}
                </span>
              </div>
              <h3 className="mt-3 font-serif-display text-4xl md:text-5xl leading-none">
                {step.title}
              </h3>
              <p className="mt-5 text-paper/75 leading-relaxed max-w-md">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 border-t border-paper/20 pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-paper/50">
          <span>Listen · Frame · Prototype · Edit</span>
          <span>© {new Date().getFullYear()} {siteMeta.name}</span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* AWARDS                                                              */
/* ================================================================== */

function Awards() {
  return (
    <section id="awards" className="px-6 md:px-12 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel
          roman="V"
          title="Recognition"
          kicker="Awards, roles, and quiet proof."
        />
        <div className="mt-16 border-t border-ink/20">
          {awards.map((a, i) => {
            const isLink = !!a.link;
            const Tag = (isLink ? motion.a : motion.div) as typeof motion.div;
            const extraProps = isLink
              ? ({
                  href: a.link,
                  target: "_blank",
                  rel: "noreferrer",
                } as const)
              : {};
            return (
              <Tag
                key={i}
                {...(extraProps as Record<string, unknown>)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 md:py-8 border-b border-ink/20 transition-colors duration-300 px-2 -mx-2 rounded-sm ${
                  isLink ? "hover:bg-ink hover:text-paper cursor-pointer" : ""
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    a.accent
                      ? "bg-[#C8A24B]"
                      : isLink
                        ? "bg-ink group-hover:bg-paper"
                        : "bg-ink"
                  }`}
                />
                <div className="flex-1 min-w-0 flex items-baseline gap-4 flex-wrap">
                  <span className="font-serif-display text-3xl md:text-4xl leading-none">
                    {a.title}
                  </span>
                  <span className="text-sm opacity-60 italic font-serif-display">
                    {a.org}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] opacity-70">
                  <span>{a.year}</span>
                  {isLink && (
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:rotate-0 -rotate-45"
                    />
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* TOOLS & CAPABILITIES                                                */
/* ================================================================== */

function ToolsAndCapabilities() {
  return (
    <section className="border-y border-ink/15 bg-cream/50">
      <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-5">
              Capabilities
            </div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-lg">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <Check
                    size={13}
                    className="text-[#8A6A20] mt-[7px] shrink-0"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-5">
                Design tools
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t.name}
                    className="px-3.5 py-1.5 rounded-full border border-ink/20 bg-cream text-sm hover:bg-ink hover:text-paper transition cursor-default"
                    data-cursor="hover"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-5">
                Tech stack
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-full border border-ink/15 bg-paper text-sm text-ink/75 hover:bg-ink hover:text-paper transition cursor-default"
                    data-cursor="hover"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-ink/55 mb-5">
                Certifications
              </div>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-serif-display italic text-lg leading-none">
                      {c.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-ink/55">
                      {c.by}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 border-t border-ink/15 bg-paper overflow-hidden">
        <Marquee
          items={[
            "Designed in Figma",
            "Written in Canva",
            "Studying at GIKI",
            "Shipping from Islamabad",
            "Set in Cormorant Garamond",
          ]}
          speed={60}
          className="text-xs uppercase tracking-[0.4em] text-ink/60"
        />
      </div>
    </section>
  );
}

/* ================================================================== */
/* ABOUT & CURRENTLY                                                   */
/* ================================================================== */

function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-28 md:py-40">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_0.9fr] gap-12">
        <div>
          <SectionLabel roman="VI" title="About" />
          <h2 className="mt-8 font-serif-display text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
            Designer, student, and campus community builder.
          </h2>
          <p className="mt-8 text-ink/80 leading-relaxed max-w-xl drop-cap">
            {siteMeta.bio} Based in {siteMeta.location}. Reach me at{" "}
            <a
              href={`mailto:${siteMeta.email}`}
              className="underline underline-offset-4 decoration-ink/40 hover:decoration-ink"
            >
              {siteMeta.email}
            </a>
            .
          </p>

          {siteMeta.education && (
            <div className="mt-8 flex items-start gap-3 px-4 py-4 rounded-2xl border border-ink/15 bg-cream max-w-md">
              <GraduationCap
                size={18}
                className="text-[#8A6A20] mt-0.5 shrink-0"
              />
              <div className="leading-snug">
                <div className="font-serif-display text-lg">
                  {siteMeta.education.degree}
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink/55 mt-1">
                  {siteMeta.education.school}
                  {siteMeta.education.location
                    ? ` · ${siteMeta.education.location}`
                    : ""}
                </div>
                {siteMeta.education.years && (
                  <div className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-0.5">
                    {siteMeta.education.years}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {siteMeta.availableFor.map((r) => (
              <div
                key={r}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-ink/15 bg-cream"
              >
                <BookOpen size={14} className="text-[#8A6A20]" />
                <span className="text-sm">Open for · {r}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative">
          <div className="rounded-2xl border border-ink/15 bg-cream p-6 md:p-8 shadow-card">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/55">
              <span>Currently</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5F7D4F] animate-pulse" />
                Live
              </span>
            </div>
            <ul className="mt-6 divide-y divide-ink/10">
              {[
                ["Reading", siteMeta.currently.reading],
                ["Building", siteMeta.currently.building],
                ["Thinking", siteMeta.currently.thinking],
              ].map(([k, v], i) => (
                <li key={i} className="py-4 flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ink/55">
                    {k}
                  </span>
                  <span className="mt-1 font-serif-display italic text-xl leading-snug">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-ink/10 text-[11px] uppercase tracking-[0.3em] text-ink/55 flex items-center justify-between">
              <span>{siteMeta.location}</span>
              <LocalTime />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ================================================================== */
/* TESTIMONIALS                                                        */
/* ================================================================== */

function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section className="bg-ink text-paper px-6 md:px-12 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-paper/60">
          <span className="font-serif-display text-sm not-italic">VII.</span>
          <span className="h-px w-10 bg-paper/40" />
          <span>Words from collaborators</span>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <Star
                size={18}
                className="text-[#C8A24B] mb-4"
                fill="#C8A24B"
              />
              <blockquote className="font-serif-display italic text-2xl md:text-3xl leading-snug">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.3em] text-paper/60">
                — {t.name} · {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* CONTACT                                                             */
/* ================================================================== */

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteMeta.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 py-32 md:py-48 overflow-hidden">
      <Spotlight />
      <div className="relative mx-auto max-w-6xl text-center">
        <SectionLabel roman="VIII" title="Contact" align="center" />
        <h2 className="mt-10 font-serif-display leading-[0.9] tracking-tight text-[clamp(3rem,10vw,9rem)]">
          <em className="italic font-light">Let's</em>
          <br />
          build something <br className="hidden md:block" />
          thoughtful.
        </h2>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href={`mailto:${siteMeta.email}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-ink/90 transition"
            >
              <Mail size={15} />
              {siteMeta.email}
            </a>
          </Magnetic>
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-ink/25 bg-cream text-sm hover:bg-ink/5 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <Magnetic>
            <a
              href={siteMeta.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-ink/25 bg-cream text-sm hover:bg-ink/5 transition"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </Magnetic>
          {siteMeta.github && (
            <Magnetic>
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-ink/25 bg-cream text-sm hover:bg-ink/5 transition"
              >
                <Github size={15} />
                GitHub
              </a>
            </Magnetic>
          )}
          <Magnetic>
            <a
              href={siteMeta.resume}
              download
              className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-ink/25 bg-cream text-sm hover:bg-ink/5 transition"
            >
              <Download size={15} />
              Résumé
            </a>
          </Magnetic>
        </div>

        <div className="mt-14 text-[11px] uppercase tracking-[0.3em] text-ink/55 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span>{siteMeta.location}</span>
          <span>·</span>
          <LocalTime />
          <span>·</span>
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded bg-ink/10 border border-ink/10 text-ink/70">⌘K</kbd> to jump anywhere
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* COLOPHON                                                            */
/* ================================================================== */

function Colophon() {
  return (
    <footer className="border-t border-ink/15 px-6 md:px-12 py-10 text-[11px] uppercase tracking-[0.3em] text-ink/55">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {siteMeta.name} · All work, words, and
          whitespace her own.
        </div>
        <div className="flex items-center gap-4">
          <span>Set in Cormorant Garamond & DM Sans</span>
          <span>·</span>
          <span>Vol. I</span>
        </div>
      </div>
    </footer>
  );
}
