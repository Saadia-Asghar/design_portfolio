"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Command, Search } from "lucide-react";

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
    return jumps.filter(
      (j) =>
        j.label.toLowerCase().includes(n) ||
        j.hint?.toLowerCase().includes(n) ||
        j.id.toLowerCase().includes(n)
    );
  }, [q, jumps]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(filtered.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const pick = filtered[index];
        if (pick) run(pick);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, index]);

  useEffect(() => setIndex(0), [q, open]);

  const run = (j: Jump) => {
    setOpen(false);
    setQ("");
    if (j.action) return j.action();
    if (j.hash) {
      const id = j.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = j.hash;
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-ink/15 bg-cream/70 backdrop-blur text-xs uppercase tracking-[0.2em] text-ink/60 hover:bg-ink/5 transition"
        aria-label="Open command palette"
      >
        <Search size={13} />
        Jump to…
        <kbd className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-ink/10 text-ink/70 border border-ink/10">
          ⌘ K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-24 -translate-x-1/2 z-[91] w-[92%] max-w-xl rounded-2xl bg-cream border border-ink/15 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 border-b border-ink/10">
                <Command size={16} className="text-ink/60" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Jump to a section, open a link…"
                  className="flex-1 py-4 bg-transparent outline-none text-sm placeholder:text-ink/40"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-ink/10 text-ink/60 border border-ink/10">
                  esc
                </kbd>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-ink/50 italic font-serif-display">
                    No results
                  </div>
                ) : (
                  filtered.map((j, i) => (
                    <button
                      key={j.id}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => run(j)}
                      className={`w-full text-left flex items-center justify-between gap-4 px-3 py-3 rounded-xl transition ${
                        i === index ? "bg-ink text-paper" : "hover:bg-ink/5"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{j.label}</span>
                        {j.hint && (
                          <span
                            className={`text-[11px] uppercase tracking-[0.2em] mt-0.5 ${
                              i === index ? "text-paper/70" : "text-ink/50"
                            }`}
                          >
                            {j.hint}
                          </span>
                        )}
                      </div>
                      <ArrowRight size={14} className="opacity-60" />
                    </button>
                  ))
                )}
              </div>
              <div className="px-4 py-2 border-t border-ink/10 flex items-center justify-between text-[11px] text-ink/50">
                <span>↑ ↓ navigate</span>
                <span>↵ select</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
