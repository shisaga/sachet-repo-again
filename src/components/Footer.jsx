import React from 'react';
import { artistInfo } from '../mock';

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-gray-200 py-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div className="text-xl font-bold tracking-tight">
            <span className="text-gray-900">ALEX</span>
            <span className="text-[#9333EA]">RIVERA</span>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {artistInfo.name}. All rights reserved.
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href={artistInfo.social.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#9333EA] transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
            >
              Behance
            </a>
            <a
              href={artistInfo.social.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#9333EA] transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
            >
              Dribbble
            </a>
            <a
              href={artistInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#9333EA] transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;