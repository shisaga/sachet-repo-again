import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { artistInfo } from '../mock';
import { toast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(16,185,129,0.1) 1px, rgba(16,185,129,0.1) 80px),
              repeating-linear-gradient(-90deg, transparent, transparent 1px, rgba(16,185,129,0.1) 1px, rgba(16,185,129,0.1) 80px)
            `,
          }}
        />
      </div>

      {/* Green accent glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9333EA] rounded-full filter blur-[200px] opacity-10" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#9333EA]"></div>
            <span className="text-[#9333EA] text-sm uppercase tracking-[0.3em] font-semibold">
              Let's Connect
            </span>
            <div className="h-px w-16 bg-[#9333EA]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Start a
            <span className="text-[#9333EA]"> Project</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </div>

        {/* Contact content */}
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <Mail size={28} className="text-[#9333EA]" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-lg font-bold mb-1">Email</h3>
                  <a
                    href={`mailto:${artistInfo.email}`}
                    className="text-gray-600 hover:text-[#9333EA] transition-colors duration-300"
                  >
                    {artistInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-gray-900 text-lg font-bold mb-6">Connect</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={artistInfo.social.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-center uppercase text-sm tracking-wider font-medium hover:bg-[#9333EA] hover:text-white transition-all duration-300"
                >
                  Behance
                </a>
                <a
                  href={artistInfo.social.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-center uppercase text-sm tracking-wider font-medium hover:bg-[#9333EA] hover:text-white transition-all duration-300"
                >
                  Dribbble
                </a>
                <a
                  href={artistInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-center uppercase text-sm tracking-wider font-medium hover:bg-[#9333EA] hover:text-white transition-all duration-300"
                >
                  Instagram
                </a>
                <a
                  href={artistInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-center uppercase text-sm tracking-wider font-medium hover:bg-[#9333EA] hover:text-white transition-all duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-gray-900 text-sm uppercase tracking-wider font-semibold mb-2 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-lg focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/20 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-gray-900 text-sm uppercase tracking-wider font-semibold mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-lg focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/20 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-gray-900 text-sm uppercase tracking-wider font-semibold mb-2 block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-lg focus:outline-none focus:border-[#9333EA] focus:ring-2 focus:ring-[#9333EA]/20 transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="group w-full bg-[#9333EA] text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-gray-900 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              Send Message
              <Send
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;