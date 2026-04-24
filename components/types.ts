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

export type Stat = { value: string; label: string };

export type Award = {
  title: string;
  org: string;
  year?: string;
  accent?: boolean;
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type Tool = { name: string };

export type SiteMeta = {
  name: string;
  role: string;
  location: string;
  timezone: string;
  availableFor: string[];
  email: string;
  linkedin: string;
  instagram?: string;
  dribbble?: string;
  resume: string;
  portfolio?: string;
  tagline: string;
  bio: string;
  currently: {
    reading: string;
    building: string;
    thinking: string;
  };
};
