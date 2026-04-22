import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/admin/about', name: 'About' },
    { path: '/admin/projects', name: 'Projects' },
    { path: '/admin/cv', name: 'CV' },
    { path: '/admin/experience', name: 'Experience' },
    { path: '/admin/education', name: 'Education' },
    { path: '/admin/testimonials', name: 'Testimonials' },
  ];

  return (
    <div className="w-64 bg-gray-800 h-screen fixed left-0 top-0 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block p-3 rounded-lg transition ${
                isActive ? 'bg-[#1B9FE5]' : 'hover:bg-gray-700'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
