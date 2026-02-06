import React from 'react';
import { Linkedin, Github, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
              Sachet<span className="text-primary">.</span>Patel
            </h3>
            <p className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          <div className="flex gap-6">
            {[Github, Linkedin, Instagram, Twitter].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="bg-white text-black p-3 rounded-lg border-2 border-black hover:bg-primary transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-y-1"
              >
                <Icon size={20} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-12 overflow-hidden border-t border-white/20 pt-8">
          <div className="animate-marquee whitespace-nowrap flex gap-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-4xl font-black text-transparent hover:text-primary transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '1px white' }}>
                READY FOR THE NEXT LEVEL ?
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;