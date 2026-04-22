import React from 'react';
import SkillCard from './SkillCard';
import { 
  SiDjango, SiReact, SiTypescript, SiTailwindcss, SiFlutter, SiDart, 
  SiFirebase, SiPostgresql, SiMongodb, SiDocker, SiKubernetes, 
  SiJavascript, SiMysql, SiLaravel, SiNodedotjs, SiGo, 
  SiAndroidstudio, SiPostman, SiGit 
} from 'react-icons/si';
import { HiDatabase } from 'react-icons/hi';
import { VscServer, VscVscode } from 'react-icons/vsc';
import { BsTools } from 'react-icons/bs';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Backend',
      icon: <VscServer size={32} />,
      skills: [
        { name: 'Django', icon: <SiDjango className="text-green-800" /> },
        { name: 'Laravel', icon: <SiLaravel className="text-red-600" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" /> },
        { name: 'Go', icon: <SiGo className="text-cyan-500" /> },
      ],
    },
    {
      title: 'Frontend',
      icon: <SiReact size={32} />,
      skills: [
        { name: 'React', icon: <SiReact className="text-blue-400" /> },
        { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
      ],
    },
    {
      title: 'Mobile',
      icon: <SiFlutter size={32} />,
      skills: [
        { name: 'Flutter', icon: <SiFlutter className="text-blue-400" /> },
        { name: 'Dart', icon: <SiDart className="text-blue-600" /> },
        { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
      ],
    },
    {
      title: 'Database',
      icon: <HiDatabase size={32} />,
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-800" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-700" /> },
      ],
    },
    {
      title: 'DevOps',
      icon: <SiDocker size={32} />,
      skills: [
        { name: 'Docker', icon: <SiDocker className="text-blue-500" /> },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-blue-600" /> },
        { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
      ],
    },
    {
      title: 'Tools',
      icon: <BsTools size={32} />,
      skills: [
        { name: 'VS Code', icon: <VscVscode className="text-blue-500" /> },
        { name: 'Android Studio', icon: <SiAndroidstudio className="text-green-600" /> },
        { name: 'Postman', icon: <SiPostman className="text-orange-600" /> },
        { name: 'Git', icon: <SiGit className="text-orange-500" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#1B9FE5] shadow-sm border border-[#1B9FE5]/20">
              My Skills
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <SkillCard key={idx} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
