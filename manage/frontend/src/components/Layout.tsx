import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;
