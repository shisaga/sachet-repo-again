import React from 'react';
import { Sparkles, Layers, Palette, ArrowRight } from 'lucide-react';
import { artistInfo } from '../mock';
import { motion } from 'framer-motion';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "backOut" } }
  };

  const highlights = [
    {
      icon: Palette,
      title: 'Visual Identity',
      description: 'Creating high-fidelity visuals that scream brand authority.',
      color: 'bg-primary'
    },
    {
      icon: Sparkles,
      title: 'UX Strategy',
      description: 'Data-driven flows designed to keep users hooked.',
      color: 'bg-secondary'
    },
    {
      icon: Layers,
      title: 'Interactive Dev',
      description: 'Bridging the gap between design and motion physics.',
      color: 'bg-accent'
    }
  ];

  return (
    <section id="about" className="relative py-40 bg-white overflow-hidden border-t-4 border-black">
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
            <motion.div variants={item} className="inline-block bg-black text-white px-4 py-1 text-xs uppercase tracking-[0.5em] font-black transform -rotate-1 rounded-sm">
              The Vision
            </motion.div>

            <motion.h2 variants={item} className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
              BEYOND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary italic" style={{ WebkitTextStroke: '2px black' }}>
                INTERFACE
              </span>
            </motion.h2>

            <motion.div variants={item} className="space-y-6">
              <p className="text-black text-xl font-medium leading-relaxed max-w-xl border-l-4 border-primary pl-6">
                {artistInfo.bio}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                We don't just build apps; we architect digital emotions. Our process is rooted in
                <span className="bg-primary px-1 font-bold border border-black mx-1">GenZ psychology</span>
                and cutting-edge interactive technology.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <button className="neo-button flex items-center gap-3">
                Read Philosophy <ArrowRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Cards */}
          <motion.div
            className="grid gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.8, type: 'spring' } }
                  }}
                  className="neo-card p-8 hover:-translate-y-2 transition-transform duration-300 relative group"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full ${item.color} border-r-2 border-black`} />

                  <div className="flex items-start gap-6 pl-4">
                    <div className="bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-0.5 transition-all">
                      <Icon size={32} className="text-black" strokeWidth={2.5} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-black text-2xl font-black tracking-tight uppercase">{item.title}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed">{item.description}</p>
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