import React, { useEffect, useRef } from 'react';
import { Sparkles, Layers, Palette } from 'lucide-react';
import { artistInfo } from '../mock';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from('.about-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        ease: 'power2.out',
      });

      // Animate bio text
      gsap.from('.about-bio', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        x: -50,
        ease: 'power2.out',
      });

      // Animate highlight cards
      gsap.from('.highlight-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        x: 50,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const highlights = [
    {
      icon: Palette,
      title: 'Visual Design',
      description: 'Creating beautiful, modern interfaces that delight users'
    },
    {
      icon: Sparkles,
      title: 'User Experience',
      description: 'Research-driven design focused on solving real user problems'
    },
    {
      icon: Layers,
      title: 'Design Systems',
      description: 'Building scalable, consistent design languages and components'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-32 bg-gradient-to-b from-white to-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="about-header mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#9333EA]"></div>
            <span className="text-[#9333EA] text-sm uppercase tracking-[0.3em] font-semibold">
              About
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Passion &
            <span className="text-[#9333EA]"> Precision</span>
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Bio */}
          <div className="about-bio">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {artistInfo.bio}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Every project is an opportunity to create meaningful connections between people and
              technology. Through thoughtful design, user research, and iterative refinement, I craft
              experiences that are not only visually stunning but also intuitive and accessible.
            </p>
          </div>

          {/* Right: Highlights */}
          <div className="space-y-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="highlight-card group bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#9333EA] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 p-3 rounded-xl group-hover:bg-[#9333EA] transition-colors duration-300">
                      <Icon size={28} className="text-[#9333EA] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;