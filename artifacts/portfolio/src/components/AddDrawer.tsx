import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Card, Chapter } from "./types";

type Mode = "card" | "chapter";

export default function AddDrawer({
  open, onClose, chapters, onAddCard, onAddChapter,
}: {
  open: boolean; onClose: () => void; chapters: Chapter[];
  onAddCard: (chapterId: string, card: Card) => void;
  onAddChapter: (chapter: Chapter) => void;
}) {
  const [mode, setMode] = useState<Mode>("card");
  const [chapterId, setChapterId] = useState<string>(chapters[0]?.id ?? "");

  const [title, setTitle] = useState(""); const [subtitle, setSubtitle] = useState("");
  const [impact, setImpact] = useState(""); const [link, setLink] = useState("");
  const [image, setImage] = useState(""); const [tags, setTags] = useState("");
  const [award, setAward] = useState("");

  const [chTitle, setChTitle] = useState(""); const [chSubtitle, setChSubtitle] = useState("");
  const [chIntro, setChIntro] = useState(""); const [chAccent, setChAccent] = useState<Chapter["accent"]>("blush");

  useEffect(() => { if (!chapterId && chapters[0]) setChapterId(chapters[0].id); }, [chapters, chapterId]);

  const reset = () => {
    setTitle(""); setSubtitle(""); setImpact(""); setLink(""); setImage(""); setTags(""); setAward("");
    setChTitle(""); setChSubtitle(""); setChIntro(""); setChAccent("blush");
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submitCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !chapterId) return;
    onAddCard(chapterId, {
      id: `c-${Date.now()}`, title: title.trim(), subtitle: subtitle.trim() || undefined,
      impact: impact.trim() || undefined, link: link.trim() || undefined,
      image: image || undefined, tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      award: award.trim() || undefined,
    });
    reset(); onClose();
  };

  const submitChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chTitle.trim()) return;
    onAddChapter({
      id: `ch-${Date.now()}`, number: toRoman(chapters.length + 1),
      title: chTitle.trim(), subtitle: chSubtitle.trim() || undefined,
      intro: chIntro.trim() || undefined, accent: chAccent, cards: [],
    });
    reset(); onClose();
  };

  const s: React.CSSProperties = {
    background: "var(--c-bg)", borderLeft: "1px solid var(--c-border)", color: "var(--c-fg)",
    fontFamily: "inherit",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-50" style={{ background: "color-mix(in srgb, var(--c-bg) 70%, transparent)", backdropFilter: "blur(3px)" }} />
          <motion.aside key="dr" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] flex flex-col" style={s}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
              <div>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>add entry</div>
                <h3 className="text-lg font-medium mt-0.5">New Item</h3>
              </div>
              <button onClick={onClose} className="text-xl leading-none px-2 py-1 hover:opacity-60 transition"
                style={{ fontFamily: "inherit" }}>✕</button>
            </div>

            <div className="px-5 pt-4">
              <div className="grid grid-cols-2 gap-1 text-xs" style={{ border: "1px solid var(--c-border)" }}>
                {(["card", "chapter"] as Mode[]).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className="py-2 text-xs tracking-widest uppercase transition"
                    style={{
                      fontFamily: "inherit", background: mode === m ? "var(--c-fg)" : "transparent",
                      color: mode === m ? "var(--c-bg)" : "var(--c-fg)",
                    }}>
                    {m === "card" ? "Design Card" : "New Chapter"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {mode === "card" ? (
                <form onSubmit={submitCard} className="space-y-4">
                  <F label="Chapter">
                    <select value={chapterId} onChange={e => setChapterId(e.target.value)} className="drawer-input">
                      {chapters.map(c => <option key={c.id} value={c.id}>{c.number}. {c.title}</option>)}
                    </select>
                  </F>
                  <F label="Title *"><input className="drawer-input" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Vyrothon — Mobile App" /></F>
                  <F label="Subtitle"><input className="drawer-input" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Figma · Case Study" /></F>
                  <F label="Impact"><input className="drawer-input" value={impact} onChange={e => setImpact(e.target.value)} placeholder="1st Place · Vyrothon" /></F>
                  <F label="Link"><input className="drawer-input" value={link} onChange={e => setLink(e.target.value)} placeholder="https://figma.com/..." /></F>
                  <F label="Cover image">
                    <label className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-3 py-2 cursor-pointer transition"
                      style={{ border: "1px solid var(--c-border)", fontFamily: "inherit" }}>
                      Upload
                      <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                    </label>
                    {image && <img src={image} alt="preview" className="mt-2 h-12 w-12 object-cover" style={{ border: "1px solid var(--c-border)" }} />}
                  </F>
                  <F label="Tags (comma separated)"><input className="drawer-input" value={tags} onChange={e => setTags(e.target.value)} placeholder="UX, Mobile" /></F>
                  <F label="Award"><input className="drawer-input" value={award} onChange={e => setAward(e.target.value)} placeholder="1st Place" /></F>
                  <SubmitBtn>Add to book</SubmitBtn>
                </form>
              ) : (
                <form onSubmit={submitChapter} className="space-y-4">
                  <F label="Title *"><input className="drawer-input" required value={chTitle} onChange={e => setChTitle(e.target.value)} placeholder="Hackathons" /></F>
                  <F label="Subtitle"><input className="drawer-input" value={chSubtitle} onChange={e => setChSubtitle(e.target.value)} placeholder="A one-liner" /></F>
                  <F label="Intro"><textarea className="drawer-input" value={chIntro} onChange={e => setChIntro(e.target.value)} placeholder="What this chapter covers..." /></F>
                  <F label="Accent">
                    <div className="grid grid-cols-4 gap-1">
                      {(["blush", "sage", "gold", "ink"] as const).map(c => (
                        <button key={c} type="button" onClick={() => setChAccent(c)}
                          className="py-1.5 text-[10px] tracking-widest uppercase transition"
                          style={{ fontFamily: "inherit", background: chAccent === c ? "var(--c-fg)" : "transparent", color: chAccent === c ? "var(--c-bg)" : "var(--c-fg)", border: "1px solid var(--c-border)" }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </F>
                  <SubmitBtn>Create chapter</SubmitBtn>
                </form>
              )}
            </div>

            <div className="px-5 py-3 text-[10px] tracking-widest" style={{ color: "var(--c-muted)", borderTop: "1px solid var(--c-border)" }}>
              Saved locally in your browser.
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--c-muted)" }}>{label}</div>
      {children}
    </label>
  );
}

function SubmitBtn({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="w-full mt-2 py-2.5 text-xs tracking-widest uppercase transition"
      style={{ fontFamily: "inherit", background: "var(--c-fg)", color: "var(--c-bg)", border: "1px solid var(--c-border)" }}>
      {children}
    </button>
  );
}

function toRoman(n: number) {
  const map: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let r = "";
  for (const [v, s] of map) { while (n >= v) { r += s; n -= v; } }
  return r;
}
