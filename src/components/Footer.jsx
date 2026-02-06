import React from 'react';
import { artistInfo } from '../mock';

const Footer = () => {
  const nameParts = artistInfo.name.split(' ');

  return (
    <footer className="relative bg-black border-t border-white/5 py-24 px-6 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black tracking-tighter flex items-center gap-1">
              <span className="text-white">{nameParts[0].toUpperCase()}</span>
              <span className="text-secondary">{nameParts[1]?.toUpperCase() || ''}</span>
            </div>
          </div>

          {/* Marquee or Large Text */}
          <div className="hidden lg:block flex-1 mx-20 overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block">
              <span className="text-white/5 text-8xl font-black uppercase tracking-tighter">
                UX RESEARCH • VISUAL DESIGN • INTERACTIVE DEV • UX RESEARCH • VISUAL DESIGN • INTERACTIVE DEV
              </span>
            </div>
          </div>

          {/* Copyright & Social */}
          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
            <div className="flex items-center gap-6">
              {Object.entries(artistInfo.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em]"
                >
                  {platform}
                </a>
              ))}
            </div>

            <div className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} {artistInfo.name.toUpperCase()} / ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;