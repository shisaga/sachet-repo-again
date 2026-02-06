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
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transform rotate-1">
              Selected Works
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
              DIGITAL <br />
              <span className="text-primary" style={{ textShadow: '4px 4px 0px #000' }}>
                PLAYGROUND
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

        {/* Mobile Frame Swiper */}
        <div className="relative flex justify-center py-10">
          {/* Phone Frame Container */}
          <div className="relative w-[350px] md:w-[800px] h-[700px] md:h-[450px] bg-no-repeat bg-contain bg-center flex items-center justify-center p-4 md:p-12 rotate-0 md:rotate-0"
            style={{ backgroundImage: 'url("/images/frame.png")' }}
          >
            {/* Screen Area (Content) */}
            <div className="w-[90%] h-[85%] md:w-[92%] md:h-[88%] bg-white overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border-2 border-black relative">
              <div className="h-full w-full overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y h-full">
                  {filteredProjects.map((project, index) => (
                    <div key={project.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                      {/* Project Slide */}
                      <div className="relative w-full h-full group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Overlay Info */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-8 text-white">
                          <div className="bg-primary text-black px-4 py-1 text-xs font-black uppercase tracking-widest mb-4">
                            {project.category}
                          </div>
                          <h3 className="text-4xl font-black mb-4 uppercase leading-none">{project.title}</h3>
                          <p className="font-medium text-sm max-w-xs">{project.description}</p>
                          <div className="mt-8 flex gap-2 justify-center">
                            {project.tools.slice(0, 3).map((tool, i) => (
                              <span key={i} className="text-[10px] border border-white px-2 py-1 rounded-full uppercase">{tool}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation inside frame (optional or outside) */}
              <button
                onClick={scrollPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white border-2 border-black p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-colors z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white border-2 border-black p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-colors z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>
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