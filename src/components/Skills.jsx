import React from 'react';
import { skills } from '../mock';
import { motion } from 'framer-motion';

const Skills = () => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-40 bg-primary overflow-hidden px-6 border-t-4 border-black">
      {/* Fly Icon */}
      <motion.img
        src="/images/fly.png"
        alt="Paper Plane"
        className="absolute top-10 right-10 w-24 md:w-32 z-10 pointer-events-none"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Fly Icon */}
      <motion.img
        src="/images/fly.png"
        alt="Paper Plane"
        className="absolute top-10 right-10 w-24 md:w-32 z-10 pointer-events-none"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-white border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-[0.5em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              CORE STACK
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
              MASTERING THE <br />
              <span className="text-white" style={{ textShadow: '4px 4px 0px #000' }}>
                DIGITAL CRAFT
              </span>
            </h2>

            <p className="text-black text-xl font-medium leading-relaxed max-w-xl border-l-4 border-black pl-6">
              We leverage the most advanced design and development tools to deliver performance-driven
              experiences that set new industry standards.
            </p>

            <div className="flex gap-8 pt-6">
              <div className="text-center bg-white p-6 rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-black text-5xl font-black mb-2 tracking-tighter">99%</div>
                <div className="text-black text-xs font-bold uppercase tracking-widest">Satisfaction</div>
              </div>
              <div className="text-center bg-white p-6 rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-black text-5xl font-black mb-2 tracking-tighter">150+</div>
                <div className="text-black text-xs font-bold uppercase tracking-widest">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Skills List */}
          <div className="grid gap-8">
            {Object.entries(groupedSkills).map(([category, skillList], categoryIdx) => (
              <motion.div
                key={category}
                className="bg-white p-8 rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIdx * 0.1 }}
              >
                <h3 className="text-black text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className={`w-4 h-4 rounded-full border-2 border-black ${categoryIdx === 0 ? 'bg-secondary' : categoryIdx === 1 ? 'bg-accent' : 'bg-primary'}`} />
                  {category}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rotate-45" />
                      <span className="text-base font-bold text-black">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;