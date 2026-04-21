import React, { useEffect, useRef, useState } from 'react';

const Education: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const education = [
    {
      institution: 'Adama Science and Technology University',
      degree: "Bachelor's Degree in Software Engineering",
      duration: '2023 – 2027',
      location: 'Adama, Ethiopia',
      points: [
        'CGPA: 3.71/4.0',
        'Relevant courses: Software Architecture and Design, Database Systems, Computer Networking, Web Development, Mobile Application Development, Operating Systems'
      ],
    },
    {
      institution: 'Africa to Silicon Valley (A2SV)',
      degree: 'Data Structures and Algorithms',
      duration: 'One-year training',
      location: 'In-person · Adama, Ethiopia',
      points: [
        'Completed a year-long competitive programming training, solving 1000+ problems on LeetCode, Codeforces and HackerRank.',
        'Developed advanced problem-solving skills and deepened understanding of complex data structures and algorithmic paradigms.'
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const distanceScrolled = viewportHeight / 2 - rect.top;
      let progress = (distanceScrolled / rect.height) * 100;
      
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#0DB5E5] shadow-sm border border-[#0DB5E5]/20 uppercase tracking-wider">
              ACADEMIC BACKGROUND
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#0DA2E5] bg-clip-text text-transparent">
                Education
              </span>
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-100"></div>
          
          {/* Progress Line */}
          <div 
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-px bg-gradient-to-b from-[#7A3CED] to-[#0DA2E5] origin-top transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          ></div>

          <div className="space-y-24">
            {education.map((edu, idx) => {
              const itemThreshold = (idx / education.length) * 100;
              const isVisible = scrollProgress > itemThreshold;

              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 top-0 items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-gray-200 z-10">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isVisible ? 'bg-[#7A3CED] scale-110' : 'bg-gray-200'}`}></div>
                  </div>

                  {/* Details Side (Degree, Institution) */}
                  <div className={`w-full md:w-1/2 mb-8 md:mb-0 ${idx % 2 === 0 ? 'md:order-2 md:pl-16' : 'md:order-1 md:pr-16 md:text-right'}`}>
                    <div className="space-y-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-md bg-indigo-50 text-xs font-bold text-[#7A3CED]">
                        {edu.duration}
                      </span>
                      <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                        {edu.degree}
                      </h3>
                      <div className={`flex items-center gap-2 text-gray-500 font-medium ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <svg className="w-4 h-4 text-[#0DB5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        At <span className="text-[#7A3CED]">{edu.institution}</span> · {edu.location}
                      </div>
                    </div>
                  </div>

                  {/* Description Side (Bullet Points) */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:order-1 md:pr-16' : 'md:order-2 md:pl-16'}`}>
                    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <ul className="space-y-4">
                        {edu.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex gap-3 text-gray-500 leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#7A3CED] shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
