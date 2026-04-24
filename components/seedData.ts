import type {
  Award,
  CaseStudy,
  Certification,
  Chapter,
  ProcessStep,
  SiteMeta,
  Stat,
  Tool,
} from "./types";

export const siteMeta: SiteMeta = {
  name: "Saadia Asghar",
  role: "Product Designer",
  location: "Islamabad, Pakistan",
  timezone: "Asia/Karachi",
  availableFor: [
    "Graphic Designer",
    "Product Designer",
    "Community Builder",
  ],
  intentions: ["create", "design", "code", "innovate", "build"],
  email: "saadianigah@gmail.com",
  linkedin: "https://www.linkedin.com/in/saadia-asghar",
  github: "https://github.com/Saadia-Asghar",
  phone: "+92 315 912 7771",
  resume: "/resume.pdf",
  portfolio: "https://github.com/Saadia-Asghar/design_portfolio",
  tagline:
    "Product designer working across healthtech, hackathons, and student communities.",
  bio: "B.Sc. Data Science student at GIKI and Graphic Design Associate at PreMed.PK. Lead Product Designer on Vyrothon — 1st in Product Design, Top 5 Finalist out of 500+ applicants globally. Top 10 at MIT Hack Nation with CallPilot, 3rd at BASED Pakistan with ChaInTicket+.",
  education: {
    school: "Ghulam Ishaq Khan Institute (GIKI)",
    degree: "B.Sc. Data Science",
    location: "Swabi, Pakistan",
    years: "Sept 2024 – June 2028",
  },
  currently: {
    reading: "Design-systems writing and case studies",
    building: "EcoBite — food-waste platform for the Microsoft Imagine Cup",
    thinking: "Immersive UI and storytelling-based interfaces",
  },
};

export const stats: Stat[] = [
  {
    value: "500",
    suffix: "+",
    label: "Applicants globally at Vyrothon — Top 5 Finalist, 1st in Product Design",
  },
  {
    value: "30",
    suffix: "+",
    label: "Visual assets shipped as Graphic Design Associate at PreMed.PK",
  },
  {
    value: "40",
    suffix: "%",
    label: "Digital engagement lift on the PreMed.PK assets I designed",
  },
  {
    value: "10",
    suffix: "+",
    label: "Workshops led or supported across campus societies",
  },
];

export const marqueeWords = [
  "Product Design",
  "Immersive UI",
  "Storytelling-based UI",
  "Wireframing",
  "Prototyping",
  "Visual Identity",
  "Dashboards",
  "Graphic Design",
  "Community Design",
  "Healthtech",
];

export const featuredCaseStudy: CaseStudy = {
  id: "vyrothon",
  title: "Vyrothon — Immersive 3D Environment",
  client: "Vyrothon · Product Design & Innovation",
  year: "April 2026",
  role: "Lead Product Designer",
  award: "1st · Product Design Round · Top 5 Finalist globally",
  summary:
    "As Lead Product Designer, I conceptualised an Immersive 3D Environment focused on user presence and gamified storytelling, and engineered a high-fidelity interactive prototype at the National Science & Technology Park (NSTP).",
  problem:
    "The brief asked for a considered product-design response to a design-and-innovation challenge. I wanted the work to read clearly on its own — so anyone opening the file could understand the idea without a live pitch.",
  approach: [
    "Framed the opportunity around user presence, not features — what would make someone feel inside the product, not on top of it.",
    "Sketched the core moments on paper before opening Figma; a 3D environment has to earn its complexity.",
    "Engineered a high-fidelity interactive prototype at the NSTP with gamified storytelling interfaces.",
    "Reviewed the file end-to-end and removed anything that didn't support the core idea.",
  ],
  outcome:
    "Ranked 1st in the Product Design round and advanced to the Top 5 Finalist out of 500+ applicants globally. I did not pitch the work — the prototype carried the idea.",
  metrics: [
    { label: "Applicants globally", value: "500+" },
    { label: "Product Design Round", value: "1st" },
    { label: "Final standing", value: "Top 5" },
    { label: "Role", value: "Lead Designer" },
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
    body: "I move into Figma (and Canva, Affinity) and build the screens with a consistent type, spacing, and colour system.",
  },
  {
    number: "04",
    title: "Review",
    body: "I read the file from start to finish and remove anything that doesn't earn its place. Editing is part of the work.",
  },
];

export const awards: Award[] = [
  {
    title: "1st · Product Design Round",
    org: "Vyrothon · 500+ applicants globally",
    year: "Apr 2026",
    accent: true,
    link: "https://www.figma.com/design/Xc06xzZPmShh4pilH9xeHN/Untitled?t=eaDELDis0cGJ7opZ-0",
  },
  {
    title: "Top 5 Finalist (Global)",
    org: "Vyrothon · Product Design & Innovation",
    year: "Apr 2026",
    accent: true,
  },
  {
    title: "Top 10 Globally",
    org: "MIT Hack Nation · CallPilot",
    year: "Jan 2026",
  },
  {
    title: "3rd Place",
    org: "BASED Pakistan · ChaInTicket+",
    year: "Dec 2025",
  },
  {
    title: "Microsoft Imagine Cup",
    org: "EcoBite · food-waste platform",
    year: "Aug 2025 – Present",
  },
  {
    title: "Promoted to Associate",
    org: "PreMed.PK · Graphic Design",
    year: "May 2025 – Present",
  },
  {
    title: "Student Education Officer",
    org: "UROG · GIKI",
    year: "2024 – Present",
  },
  {
    title: "Core Design & Marketing",
    org: "ACM · Softcom'25 Liaison",
    year: "2024 – Present",
  },
];

export const tools: Tool[] = [
  { name: "Figma" },
  { name: "Canva" },
  { name: "Affinity" },
];

export const techStack: string[] = [
  "Python",
  "SQL",
  "C++",
  "React",
  "HTML/CSS",
  "Azure",
  "Firebase",
  "Git/GitHub",
];

export const capabilities: string[] = [
  "Product design",
  "Immersive UI",
  "Storytelling-based UI",
  "Wireframing & prototyping",
  "Visual identity",
  "Dashboard design",
  "Graphic design",
  "Community & outreach",
];

export const certifications: Certification[] = [
  { name: "AI Agents Intensive", by: "Kaggle · Google" },
  { name: "GitHub Foundations", by: "Microsoft" },
  { name: "Data Science", by: "DataCamp" },
  { name: "Graphic Design", by: "DigiSkills" },
  { name: "Hackfest 3.0 Participation", by: "Remotebase" },
];

export const testimonials: { quote: string; name: string; role: string }[] = [];

export const seedChapters: Chapter[] = [
  {
    id: "projects",
    number: "I",
    title: "Product & Hackathons",
    subtitle: "Competition, MVP, and product-design work",
    intro:
      "Product work from hackathons, competitions, and imagine-cup programmes. Vyrothon is featured above — the rest of the portfolio of product work lives here.",
    accent: "ink",
    cards: [
      {
        id: "callpilot",
        title: "CallPilot — AI Assistant Platform",
        subtitle: "Product + Full-Stack · Jan 2026",
        impact: "Top 10 globally among international teams · MIT Hack Nation",
        tags: ["Product", "React", "Python"],
        award: "Top 10 · MIT",
      },
      {
        id: "ecobite",
        title: "EcoBite — Food-Waste Platform",
        subtitle: "Microsoft Imagine Cup · Active",
        impact:
          "500+ meals distributed weekly · 30% lift in donation frequency · 5 user roles",
        tags: ["Azure", "Full-Stack", "Maps API"],
      },
      {
        id: "chainticket",
        title: "ChaInTicket+ — Blockchain Ticketing",
        subtitle: "Backend + Dashboard Design · Dec 2025",
        impact: "Tracked 1,000+ attendees · fraud-proof QR verification",
        tags: ["Dashboard", "Blockchain"],
        award: "3rd · BASED",
      },
    ],
  },
  {
    id: "premed",
    number: "II",
    title: "PreMed.PK",
    subtitle: "Graphic Design Associate · Remote · May 2025 – Present",
    intro:
      "High-fidelity visual assets for a medical-education platform. Promoted to Associate; leading visual identity across the product.",
    accent: "blush",
    cards: [
      {
        id: "premed-1",
        title: "Visual-Identity Asset System",
        subtitle: "30+ assets · Canva + Figma",
        impact: "40% lift in digital engagement",
        tags: ["Visual Identity", "Canva", "Figma"],
      },
      {
        id: "premed-2",
        title: "Design-to-Delivery Workflow",
        subtitle: "Template standardization",
        impact: "25% faster turnaround on recurring assets",
        tags: ["Systems"],
      },
    ],
  },
  {
    id: "campus",
    number: "III",
    title: "Campus Ambassador",
    subtitle: "Devsinc & Remotebase · GIKI",
    intro:
      "Campus-leadership roles bridging students and industry programmes — outreach, events, and social campaigns.",
    accent: "sage",
    cards: [
      {
        id: "devsinc",
        title: "Devsinc Campus Ambassador",
        subtitle: "GIKI · Feb 2025 – Present",
        impact:
          "10+ workshops & tours for 300+ students · 200+ qualified signups from social campaigns",
        tags: ["Outreach", "Social"],
      },
      {
        id: "remotebase",
        title: "Remotebase · Hackfest 3.0",
        subtitle: "GIKI · Feb – July 2025",
        impact: "Facilitated 300+ applicants; primary GIKI liaison for Hackfest 3.0",
        tags: ["Ambassador"],
      },
    ],
  },
  {
    id: "societies",
    number: "IV",
    title: "Student Societies",
    subtitle: "ACM · GDGoC · MLSA · UROG · Microsoft Club",
    intro:
      "Core membership across five GIKI societies — design, marketing, education, and outreach.",
    accent: "gold",
    cards: [
      {
        id: "acm",
        title: "ACM — Design & Marketing",
        subtitle: "Core member · Softcom'25 Liaison",
        impact: "Tech & Liaison team at Softcom'25 (All-Pakistan event)",
        tags: ["Design", "Marketing"],
      },
      {
        id: "urog",
        title: "UROG — Student Education Officer",
        subtitle: "Oct 2024 – Present",
        impact: "Academic support & technical bootcamps",
        tags: ["UROG"],
      },
      {
        id: "gdgoc",
        title: "GDGoC — Core Team",
        subtitle: "Workshops on AI & Web Dev",
        impact: "Coordinating workshops for 100+ participants",
        tags: ["GDG"],
      },
      {
        id: "mlsa-micro",
        title: "MLSA & Microsoft Club",
        subtitle: "Core / Outreach contributor",
        impact: "Development and outreach across both communities",
        tags: ["MLSA", "Microsoft"],
      },
    ],
  },
];
