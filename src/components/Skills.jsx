import React from 'react';
import { skills } from '../mock';

const Skills = () => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
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
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#9333EA]"></div>
            <span className="text-[#9333EA] text-sm uppercase tracking-[0.3em] font-semibold">
              Expertise
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tools &
            <span className="text-[#9333EA]"> Skills</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Mastering industry-leading design tools to create exceptional digital experiences
          </p>
        </div>

        {/* Skills grid by category */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, skillList], index) => (
            <div
              key={category}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#9333EA] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-[#9333EA] text-sm uppercase tracking-[0.3em] font-bold mb-6">
                {category}
              </h3>
              <div className="space-y-3">
                {skillList.map((skill, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9333EA] group-hover:w-8 transition-all duration-300"></div>
                    <span className="text-base font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;