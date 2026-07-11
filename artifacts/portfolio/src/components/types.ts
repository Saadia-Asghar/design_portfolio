export type Card = {
  id: string;
  title: string;
  subtitle?: string;
  impact?: string;
  link?: string;
  image?: string;
  tags?: string[];
  award?: string;
};

export type Chapter = {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  intro?: string;
  accent: "blush" | "sage" | "gold" | "ink";
  cards: Card[];
};

export type CaseStudy = {
  id: string;
  title: string;
  client?: string;
  year?: string;
  role?: string;
  award?: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  link?: string;
};

export type Stat = {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

export type Award = {
  title: string;
  org: string;
  year?: string;
  accent?: boolean;
  link?: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type Tool = { name: string };

export type Certification = {
  name: string;
  by: string;
};

export type Education = {
  school: string;
  degree: string;
  location?: string;
  years?: string;
};

export type Experience = {
  id: string;
  org: string;
  role: string;
  period: string;
  current?: boolean;
  type: "design" | "community" | "tech" | "ambassador" | "ai" | "marketing";
  description?: string;
};

export type SiteMeta = {
  name: string;
  role: string;
  location: string;
  timezone: string;
  availableFor: string[];
  intentions?: string[];
  email: string;
  linkedin: string;
  github?: string;
  phone?: string;
  instagram?: string;
  dribbble?: string;
  resume: string;
  portfolio?: string;
  tagline: string;
  bio: string;
  education?: Education;
  currently: {
    reading: string;
    building: string;
    thinking: string;
  };
};
