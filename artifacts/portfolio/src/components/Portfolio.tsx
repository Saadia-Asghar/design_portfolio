import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  awards, capabilities, certifications, experiences,
  featuredCaseStudy, featuredCaseStudyImage,
  processSteps, seedChapters, siteMeta, stats, techStack, tools,
} from "./seedData";
import type { Card, Chapter, Experience } from "./types";
import AddDrawer from "./AddDrawer";
import CustomCursor from "./CustomCursor";
import CommandPalette from "./CommandPalette";

const STORAGE_KEY = "saadia-portfolio-v7";

/* ── utils ── */
function useLocalTime(tz = "Asia/Karachi") {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date()));
    fmt(); const id = setInterval(fmt, 30_000); return () => clearInterval(id);
  }, [tz]);
  return t;
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    (localStorage.getItem("sa-theme") as "light" | "dark") ?? "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sa-theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") };
}

/* ── Loading screen ── */
function LoadingScreen({ done }: { done: boolean }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 18;
      if (v >= 100) { v = 100; clearInterval(id); }
      setPct(Math.min(100, Math.round(v)));
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }} animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center gap-5"
      style={{ background: "var(--c-bg)", pointerEvents: done ? "none" : "all" }}
    >
      <div className="w-64 flex flex-col gap-2">
        <div className="flex justify-between text-xs tracking-widest" style={{ color: "var(--c-muted)" }}>
          <span>LOADING...</span><span>{pct}%</span>
        </div>
        <div className="w-full h-px" style={{ background: "var(--c-border)" }}>
          <div className="h-full" style={{ background: "var(--c-fg)", width: `${pct}%`, transition: "width 0.15s linear" }} />
        </div>
      </div>
      <div className="flex gap-6 text-xs tracking-widest mt-4" style={{ color: "var(--c-muted)" }}>
        <a href={siteMeta.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--c-muted)" }}>LinkedIn ↗</a>
        {siteMeta.github && <a href={siteMeta.github} target="_blank" rel="noreferrer" style={{ color: "var(--c-muted)" }}>GitHub ↗</a>}
      </div>
    </motion.div>
  );
}

/* ── SEARCH OVERLAY ── */
function SearchOverlay({ chapters, open, onClose }: {
  chapters: Chapter[]; open: boolean; onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) { setQ(""); setTimeout(() => inputRef.current?.focus(), 80); } }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const n = q.trim().toLowerCase();
    const found: { chapter: Chapter; card: Card }[] = [];
    for (const ch of chapters) {
      for (const card of ch.cards) {
        if (
          card.title.toLowerCase().includes(n) ||
          card.subtitle?.toLowerCase().includes(n) ||
          card.tags?.some(t => t.toLowerCase().includes(n)) ||
          ch.title.toLowerCase().includes(n)
        ) found.push({ chapter: ch, card });
      }
    }
    return found;
  }, [q, chapters]);

  const scrollTo = (chapterId: string, cardId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(`card-${cardId}`) ?? document.getElementById(`ch-${chapterId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[80]"
            style={{ background: "color-mix(in srgb, var(--c-bg) 85%, transparent)", backdropFilter: "blur(6px)" }} />
          <motion.div key="panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-20 -translate-x-1/2 z-[81] w-[92%] max-w-2xl"
            style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
          >
            <div className="flex items-center gap-3 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
              <span className="text-xs" style={{ color: "var(--c-muted)" }}>SEARCH</span>
              <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
                placeholder="search designs, chapters, tags…"
                className="flex-1 py-4 bg-transparent outline-none text-sm"
                style={{ fontFamily: "inherit", color: "var(--c-fg)" }}
              />
              <kbd className="text-[10px]" style={{ color: "var(--c-muted)" }}>esc</kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {!q.trim() && (
                <div className="px-5 py-10 text-sm text-center" style={{ color: "var(--c-muted)" }}>
                  Type to search across {chapters.reduce((s, c) => s + c.cards.length, 0)} designs in {chapters.length} chapters
                </div>
              )}
              {q.trim() && results.length === 0 && (
                <div className="px-5 py-10 text-sm text-center" style={{ color: "var(--c-muted)" }}>No results for "{q}"</div>
              )}
              {results.map(({ chapter, card }) => (
                <button key={card.id} onClick={() => scrollTo(chapter.id, card.id)}
                  className="w-full text-left flex items-center gap-5 px-5 py-3.5 transition-colors hover:bg-[var(--c-bg)]"
                  style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-border) 40%, transparent)", fontFamily: "inherit" }}
                >
                  {card.image && (
                    <img src={card.image} alt="" className="h-10 w-16 object-cover shrink-0" style={{ border: "1px solid var(--c-border)" }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{card.title}</div>
                    <div className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: "var(--c-muted)" }}>
                      {chapter.number}. {chapter.title}
                      {card.tags && card.tags.length > 0 && ` · ${card.tags.join(", ")}`}
                    </div>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: "var(--c-muted)" }}>↗</span>
                </button>
              ))}
            </div>
            {q.trim() && results.length > 0 && (
              <div className="px-5 py-2 text-[10px] tracking-widest" style={{ color: "var(--c-muted)", borderTop: "1px solid var(--c-border)" }}>
                {results.length} result{results.length !== 1 ? "s" : ""}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── ABOUT / INDEX PANEL ── */
function IndexPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const currentRoles = experiences.filter(e => e.current);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[70]"
            style={{ background: "color-mix(in srgb, var(--c-bg) 80%, transparent)", backdropFilter: "blur(8px)" }} />
          <motion.aside key="panel"
            initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 z-[71] overflow-y-auto"
            style={{ background: "var(--c-bg)", borderBottom: "1px solid var(--c-border)", maxHeight: "90vh" }}
          >
            <div className="max-w-6xl mx-auto px-8 py-10 pb-12">
              <div className="flex items-start justify-between mb-10">
                <div>
                  <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--c-muted)" }}>INDEX · ABOUT SAADIA</div>
                  <h2 className="text-3xl md:text-5xl font-medium tracking-tight">{siteMeta.name}</h2>
                  <p className="text-sm mt-2" style={{ color: "var(--c-muted)" }}>{siteMeta.role}</p>
                </div>
                <button onClick={onClose} className="text-xl px-2 py-1 hover:opacity-60 transition" style={{ fontFamily: "inherit" }}>✕</button>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {/* Bio + contacts */}
                <div className="md:col-span-1 space-y-6">
                  <div>
                    <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--c-muted)" }}>BIO</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{siteMeta.bio}</p>
                  </div>

                  <div>
                    <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--c-muted)" }}>EDUCATION</div>
                    <div className="text-sm">
                      <div className="font-medium">{siteMeta.education?.degree}</div>
                      <div style={{ color: "var(--c-muted)" }}>{siteMeta.education?.school}</div>
                      <div className="text-xs tracking-widest mt-0.5" style={{ color: "var(--c-muted)" }}>{siteMeta.education?.years}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--c-muted)" }}>CONTACT</div>
                    <div className="space-y-2">
                      {[
                        { label: "Email", href: `mailto:${siteMeta.email}`, text: siteMeta.email },
                        { label: "LinkedIn", href: siteMeta.linkedin, text: "linkedin.com/in/saadia-asghar" },
                        { label: "GitHub", href: siteMeta.github ?? "#", text: "github.com/Saadia-Asghar" },
                      ].map(c => (
                        <a key={c.label} href={c.href} target={c.label !== "Email" ? "_blank" : undefined} rel="noreferrer"
                          className="flex items-center justify-between gap-4 py-2 text-sm"
                          style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-border) 40%, transparent)", fontFamily: "inherit", color: "var(--c-fg)" }}>
                          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>{c.label}</span>
                          <span className="text-xs truncate">{c.text} ↗</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {siteMeta.availableFor.map(r => (
                      <span key={r} className="text-[10px] tracking-widest uppercase px-2 py-1"
                        style={{ border: "1px solid var(--c-border)", color: "var(--c-muted)" }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current roles */}
                <div>
                  <div className="text-[10px] tracking-widest uppercase mb-4" style={{ color: "var(--c-muted)" }}>ACTIVE ROLES ({currentRoles.length})</div>
                  <div style={{ borderTop: "1px solid var(--c-border)" }}>
                    {currentRoles.map(e => (
                      <div key={e.id} className="py-3 flex items-start justify-between gap-3"
                        style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-border) 40%, transparent)" }}>
                        <div>
                          <div className="text-sm font-medium">{e.role}</div>
                          <div className="text-xs tracking-widest mt-0.5" style={{ color: "var(--c-muted)" }}>{e.org}</div>
                        </div>
                        <ExperienceTypeBadge type={e.type} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick jump */}
                <div>
                  <div className="text-[10px] tracking-widest uppercase mb-4" style={{ color: "var(--c-muted)" }}>QUICK JUMP</div>
                  <div className="space-y-1">
                    {[
                      ["FEATURED CASE STUDY", "#case"],
                      ["SELECTED WORK", "#work"],
                      ["EXPERIENCE", "#experience"],
                      ["PROCESS", "#process"],
                      ["RECOGNITION", "#awards"],
                      ["ABOUT", "#about"],
                      ["CONTACT", "#contact"],
                    ].map(([l, h]) => (
                      <a key={h} href={h} onClick={onClose}
                        className="flex items-center justify-between py-2.5 text-sm transition-opacity hover:opacity-60"
                        style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-border) 40%, transparent)", fontFamily: "inherit", color: "var(--c-fg)" }}>
                        {l}<span>↓</span>
                      </a>
                    ))}
                  </div>
                  <a href={siteMeta.resume} download
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase transition"
                    style={{ background: "var(--c-fg)", color: "var(--c-bg)", fontFamily: "inherit" }}>
                    DOWNLOAD RÉSUMÉ ↓
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ExperienceTypeBadge({ type }: { type: Experience["type"] }) {
  const labels: Record<Experience["type"], string> = {
    design: "DESIGN", community: "COMMUNITY", tech: "TECH",
    ambassador: "AMBASSADOR", ai: "AI", marketing: "MARKETING",
  };
  return (
    <span className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 shrink-0"
      style={{ border: "1px solid var(--c-border)", color: "var(--c-muted)" }}>
      {labels[type]}
    </span>
  );
}

/* ── MAIN ── */
export default function Portfolio() {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try { const r = localStorage.getItem(STORAGE_KEY); if (r) { const p = JSON.parse(r) as Chapter[]; if (Array.isArray(p) && p.length) return p; } } catch {}
    return seedChapters;
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => { const id = setTimeout(() => setLoaded(true), 1600); return () => clearTimeout(id); }, []);

  // ⌘K → search
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(v => !v); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const save = (next: Chapter[]) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {} };
  const addCard = (cid: string, card: Card) => setChapters(p => { const n = p.map(c => c.id === cid ? { ...c, cards: [...c.cards, card] } : c); save(n); return n; });
  const addChapter = (ch: Chapter) => setChapters(p => { const n = [...p, ch]; save(n); return n; });
  const deleteCard = (cid: string, kid: string) => setChapters(p => { const n = p.map(c => c.id === cid ? { ...c, cards: c.cards.filter(k => k.id !== kid) } : c); save(n); return n; });

  const jumps = [
    { id: "top", label: "Top", hint: "Hero", hash: "#top" },
    { id: "case", label: "Featured Case Study", hint: "Vyrothon", hash: "#case" },
    { id: "work", label: "Selected Work", hint: "Chapters", hash: "#work" },
    { id: "experience", label: "Experience", hint: "Roles & History", hash: "#experience" },
    { id: "process", label: "How I Work", hint: "Process", hash: "#process" },
    { id: "awards", label: "Recognition", hint: "Awards", hash: "#awards" },
    { id: "about", label: "About", hint: "Personal", hash: "#about" },
    { id: "contact", label: "Contact", hint: "Let's talk", hash: "#contact" },
    ...chapters.map(ch => ({ id: `ch-${ch.id}`, label: `Chapter ${ch.number}: ${ch.title}`, hint: "Chapter", hash: `#ch-${ch.id}` })),
    { id: "search", label: "Search designs…", hint: "⌘K", action: () => setSearchOpen(true) },
    { id: "index", label: "About me (index)", hint: "Panel", action: () => setIndexOpen(true) },
    { id: "resume", label: "Download Résumé", hint: "PDF", action: () => window.open(siteMeta.resume, "_blank") },
    { id: "linkedin", label: "LinkedIn", hint: "Social", action: () => window.open(siteMeta.linkedin, "_blank") },
    { id: "github", label: "GitHub", hint: "Code", action: () => window.open(siteMeta.github!, "_blank") },
    { id: "add", label: "Add a design card", hint: "Drawer", action: () => setDrawerOpen(true) },
    { id: "theme", label: `Switch to ${theme === "light" ? "dark" : "light"} mode`, hint: "Theme", action: toggle },
  ];

  return (
    <>
      <LoadingScreen done={loaded} />
      <CustomCursor />
      <div className="outer-frame" />
      <LiveClock />

      {/* Theme toggle */}
      <div className="fixed top-5 right-16 z-50 flex gap-1">
        {(["light", "dark"] as const).map(c => (
          <button key={c} onClick={() => { document.documentElement.setAttribute("data-theme", c); localStorage.setItem("sa-theme", c); if (theme !== c) toggle(); }}
            className="theme-btn" data-color={c} aria-label={`${c} mode`}
            style={{ background: theme === c ? "var(--c-fg)" : "transparent" }} />
        ))}
      </div>

      {/* Overlays */}
      <IndexPanel open={indexOpen} onClose={() => setIndexOpen(false)} />
      <SearchOverlay chapters={chapters} open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* + FAB */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-8 right-8 z-40 text-xs tracking-widest uppercase px-4 py-2 transition"
        style={{ border: "1px solid var(--c-border)", background: "var(--c-fg)", color: "var(--c-bg)", fontFamily: "inherit" }}>
        + ADD
      </motion.button>

      <div id="top" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease 1.8s" }}>
        <Nav
          jumps={jumps}
          onSearch={() => setSearchOpen(true)}
          onIndex={() => setIndexOpen(true)}
          theme={theme}
          onToggleTheme={toggle}
        />
        <Hero />
        <BarcodeStrip text="SAADIA·ASGHAR·PRODUCT·DESIGNER·MARKETING·DIRECTOR·AI·INTERN·ISLAMABAD·GIKI" />
        <Manifesto />
        <StatsRow />
        <BarcodeStrip text="VYROTHON·1ST·MIT·TOP·10·BASED·3RD·NAJOOMI·REPLIT·CANVA·UROG·ACM·MLSA·GDG" />
        <FeaturedCase />
        <Work chapters={chapters} onDelete={deleteCard} onSearch={() => setSearchOpen(true)} />
        <ExperienceSection />
        <Process />
        <Recognition />
        <Tools />
        <About />
        <Contact />
        <Footer />
      </div>

      <AddDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} chapters={chapters} onAddCard={addCard} onAddChapter={addChapter} />
    </>
  );
}

/* ── LIVE CLOCK ── */
function LiveClock() {
  const t = useLocalTime("Asia/Karachi");
  return (
    <div className="fixed top-5 right-32 z-50 text-xs tracking-widest select-none hidden md:block" style={{ color: "var(--c-muted)", fontFamily: "inherit" }}>
      {t || "—:—"}
    </div>
  );
}

/* ── NAV ── */
function Nav({ jumps, onSearch, onIndex, theme, onToggleTheme }: {
  jumps: Parameters<typeof CommandPalette>[0]["jumps"];
  onSearch: () => void; onIndex: () => void;
  theme: string; onToggleTheme: () => void;
}) {
  const { scrollY } = useScroll();
  const border = useTransform(scrollY, [0, 80], ["color-mix(in srgb, var(--c-border) 0%, transparent)", "var(--c-border)"]);

  return (
    <motion.header
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between gap-4"
      style={{ background: "var(--c-bg)", borderBottom: `1px solid var(--c-border)`, borderColor: border, transition: "border-color 0.2s" }}
    >
      {/* Logo + INDEX */}
      <div className="flex items-center gap-3">
        <a href="#top" className="text-sm font-medium tracking-widest flex items-center gap-2" style={{ fontFamily: "inherit" }}>
          <span className="text-xs px-1.5 py-0.5" style={{ border: "1px solid var(--c-border)" }}>SA</span>
          <span className="hidden sm:inline text-xs tracking-widest">SAADIA ASGHAR</span>
        </a>
        <button onClick={onIndex}
          className="text-[10px] tracking-widest uppercase px-2.5 py-1 transition hidden md:inline-flex items-center gap-1"
          style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-muted)" }}>
          INDEX ↗
        </button>
      </div>

      {/* Center nav */}
      <nav className="hidden xl:flex items-center gap-5 text-[11px] tracking-widest uppercase">
        {[
          ["WORK", "#work"],
          ["EXPERIENCE", "#experience"],
          ["CASE", "#case"],
          ["PROCESS", "#process"],
          ["AWARDS", "#awards"],
          ["ABOUT", "#about"],
          ["CONTACT", "#contact"],
        ].map(([l, h]) => (
          <a key={h} href={h} className="transition-opacity hover:opacity-60" style={{ fontFamily: "inherit" }}>{l}</a>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <button onClick={onSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-[11px] tracking-widest uppercase transition"
          style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-muted)" }}>
          SEARCH <span className="text-[9px] px-1 py-0.5" style={{ border: "1px solid var(--c-muted)" }}>⌘K</span>
        </button>
        <a href={siteMeta.linkedin} target="_blank" rel="noreferrer"
          className="text-[11px] tracking-widest uppercase px-2.5 py-1.5 transition hidden sm:inline-block"
          style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-fg)" }}>
          LI ↗
        </a>
        {siteMeta.github && (
          <a href={siteMeta.github} target="_blank" rel="noreferrer"
            className="text-[11px] tracking-widest uppercase px-2.5 py-1.5 transition hidden sm:inline-block"
            style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-fg)" }}>
            GH ↗
          </a>
        )}
        <a href={siteMeta.resume} download
          className="text-[11px] tracking-widest uppercase px-2.5 py-1.5 transition hidden md:inline-block"
          style={{ background: "var(--c-fg)", color: "var(--c-bg)", fontFamily: "inherit" }}>
          RÉSUMÉ
        </a>
      </div>
    </motion.header>
  );
}

/* ── HERO ── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative px-8 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <motion.div style={{ y }} className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10 text-[11px] tracking-widest uppercase flex-wrap" style={{ color: "var(--c-muted)" }}>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            AVAILABLE
          </span>
          <span>·</span>
          <span>{siteMeta.location}</span>
          <span>·</span>
          <span>B.SC. DATA SCIENCE · GIKI</span>
          <span>·</span>
          <span className="px-2 py-0.5" style={{ border: "1px solid var(--c-border)" }}>MARKETING DIRECTOR · UROG</span>
          <span className="px-2 py-0.5" style={{ border: "1px solid var(--c-border)" }}>AI INTERN · NAJOOMI</span>
        </div>

        <h1 className="font-medium leading-none tracking-tighter text-[clamp(3.5rem,11vw,9.5rem)] mb-8">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.9 }} className="block">SAADIA</motion.span>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 2.05 }} className="block" style={{ color: "var(--c-muted)" }}>ASGHAR.</motion.span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mt-10 items-end">
          <div>
            <p className="text-sm md:text-base leading-relaxed max-w-lg" style={{ color: "var(--c-muted)" }}>
              {siteMeta.tagline}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#work" className="text-xs tracking-widest uppercase px-5 py-2.5 transition"
                style={{ background: "var(--c-fg)", color: "var(--c-bg)", fontFamily: "inherit" }}>
                VIEW WORK →
              </a>
              <a href="#experience" className="text-xs tracking-widest uppercase px-5 py-2.5 transition"
                style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-fg)" }}>
                EXPERIENCE ↓
              </a>
              <a href="#contact" className="text-xs tracking-widest uppercase px-5 py-2.5 transition"
                style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-fg)" }}>
                CONTACT ↓
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x" style={{ border: "1px solid var(--c-border)", borderColor: "var(--c-border)" }}>
            {[
              { v: "500+", l: "Vyrothon\nApplicants" },
              { v: "Top 5", l: "National\nFinalist" },
              { v: "Top 10", l: "MIT Hack\nNation" },
            ].map((s, i) => (
              <div key={i} className="p-4" style={{ borderColor: "var(--c-border)" }}>
                <div className="text-2xl font-medium">{s.v}</div>
                <div className="text-[10px] tracking-widest uppercase mt-1 whitespace-pre-line leading-snug" style={{ color: "var(--c-muted)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-8 text-[10px] tracking-widest uppercase flex items-center gap-3" style={{ color: "var(--c-muted)" }}>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span>
        SCROLL
      </div>
    </section>
  );
}

/* ── BARCODE STRIP ── */
function BarcodeStrip({ text }: { text: string }) {
  return (
    <div className="py-3 overflow-hidden flex items-center" style={{ borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
      <div className="flex items-center gap-8 whitespace-nowrap px-8">
        <span className="barcode-text text-5xl select-none" aria-hidden style={{ color: "var(--c-fg)" }}>{text}</span>
        <span className="text-[10px] tracking-[0.4em] uppercase shrink-0" style={{ color: "var(--c-muted)" }}>{text.replace(/·/g, " ")}</span>
        <span className="barcode-text text-5xl select-none" aria-hidden style={{ color: "var(--c-fg)" }}>{text}</span>
      </div>
    </div>
  );
}

/* ── MANIFESTO ── */
function Manifesto() {
  return (
    <section className="px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-start">
        <div>
          <Row label="00 · MANIFESTO" />
          <p className="text-2xl md:text-4xl leading-tight tracking-tight font-medium mt-8 max-w-3xl">
            "I believe the best products feel like good stationery — calm, confident, and quietly delightful."
          </p>
        </div>
        <aside className="text-sm space-y-2 min-w-[220px] mt-8 md:mt-14">
          <div className="text-[10px] tracking-widest uppercase mb-4" style={{ color: "var(--c-muted)" }}>PRINCIPLES</div>
          {["Clarity is a form of kindness.", "Every pixel earns its place.", "Ship, watch, edit.", "Systems beat genius."].map((p, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[10px] tracking-widest mt-0.5" style={{ color: "var(--c-muted)" }}>0{i + 1}</span>
              <span style={{ color: "var(--c-muted)" }}>{p}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

/* ── STATS ROW ── */
function StatsRow() {
  return (
    <section style={{ borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "var(--c-border)" }}>
        {stats.map((s, i) => (
          <div key={i} className="px-8 py-10">
            <div className="text-4xl md:text-5xl font-medium tracking-tight">{s.prefix}{s.value}{s.suffix}</div>
            <div className="text-[10px] tracking-widest uppercase mt-2 leading-relaxed" style={{ color: "var(--c-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FEATURED CASE ── */
function FeaturedCase() {
  return (
    <section id="case" className="px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Row label="01 · FEATURED CASE STUDY" />
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 mt-10">
          <div>
            <div className="text-[10px] tracking-widest uppercase mb-2 flex items-center gap-3" style={{ color: "var(--c-muted)" }}>
              <span className="px-2 py-0.5 text-[10px]" style={{ border: "1px solid var(--c-border)" }}>AWARD · 1ST PLACE</span>
              {featuredCaseStudy.year}
            </div>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight mt-4">{featuredCaseStudy.title}</h2>
            <div className="text-xs tracking-widest mt-3 flex flex-wrap gap-x-4 gap-y-1" style={{ color: "var(--c-muted)" }}>
              <span>{featuredCaseStudy.client}</span><span>·</span><span>{featuredCaseStudy.role}</span>
            </div>
            <p className="mt-8 leading-relaxed" style={{ color: "var(--c-muted)" }}>{featuredCaseStudy.summary}</p>
            <div className="mt-8 space-y-6">
              <Block title="THE PROBLEM" body={featuredCaseStudy.problem} />
              <div>
                <div className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--c-muted)" }}>THE APPROACH</div>
                <ol className="space-y-2">
                  {featuredCaseStudy.approach.map((a, i) => (
                    <li key={i} className="flex gap-4 text-sm leading-relaxed">
                      <span className="shrink-0 text-[10px] tracking-widest mt-0.5" style={{ color: "var(--c-muted)" }}>0{i + 1}</span>
                      <span style={{ color: "var(--c-muted)" }}>{a}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <Block title="THE OUTCOME" body={featuredCaseStudy.outcome} />
            </div>
            {featuredCaseStudy.link && (
              <a href={featuredCaseStudy.link} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-xs tracking-widest uppercase px-4 py-2 transition"
                style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-fg)" }}>
                VIEW ON FIGMA ↗
              </a>
            )}
          </div>
          <div className="lg:sticky lg:top-24">
            <a href={featuredCaseStudy.link ?? "#"} target={featuredCaseStudy.link ? "_blank" : undefined} rel="noreferrer"
              className="group relative block overflow-hidden" style={{ border: "1px solid var(--c-border)" }}>
              {featuredCaseStudyImage
                ? <img src={featuredCaseStudyImage} alt={featuredCaseStudy.title} className="w-full h-80 object-cover transition duration-700 group-hover:scale-[1.03]" />
                : <div className="w-full h-80 flex items-center justify-center text-4xl font-medium" style={{ background: "var(--c-surface)" }}>1ST</div>
              }
              <div className="absolute top-3 left-3">
                <span className="text-[10px] tracking-widest uppercase px-2 py-1" style={{ background: "var(--c-fg)", color: "var(--c-bg)" }}>VYROTHON · 1ST</span>
              </div>
            </a>
            {featuredCaseStudy.metrics && (
              <div className="grid grid-cols-2 divide-x divide-y" style={{ border: "1px solid var(--c-border)", borderTop: "none", borderColor: "var(--c-border)" }}>
                {featuredCaseStudy.metrics.map((m, i) => (
                  <div key={i} className="px-5 py-4" style={{ borderColor: "var(--c-border)" }}>
                    <div className="text-2xl font-medium">{m.value}</div>
                    <div className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "var(--c-muted)" }}>{m.label}</div>
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

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--c-muted)" }}>{title}</div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{body}</p>
    </div>
  );
}

/* ── CHAPTER NAV ── */
function ChapterNav({ chapters, activeId, onSelect }: { chapters: Chapter[]; activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="sticky top-[57px] z-30 overflow-x-auto flex items-center gap-0"
      style={{ background: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
      <div className="flex items-center shrink-0 px-5 text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)", borderRight: "1px solid var(--c-border)", height: "100%", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
        CHAPTERS
      </div>
      {chapters.map(ch => (
        <button key={ch.id} onClick={() => onSelect(ch.id)}
          className="flex items-center gap-2 px-4 py-3 text-xs tracking-widest uppercase transition whitespace-nowrap shrink-0"
          style={{
            fontFamily: "inherit",
            borderRight: "1px solid var(--c-border)",
            background: activeId === ch.id ? "var(--c-fg)" : "transparent",
            color: activeId === ch.id ? "var(--c-bg)" : "var(--c-fg)",
          }}>
          <span style={{ color: activeId === ch.id ? "var(--c-bg)" : "var(--c-muted)" }}>{ch.number}</span>
          {ch.title}
        </button>
      ))}
    </div>
  );
}

/* ── WORK ── */
function Work({ chapters, onDelete, onSearch }: {
  chapters: Chapter[]; onDelete: (cid: string, kid: string) => void; onSearch: () => void;
}) {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    const el = document.getElementById(`ch-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track active chapter via IntersectionObserver
  useEffect(() => {
    const els = chapters.map(ch => document.getElementById(`ch-${ch.id}`)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = e.target.id.replace("ch-", "");
          setActiveChapter(id);
        }
      }
    }, { rootMargin: "-30% 0px -60% 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [chapters]);

  return (
    <section id="work" style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="px-8 py-4 flex items-center justify-between gap-4" style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
        <Row label="02 · SELECTED WORK" />
        <div className="flex items-center gap-3">
          <button onClick={onSearch}
            className="flex items-center gap-2 text-[10px] tracking-widest uppercase px-3 py-1.5 transition"
            style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-muted)" }}>
            SEARCH DESIGNS ⌘K
          </button>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>
            {chapters.length} chapters · {chapters.reduce((s, c) => s + c.cards.length, 0)} pieces
          </span>
        </div>
      </div>

      <ChapterNav chapters={chapters} activeId={activeChapter} onSelect={scrollToChapter} />

      {chapters.map((ch, i) => (
        <ChapterBlock key={ch.id} chapter={ch} index={i} totalChapters={chapters.length} onDelete={kid => onDelete(ch.id, kid)} />
      ))}
    </section>
  );
}

function ChapterBlock({ chapter, index, totalChapters, onDelete }: {
  chapter: Chapter; index: number; totalChapters: number; onDelete: (id: string) => void;
}) {
  return (
    <div id={`ch-${chapter.id}`} style={{ borderBottom: "1px solid var(--c-border)", scrollMarginTop: "110px" }}>
      <div className="px-8 py-6 grid md:grid-cols-[1fr_auto] items-baseline gap-4"
        style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
        <div>
          <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--c-muted)" }}>
            CHAPTER {chapter.number} · {String(index + 1).padStart(2, "0")} OF {totalChapters}
          </div>
          <h3 className="text-2xl md:text-4xl font-medium tracking-tight">{chapter.title}</h3>
          {chapter.subtitle && <p className="text-xs tracking-widest mt-1" style={{ color: "var(--c-muted)" }}>{chapter.subtitle}</p>}
        </div>
        {chapter.intro && <p className="text-sm max-w-xs" style={{ color: "var(--c-muted)" }}>{chapter.intro}</p>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y" style={{ borderColor: "var(--c-border)" }}>
        {chapter.cards.map((card, i) => (
          <WorkCard key={card.id} card={card} index={i} onDelete={() => onDelete(card.id)} />
        ))}
        {chapter.cards.length === 0 && (
          <div className="col-span-3 px-8 py-16 text-center text-sm" style={{ color: "var(--c-muted)" }}>
            Use + ADD to place a design here.
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Link Preview Image ── */
function LinkPreviewImage({ url, title }: { url: string; title: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "err">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false`, { headers: { Accept: "application/json" } })
      .then(r => r.json())
      .then((data: { data?: { screenshot?: { url?: string }; image?: { url?: string } } }) => {
        if (cancelled) return;
        const imgUrl = data?.data?.screenshot?.url ?? data?.data?.image?.url ?? null;
        if (imgUrl) { setSrc(imgUrl); setStatus("ok"); } else setStatus("err");
      })
      .catch(() => { if (!cancelled) setStatus("err"); });
    return () => { cancelled = true; };
  }, [url]);

  if (status === "ok" && src) return (
    <div className="overflow-hidden aspect-[16/9]" style={{ borderBottom: "1px solid var(--c-border)" }}>
      <img src={src} alt={title} loading="lazy" className="w-full h-full object-cover transition duration-500 hover:scale-[1.04]" />
    </div>
  );
  if (status === "loading") return (
    <div className="aspect-[16/9] flex items-center justify-center" style={{ background: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
      <div className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>LOADING…</div>
    </div>
  );
  return (
    <div className="aspect-[16/9] flex items-center justify-center text-5xl font-medium tracking-tighter"
      style={{ background: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
      {title.charAt(0)}
    </div>
  );
}

function WorkCard({ card, index, onDelete }: { card: Card; index: number; onDelete: () => void }) {
  return (
    <motion.div id={`card-${card.id}`}
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="work-card group" style={{ borderColor: "var(--c-border)", scrollMarginTop: "140px" }}
    >
      {card.image ? (
        <div className="overflow-hidden aspect-[16/9]" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <img src={card.image} alt={card.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        </div>
      ) : card.link ? (
        <LinkPreviewImage url={card.link} title={card.title} />
      ) : (
        <div className="aspect-[16/9] flex items-center justify-center text-5xl font-medium tracking-tighter"
          style={{ background: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
          {card.title.charAt(0)}
        </div>
      )}
      <div className="p-5">
        {card.award && (
          <div className="text-[10px] tracking-widest uppercase px-2 py-0.5 inline-block mb-3"
            style={{ border: "1px solid var(--c-border)", color: "var(--c-muted)" }}>{card.award}</div>
        )}
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-medium leading-tight">{card.title}</h4>
          {card.link && (
            <a href={card.link} target="_blank" rel="noreferrer"
              className="shrink-0 text-xs px-2 py-1 transition"
              style={{ border: "1px solid var(--c-border)", fontFamily: "inherit", color: "var(--c-fg)" }}>↗</a>
          )}
        </div>
        {card.subtitle && <p className="text-[11px] tracking-widest uppercase mt-1" style={{ color: "var(--c-muted)" }}>{card.subtitle}</p>}
        {card.impact && <p className="text-sm mt-2 italic" style={{ color: "var(--c-muted)" }}>— {card.impact}</p>}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {card.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── EXPERIENCE SECTION ── */
function ExperienceSection() {
  const [filter, setFilter] = useState<Experience["type"] | "all">("all");
  const types: { key: Experience["type"] | "all"; label: string }[] = [
    { key: "all", label: "ALL" },
    { key: "marketing", label: "MARKETING" },
    { key: "design", label: "DESIGN" },
    { key: "ai", label: "AI/TECH" },
    { key: "community", label: "COMMUNITY" },
    { key: "ambassador", label: "AMBASSADOR" },
  ];

  const filtered = filter === "all" ? experiences : experiences.filter(e => e.type === filter);

  return (
    <section id="experience" style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="px-8 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
        <Row label="03 · EXPERIENCE & ROLES" />
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>
          {experiences.filter(e => e.current).length} active · {experiences.length} total
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex overflow-x-auto" style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
        {types.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className="px-5 py-2.5 text-[10px] tracking-widest uppercase transition shrink-0"
            style={{
              fontFamily: "inherit",
              borderRight: "1px solid var(--c-border)",
              background: filter === t.key ? "var(--c-fg)" : "transparent",
              color: filter === t.key ? "var(--c-bg)" : "var(--c-muted)",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-8 py-6">
        <div style={{ borderTop: "1px solid var(--c-border)" }}>
          {filtered.map((exp, i) => (
            <motion.div key={exp.id}
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}
              className="flex items-start md:items-center justify-between gap-4 py-5 flex-wrap md:flex-nowrap"
              style={{ borderBottom: "1px solid var(--c-border)" }}>
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="flex items-center justify-center h-4 w-4 mt-0.5 shrink-0">
                  {exp.current && <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />}
                  {!exp.current && <span className="h-1.5 w-1.5" style={{ background: "var(--c-border)" }} />}
                </div>
                <div>
                  <div className="font-medium">{exp.role}</div>
                  <div className="text-sm mt-0.5" style={{ color: "var(--c-muted)" }}>{exp.org}</div>
                  {exp.description && <div className="text-xs mt-1 italic" style={{ color: "var(--c-muted)" }}>{exp.description}</div>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-8 md:ml-0">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>{exp.period}</span>
                <ExperienceTypeBadge type={exp.type} />
                {exp.current && (
                  <span className="text-[9px] tracking-widest uppercase px-1.5 py-0.5"
                    style={{ background: "var(--c-fg)", color: "var(--c-bg)" }}>NOW</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
function Process() {
  return (
    <section id="process" style={{ background: "var(--c-fg)", color: "var(--c-bg)", borderTop: "1px solid var(--c-border)" }}>
      <div className="px-8 py-5" style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-bg) 20%, transparent)" }}>
        <div className="text-[10px] tracking-widest uppercase" style={{ color: "color-mix(in srgb, var(--c-bg) 60%, transparent)" }}>04 · PROCESS</div>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-20">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-2xl" style={{ color: "var(--c-bg)" }}>
          A short loop I run on every project, big or small.
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {processSteps.map((s, i) => (
            <motion.div key={s.number}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ borderTop: "1px solid color-mix(in srgb, var(--c-bg) 20%, transparent)", paddingTop: "1.5rem" }}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm" style={{ color: "color-mix(in srgb, var(--c-bg) 50%, transparent)" }}>{s.number}</span>
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "color-mix(in srgb, var(--c-bg) 50%, transparent)" }}>STEP {i + 1} / {processSteps.length}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-medium mt-2" style={{ color: "var(--c-bg)" }}>{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--c-bg) 70%, transparent)" }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── RECOGNITION ── */
function Recognition() {
  return (
    <section id="awards" className="px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Row label="05 · RECOGNITION" />
        <div className="mt-10" style={{ borderTop: "1px solid var(--c-border)" }}>
          {awards.map((a, i) => {
            const Tag = a.link ? motion.a : motion.div;
            const extra = a.link ? { href: a.link, target: "_blank", rel: "noreferrer" } : {};
            return (
              <Tag key={i} {...(extra as Record<string, unknown>)}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex items-center justify-between gap-6 py-5 px-2 transition-colors"
                style={{ borderBottom: "1px solid var(--c-border)", cursor: a.link ? "pointer" : "default", fontFamily: "inherit" }}>
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <span className="h-1.5 w-1.5 shrink-0" style={{ background: a.accent ? "#c8a24b" : "var(--c-fg)" }} />
                  <span className="font-medium text-lg md:text-2xl leading-tight">{a.title}</span>
                  <span className="text-sm italic hidden md:inline" style={{ color: "var(--c-muted)" }}>{a.org}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] tracking-widest uppercase shrink-0" style={{ color: "var(--c-muted)" }}>
                  <span>{a.year}</span>
                  {a.link && <span className="transition-transform group-hover:translate-x-1">↗</span>}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── TOOLS ── */
function Tools() {
  return (
    <section style={{ borderTop: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-20 grid md:grid-cols-3 gap-12">
        <div>
          <div className="text-[10px] tracking-widest uppercase mb-6" style={{ color: "var(--c-muted)" }}>CAPABILITIES</div>
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--c-muted)" }}>
            {capabilities.map(c => <li key={c} className="flex items-center gap-2"><span className="text-[10px]">→</span>{c}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-widest uppercase mb-6" style={{ color: "var(--c-muted)" }}>DESIGN TOOLS</div>
          <div className="flex flex-wrap gap-2">
            {tools.map(t => <span key={t.name} className="tag">{t.name}</span>)}
          </div>
          <div className="text-[10px] tracking-widest uppercase mt-8 mb-4" style={{ color: "var(--c-muted)" }}>TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {techStack.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-widest uppercase mb-6" style={{ color: "var(--c-muted)" }}>CERTIFICATIONS</div>
          <ul style={{ borderTop: "1px solid var(--c-border)" }}>
            {certifications.map(c => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 py-3" style={{ borderBottom: "1px solid var(--c-border)" }}>
                <span className="text-sm">{c.name}</span>
                <span className="text-[10px] tracking-widest uppercase shrink-0" style={{ color: "var(--c-muted)" }}>{c.by}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const time = useLocalTime("Asia/Karachi");
  return (
    <section id="about" className="px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_0.8fr] gap-12">
        <div>
          <Row label="06 · ABOUT" />
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight mt-8">
            Designer, marketer,<br />campus builder, AI intern.
          </h2>
          <p className="mt-8 text-sm leading-relaxed max-w-lg" style={{ color: "var(--c-muted)" }}>{siteMeta.bio}</p>
          {siteMeta.education && (
            <div className="mt-8 p-4" style={{ border: "1px solid var(--c-border)" }}>
              <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--c-muted)" }}>EDUCATION</div>
              <div className="font-medium">{siteMeta.education.degree}</div>
              <div className="text-xs tracking-widest mt-1" style={{ color: "var(--c-muted)" }}>{siteMeta.education.school} · {siteMeta.education.location}</div>
              {siteMeta.education.years && <div className="text-xs tracking-widest mt-0.5" style={{ color: "var(--c-muted)" }}>{siteMeta.education.years}</div>}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {siteMeta.availableFor.map(r => (
              <span key={r} className="text-[10px] tracking-widest uppercase px-3 py-1.5" style={{ border: "1px solid var(--c-border)" }}>
                OPEN FOR · {r.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div style={{ border: "1px solid var(--c-border)" }}>
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
              <div className="text-[10px] tracking-widest uppercase">CURRENTLY</div>
              <div className="flex items-center gap-2 text-[10px] tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                {time || "LIVE"}
              </div>
            </div>
            {[
              ["READING", siteMeta.currently.reading],
              ["BUILDING", siteMeta.currently.building],
              ["THINKING", siteMeta.currently.thinking],
            ].map(([k, v], i) => (
              <div key={i} className="px-5 py-4" style={{ borderBottom: "1px solid var(--c-border)" }}>
                <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--c-muted)" }}>{k}</div>
                <div className="text-sm">{v}</div>
              </div>
            ))}
            <div className="px-5 py-3 text-[10px] tracking-widest" style={{ color: "var(--c-muted)" }}>
              {siteMeta.location} · {siteMeta.timezone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(siteMeta.email); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {}
  };

  return (
    <section id="contact" style={{ borderTop: "1px solid var(--c-border)", background: "var(--c-fg)", color: "var(--c-bg)" }}>
      <div className="max-w-6xl mx-auto px-8 py-24 md:py-36 text-center">
        <div className="text-[10px] tracking-widest uppercase mb-8" style={{ color: "color-mix(in srgb, var(--c-bg) 60%, transparent)" }}>07 · CONTACT</div>
        <h2 className="text-4xl md:text-7xl font-medium tracking-tight leading-tight" style={{ color: "var(--c-bg)" }}>
          Let's build something<br />thoughtful.
        </h2>

        {/* Primary CTA row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-14">
          <a href={`mailto:${siteMeta.email}`}
            className="text-xs tracking-widest uppercase px-6 py-3 transition"
            style={{ background: "var(--c-bg)", color: "var(--c-fg)", fontFamily: "inherit" }}>
            {siteMeta.email}
          </a>
          <button onClick={copy}
            className="text-xs tracking-widest uppercase px-5 py-3 transition"
            style={{ border: "1px solid color-mix(in srgb, var(--c-bg) 40%, transparent)", color: "var(--c-bg)", background: "transparent", fontFamily: "inherit" }}>
            {copied ? "COPIED ✓" : "COPY EMAIL"}
          </button>
        </div>

        {/* Social / links row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a href={siteMeta.linkedin} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-3 transition"
            style={{ border: "1px solid color-mix(in srgb, var(--c-bg) 40%, transparent)", color: "var(--c-bg)", fontFamily: "inherit" }}>
            <span>LI</span>
            <span>LINKEDIN ↗</span>
          </a>
          {siteMeta.github && (
            <a href={siteMeta.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-3 transition"
              style={{ border: "1px solid color-mix(in srgb, var(--c-bg) 40%, transparent)", color: "var(--c-bg)", fontFamily: "inherit" }}>
              <span>GH</span>
              <span>GITHUB ↗</span>
            </a>
          )}
          <a href={siteMeta.resume} download
            className="text-xs tracking-widest uppercase px-5 py-3 transition"
            style={{ border: "1px solid color-mix(in srgb, var(--c-bg) 40%, transparent)", color: "var(--c-bg)", fontFamily: "inherit" }}>
            RÉSUMÉ ↓
          </a>
        </div>

        {/* Info row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-[10px] tracking-widest"
          style={{ color: "color-mix(in srgb, var(--c-bg) 50%, transparent)" }}>
          <span>{siteMeta.location}</span>
          <span>·</span>
          <span>AVAILABLE FOR {siteMeta.availableFor.slice(0, 3).join(" · ").toUpperCase()}</span>
          <span>·</span>
          <span>PRESS ⌘K TO JUMP ANYWHERE</span>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="px-8 py-5 flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-widest uppercase"
      style={{ borderTop: "1px solid var(--c-border)", color: "var(--c-muted)" }}>
      <span>© {new Date().getFullYear()} {siteMeta.name}</span>
      <div className="flex items-center gap-4">
        <a href={siteMeta.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-60 transition">LINKEDIN ↗</a>
        {siteMeta.github && <a href={siteMeta.github} target="_blank" rel="noreferrer" className="hover:opacity-60 transition">GITHUB ↗</a>}
        <a href={`mailto:${siteMeta.email}`} className="hover:opacity-60 transition">EMAIL</a>
        <span>·</span>
        <span className="barcode-text text-2xl select-none" aria-hidden>SAADIA</span>
      </div>
    </footer>
  );
}

/* ── SHARED ── */
function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>{label}</span>
      <span className="flex-1 h-px" style={{ background: "var(--c-border)" }} />
    </div>
  );
}
