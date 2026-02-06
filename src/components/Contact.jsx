import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, ArrowUpRight } from 'lucide-react';
import { artistInfo } from '../mock';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('MESSAGE TRANSMITTED', {
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-40 bg-black overflow-hidden px-6">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Info */}
          <div className="space-y-12">
            <div className="contact-reveal flex items-center gap-4">
              <div className="h-px w-12 bg-accent"></div>
              <span className="text-white text-xs uppercase tracking-[0.5em] font-black">
                GET IN TOUCH
              </span>
            </div>

            <h2 className="contact-reveal text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              READY TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                LEVEL UP?
              </span>
            </h2>

            <div className="contact-reveal space-y-10">
              <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-sm">
                Drop us a line for collaborations, inquiries, or just to talk design.
              </p>

              <div className="space-y-6">
                <a
                  href={`mailto:${artistInfo.email}`}
                  className="group flex flex-col gap-2"
                >
                  <span className="text-gray-500 text-xs font-black uppercase tracking-widest">EMAIL DIRECT</span>
                  <span className="text-white text-3xl font-bold flex items-center gap-4 group-hover:text-accent transition-colors">
                    {artistInfo.email} <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap gap-6 pt-6">
                {Object.entries(artistInfo.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm font-black uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-reveal">
            <form onSubmit={handleSubmit} className="space-y-8 p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <div className="space-y-2">
                <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] ml-2">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="WHAT'S YOUR NAME?"
                  className="w-full bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] ml-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="WHICH EMAIL SHOULD WE REPLY TO?"
                  className="w-full bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] ml-2">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="TELL US ABOUT YOUR VISION..."
                  className="w-full bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl focus:outline-none focus:border-accent transition-all duration-300 resize-none placeholder:text-gray-700"
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-all duration-500 flex items-center justify-center gap-4 text-lg"
              >
                SEND TRANSMISSION
                <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;