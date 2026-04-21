import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        <p className="mt-2">Built with React, TypeScript, and Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
