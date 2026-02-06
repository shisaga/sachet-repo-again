import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { artistInfo } from '../mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const nameParts = artistInfo.name.split(' ');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
          ? 'bg-black/60 backdrop-blur-xl border-white/10 py-4'
          : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => scrollToSection('home')}
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1"
        >
          <span className="text-white">{nameParts[0].toUpperCase()}</span>
          <span className="text-secondary">{nameParts[1]?.toUpperCase() || ''}</span>
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse ml-1" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {['home', 'about', 'portfolio', 'skills'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-gray-400 hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-bold"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold">Contact</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} style={{ top: '72px' }}>
        <nav className="flex flex-col items-center justify-center h-full gap-10">
          {['home', 'about', 'portfolio', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-white text-3xl font-black uppercase tracking-tighter hover:text-accent transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;