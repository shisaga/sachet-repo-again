import React from 'react';
import { Sparkles, Layers, Palette, ArrowRight } from 'lucide-react';
import { artistInfo } from '../mock';
import { motion } from 'framer-motion';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const highlights = [
    {
      icon: Palette,
      title: 'Visual Identity',
      description: 'Creating high-fidelity visuals that scream brand authority.',
      color: 'from-purple-500 to-blue-500'
    },
    {
      icon: Sparkles,
      title: 'UX Strategy',
      description: 'Data-driven flows designed to keep users hooked.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Layers,
      title: 'Interactive Dev',
      description: 'Bridging the gap between design and motion physics.',
      color: 'from-accent to-purple-500'
    }
  ];

  return (
    <section id="about" className="relative py-40 bg-black overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item} className="flex items-center gap-4">
              <div className="h-px w-12 bg-accent"></div>
              <span className="text-white text-xs uppercase tracking-[0.5em] font-black">
                The Vision
              </span>
            </motion.div>

            <motion.h2 variants={item} className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
              BEYOND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-primary italic">
                INTERFACE
              </span>
            </motion.h2>

            <motion.div variants={item} className="space-y-8">
              <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-xl">
                {artistInfo.bio}
              </p>
              <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                We don't just build apps; we architect digital emotions. Our process is rooted in
                <span className="text-white"> GenZ psychology</span> and cutting-edge interactive technology.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <button className="group flex items-center gap-3 text-white font-bold uppercase tracking-widest hover:text-accent transition-colors">
                View Our Philosophy <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Glass Cards */}
          <motion.div
            className="grid gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              show: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="glass-card group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />

                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-white/5 p-4 rounded-2xl border border-white/10 text-accent">
                        <Icon size={32} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white text-2xl font-black tracking-tight">{item.title}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;