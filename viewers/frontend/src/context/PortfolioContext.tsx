import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioData } from '../types';

import aboutsData from '../assets/data/portfolio.abouts.json';
import categoriesData from '../assets/data/portfolio.categories.json';
import cvsData from '../assets/data/portfolio.cvs.json';
import educationsData from '../assets/data/portfolio.educations.json';
import experiencesData from '../assets/data/portfolio.experiences.json';
import projectsData from '../assets/data/portfolio.projects.json';
import skillsData from '../assets/data/portfolio.skills.json';
import testimonialsData from '../assets/data/portfolio.testimonials.json';

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to normalize MongoDB exported JSON formats (handling {$oid: "..."})
const formatJsonData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(formatJsonData);
  }
  if (data !== null && typeof data === 'object') {
    if (data.$oid) return data.$oid;
    const newObj: any = {};
    for (const key of Object.keys(data)) {
      newObj[key] = formatJsonData(data[key]);
    }
    return newObj;
  }
  return data;
};

const initialData: PortfolioData = {
  about: formatJsonData(aboutsData[0] || { paragraphs: [] }),
  categories: formatJsonData(categoriesData),
  cv: formatJsonData(cvsData[0] || { cvUrl: '' }),
  education: formatJsonData(educationsData),
  experiences: formatJsonData(experiencesData),
  projects: formatJsonData(projectsData),
  skills: formatJsonData(skillsData),
  testimonials: formatJsonData(testimonialsData),
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data] = useState<PortfolioData>(initialData);

  return (
    <PortfolioContext.Provider value={{ data, loading: false, error: null }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

