import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { artistInfo } from '../mock';

const SLICE_COUNT = 8;
const BG_IMAGE_URL = "https://framerusercontent.com/images/4BgyhzbOFmHs19ZZC9eumMLXkxI.webp";

// Slice Background Component
const SliceRevealBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: SLICE_COUNT }).map((_, i) => {
        const sliceWidth = 100 / SLICE_COUNT;
        return (
          <motion.div
            key={i}
            className="absolute inset-y-0 overflow-hidden"
            style={{
              left: `${sliceWidth * i}%`,
              width: `${sliceWidth}%`,
            }}
            variants={{
              hidden: {
                scaleX: 0,
                filter: "blur(12px)",
                opacity: 0,
              },
              visible: {
                scaleX: 1,
                filter: "blur(0px)",
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 * i,
                },
              },
            }}
            transformOrigin="left"
          >
            <div
              className="absolute inset-0 h-full w-[800%] max-w-none"
              style={{
                left: `${-100 * i}%`,
                backgroundImage: `url(${BG_IMAGE_URL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const Hero = () => {
  const nameParts = artistInfo.name.split(' ');
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x * 20); // Move 20px max
      mouseY.set(y * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerAnimations = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2, // Wait for bg reveal
      }
    }
  };

  const itemAnimations = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      }
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale, x: springX, y: springY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black z-0 opacity-50" />
        <SliceRevealBackground />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </motion.div>

      {/* Floating Orbs (from user request) */}
      <motion.div
        className="absolute top-24 left-24 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl z-10 pointer-events-none"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-tl from-pink-500/10 to-blue-600/10 rounded-full blur-3xl z-10 pointer-events-none"
        animate={{ y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Layer */}
      <div className="relative z-20 max-w-[1400px] mx-auto w-full px-6">
        <motion.div
          className="space-y-4 md:space-y-6"
          variants={containerAnimations}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={itemAnimations} className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-cyan-400 box-shadow-glow"></div>
            <span className="text-cyan-400 text-sm md:text-base uppercase tracking-[0.4em] font-black glow-text">
              {artistInfo.tagline.toUpperCase()}
            </span>
          </motion.div>

          {/* Name - Part 1 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={itemAnimations}
              className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter"
            >
              {nameParts[0].toUpperCase()}
            </motion.h1>
          </div>

          {/* Name - Part 2 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={itemAnimations}
              className="text-7xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 leading-[0.85] tracking-tighter italic"
            >
              {nameParts[1]?.toUpperCase()}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            variants={itemAnimations}
            className="text-gray-300 text-lg md:text-2xl font-medium max-w-2xl mt-8 leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/5"
          >
            We craft <span className="text-white font-bold">digital universes</span> that defy expectations.
            Architecting emotions with code and motion.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemAnimations} className="pt-10">
            <button
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-black text-lg uppercase tracking-widest overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-500"
            >
              <span className="relative z-10">Dive In</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-3 bg-white rounded-full"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;