import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import abdulbasitImg from '../assets/Abdulbasit.jpg';
import { SiLeetcode } from 'react-icons/si';

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const cvUrl = data?.cv.cvUrl || '#';

  return (
    <section id="about" className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Avatar */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7A3CED] to-[#1B9FE5] blur-2xl opacity-15 scale-110"></div>
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-[350px] lg:h-[350px] rounded-full shadow-xl flex items-center justify-center overflow-hidden border border-white/40">
                <img 
                  src={abdulbasitImg} 
                  alt="Abdulbasit Nezif" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-xs font-semibold text-gray-700 shadow-sm border border-gray-200 backdrop-blur-sm">
              <span className="mr-2">👋</span> Hello, I'm
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
                Abdulbasit Nezif
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
              Full-stack Developer & Software Engineer
            </h2>

            <p className="text-base text-gray-600 max-w-xl leading-relaxed">
              I specialize in <span className="font-bold text-[#1B9FE5]">modern web technologies</span>. 
              I architect scalable <span className="font-bold text-[#1B9FE5]">backend systems</span> and build intuitive 
              <span className="font-bold text-[#1B9FE5]">frontend experiences</span>.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-[#1B9FE5] text-white font-bold rounded-lg shadow-md shadow-[#1B9FE5]/30 hover:scale-105 transition-all text-sm"
              >
                Contact Me
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-white transition-all text-sm bg-white/50"
              >
                Download CV
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start items-center space-x-5 pt-4">
              <a href="https://github.com/Ibnunezif" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="#181717" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/abdulbasitnezif/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="#0077B5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://t.me/ibnu_nezif" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="#26A5E4" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.54.26l.198-2.92 5.313-4.8c.23-.204-.05-.316-.354-.113l-6.57 4.137-2.83-.884c-.614-.19-.626-.614.128-.9l11.07-4.262c.513-.186.96.12.785.89z"/></svg>
              </a>
              <a href="https://leetcode.com/u/Ibnunezif/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform text-[#FFA116]">
                <SiLeetcode className="w-6 h-6" />
              </a>
              <a href="https://codeforces.com/profile/ibnunezif99" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <rect width="5" height="13" x="0" y="7" fill="#F7CC4D" rx="1.5" />
                  <rect width="5" height="20" x="8" y="0" fill="#1B8ECB" rx="1.5" />
                  <rect width="5" height="9" x="16" y="11" fill="#C02A2A" rx="1.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
