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
