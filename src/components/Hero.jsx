import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { artistInfo } from '../mock';

const Hero = () => {
  const nameParts = artistInfo.name.split(' ');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { y: 100, rotateX: 30, opacity: 0 },
    show: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      }
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6">

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div
          className="space-y-2 md:space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-accent"></div>
            <span className="text-white text-sm md:text-base uppercase tracking-[0.5em] font-black glow-text">
              {artistInfo.tagline.toUpperCase()}
            </span>
          </motion.div>

          {/* Name - Part 1 */}
          <div className="overflow-hidden perspective-1000">
            <motion.h1
              variants={item}
              className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter"
            >
              {nameParts[0].toUpperCase()}
            </motion.h1>
          </div>

          {/* Name - Part 2 */}
          <div className="overflow-hidden perspective-1000">
            <motion.h1
              variants={item}
              className="text-7xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent leading-[0.85] tracking-tighter italic"
            >
              {nameParts[1]?.toUpperCase() || 'DESIGN'}
            </motion.h1>
          </div>

          {/* Role Description */}
          <motion.p
            variants={item}
            className="text-gray-400 text-lg md:text-2xl font-medium max-w-2xl mt-8 leading-relaxed"
          >
            We craft <span className="text-white font-bold">digital experiences</span> that defy expectations.
            Merging art, code, and psychology for the next generation of the web.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="pt-12">
            <button
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-black text-lg uppercase tracking-widest hover:bg-accent transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={32} className="text-gray-500" />
      </motion.div>
    </section>
  );
};

export default Hero;