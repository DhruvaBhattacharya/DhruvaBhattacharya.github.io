import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';
import SignatureLogo from './SignatureLogo';
import profileData from '../../data/profile.json';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? darkMode
          ? 'bg-black/75 apple-glass-nav border-b border-white/[0.08] shadow-lg shadow-black/40 py-3'
          : 'bg-[#fbfbfd]/80 apple-glass-nav border-b border-black/[0.06] shadow-sm py-3'
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand Signature */}
          <a href="#" className="flex items-center">
            <SignatureLogo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-medium tracking-tight transition-colors py-1 ${
                  darkMode
                    ? 'text-[#86868b] hover:text-[#f5f5f7]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Apple System Blue Resume Button */}
            <a
              href={profileData.contact.resumeUrl || "./resume.pdf"}
              download="Dhruva_Bhattacharya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white active:scale-95 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Theme Toggle (Clean, Instantaneous, No Popups or Toasts) */}
            <button
              onClick={handleToggleTheme}
              className={`p-2 rounded-full transition-all relative ${
                darkMode
                  ? 'bg-white/[0.08] text-amber-300 hover:text-amber-200 border border-white/10'
                  : 'bg-black/[0.05] text-indigo-600 hover:text-indigo-800 border border-black/5'
              }`}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title="Toggle Light/Dark Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 transition-transform hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />}
            </button>
          </div>

          {/* Mobile menu & Theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleToggleTheme}
              className={`p-2 rounded-full border transition-colors ${
                darkMode
                  ? 'bg-white/[0.08] text-amber-300 border-white/10'
                  : 'bg-black/[0.05] text-indigo-600 border-black/5'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full border transition-colors ${
                darkMode ? 'bg-white/[0.08] text-[#f5f5f7] border-white/10' : 'bg-black/[0.05] text-[#1d1d1f] border-black/5'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-3 pb-6 mt-3 space-y-3 border-b backdrop-blur-2xl ${
          darkMode ? 'bg-black/90 border-white/[0.08]' : 'bg-[#fbfbfd]/90 border-black/[0.06] shadow-xl'
        }`}>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                  darkMode
                    ? 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.06]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="./resume.pdf"
            download="Dhruva_Bhattacharya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      )}
    </header>
  );
}
