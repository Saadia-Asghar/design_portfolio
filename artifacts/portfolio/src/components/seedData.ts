import type {
  Award,
  CaseStudy,
  Certification,
  Chapter,
  Experience,
  ProcessStep,
  SiteMeta,
  Stat,
  Tool,
} from "./types";

const VYROTHON_FIGMA =
  "https://www.figma.com/design/E9IKt31asTEeVyKS595YX3/Vyro?node-id=4-17&t=jjLeblvLTYZQ2yTd-1";

export const siteMeta: SiteMeta = {
  name: "Saadia Asghar",
  role: "Product Designer · Marketing Director · AI Intern",
  location: "Islamabad, Pakistan",
  timezone: "Asia/Karachi",
  availableFor: [
    "Product Designer",
    "Marketing Director",
    "Graphic Designer",
    "AI/ML Intern",
    "Community Builder",
  ],
  intentions: ["create", "design", "market", "build", "innovate"],
  email: "saadianigah@gmail.com",
  linkedin: "https://www.linkedin.com/in/saadia-asghar",
  github: "https://github.com/Saadia-Asghar",
  phone: "+92 315 912 7771",
  resume: "/resume.png",
  portfolio: "https://github.com/Saadia-Asghar/design_portfolio",
  tagline:
    "Product designer, marketing director, and AI intern — building real things under real deadlines.",
  bio: "B.Sc. Data Science student at GIKI. Currently Marketing Director at UROG, AI Intern at Najoomi, and Campus Ambassador for Canva and Replit. I prefer building products over just writing code — rapid prototyping, shipping under deadlines, and making data useful through clean interfaces. Hackathon record: 1st at Vyrothon (500+ applicants), Top 5 Nationally, Top 10 MIT Hack Nation, 3rd BASED Pakistan.",
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

export const experiences: Experience[] = [
  {
    id: "najoomi",
    org: "Najoomi",
    role: "Artificial Intelligence Intern",
    period: "July 2026 – Present",
    current: true,
    type: "ai",
  },
  {
    id: "urog-md",
    org: "UROG",
    role: "Marketing Director",
    period: "May 2026 – Present",
    current: true,
    type: "marketing",
    description: "Leading marketing strategy and execution for the organisation.",
  },
  {
    id: "canva-lead",
    org: "Canva Community GIKI",
    role: "Community Lead",
    period: "June 2026 – Present",
    current: true,
    type: "community",
  },
  {
    id: "canva-amb",
    org: "Canva",
    role: "Campus Ambassador",
    period: "June 2026 – Present",
    current: true,
    type: "ambassador",
  },
  {
    id: "replit",
    org: "Replit",
    role: "Campus Ambassador",
    period: "May 2026 – Present",
    current: true,
    type: "ambassador",
  },
  {
    id: "atomcamp",
    org: "atomcamp",
    role: "Campus Ambassador",
    period: "Feb 2026 – Present",
    current: true,
    type: "ambassador",
    description: "Promoting AI and Automation Skills on Campus.",
  },
  {
    id: "gdg",
    org: "Google Developer Group GIKI",
    role: "Core Team Member",
    period: "Nov 2025 – Present",
    current: true,
    type: "community",
  },
  {
    id: "urog-edu",
    org: "UROG",
    role: "Officer Education",
    period: "Dec 2025 – May 2026",
    type: "community",
  },
  {
    id: "premed-assoc",
    org: "PreMed.PK",
    role: "Design Associate",
    period: "July 2025 – Dec 2025",
    type: "design",
    description: "30+ visual assets shipped; 40% lift in digital engagement.",
  },
  {
    id: "devsinc",
    org: "Devsinc",
    role: "Campus Ambassador",
    period: "Feb 2025 – May 2026",
    type: "ambassador",
  },
  {
    id: "ms-club",
    org: "Microsoft Club GIKI",
    role: "Marketing & Design Team Member",
    period: "Dec 2024 – Present",
    current: true,
    type: "marketing",
  },
  {
    id: "acm-design",
    org: "ACM Student GIKI Chapter",
    role: "Design Team Member",
    period: "Feb 2025 – Present",
    current: true,
    type: "design",
  },
  {
    id: "premed-intern",
    org: "PreMed.PK",
    role: "Design Intern",
    period: "May 2025 – July 2025",
    type: "design",
  },
  {
    id: "remotebase",
    org: "Remotebase",
    role: "Campus Ambassador",
    period: "Feb 2025 – July 2025",
    type: "ambassador",
  },
];

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
    value: "14",
    suffix: "+",
    label: "Roles across design, marketing, community, and tech",
  },
];

export const marqueeWords = [
  "Product Design",
  "Marketing Director",
  "AI Intern",
  "Visual Identity",
  "Community Builder",
  "Hackathon Winner",
  "Campus Ambassador",
  "Graphic Design",
  "Dashboard Design",
  "Storytelling UI",
];

export const featuredCaseStudy: CaseStudy = {
  id: "vyrothon",
  title: "Vyrothon — Product Design Submission",
  client: "Vyrothon · Product Design & Innovation",
  year: "April 2026",
  role: "Participant · Product Design category",
  award: "1st · Product Design Round · Top 5 Finalist nationally",
  summary:
    "I participated in Vyrothon in the Product Design category. The submission was a high-fidelity interactive prototype focused on user presence and gamified storytelling — built and shown at the National Science & Technology Park (NSTP).",
  problem:
    "The brief asked for a considered product-design response to a design-and-innovation challenge. I wanted the work to read clearly on its own — so anyone opening the file could understand the idea without a live pitch.",
  approach: [
    "Framed the opportunity around user presence, not features — what would make someone feel inside the product, not on top of it.",
    "Sketched the core moments on paper before opening Figma; complex screens have to earn their complexity.",
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
    title: "Marketing Director",
    org: "UROG · GIKI",
    year: "May 2026 – Present",
  },
  {
    title: "AI Intern",
    org: "Najoomi",
    year: "July 2026 – Present",
  },
  {
    title: "Promoted to Design Associate",
    org: "PreMed.PK",
    year: "July 2025",
  },
  {
    title: "Core Design & Marketing",
    org: "ACM · Microsoft Club · GDG · GIKI",
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
  "NLP/ML",
  "RAG",
];

export const capabilities: string[] = [
  "Product design",
  "Marketing strategy",
  "Community management",
  "Visual identity & branding",
  "Wireframing & prototyping",
  "Dashboard & data UI",
  "Graphic design",
  "NLP · ML · AI",
];

export const certifications: Certification[] = [
  { name: "AI Agents Intensive", by: "Kaggle · Google" },
  { name: "GitHub Foundations", by: "Microsoft" },
  { name: "Intro to Statistics in Python", by: "DataCamp" },
  { name: "Intermediate SQL", by: "DataCamp" },
  { name: "Intro to Programming (C++)", by: "Microsoft" },
  { name: "Graphic Design", by: "DigiSkills" },
];

export const testimonials: { quote: string; name: string; role: string }[] = [];

export const seedChapters: Chapter[] = [
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
        impact:
          "Mood-driven storytelling interface — 'Stop scrolling. Start watching.'",
        image: "/images/moodmaze.png",
        link: "https://www.figma.com/design/HlnuZL5J1Wk8q6xaAseJ8F/Mood-Maze?t=b3mlhQ4jSQqs94QJ-1",
        tags: ["Concept", "Storytelling", "Cinema"],
      },
    ],
  },
  {
    id: "acm",
    number: "II",
    title: "ACM",
    subtitle: "Core Design & Marketing · Association for Computing Machinery · GIKI",
    intro:
      "Posters, event identities, and marketing collateral for the Association for Computing Machinery (ACM) chapter at GIKI.",
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
  {
    id: "premed",
    number: "IV",
    title: "PreMed.PK",
    subtitle: "Graphic Design Associate · Remote · May 2025",
    intro:
      "Visual identity and education collateral for a medical-education platform. Promoted to Associate; leading visual identity across the product.",
    accent: "gold",
    cards: [
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
