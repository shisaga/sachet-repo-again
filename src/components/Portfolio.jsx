import React, { useState } from 'react';
import { Card } from './ui/card';
import { portfolioCategories, portfolioProjects } from '../mock';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background pattern */}
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
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#9333EA]"></div>
            <span className="text-[#9333EA] text-sm uppercase tracking-[0.3em] font-semibold">
              Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Featured
            <span className="text-[#9333EA]"> Projects</span>
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-lg text-sm uppercase tracking-wider font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-[#9333EA] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
              }`}
            >
              All Work
            </button>
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg text-sm uppercase tracking-wider font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#9333EA] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group relative bg-white border-gray-200 rounded-2xl overflow-hidden hover:border-[#9333EA] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-[#9333EA] p-4 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                    <ExternalLink size={24} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-bold mb-2 group-hover:text-[#9333EA] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Tools used */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-emerald-50 text-[#059669] px-3 py-1 rounded-full uppercase tracking-wider font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;