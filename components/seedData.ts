import type {
  Award,
  CaseStudy,
  Chapter,
  ProcessStep,
  SiteMeta,
  Stat,
  Tool,
} from "./types";

export const siteMeta: SiteMeta = {
  name: "Saadia Asghar",
  role: "Product Designer",
  location: "Pakistan",
  timezone: "Asia/Karachi",
  availableFor: [
    "Senior Product Designer",
    "Product Designer",
    "Design Lead",
  ],
  email: "saadianigah@gmail.com",
  linkedin: "https://www.linkedin.com/in/saadia-asghar",
  resume: "/resume.pdf",
  portfolio: "https://github.com/Saadia-Asghar/design_portfolio",
  tagline: "I design calm, considered products — carefully.",
  bio: "I'm a product designer who works across ACM, MLSA, and the premed community. I spend my time between Figma and Canva, turning ideas into interfaces that feel calm and intentional.",
  currently: {
    reading: "Things that help me think clearly",
    building: "This portfolio, and my next case study",
    thinking: "How to make software feel more human",
  },
};

// Only numbers I can stand behind. Edit these as you ship more work.
export const stats: Stat[] = [
  { value: "1", label: "First place · Product Design Round · Vyrothon" },
  { value: "3", label: "Communities I design for — ACM, MLSA, Premed" },
  { value: "2", label: "Design tools I work in daily — Figma and Canva" },
  { value: "1", label: "Portfolio you're looking at right now" },
];

export const marqueeWords = [
  "Product Thinking",
  "Figma",
  "Canva",
  "Editorial Craft",
  "Visual Systems",
  "Brand Identity",
  "Community Design",
  "End-to-end UX",
  "Prototyping",
  "Visual Storytelling",
];

export const featuredCaseStudy: CaseStudy = {
  id: "vyrothon",
  title: "Vyrothon — Product Design Round",
  client: "Vyrothon · Design Competition",
  year: "Round 1",
  role: "Product designer — individual submission",
  award: "1st Place · Product Design Round",
  summary:
    "A product design submission for the first round of Vyrothon. I focused on the design problem, not the pitch — and the work earned first place in the product design category.",
  problem:
    "The brief asked for a considered product design response within a limited time. Rather than chasing features, I wanted the design to read clearly to anyone looking at it — a judge, a teammate, or a first-time user.",
  approach: [
    "Read the brief carefully and wrote the problem in one sentence before opening Figma.",
    "Sketched the core flow on paper first — so the layout served the idea, not the other way around.",
    "Moved into Figma and designed the screens with a consistent type, spacing, and colour system.",
    "Reviewed the work end-to-end, removed anything that didn't earn its place, and submitted.",
  ],
  outcome:
    "The submission won first place in the Product Design round at Vyrothon. I did not pitch the work — the design itself carried the story.",
  metrics: [
    { label: "Round", value: "01" },
    { label: "Category", value: "Product Design" },
    { label: "Result", value: "1st Place" },
    { label: "Tool", value: "Figma" },
  ],
  link: "https://www.figma.com/design/Xc06xzZPmShh4pilH9xeHN/Untitled?t=eaDELDis0cGJ7opZ-0",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    body: "I read the brief twice and write the problem in my own words. If I can't say it in one sentence, I'm not ready to design yet.",
  },
  {
    number: "02",
    title: "Sketch",
    body: "I sketch on paper before opening Figma. The first draft is for me — quick, loose, and honest.",
  },
  {
    number: "03",
    title: "Design",
    body: "I move into Figma (and sometimes Canva) and build the screens with a consistent type, spacing, and colour system.",
  },
  {
    number: "04",
    title: "Review",
    body: "I read the whole file from start to finish and remove anything that doesn't earn its place. Editing is part of the work.",
  },
];

export const awards: Award[] = [
  {
    title: "1st Place · Product Design Round",
    org: "Vyrothon",
    year: "Round 1",
    accent: true,
  },
  { title: "Designer", org: "ACM Student Chapter" },
  { title: "Designer", org: "MLSA Community" },
  { title: "Designer", org: "Premed Community" },
];

export const tools: Tool[] = [
  { name: "Figma" },
  { name: "Canva" },
];

export const capabilities: string[] = [
  "Product thinking",
  "UI design",
  "Visual systems",
  "Editorial & brand",
  "Social design",
  "Community design",
];

// Leave empty until you have real testimonials from real people.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const seedChapters: Chapter[] = [
  {
    id: "acm",
    number: "I",
    title: "ACM",
    subtitle: "Designer · Association for Computing Machinery",
    intro:
      "Design work for my university's ACM chapter — posters, social posts, and event collateral. Add screenshots of your best pieces with the + button to build this chapter out.",
    accent: "blush",
    cards: [],
  },
  {
    id: "mlsa",
    number: "II",
    title: "MLSA",
    subtitle: "Designer · Microsoft Learn Student Ambassadors",
    intro:
      "Design contributions for the MLSA community — event branding and social collateral. Add your work using the + button on the bottom-right.",
    accent: "sage",
    cards: [],
  },
  {
    id: "premed",
    number: "III",
    title: "Premed",
    subtitle: "Designer · premed community",
    intro:
      "Design work for the premed community — study resources, booklets, and social collateral. Add your pieces with the + button.",
    accent: "gold",
    cards: [],
  },
  {
    id: "projects",
    number: "IV",
    title: "Projects",
    subtitle: "Independent & competition work",
    intro:
      "Self-initiated pieces and competition submissions. This chapter opens with Vyrothon — see the featured case study above.",
    accent: "ink",
    cards: [
      {
        id: "vyrothon",
        title: "Vyrothon — Product Design Round",
        subtitle: "Figma · Round 1 submission",
        impact: "1st place in the Product Design round",
        tags: ["Product", "Figma"],
        award: "1st · Product Design",
        link: "https://www.figma.com/design/Xc06xzZPmShh4pilH9xeHN/Untitled?t=eaDELDis0cGJ7opZ-0",
      },
    ],
  },
];
