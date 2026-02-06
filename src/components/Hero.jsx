import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { artistInfo } from '../mock';
import InteractiveBackground from './InteractiveBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const ctx = gsap.context(() => {
      // Kinetic Typography for Name
      const nameChars = nameRef.current.innerText.split('');
      nameRef.current.innerHTML = nameChars
        .map(char => `<span class="inline-block char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      gsap.from('.char', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
      });

      // Background patterns and glows reveal
      gsap.from('.bg-glow', {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        stagger: 0.3,
        ease: 'power2.out',
      });

      // Content reveal
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1,
      });

      // Magnetic Effect for CTA
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 150) {
          gsap.to(ctaRef.current, {
            x: deltaX * 0.3,
            y: deltaY * 0.3,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
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
      className="relative min-h-[110vh] flex items-center justify-center bg-black overflow-hidden"
    >
      <InteractiveBackground />

      {/* Modern Neon Glows */}
      <div className="bg-glow absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="bg-glow absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
        <div className="hero-reveal space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
              Next Gen UX Solutions
            </span>
          </div>

          <h1
            ref={nameRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none overflow-hidden"
          >
            {artistInfo.name.toUpperCase()}
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
            <p className="hero-reveal text-gray-400 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
              Crafting <span className="text-white italic">immersive digital experiences</span> that bridge the gap between imagination and reality.
            </p>
          </div>

          <div className="pt-8">
            <button
              ref={ctaRef}
              onClick={scrollToPortfolio}
              className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-accent hover:text-black overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                LET'S CREATE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Marquee or Scroll Text (GenZ style) */}
      <div className="absolute bottom-10 left-10 hidden lg:block rotate-90 origin-left">
        <span className="text-white/20 text-xs font-black tracking-[1em] uppercase">
          Scroll to explore — {artistInfo.title}
        </span>
      </div>
    </section>
  );
};

export default Hero;