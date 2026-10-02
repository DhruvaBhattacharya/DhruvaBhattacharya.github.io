import React, { useState, useEffect, Suspense, lazy } from 'react';
import SplashScreen from './components/common/SplashScreen';
import Navbar from './components/common/Navbar';
import Hero from './components/hero/Hero';
import Footer from './components/common/Footer';

// Code-split heavy below-the-fold components for sub-second FCP/LCP
const Experience = lazy(() => import('./components/experience/Experience'));
const Projects = lazy(() => import('./components/projects/Projects'));
const Skills = lazy(() => import('./components/skills/Skills'));
const EducationCerts = lazy(() => import('./components/education/EducationCerts'));
const Contact = lazy(() => import('./components/contact/Contact'));
const VisitorTracker = lazy(() => import('./components/common/VisitorTracker'));

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !navigator?.webdriver && sessionStorage.getItem('dhruva_splashed') !== 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Preload below-the-fold components during browser idle time
    const preload = () => {
      import('./components/experience/Experience');
      import('./components/projects/Projects');
      import('./components/skills/Skills');
      import('./components/education/EducationCerts');
      import('./components/contact/Contact');
      import('./components/common/VisitorTracker');
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload);
    } else {
      setTimeout(preload, 1000);
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-x-clip w-full max-w-full transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white' 
        : 'bg-[#fbfbfd] text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white'
    }`}>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow w-full max-w-full overflow-x-clip">
        <Hero isLoaded={!showSplash} />
        <Suspense fallback={<div className="min-h-[120px]" />}>
          <Experience />
          <Projects />
          <Skills />
          <EducationCerts />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      {/* Client Intelligence & Recruiter Check-In System (Lazy Loaded) */}
      <Suspense fallback={null}>
        <VisitorTracker />
      </Suspense>
    </div>
  );
}
