import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-12">
          {/* Row container for badge and title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-sm font-bold text-[#0DB5E5] shadow-sm border border-[#0DB5E5]/20">
              About Me
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#0DA2E5] bg-clip-text text-transparent">
                Who I am
              </span>
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
          <p>
            Over the past few years, I’ve been actively developing <span className="font-bold text-[#0DB5E5]">full-stack applications</span> and solving complex <span className="font-bold text-[#0DB5E5]">computer science problems</span>, with a strong focus on <span className="font-bold text-[#0DB5E5]">backend systems</span>, <span className="font-bold text-[#0DB5E5]">scalable architectures</span>, and <span className="font-bold text-[#0DB5E5]">efficient algorithms</span>. I work extensively with <span className="font-bold text-[#0DB5E5]">PHP, Laravel, MongoDB, Node.js, Express.js, JavaScript, and MySQL</span>, and I’m also a <span className="font-bold text-[#0DB5E5]">Flutter developer</span>, building cross-platform mobile applications using <span className="font-bold text-[#0DB5E5]">Clean Architecture</span> principles to ensure maintainability, scalability, and clear separation of concerns.
          </p>
          
          <p>
            I’ve built and contributed to multiple real-world projects. I completed a <span className="font-bold text-[#0DB5E5]">Lab Scheduling System</span> using Laravel, where I designed the core logic for handling lab booking requests, validating availability, and enforcing capacity constraints before approval. I have also developed a <span className="font-bold text-[#0DB5E5]">School Management System</span>, implementing features for managing students, scheduling, and administrative workflows.
          </p>

          <p>
            Currently, I am working on a <span className="font-bold text-[#0DB5E5]">local language learning application</span> that helps users learn Afan Oromo and Amharic in English, focusing on accessibility and user-friendly design. This project combines <span className="font-bold text-[#0DB5E5]">mobile development</span> and structured content delivery to create a practical and impactful learning experience.
          </p>

          <p>
            I have a strong passion for <span className="font-bold text-[#0DB5E5]">problem solving and algorithms</span>, consistently practicing to improve my ability to tackle challenging computational problems. I focus on writing <span className="font-bold text-[#0DB5E5]">optimized, clean, and efficient solutions</span>, and I’m comfortable breaking down complex problems into clear, logical steps.
          </p>

          <p>
            I also use <span className="font-bold text-[#0DB5E5]">Python and tools like Pandas</span> for data analysis, enabling me to explore datasets, perform transformations, and extract meaningful insights when needed.
          </p>

          <p>
            Driven by continuous learning, I aim to grow as a <span className="font-bold text-[#0DB5E5]">software engineer</span>, with a strong interest in <span className="font-bold text-[#0DB5E5]">backend development</span>, <span className="font-bold text-[#0DB5E5]">scalable systems</span>, and building <span className="font-bold text-[#0DB5E5]">impactful applications</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
