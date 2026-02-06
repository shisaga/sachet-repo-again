import React, { useState } from 'react';
import { Send, ArrowUpRight } from 'lucide-react';
import { artistInfo } from '../mock';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
    toast.success('MESSAGE SENT!', {
      description: "We'll get back to you shortly.",
      className: "border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-40 bg-white overflow-hidden px-6 border-t-4 border-black">
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Info */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-secondary border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-[0.5em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              GET IN TOUCH
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
              READY TO <br />
              <span className="text-primary" style={{ textShadow: '4px 4px 0px #000' }}>
                LEVEL UP?
              </span>
            </h2>

            <div className="space-y-10">
              <p className="text-gray-700 text-xl font-medium leading-relaxed max-w-sm">
                Drop us a line for collaborations, inquiries, or just to talk design.
              </p>

              <div className="space-y-6">
                <a
                  href={`mailto:${artistInfo.email}`}
                  className="group flex flex-col gap-2"
                >
                  <span className="text-black text-xs font-black uppercase tracking-widest">EMAIL DIRECT</span>
                  <span className="text-black text-3xl font-bold flex items-center gap-4 group-hover:text-primary transition-colors underline decoration-4 decoration-primary underline-offset-4">
                    {artistInfo.email} <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
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
                    className="text-black text-sm font-black uppercase tracking-widest border-2 border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8 p-10 rounded-[2.5rem] bg-gray-50 border-3 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-2">
                <label className="text-black text-xs font-black uppercase tracking-[0.2em] ml-2">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="WHAT'S YOUR NAME?"
                  className="neo-input text-black placeholder:text-gray-400 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-black text-xs font-black uppercase tracking-[0.2em] ml-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="YOUR@EMAIL.COM"
                  className="neo-input text-black placeholder:text-gray-400 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-black text-xs font-black uppercase tracking-[0.2em] ml-2">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="TELL US EVERYTHING..."
                  className="neo-input text-black placeholder:text-gray-400 font-bold resize-none"
                />
              </div>

              <button
                type="submit"
                className="neo-button w-full flex items-center justify-center gap-4 text-lg"
              >
                SEND IT
                <Send size={20} strokeWidth={3} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;