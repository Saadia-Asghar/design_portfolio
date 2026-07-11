import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type Jump = {
  id: string;
  label: string;
  hint?: string;
  hash?: string;
  action?: () => void;
};

export default function CommandPalette({ jumps }: { jumps: Jump[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return jumps;
    return jumps.filter(j =>
      j.label.toLowerCase().includes(n) || j.hint?.toLowerCase().includes(n)
    );
  }, [q, jumps]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setOpen(v => !v); return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setIndex(i => Math.min(filtered.length - 1, i + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIndex(i => Math.max(0, i - 1)); }
      if (e.key === "Enter") { e.preventDefault(); if (filtered[index]) run(filtered[index]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, index]);

  useEffect(() => setIndex(0), [q, open]);

  const run = (j: Jump) => {
    setOpen(false); setQ("");
    if (j.action) return j.action();
    if (j.hash) {
      const el = document.getElementById(j.hash.replace("#", ""));
      el ? el.scrollIntoView({ behavior: "smooth" }) : (window.location.hash = j.hash);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs border"
        style={{ borderColor: "var(--c-border)", color: "var(--c-muted)", fontFamily: "inherit" }}
        aria-label="Open command palette"
      >
        JUMP TO…
        <span className="text-[10px] px-1.5 py-0.5" style={{ border: "1px solid var(--c-muted)" }}>⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90]" style={{ background: "color-mix(in srgb, var(--c-bg) 80%, transparent)", backdropFilter: "blur(4px)" }}
            />
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="fixed left-1/2 top-20 -translate-x-1/2 z-[91] w-[90%] max-w-lg overflow-hidden"
              style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
            >
              <div className="flex items-center gap-3 px-4" style={{ borderBottom: "1px solid var(--c-border)" }}>
                <span className="text-xs" style={{ color: "var(--c-muted)" }}>_</span>
                <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                  placeholder="type to jump…"
                  className="flex-1 py-3.5 bg-transparent outline-none text-sm"
                  style={{ fontFamily: "inherit", color: "var(--c-fg)" }}
                />
                <kbd className="text-[10px]" style={{ color: "var(--c-muted)" }}>esc</kbd>
              </div>
              <div className="max-h-[50vh] overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-center" style={{ color: "var(--c-muted)" }}>no results</div>
                ) : filtered.map((j, i) => (
                  <button key={j.id} onMouseEnter={() => setIndex(i)} onClick={() => run(j)}
                    className="w-full text-left flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors"
                    style={{
                      background: i === index ? "var(--c-fg)" : "transparent",
                      color: i === index ? "var(--c-bg)" : "var(--c-fg)",
                      fontFamily: "inherit",
                      borderBottom: "1px solid color-mix(in srgb, var(--c-border) 30%, transparent)",
                    }}
                  >
                    <span>{j.label}</span>
                    {j.hint && <span className="text-[10px] tracking-widest uppercase opacity-60">{j.hint}</span>}
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 flex items-center justify-between text-[10px]"
                style={{ color: "var(--c-muted)", borderTop: "1px solid var(--c-border)" }}>
                <span>↑ ↓ navigate</span><span>↵ select</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
