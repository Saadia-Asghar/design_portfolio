"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookPlus, Link2, Sparkles, Upload, X } from "lucide-react";
import type { Card, Chapter } from "./types";

type Mode = "card" | "chapter";

export default function AddDrawer({
  open,
  onClose,
  chapters,
  onAddCard,
  onAddChapter,
}: {
  open: boolean;
  onClose: () => void;
  chapters: Chapter[];
  onAddCard: (chapterId: string, card: Card) => void;
  onAddChapter: (chapter: Chapter) => void;
}) {
  const [mode, setMode] = useState<Mode>("card");
  const [chapterId, setChapterId] = useState<string>(chapters[0]?.id ?? "");

  // Card form
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [impact, setImpact] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [award, setAward] = useState("");

  // Chapter form
  const [chTitle, setChTitle] = useState("");
  const [chSubtitle, setChSubtitle] = useState("");
  const [chIntro, setChIntro] = useState("");
  const [chAccent, setChAccent] = useState<Chapter["accent"]>("blush");

  useEffect(() => {
    if (!chapterId && chapters[0]) setChapterId(chapters[0].id);
  }, [chapters, chapterId]);

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setTitle("");
    setSubtitle("");
    setImpact("");
    setLink("");
    setImage("");
    setTags("");
    setAward("");
    setChTitle("");
    setChSubtitle("");
    setChIntro("");
    setChAccent("blush");
  };

  const submitCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !chapterId) return;
    const card: Card = {
      id: `c-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      impact: impact.trim() || undefined,
      link: link.trim() || undefined,
      image: image || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      award: award.trim() || undefined,
    };
    onAddCard(chapterId, card);
    reset();
    onClose();
  };

  const submitChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chTitle.trim()) return;
    const number = toRoman(chapters.length + 1);
    const chapter: Chapter = {
      id: `ch-${Date.now()}`,
      number,
      title: chTitle.trim(),
      subtitle: chSubtitle.trim() || undefined,
      intro: chIntro.trim() || undefined,
      accent: chAccent,
      cards: [],
    };
    onAddChapter(chapter);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-cream shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-ink/10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
                  Add to your book
                </div>
                <h3 className="font-serif-display text-2xl leading-none mt-1">
                  New entry
                </h3>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 rounded-full bg-ink/5 hover:bg-ink/10 grid place-items-center"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 pt-4">
              <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-ink/5 text-sm">
                <button
                  onClick={() => setMode("card")}
                  className={`py-2 rounded-full transition flex items-center justify-center gap-2 ${
                    mode === "card" ? "bg-ink text-paper" : "text-ink/70"
                  }`}
                >
                  <Sparkles size={14} /> Design card
                </button>
                <button
                  onClick={() => setMode("chapter")}
                  className={`py-2 rounded-full transition flex items-center justify-center gap-2 ${
                    mode === "chapter" ? "bg-ink text-paper" : "text-ink/70"
                  }`}
                >
                  <BookPlus size={14} /> New chapter
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {mode === "card" ? (
                <form onSubmit={submitCard} className="space-y-4">
                  <Field label="Chapter">
                    <select
                      value={chapterId}
                      onChange={(e) => setChapterId(e.target.value)}
                      className="input"
                    >
                      {chapters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.number}. {c.title}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Title *">
                    <input
                      className="input"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Vyrothon — Mobile App Concept"
                    />
                  </Field>

                  <Field label="Subtitle">
                    <input
                      className="input"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Figma · Canva · Case Study"
                    />
                  </Field>

                  <Field label="Impact / one-liner">
                    <input
                      className="input"
                      value={impact}
                      onChange={(e) => setImpact(e.target.value)}
                      placeholder="Reached 500 students · 1st place · etc."
                    />
                  </Field>

                  <Field label="Link (Canva, Figma, Behance...)">
                    <div className="relative">
                      <Link2
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50"
                      />
                      <input
                        className="input pl-9"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://figma.com/..."
                      />
                    </div>
                  </Field>

                  <Field label="Cover image">
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-paper text-sm">
                        <Upload size={14} /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFile(f);
                          }}
                        />
                      </label>
                      {image && (
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image}
                            alt="preview"
                            className="h-10 w-10 rounded-md object-cover border border-ink/20"
                          />
                          <button
                            type="button"
                            onClick={() => setImage("")}
                            className="text-xs text-ink/60 underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </Field>

                  <Field label="Tags (comma separated)">
                    <input
                      className="input"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="UX, Mobile, Branding"
                    />
                  </Field>

                  <Field label="Award (optional)">
                    <input
                      className="input"
                      value={award}
                      onChange={(e) => setAward(e.target.value)}
                      placeholder="1st Place · Vyrothon"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-full bg-ink text-paper text-sm uppercase tracking-[0.25em] hover:bg-ink/90 transition"
                  >
                    Add to book
                  </button>
                </form>
              ) : (
                <form onSubmit={submitChapter} className="space-y-4">
                  <Field label="Chapter title *">
                    <input
                      className="input"
                      required
                      value={chTitle}
                      onChange={(e) => setChTitle(e.target.value)}
                      placeholder="e.g. Hackathons"
                    />
                  </Field>
                  <Field label="Subtitle">
                    <input
                      className="input"
                      value={chSubtitle}
                      onChange={(e) => setChSubtitle(e.target.value)}
                      placeholder="A short one-liner"
                    />
                  </Field>
                  <Field label="Intro paragraph">
                    <textarea
                      className="input min-h-24"
                      value={chIntro}
                      onChange={(e) => setChIntro(e.target.value)}
                      placeholder="Tell the reader what this chapter is about..."
                    />
                  </Field>
                  <Field label="Accent color">
                    <div className="grid grid-cols-4 gap-2">
                      {(["blush", "sage", "gold", "ink"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setChAccent(c)}
                          className={`h-10 rounded-full border text-xs uppercase tracking-[0.2em] capitalize transition ${
                            chAccent === c
                              ? "border-ink bg-ink text-paper"
                              : "border-ink/20 bg-cream"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-full bg-ink text-paper text-sm uppercase tracking-[0.25em] hover:bg-ink/90 transition"
                  >
                    Create chapter
                  </button>
                </form>
              )}
            </div>

            <div className="px-5 py-3 border-t border-ink/10 text-[11px] text-ink/50">
              Everything you add is saved locally in your browser.
            </div>
          </motion.aside>

          <style jsx global>{`
            .input {
              width: 100%;
              background: #fbf7ee;
              border: 1px solid rgba(26, 26, 26, 0.15);
              border-radius: 12px;
              padding: 0.65rem 0.85rem;
              font-size: 0.9rem;
              outline: none;
              transition: border-color 0.15s, box-shadow 0.15s;
            }
            .input:focus {
              border-color: #1a1a1a;
              box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.08);
            }
            textarea.input {
              font-family: inherit;
              resize: vertical;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.25em] text-ink/60 mb-1.5">
        {label}
      </div>
      {children}
    </label>
  );
}

function toRoman(n: number) {
  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  for (const [v, s] of map) {
    while (n >= v) {
      result += s;
      n -= v;
    }
  }
  return result;
}
