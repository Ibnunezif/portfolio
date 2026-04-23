export interface Paragraph {
  text: string;
  boldSegments: { start: number; end: number }[];
}

export interface AboutData {
  paragraphs: Paragraph[];
}

export interface Project {
  _id?: string;
  id?: number | string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; // Percentage 0-100
  icon?: any;
}

export interface ExperienceData {
  _id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
  order: number;
}

export interface EducationData {
  _id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  points: string[];
  order: number;
}

export interface TestimonialData {
  _id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  linkedInUrl: string;
  order: number;
}

export interface Category {
  _id: string;
  name: string;
}

export interface PortfolioData {
  about: AboutData;
  projects: Project[];
  skills: any[]; // The skills component uses hardcoded categories mostly
  cv: { cvUrl: string };
  experiences: ExperienceData[];
  education: EducationData[];
  testimonials: TestimonialData[];
  categories: Category[];
}
