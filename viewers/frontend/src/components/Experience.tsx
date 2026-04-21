import React, { useEffect, useRef, useState } from 'react';

const Experience: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = [
    {
      company: 'Company Name',
      role: 'Senior Software Engineer',
      duration: '2023 - Present',
      location: 'Remote',
      points: [
        'Led a team of engineers in developing scalable web applications using modern technologies.',
        'Architected and implemented complex backend systems with a focus on performance and security.',
        'Collaborated with cross-functional teams to define project requirements and deliver high-quality solutions.',
        'Mentored junior developers and conducted thorough code reviews to maintain high engineering standards.'
      ],
    },
    {
      company: 'Tech Solutions Inc.',
      role: 'Full Stack Developer',
      duration: '2021 - 2023',
      location: 'New York, USA',
      points: [
        'Developed and maintained multiple client-facing applications using React, Node.js, and PostgreSQL.',
        'Optimized application performance, resulting in a 30% reduction in load times.',
        'Implemented automated testing suites to ensure software reliability and reduce regression bugs.',
        'Integrated third-party APIs and services to enhance application functionality.'
      ],
    },
    {
      company: 'StartUp Hub',
      role: 'Frontend Developer',
      duration: '2019 - 2021',
      location: 'Remote',
      points: [
        'Built responsive and intuitive user interfaces using React and Tailwind CSS.',
        'Worked closely with designers to translate wireframes into high-fidelity code.',
        'Improved frontend state management using Redux and Context API.',
        'Participated in agile ceremonies and contributed to continuous process improvements.'
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress more precisely for the timeline
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
    <section id="experience" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#0DB5E5] shadow-sm border border-[#0DB5E5]/20 uppercase tracking-wider">
              MY JOURNEY
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#0DA2E5] bg-clip-text text-transparent">
                Experience
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
            {experiences.map((exp, idx) => {
              const itemThreshold = (idx / experiences.length) * 100;
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

                  {/* Details Side (Role, Company, Location) */}
                  <div className={`w-full md:w-1/2 mb-8 md:mb-0 ${idx % 2 === 0 ? 'md:order-2 md:pl-16' : 'md:order-1 md:pr-16 md:text-right'}`}>
                    <div className="space-y-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-md bg-indigo-50 text-xs font-bold text-[#7A3CED]">
                        {exp.duration}
                      </span>
                      <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                        {exp.role} · <span className="text-gray-900">{exp.company}</span>
                      </h3>
                      <div className={`flex items-center gap-2 text-gray-500 font-medium ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <svg className="w-4 h-4 text-[#0DB5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        At <span className="text-[#7A3CED]">{exp.company}</span> {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description Side (Bullet Points) */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:order-1 md:pr-16' : 'md:order-2 md:pl-16'}`}>
                    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <ul className="space-y-4">
                        {exp.points.map((point, pIdx) => (
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

export default Experience;
