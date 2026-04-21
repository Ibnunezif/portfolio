import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-[#0DB5E5] selection:text-white relative overflow-hidden">
      {/* Global Animated Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0DB5E5]/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[100px] animate-float-delayed"></div>
        <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] bg-green-100/30 rounded-full blur-[80px] animate-float-slow"></div>
      </div>

      <div className="relative z-10">
        {/* Header and Hero share the same top section area background */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
          <Header />
          <Hero />
        </div>

        <div className="space-y-0">
          <About />
          <Skills />
          <TechStack />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Portfolio;
