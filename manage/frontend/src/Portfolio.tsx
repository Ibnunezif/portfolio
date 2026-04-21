import React from 'react';
import Header from './components/Header';
import AdminSkills from './components/AdminSkills';
import Footer from './components/Footer';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pt-16">
        <AdminSkills />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
