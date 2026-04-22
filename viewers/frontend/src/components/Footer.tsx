import React from 'react';
import { SiLeetcode } from 'react-icons/si';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Name and Role */}
        <div className="text-center mb-10">
          <h3 className="text-3xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-[#7A3CED] to-[#1B9FE5] bg-clip-text text-transparent">
              Abdulbasit Nezif
            </span>
          </h3>
          <p className="text-gray-500 font-medium">Full-stack Developer & Software Engineer</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
          <a href="#about" className="text-sm font-bold text-gray-600 hover:text-[#1B9FE5] transition-colors">About</a>
          <a href="#skills" className="text-sm font-bold text-gray-600 hover:text-[#1B9FE5] transition-colors">Skills</a>
          <a href="#experience" className="text-sm font-bold text-gray-600 hover:text-[#1B9FE5] transition-colors">Experience</a>
          <a href="#education" className="text-sm font-bold text-gray-600 hover:text-[#1B9FE5] transition-colors">Education</a>
          <a href="#projects" className="text-sm font-bold text-gray-600 hover:text-[#1B9FE5] transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-bold text-gray-600 hover:text-[#1B9FE5] transition-colors">Contact</a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-6 mb-10">
          <a href="https://github.com/Ibnunezif" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl text-gray-700 hover:text-[#1B9FE5] hover:bg-blue-50 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/abdulbasitnezif/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl text-gray-700 hover:text-[#1B9FE5] hover:bg-blue-50 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://t.me/ibnu_nezif" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl text-gray-700 hover:text-[#1B9FE5] hover:bg-blue-50 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.54.26l.198-2.92 5.313-4.8c.23-.204-.05-.316-.354-.113l-6.57 4.137-2.83-.884c-.614-.19-.626-.614.128-.9l11.07-4.262c.513-.186.96.12.785.89z"/></svg>
          </a>
          <a href="https://leetcode.com/u/Ibnunezif/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl text-gray-700 hover:text-[#1B9FE5] hover:bg-blue-50 transition-all">
            <SiLeetcode className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-xs font-medium">
          <p>© {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
