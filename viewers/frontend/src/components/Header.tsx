import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-24">
        {/* Left: Small Avatar */}
        <div className="flex-shrink-0 flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7A3CED] to-[#1B9FE5] p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#1B9FE5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#home" className="text-gray-600 hover:text-[#1B9FE5] font-semibold transition-colors">Home</a>
          <a href="#about" className="text-gray-600 hover:text-[#1B9FE5] font-semibold transition-colors">About</a>
          <a href="#experience" className="text-gray-600 hover:text-[#1B9FE5] font-semibold transition-colors">Experience</a>
          <a href="#skills" className="text-gray-600 hover:text-[#1B9FE5] font-semibold transition-colors">Skills</a>
          <a href="#projects" className="text-gray-600 hover:text-[#1B9FE5] font-semibold transition-colors">Projects</a>
          <a href="#contact" className="text-gray-600 hover:text-[#1B9FE5] font-semibold transition-colors">Contact</a>
        </nav>

        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-600 hover:text-[#1B9FE5]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
