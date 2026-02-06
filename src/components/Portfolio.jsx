import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { portfolioCategories, portfolioProjects } from '../mock';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        opacity: 0,
        y: 60,
        rotateX: 10,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-40 bg-black overflow-hidden px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-secondary"></div>
              <span className="text-white text-xs uppercase tracking-[0.5em] font-black">
                SELECTED WORKS
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ARTIFACTS
              </span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 border ${activeCategory === 'all'
                  ? 'bg-white text-black border-white'
                  : 'text-white border-white/20 hover:border-white'
                }`}
            >
              ALL PROJECTS
            </button>
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 border ${activeCategory === category.id
                    ? 'bg-secondary text-white border-secondary'
                    : 'text-white border-white/20 hover:border-white'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group perspective-1000"
            >
              <div className="relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 transition-all duration-700 transform group-hover:scale-[0.98]">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-accent/20 backdrop-blur-sm">
                    <div className="bg-white text-black p-6 rounded-full transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                      <ExternalLink size={30} strokeWidth={3} />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white text-3xl font-black tracking-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-gray-500 text-sm font-bold opacity-40">0{index + 1}</div>
                  </div>

                  <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/5 text-gray-300 px-4 py-2 rounded-full border border-white/10 font-black uppercase tracking-widest"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mb-10">
            More projects available on request
          </p>
          <button className="group inline-flex items-center gap-4 text-white text-2xl font-black hover:text-accent transition-colors">
            EXPLORE THE ARCHIVE <ArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;