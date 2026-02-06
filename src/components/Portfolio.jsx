import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { portfolioCategories, portfolioProjects } from '../mock';
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: true, // Allow smooth dragging
    containScroll: 'trimSnaps'
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.reInit();
  }, [emblaApi, onSelect, filteredProjects]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="portfolio" className="relative py-32 bg-white overflow-hidden px-6 border-t-4 border-black">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: 'url("/images/projectsectionbacground.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transform rotate-1">
              Selected Works
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
              DIGITAL <br />
              <span className="text-primary" style={{ textShadow: '4px 4px 0px #000' }}>
                COLLECTION
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${activeCategory === category.id ? 'bg-secondary text-black' : 'bg-white text-black'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Multiple Phones Swiper */}
        <div className="relative py-10">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ marginLeft: '-1rem' }}>
              {filteredProjects.map((project, index) => {
                // Alternate rotations for "scattered" look
                const rotation = index % 2 === 0 ? 'rotate-2' : '-rotate-2';
                const marginTop = index % 2 === 0 ? 'mt-0' : 'mt-12';

                return (
                  <div key={project.id} className={`flex-[0_0_85%] md:flex-[0_0_35%] min-w-0 pl-12 ${marginTop}`}>
                    {/* Phone Container */}
                    <div className={`relative w-full aspect-[9/18] transition-transform duration-500 hover:scale-105 hover:z-20 hover:rotate-0 ${rotation}`}>
                      {/* Phone Frame Image */}
                      <div
                        className="absolute inset-0 bg-no-repeat bg-contain bg-center pointer-events-none z-20"
                        style={{ backgroundImage: 'url("/images/frame.png")' }}
                      />

                      {/* Content (Screen) */}
                      {/* Adjust padding/margins to fit INSIDE the frame image - trial and error based on typical frame assets */}
                      <div className="absolute top-[2%] left-[3%] right-[3%] bottom-[2%] rounded-[2rem] overflow-hidden bg-black z-10 group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />

                        {/* Overlay Info */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 text-white backdrop-blur-sm">
                          <div className="bg-primary text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3 rounded-full">
                            {project.category}
                          </div>
                          <h3 className="text-3xl font-black mb-3 uppercase leading-none">{project.title}</h3>
                          <p className="font-medium text-xs max-w-xs text-gray-300 line-clamp-3 mb-6">{project.description}</p>

                          <div className="flex gap-2 justify-center mb-6 flex-wrap">
                            {project.tools.slice(0, 3).map((tool, i) => (
                              <span key={i} className="text-[9px] border border-white/50 px-2 py-1 rounded-full uppercase">{tool}</span>
                            ))}
                          </div>

                          <button className="bg-white text-black p-3 rounded-full hover:bg-primary transition-colors">
                            <ExternalLink size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons (Moved to Bottom) */}
          <div className="flex justify-center gap-6 mt-16 z-20 relative">
            <button
              onClick={scrollPrev}
              className="p-4 rounded-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button
              onClick={scrollNext}
              className="p-4 rounded-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Global Bottom CTA */}
        <div className="mt-20 text-center">
          <button className="neo-button text-xl inline-flex items-center gap-4">
            VIEW ALL PROJECTS <ArrowRight strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;