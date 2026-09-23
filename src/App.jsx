import React, { useState, useEffect } from 'react';
import SplashScreen from './components/common/SplashScreen';
import Navbar from './components/common/Navbar';
import Hero from './components/hero/Hero';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import Skills from './components/skills/Skills';
import EducationCerts from './components/education/EducationCerts';
import Contributions from './components/contributions/Contributions';
import Contact from './components/contact/Contact';
import Footer from './components/common/Footer';
import VisitorTracker from './components/common/VisitorTracker';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white' 
        : 'bg-[#fbfbfd] text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white'
    }`}>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <EducationCerts />
        <Contributions />
        <Contact />
      </main>
      <Footer />
      {/* Client Intelligence & Recruiter Check-In System */}
      <VisitorTracker />
    </div>
  );
}
