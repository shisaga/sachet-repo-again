import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { artistInfo } from '../mock';
import { ArrowRight } from 'lucide-react';

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
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerAnimations = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
  };

  const itemAnimations = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      {/* Background Layer: Blob Scatter */}
      <div
        className="absolute inset-0 z-0 bg-repeat opacity-60"
        style={{
          backgroundImage: 'url("/images/blob-scatter-haikei.png")',
          backgroundSize: '800px',
        }}
      />

      {/* Cartoon Assets */}
      {/* Moon - Top Right */}
      <motion.img
        src="/images/moon.png"
        alt="Moon"
        className="absolute top-10 right-10 w-24 md:w-32 z-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ x: springX, y: springY }}
      />

      {/* Aeroplane - Flying Across */}
      <motion.img
        src="/images/aeroplane-icon.png"
        alt="Plane"
        className="absolute top-1/4 left-0 w-16 md:w-24 z-10"
        animate={{
          x: ['-20vw', '120vw'],
          y: [0, -50, 0, 50, 0],
          rotate: [0, -10, 0, 10, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />

      {/* Space Man - Floating (Top Left) */}
      <motion.img
        src="/images/spacemanreadingmap-in-space-space.png"
        alt="Space Man"
        className="absolute top-20 left-10 md:left-20 w-32 md:w-48 z-20 pointer-events-none"
        animate={{
          y: [-20, 20, -20],
          rotate: [-5, 5, -5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Cartoon Girl - Standing (Right/Middle) */}
      <motion.img
        src="/images/cartoongirl.png"
        alt="Girl"
        className="absolute bottom-0 right-4 md:right-20 w-32 md:w-56 z-20 pointer-events-none"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      />

      {/* Lincoln - Peeking from Bottom Left */}
      <motion.img
        src="/images/lincoln.png"
        alt="Lincoln"
        className="absolute -bottom-4 left-4 md:left-10 w-40 md:w-72 z-20 pointer-events-none"
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 50 }}
        whileHover={{ y: 20, rotate: -5 }}
      />

      {/* Grass - Bottom Border (Closer/Tighter) */}
      <div
        className="absolute bottom-0 left-0 w-full h-12 md:h-20 z-10 -translate-x-10 translate-y-[32px]"

        style={{
          backgroundImage: 'url("/images/grasss.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: '128px auto', // Tighter spacing
          backgroundPosition: 'bottom'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-12 md:h-20 z-10 translate-y-[32px] opacity-70"
        style={{
          backgroundImage: 'url("/images/grasss.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: '128px auto',
          backgroundPosition: 'bottom',
        }}
      />

      <div className="absolute inset-0 z-0" style={{ scale, x: springX, y: springY }} />

      {/* Content Layer */}
      <div className="relative z-30 max-w-[1400px] mx-auto w-full px-6 text-center md:text-left">
        <motion.div
          className="space-y-6"
          variants={containerAnimations}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={itemAnimations} className="inline-flex items-center gap-3 border-2 border-black px-4 py-1 rounded-full bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="w-3 h-3 bg-accent rounded-full border border-black animate-pulse" />
            <span className="text-black text-xs font-black uppercase tracking-widest">
              {artistInfo.tagline}
            </span>
          </motion.div>

          {/* Name */}
          <div className="relative">
            <motion.h1
              variants={itemAnimations}
              className="text-8xl md:text-[12rem] font-black text-black leading-[0.8] tracking-tighter"
            >
              {nameParts[0].toUpperCase()}
            </motion.h1>
            <motion.h1
              variants={itemAnimations}
              className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent leading-[0.8] tracking-tighter italic stroke-black text-stroke-2"
              style={{ WebkitTextStroke: '3px black' }}
            >
              {nameParts[1]?.toUpperCase()}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.div variants={itemAnimations} className="max-w-xl bg-white border-2 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-30 relative group hover:-translate-y-1 transition-transform">
            <p className="text-black text-xl font-medium leading-relaxed">
              We craft <span className="bg-primary px-1 border border-black">digital universes</span> that defy expectations.
              Merging art, code, and psychology.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemAnimations} className="pt-8">
            <button
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="neo-button text-xl flex items-center gap-3 mx-auto md:mx-0 bg-accent text-white"
            >
              Dive In <ArrowRight size={24} strokeWidth={3} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;