# Saadia Asghar — Senior Product Designer Portfolio

An editorial, longform portfolio built to land **Senior Product Designer** roles. It reads like a book, moves like a product, and thinks like a designer.

## What's inside

- **Cinematic hero** with animated name reveal, live availability badge, local time, parallax scroll, and cursor spotlight
- **Editorial marquee** of your strengths (Product Thinking, Design Systems, Editorial Craft…)
- **Manifesto** — a point of view + numbered design principles (this is what recruiters look for in senior roles)
- **Animated stats strip** with counters that animate in view (2,500+ reached · 1st place Vyrothon · 4 communities led · 40+ shipped)
- **Featured Case Study** — full Vyrothon breakdown with Problem → Approach → Outcome and a metrics grid (this single section is what unlocks senior interviews)
- **Selected Work** — 4 sticky-navigation chapters (ACM · MLSA · Premed · Projects) with editorial card grid
- **Process section** (dark) — your 4-step methodology: Listen → Frame → Prototype → Edit
- **Recognition wall** with hover-fills and gold-accented awards
- **Tools & capabilities** grid + second marquee
- **About & Currently** — a live "what I'm reading/building/thinking" card with local time
- **Testimonials** on dark background
- **Contact** — giant serif headline, copy-email button, magnetic CTAs, command-palette reminder
- **Colophon footer**

## Senior-level polish

- **Command palette** (⌘K / Ctrl+K) to jump anywhere on the page — power users and recruiters who hit it will *feel* the attention to detail
- **Custom cursor** with mix-blend-difference (desktop only, respects touch devices)
- **Magnetic buttons** that gently pull toward the pointer
- **Word-by-word text reveals** on in-view
- **Animated counters** for stats
- **Two marquees** (inverted strip + compact tools)
- **Scroll-linked hero parallax**
- **Sticky top nav** that fades in as you scroll
- **Local time chip** that updates every 30 seconds
- **Paper grain texture** over the whole page (subtle SVG noise)
- **Floating + drawer** (bottom-right) to add your own Canva/Figma designs with localStorage persistence
- **Kb hints** — "Press ⌘K" shown in the contact section

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Make it yours in 7 steps

1. **Drop in your résumé** — replace `public/resume.txt` with a real `public/resume.pdf`.
2. **Update personal info** — open `components/seedData.ts` → edit `siteMeta` (name, role, email, LinkedIn, location, tagline, bio, "Currently" panel).
3. **Strengthen the featured case study** — edit `featuredCaseStudy` in `seedData.ts`. Make `problem`, `approach` (4 steps), `outcome`, and `metrics` feel *specific* (numbers > adjectives).
4. **Refine the stats strip** — stats in `seedData.ts` — use concrete numbers only ("2,500 students reached" beats "lots of students").
5. **Add real screenshots** — click the floating **+** button or edit chapters in `seedData.ts`. Upload cover images for every card. Flat Canva exports look weaker than mockups — drop your designs into phone/laptop mockups from [Mockuuups Studio](https://mockuuups.studio/) or Figma Community first.
6. **Write impact lines on every card** — recruiters skim. "Reached 500 students" > "Made a poster".
7. **Get one testimonial** — message a teammate from ACM/MLSA and replace the placeholder quotes in `testimonials`. Even one real quote is 10× the placeholders.

## Deploy free in 60 seconds

**Vercel (recommended):**

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → Import → Deploy.
3. You get `https://your-name.vercel.app` instantly — that's the URL you paste into applications.

## Why this gets you shortlisted for senior roles

Three things separate senior from mid from junior portfolios:

1. **Thinking, shown.** The Process section + featured case study show *how you think*, not just what you made. Senior interviews are 80% "walk me through your thinking."
2. **Specificity.** Stats strip + case-study metrics + impact lines on cards = you speak in numbers. Senior candidates always do.
3. **Craft and calm.** The editorial typography, paper texture, magnetic buttons, command palette, and custom cursor signal *taste*. Senior hires are often taste hires.

Keep the writing short, specific, and confident. Delete anything you wouldn't defend in an interview. Ship it.

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

Go get that senior role, Saadia. Ship it.
