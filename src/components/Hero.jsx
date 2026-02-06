import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { artistInfo } from '../mock';
import InteractiveBackground from './InteractiveBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // GSAP animations for text elements
    const ctx = gsap.context(() => {
      gsap.from('.hero-intro', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-name', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from('.hero-tagline', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.2,
      });

      // Scroll-triggered fade out
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0.3,
        y: -100,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50/30 to-white overflow-hidden"
    >
      {/* Interactive Three.js Background */}
      <InteractiveBackground />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(16,185,129,0.1) 1px, rgba(16,185,129,0.1) 80px),
              repeating-linear-gradient(-90deg, transparent, transparent 1px, rgba(16,185,129,0.1) 1px, rgba(16,185,129,0.1) 80px)
            `,
          }}
        />
      </div>

      {/* Green accent glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9333EA] rounded-full filter blur-[150px] opacity-10 animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#34D399] rounded-full filter blur-[150px] opacity-10 animate-pulse z-0" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div
          className={`transform transition-all duration-1500 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Small intro text */}
          <div className="hero-intro mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#9333EA]"></div>
            <p className="text-[#9333EA] text-sm uppercase tracking-[0.3em] font-semibold">
              Design Excellence
            </p>
            <div className="h-px w-12 bg-[#9333EA]"></div>
          </div>

          {/* Main heading */}
          <h1 className="hero-name text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
            <span className="text-gray-900 block mb-2">{artistInfo.name}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-[#9333EA]">
              {artistInfo.title}
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="hero-tagline text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {artistInfo.tagline}
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToPortfolio}
            className="hero-cta group inline-flex items-center gap-3 bg-[#9333EA] text-white px-10 py-4 rounded-lg text-lg font-semibold uppercase tracking-wider hover:bg-gray-900 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Explore Work
            <ChevronDown
              size={20}
              className="group-hover:translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className="text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;