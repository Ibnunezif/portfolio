import React from 'react';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon, skills }) => {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:border-transparent">
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-tr group-hover:from-[#7A3CED] group-hover:to-[#0DA2E5] -z-10 p-[2px]">
        <div className="w-full h-full bg-white rounded-[14px]"></div>
      </div>

      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-60"></div>
      
      {/* Category Icon */}
      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-[#0DB5E5] mb-6 border border-[#0DB5E5]/20">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      
      {/* Skill List */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl border border-gray-100">
              {skill.icon}
            </div>
            <span className="text-gray-700 font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
