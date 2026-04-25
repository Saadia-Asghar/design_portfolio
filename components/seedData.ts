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

const VYROTHON_FIGMA =
  "https://www.figma.com/design/E9IKt31asTEeVyKS595YX3/Vyro?node-id=4-17&t=jjLeblvLTYZQ2yTd-1";

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
  resume: "/resume.png",
  portfolio: "https://github.com/Saadia-Asghar/design_portfolio",
  tagline:
    "Product designer working across healthtech, hackathons, and student communities.",
  bio: "B.Sc. Data Science student at GIKI and Graphic Design Associate at PreMed.PK. Participated in Vyrothon in the Product Design category — 1st in the opening round, Top 5 Finalist out of 500+ applicants nationally. Top 10 at MIT Hack Nation with CallPilot, 3rd at BASED Pakistan with ChaInTicket+.",
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
    label: "Applicants nationally at Vyrothon — Top 5 Finalist, 1st in Product Design round",
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
  role: "Participant · Product Design category",
  award: "1st · Product Design Round · Top 5 Finalist nationally",
  summary:
    "I participated in Vyrothon in the Product Design category. The submission was an Immersive 3D Environment focused on user presence and gamified storytelling — built as a high-fidelity interactive prototype at the National Science & Technology Park (NSTP).",
  problem:
    "The brief asked for a considered product-design response to a design-and-innovation challenge. I wanted the work to read clearly on its own — so anyone opening the file could understand the idea without a live pitch.",
  approach: [
    "Framed the opportunity around user presence, not features — what would make someone feel inside the product, not on top of it.",
    "Sketched the core moments on paper before opening Figma; a 3D environment has to earn its complexity.",
    "Built a high-fidelity interactive prototype at the NSTP with gamified storytelling interfaces.",
    "Reviewed the file end-to-end and removed anything that didn't support the core idea.",
  ],
  outcome:
    "Ranked 1st in the Product Design round and advanced to the Top 5 Finalist out of 500+ applicants nationally. I did not pitch the work — the prototype carried the idea.",
  metrics: [
    { label: "Applicants nationally", value: "500+" },
    { label: "Product Design Round", value: "1st" },
    { label: "Final standing", value: "Top 5" },
    { label: "Category", value: "Product Design" },
  ],
  link: VYROTHON_FIGMA,
};

export const featuredCaseStudyImage = "/images/vyrothon.png";

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
    org: "Vyrothon · 500+ applicants nationally",
    year: "Apr 2026",
    accent: true,
    link: VYROTHON_FIGMA,
  },
  {
    title: "Top 5 Finalist (National)",
    org: "Vyrothon · Product Design & Innovation",
    year: "Apr 2026",
    accent: true,
  },
  {
    title: "Top 10 Globally",
    org: "MIT Hack Nation · CallPilot",
    year: "Jan 2026",
    link: "https://www.figma.com/design/yw4reHaM5S3p0WADMxoo2X/Call-Pilot?node-id=11-2&t=9ir8e8FNP0r0qLEj-1",
  },
  {
    title: "3rd Place",
    org: "BASED Pakistan · ChaInTicket+",
    year: "Dec 2025",
    link: "https://www.figma.com/design/ZZ259rh7azNEfkHnmRLywl/ChainTicket?node-id=0-1&t=EadmwPrVzE99VRTb-1",
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
  /* ----------------------- I — Product Design ----------------------- */
  {
    id: "product",
    number: "I",
    title: "Product Design",
    subtitle: "Figma · interactive prototypes · hi-fi UI",
    intro:
      "End-to-end product work — from independent concepts to hackathon submissions. Vyrothon is featured above; the rest live here.",
    accent: "ink",
    cards: [
      {
        id: "callpilot",
        title: "CallPilot — AI Operations Console",
        subtitle: "Product · React + Python · Jan 2026",
        impact: "Top 10 globally · MIT Hack Nation",
        image: "/images/callpilot.png",
        link: "https://www.figma.com/design/yw4reHaM5S3p0WADMxoo2X/Call-Pilot?node-id=11-2&t=9ir8e8FNP0r0qLEj-1",
        award: "Top 10 · MIT",
        tags: ["Product", "AI", "Auth"],
      },
      {
        id: "chainticket",
        title: "ChaInTicket+ — Blockchain Ticketing",
        subtitle: "Product + Dashboard · Dec 2025",
        impact:
          "Pakistan's first on-chain ticketing concept · 3rd at BASED Pakistan",
        image: "/images/chainticket.png",
        link: "https://www.figma.com/design/ZZ259rh7azNEfkHnmRLywl/ChainTicket?node-id=0-1&t=EadmwPrVzE99VRTb-1",
        award: "3rd · BASED",
        tags: ["Product", "Blockchain", "Hero"],
      },
      {
        id: "privyhealth",
        title: "PrivyHealth — Patient-Owned Records",
        subtitle: "Healthtech · Entangled Hackathon 2026",
        impact:
          "Pakistan's first patient-owned encrypted medical record layer — full product surface",
        image: "/images/privyhealth.png",
        link: "https://www.figma.com/design/Oe9j3rJoPVx18SFIPENJE9/Privy-Health?node-id=0-1&t=Em4bdeQzkCb5OnMf-1",
        tags: ["Healthtech", "Dashboard"],
      },
      {
        id: "moodmaze",
        title: "MoodMaze — The Cinematic Engine",
        subtitle: "Independent · Cinematic interface concept",
        impact: "Mood-driven storytelling interface concept",
        link: "https://www.figma.com/design/HlnuZL5J1Wk8q6xaAseJ8F/Mood-Maze?t=b3mlhQ4jSQqs94QJ-1",
        tags: ["Concept", "Storytelling"],
      },
      {
        id: "ecobite",
        title: "EcoBite — Food-Waste Platform",
        subtitle: "Microsoft Imagine Cup · Active",
        impact:
          "Donation platform with 5 user roles · Azure AD B2C, SQL, Maps API",
        tags: ["Azure", "Full-Stack"],
      },
    ],
  },

  /* ----------------------- II — ACM ----------------------- */
  {
    id: "acm",
    number: "II",
    title: "ACM",
    subtitle: "Core Design & Marketing · Softcom'25 Liaison · GIKI",
    intro:
      "Posters, event identities, and marketing collateral for ACM at GIKI — including Softcom'25, the All-Pakistan software competition.",
    accent: "blush",
    cards: [
      {
        id: "acm-wic",
        title: "Women in Computing — Poster",
        subtitle: "Event poster · Canva",
        link: "https://canva.link/e92p1vc5liwinkp",
        tags: ["Poster", "WIC"],
      },
      {
        id: "acm-softcom",
        title: "Softcom'25 — Event Identity",
        subtitle: "Softcom · All-Pakistan event",
        impact: "Liaison & Tech team contributor",
        link: "https://canva.link/ifjetfl2g792f0u",
        tags: ["Event", "Identity"],
      },
      {
        id: "acm-apsc",
        title: "All-Pakistan Software Competition",
        subtitle: "Campaign collateral",
        link: "https://canva.link/at2vzf2pdvwjy8r",
        tags: ["Campaign"],
      },
      {
        id: "acm-carbonteq",
        title: "Carbonteq — Sponsor Collateral",
        subtitle: "Industry partner deliverable",
        link: "https://canva.link/obnr96908orfwio",
        tags: ["Sponsor"],
      },
      {
        id: "acm-induction",
        title: "ACM Induction",
        subtitle: "Member onboarding visual",
        link: "https://canva.link/nllc230n1faj0h6",
        tags: ["Induction"],
      },
    ],
  },

  /* ----------------------- III — MLSA ----------------------- */
  {
    id: "mlsa",
    number: "III",
    title: "MLSA",
    subtitle: "Microsoft Learn Student Ambassadors · GIKI",
    intro:
      "Visual identity, posters, certificates, and event collateral for the MLSA community at GIKI — covering inductions, learning sessions, and Microsoft programmes.",
    accent: "sage",
    cards: [
      {
        id: "mlsa-linkedin",
        title: "Microsoft LinkedIn — Carousel",
        subtitle: "Social carousel for community LinkedIn",
        link: "https://canva.link/jiy8mij69zge9ps",
        tags: ["Social", "LinkedIn"],
      },
      {
        id: "mlsa-ldp",
        title: "Learning & Development Session",
        subtitle: "Session poster",
        link: "https://canva.link/27cdkido37176p0",
        tags: ["Poster"],
      },
      {
        id: "mlsa-datacamp",
        title: "Datacamp & Code Series",
        subtitle: "Series identity poster",
        link: "https://canva.link/otu10gcpgs1uild",
        tags: ["Series", "Education"],
      },
      {
        id: "mlsa-card",
        title: "Microsoft — Member Card",
        subtitle: "Member card visual",
        link: "https://canva.link/nni270xk4980970",
        tags: ["Identity"],
      },
      {
        id: "mlsa-info",
        title: "Info Session",
        subtitle: "Event poster",
        link: "https://canva.link/y7y0b9un3uyj6sc",
        tags: ["Event"],
      },
      {
        id: "mlsa-cert",
        title: "Member Certificate",
        subtitle: "Certificate template",
        link: "https://canva.link/et94srh8680cbzs",
        tags: ["Certificate"],
      },
      {
        id: "mlsa-induct",
        title: "Inductions",
        subtitle: "Onboarding visuals",
        link: "https://canva.link/m3zy4dqfvnbzw7u",
        tags: ["Induction"],
      },
      {
        id: "mlsa-panaflex",
        title: "Panaflex",
        subtitle: "Large-format event signage",
        link: "https://canva.link/nfvzr08alsqq9r9",
        tags: ["Print", "Signage"],
      },
    ],
  },

  /* ----------------------- IV — PreMed.PK ----------------------- */
  {
    id: "premed",
    number: "IV",
    title: "PreMed.PK",
    subtitle: "Graphic Design Associate · Remote · May 2025 – Present",
    intro:
      "Visual identity and education collateral for a medical-education platform. Promoted to Associate; leading visual identity across the product.",
    accent: "gold",
    cards: [
      {
        id: "premed-system",
        title: "Visual-Identity Asset System",
        subtitle: "30+ assets · Canva + Figma",
        impact: "40% lift in digital engagement",
        tags: ["Visual Identity"],
      },
      {
        id: "premed-workflow",
        title: "Design-to-Delivery Workflow",
        subtitle: "Template standardization",
        impact: "25% faster turnaround on recurring assets",
        tags: ["Systems"],
      },
      {
        id: "premed-edu-1",
        title: "Education Slides — Series I",
        subtitle: "Slide deck · Canva",
        link: "https://canva.link/2gr7145jlbx0ttr",
        tags: ["Slides", "Education"],
      },
      {
        id: "premed-edu-2",
        title: "Education Slides — Series II",
        subtitle: "Slide deck · Canva",
        link: "https://canva.link/yxt9f7vlj7zs2ex",
        tags: ["Slides", "Education"],
      },
      {
        id: "premed-edu-3",
        title: "Education Slides — Series III",
        subtitle: "Slide deck · Canva",
        link: "https://canva.link/dvrkgp6zobfwh9k",
        tags: ["Slides", "Education"],
      },
    ],
  },
];
