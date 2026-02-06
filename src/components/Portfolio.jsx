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
    <section id="portfolio" className="relative py-40 bg-black overflow-hidden px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-12 bg-secondary"></div>
              <span className="text-white text-xs uppercase tracking-[0.5em] font-black">
                SELECTED WORKS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter"
            >
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ARTIFACTS
              </span>
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 border ${activeCategory === 'all'
                  ? 'bg-white text-black border-white'
                  : 'text-white border-white/20 hover:border-white'
                }`}
            >
              ALL
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
          </motion.div>
        </div>

        {/* Embla Carousel Swiper */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ marginLeft: '-2rem' }}>
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] md:flex-[0_0_60%] lg:flex-[0_0_50%] min-w-0 pl-8 relative"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                      {/* Floating Link Button */}
                      <div className="absolute top-8 right-8 overflow-hidden rounded-full">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
                          <ExternalLink size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 pt-32 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <div className="space-y-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-4">
                          <span className="text-secondary text-xs font-black uppercase tracking-widest">
                            0{index + 1}
                          </span>
                          <span className="w-12 h-px bg-white/20" />
                          <span className="text-white/60 text-xs font-black uppercase tracking-widest">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 font-medium max-w-md line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {project.tools.map((tool, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4 mt-10 pr-6">
            <button
              onClick={scrollPrev}
              className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Global Bottom CTA */}
        <div className="mt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mb-10">
              More projects available on request
            </p>
            <button className="group inline-flex items-center gap-4 text-white text-2xl font-black hover:text-accent transition-colors">
              EXPLORE THE ARCHIVE <ArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;