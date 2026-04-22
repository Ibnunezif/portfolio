import React, { useState, useEffect } from 'react';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Web' | 'AI/ML' | 'Open Source' | 'Desktop'>('All');
  const [projectData, setProjectData] = useState<Project[]>([]);

  const categories: ('All' | 'Web' | 'AI/ML' | 'Open Source' | 'Desktop')[] = ['All', 'Web', 'AI/ML', 'Open Source', 'Desktop'];

  useEffect(() => {
    fetch('http://localhost:3002/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjectData(data);
      })
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projectData 
    : projectData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#1B9FE5] shadow-sm border border-[#1B9FE5]/20 uppercase tracking-wider">
              PORTFOLIO
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
                Latest Projects
              </span>
            </h2>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-[#1B9FE5] text-white border-[#1B9FE5] shadow-lg shadow-[#1B9FE5]/25' 
                  : 'bg-white text-gray-600 border-gray-100 hover:border-[#1B9FE5] hover:text-[#1B9FE5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project._id} 
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-56 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="transform group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-16 h-16 text-[#1B9FE5]/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 2H5C3.89 2 3 2.89 3 4V20C3 21.11 3.89 22 5 22H19C20.11 22 21 21.11 21 20V4C21 2.89 20.11 2 19 2ZM19 20H5V4H19V20Z" />
                      <path d="M7 10H17V12H7V10ZM7 14H14V16H7V14Z" />
                    </svg>
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#7A3CED] text-[10px] font-bold rounded-lg shadow-sm border border-indigo-50 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1B9FE5] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 italic">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-bold text-[#1B9FE5] bg-blue-50/50 rounded-lg border border-blue-100/50">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1B9FE5] text-white text-xs font-bold rounded-xl hover:bg-[#1B9FE5] shadow-lg shadow-[#1B9FE5]/20 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
