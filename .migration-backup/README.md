# Saadia Asghar — Design Portfolio

An editorial, longform Next.js portfolio. It reads like a book, moves like a product, and is truthful about what's been shipped.

Live repo: [github.com/Saadia-Asghar/design_portfolio](https://github.com/Saadia-Asghar/design_portfolio)

## What's inside

- **Cinematic hero** — animated name reveal, "Available for Senior Product Designer" status, live local time, parallax scroll, cursor-spotlight
- **Editorial marquee** of capabilities (Product Thinking · Figma · Canva · Editorial Craft · Visual Systems · Brand Identity · Community Design · End-to-end UX · Prototyping · Visual Storytelling)
- **Manifesto** — a short point of view + four design principles
- **Stats strip** with animated counters — populated only with things that are true today. Edit in `seedData.ts` as work ships.
- **Featured Case Study — Vyrothon Product Design Round**. Structured Problem → Approach → Outcome + metrics grid (Round 01 · Product Design · 1st Place · Figma) and a "View the design on Figma" button.
- **Selected Work** — 4 chapters (ACM · MLSA · Premed · Projects). Projects opens with the Vyrothon submission. The other three chapters are intentionally empty until real pieces are added — use the floating **+** button.
- **Process section (dark)** — Understand → Sketch → Design → Review
- **Recognition** — 1st place Product Design Round · Vyrothon (gold accent) + designer roles at ACM, MLSA, Premed
- **Capabilities & Tools** — honest list (Figma, Canva) and second marquee
- **About & Currently** — short bio + live "reading / building / thinking" card + local time
- **Testimonials** — hidden until real quotes are added (the array is empty in `seedData.ts`)
- **Contact** — big serif "Let's build something thoughtful.", magnetic CTAs, copy-email button, ⌘K reminder
- **Colophon footer**

## Senior-level polish

- **⌘K / Ctrl+K command palette** for jumping anywhere on the page
- **Custom cursor** (dot + ring with mix-blend-difference, desktop only)
- **Magnetic buttons** that gently pull toward the pointer
- **Word-by-word text reveals**, animated counters, two marquees
- **Scroll-linked hero parallax**, sticky top nav
- **Paper grain** SVG texture over the whole page
- **Floating + drawer** to add Canva/Figma cards — saved to localStorage
- **Copy-email** with a checkmark confirmation

## Contact

- **Email:** saadianigah@gmail.com
- **LinkedIn:** [saadia-asghar](https://www.linkedin.com/in/saadia-asghar)
- **Figma (Vyrothon):** [View design](https://www.figma.com/design/Xc06xzZPmShh4pilH9xeHN/Untitled?t=eaDELDis0cGJ7opZ-0)

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Make it grow — one honest step at a time

Everything below is already in the site, waiting for real content. Nothing is fabricated.

1. **Drop in a real résumé** — replace `public/resume.txt` with `public/resume.pdf`.
2. **Add your real designs** via the floating **+** button on any page. Paste the Canva/Figma link and upload a cover image. The card lands in the chapter of your choice.
3. **Update the Vyrothon Figma file** with your actual submission. The portfolio already links to it — adding designs there will make the link land on your real work.
4. **Strengthen `components/seedData.ts`** as you ship more:
   - `stats` — replace placeholder counts with real numbers as they become true (e.g. "X posters made", "X people reached").
   - `featuredCaseStudy` — if you write a longer case study, lengthen `approach` and `outcome`. Keep every claim defensible.
   - `awards` — add new ones as you earn them.
   - `testimonials` — add the first real quote you get. One real quote beats a page of placeholders.
5. **Swap the hero background card** (the italic "S.") for a photo of you or your strongest piece, in `components/Portfolio.tsx` → `Hero()`.

## Deploy free (60 seconds, Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **New Project** → Import `Saadia-Asghar/design_portfolio`.
3. Leave settings at defaults (Next.js is auto-detected) → **Deploy**.
4. You'll get a live URL like `saadia-design-portfolio.vercel.app`. That's the link to paste into applications and your LinkedIn.

## Tech

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS · Framer Motion · Lucide icons
- Google Fonts: Cormorant Garamond + DM Sans
- localStorage for user-added cards

## File map

```
app/
  layout.tsx             # Google fonts, metadata
  page.tsx               # Renders <Portfolio />
  globals.css            # Paper grain, scrollbar, drop-cap, selection
components/
  Portfolio.tsx          # Longform page (all sections)
  UI.tsx                 # Magnetic, Counter, Marquee, RevealText, Spotlight, LocalTime, SectionLabel
  CustomCursor.tsx       # Dot + ring cursor (desktop only)
  CommandPalette.tsx     # ⌘K search/jump modal
  AddDrawer.tsx          # Floating + drawer for adding cards
  seedData.ts            # siteMeta, stats, case study, chapters, awards, process, tools, testimonials
  types.ts               # TypeScript types
public/
  resume.txt             # replace with resume.pdf
tailwind.config.ts       # palette (paper, ink, blush, sage, gold, cream)
```

## Rules I kept while writing this site

1. No fabricated numbers. If I don't know the real count, the stat waits.
2. No invented stories. The "currently" and about sections say true, general things — not manufactured biography.
3. Vyrothon is described exactly as it happened: first round, product-design category, first place, no pitch, individual submission.

Edit everything in `components/seedData.ts`. One file, all the words.
