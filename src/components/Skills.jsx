import React, { useEffect, useRef } from 'react';
import { skills } from '../mock';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.skill-bar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.5,
        stagger: 0.05,
        ease: 'power4.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-40 bg-black overflow-hidden px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left: Content */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-white text-xs uppercase tracking-[0.5em] font-black">
                CORE STACK
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              MASTERING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                DIGITAL CRAFT
              </span>
            </h2>

            <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-xl">
              We leverage the most advanced design and development tools to deliver performance-driven
              experiences that set new industry standards.
            </p>

            <div className="flex gap-8 pt-6">
              <div className="text-center">
                <div className="text-white text-5xl font-black mb-2 tracking-tighter">99%</div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-white text-5xl font-black mb-2 tracking-tighter">150+</div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Right: Skills List */}
          <div className="grid gap-12">
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} className="skill-category space-y-6">
                <h3 className="text-white text-sm font-black uppercase tracking-[0.3em] flex items-center justify-between">
                  {category}
                  <span className="h-px flex-1 bg-white/10 ml-6" />
                </h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {skillList.map((skill, idx) => (
                    <div key={idx} className="space-y-3 group">
                      <div className="flex justify-between items-center text-gray-400 group-hover:text-white transition-colors duration-300">
                        <span className="text-lg font-bold tracking-tight">{skill}</span>
                        <span className="text-xs font-bold">STABLE</span>
                      </div>
                      <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                        <div className="skill-bar h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full" style={{ width: `${80 + Math.random() * 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;