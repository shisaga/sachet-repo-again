import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-gray-900">ALEX</span>
          <span className="text-[#9333EA]">RIVERA</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#9333EA] text-white px-6 py-2.5 rounded-lg hover:bg-[#059669] transition-all duration-300 text-sm uppercase tracking-wider font-medium shadow-md hover:shadow-lg"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-900 hover:text-[#9333EA] transition-colors duration-300"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200 shadow-xl">
          <nav className="flex flex-col px-6 py-8 gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left text-lg uppercase tracking-wider font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left text-lg uppercase tracking-wider font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left text-lg uppercase tracking-wider font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left text-lg uppercase tracking-wider font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#9333EA] text-white px-6 py-3 rounded-lg hover:bg-[#059669] transition-all duration-300 text-left text-lg uppercase tracking-wider font-medium shadow-md"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;