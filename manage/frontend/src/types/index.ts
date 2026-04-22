export interface Project {
  _id?: string;
  id?: number | string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: 'Web' | 'AI/ML' | 'Open Source' | 'Desktop';
}


export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; // Percentage 0-100
}

export interface Experience {
  _id?: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
  order: number;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  points: string[];
  order: number;
}

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  linkedInUrl: string;
  order: number;
}



