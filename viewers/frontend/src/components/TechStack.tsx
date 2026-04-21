import React from 'react';
import { 
  SiPython, SiDjango, SiJavascript, SiReact, SiPostgresql, 
  SiMongodb, SiCplusplus, SiDocker, SiNodedotjs, SiExpress,
  SiPhp, SiMysql, SiDart, SiFlutter, SiGo, SiGin,
  SiFirebase, SiKubernetes, SiLaravel, SiTypescript,
  SiJira, SiTailwindcss
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';

const TechStack: React.FC = () => {
  const stacks = [
    { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
    { name: 'Django', icon: <SiDjango className="text-[#092E20]" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: 'Express.js', icon: <SiExpress className="text-[#000000]" /> },
    { name: 'PHP', icon: <SiPhp className="text-[#777BB4]" /> },
    { name: 'Laravel', icon: <SiLaravel className="text-[#FF2D20]" /> },
    { name: 'Go', icon: <SiGo className="text-[#00ADD8]" /> },
    { name: 'Gin', icon: <SiGin className="text-[#00ADD8]" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: 'Java', icon: <FaJava className="text-[#007396]" /> },
    { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: 'Dart', icon: <SiDart className="text-[#0175C2]" /> },
    { name: 'Flutter', icon: <SiFlutter className="text-[#02569B]" /> },
    { name: 'Firebase', icon: <SiFirebase className="text-[#FFCA28]" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791]" /> },
    { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
    { name: 'C++', icon: <SiCplusplus className="text-[#00599C]" /> },
    { name: 'AWS', icon: <FaAws className="text-[#232F3E]" /> },
    { name: 'Docker', icon: <SiDocker className="text-[#2496ED]" /> },
    { name: 'Kubernetes', icon: <SiKubernetes className="text-[#326CE5]" /> },
    { name: 'Jira', icon: <SiJira className="text-[#0052CC]" /> },
  ];

  return (
    <section id="tech-stack" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#0DB5E5] shadow-sm border border-[#0DB5E5]/20">
              Stack
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#0DA2E5] bg-clip-text text-transparent">
                Tech-stack Highlights
              </span>
            </h2>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {stacks.map((stack, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center p-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-20 sm:w-24 h-20 sm:h-24 group hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl mb-1.5 group-hover:scale-110 transition-transform duration-300">
                {stack.icon}
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-800 tracking-tight text-center leading-tight">{stack.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
