import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, Globe, Laptop, Palette } from 'lucide-react';

const BidiiAcademy = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-[#F8FCFD] text-[#1A3A3A] selection:bg-[#D4FF5E]">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-teal-100/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-[#1E5F64]">BIDII.</div>
          <div className="hidden md:flex gap-10 font-bold text-[11px] uppercase tracking-[0.2em] text-gray-500">
            <a href="#home" className="hover:text-[#1E5F64] transition">Home</a>
            <a href="#about" className="hover:text-[#1E5F64] transition">About</a>
            <a href="#services" className="hover:text-[#1E5F64] transition">Programs</a>
            <a href="#contact" className="hover:text-[#1E5F64] transition"> Contact</a>
          </div>
          <button className="bg-[#1E5F64] text-white px-7 py-2.5 rounded-full text-xs font-bold hover:shadow-xl transition-all active:scale-95">
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="initial" animate="whileInView" variants={{animate: {transition: {staggerChildren: 0.1}}}}>
            <motion.div variants={fadeUp} className="inline-block bg-[#D4FF5E] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-6">
              EST. 2024 • PREMIUM EDUCATION
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter text-[#1E5F64]">
              Bright Minds, <br /> <span className="text-teal-400">Bold Futures.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-xl text-gray-500 leading-relaxed max-w-md font-medium">
              A boutique learning center designed to nurture the innovators, artists, and leaders of tomorrow.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
              <button className="bg-[#1E5F64] text-white px-8 py-5 rounded-2xl flex items-center gap-3 font-bold hover:gap-5 transition-all shadow-2xl shadow-teal-900/20">
                Explore Programs <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-[#1E5F64] rounded-[60px] overflow-hidden relative shadow-2xl">
              <img 
                src="" 
                alt="Main Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E5F64]/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#1E5F64] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeUp} initial="initial" whileInView="whileInView">
            <h2 className="text-sm font-black tracking-[0.3em] text-[#D4FF5E] mb-6 uppercase">Our Core Mission</h2>
            <p className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              We believe every child is a natural scientist and philosopher.
            </p>
            <div className="space-y-6">
              {[
                { t: 'Holistic Development', d: 'Focusing on mind, body, and social skills.' },
                { t: 'Certified Mentorship', d: 'Learning from industry-leading educators.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <CheckCircle2 className="text-[#D4FF5E] shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">{item.t}</h4>
                    <p className="text-teal-200/60 text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative group">
             <img 
                src="http://googleusercontent.com/image_collection/image_retrieval/461678955651244984_0" 
                alt="About Image"
                className="rounded-[40px] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="text-center mb-20">
            <h2 className="text-5xl font-black text-[#1E5F64] tracking-tight">Signature Programs</h2>
            <p className="text-gray-400 mt-4 font-medium">Curated learning paths for modern growth.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Program 1 */}
            <motion.div whileHover={{ y: -20 }} className="group">
              <div className="h-64 rounded-[40px] overflow-hidden mb-8 bg-gray-100">
                <img src="http://googleusercontent.com/image_collection/image_retrieval/17110652161094006487_0" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-4 text-[#1E5F64]">
                <Palette size={20} /> <span className="font-black text-xs uppercase tracking-widest">Creative Arts</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Little Explorers</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Developing motor skills and emotional intelligence through tactile play and sensory arts.</p>
            </motion.div>

            {/* Program 2 */}
            <motion.div whileHover={{ y: -20 }} className="group">
              <div className="h-64 rounded-[40px] overflow-hidden mb-8 bg-gray-100">
                <img src="http://googleusercontent.com/image_collection/image_retrieval/6989626878386180865_0" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-4 text-[#1E5F64]">
                <Laptop size={20} /> <span className="font-black text-xs uppercase tracking-widest">Technology</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Tech Ninjas</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Early exposure to logic, coding fundamentals, and digital responsibility in a safe space.</p>
            </motion.div>

            {/* Program 3 */}
            <motion.div whileHover={{ y: -20 }} className="group">
              <div className="h-64 rounded-[40px] overflow-hidden mb-8 bg-gray-100">
                <img src="http://googleusercontent.com/image_collection/image_retrieval/461678955651244984_2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-4 text-[#1E5F64]">
                <Globe size={20} /> <span className="font-black text-xs uppercase tracking-widest">Leadership</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Global Citizens</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Public speaking and community project management for kids aged 10-15.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#EAF4F5] rounded-[60px] p-10 lg:p-20 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-black text-[#1E5F64] mb-6">Let's start the <br /> journey.</h2>
            <p className="text-lg text-teal-800/60 mb-10 font-medium">Book a tour of our campus and meet our facilitators.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#1E5F64] font-bold">
                <Mail className="opacity-40" /> contact@bidii.edu
              </div>
              <div className="flex items-center gap-4 text-[#1E5F64] font-bold">
                <Phone className="opacity-40" /> +1 (555) 000-1234
              </div>
            </div>
          </div>
          <form className="bg-white p-10 rounded-[40px] shadow-xl space-y-4">
            <input type="text" placeholder="Parent Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E]" />
            <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E]" />
            <textarea placeholder="Tell us about your child" rows="4" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E]"></textarea>
            <button className="w-full bg-[#1E5F64] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#164a4e] transition-all">Submit Application</button>
          </form>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-xs font-black tracking-widest text-gray-300 uppercase">Lumina Academy © 2024 — Future Ready Education</p>
      </footer>
    </div>
  );
};

export default LuminaAcademy;