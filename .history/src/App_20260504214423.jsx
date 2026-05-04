import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight, CheckCircle2, Globe, Laptop, Palette, Play } from 'lucide-react';

const BidiiAcademy = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth) * 20 - 10,
      y: (clientY / innerHeight) * 20 - 10
    });
  };

  const fadeUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  };

  return (
    <div className="bg-white text-[#1A3A3A] selection:bg-[#D4FF5E]" onMouseMove={handleMouseMove}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-black tracking-tighter text-[#1E5F64]"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -10 }}
          >
            BIDII
          </motion.div>
          <div className="hidden md:flex gap-12 font-medium text-sm text-gray-600">
            <a href="#home" className="hover:text-[#1E5F64] transition-colors duration-300">Home</a>
            <a href="#about" className="hover:text-[#1E5F64] transition-colors duration-300">About</a>
            <a href="#programs" className="hover:text-[#1E5F64] transition-colors duration-300">Programs</a>
            <a href="#contact" className="hover:text-[#1E5F64] transition-colors duration-300">Contact</a>
          </div>
          <motion.button 
            className="bg-[#1E5F64] text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-32 pb-20 px-6 flex items-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF5E]/10 via-transparent to-[#1E5F64]/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div 
              variants={fadeUp}
              className="inline-block"
            >
              <div className="bg-[#D4FF5E] text-[#1E5F64] px-6 py-2 rounded-full text-xs font-bold tracking-widest inline-block">
                ✨ EST. 2024 • PREMIUM EDUCATION
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeUp}
              className="text-7xl md:text-8xl font-black leading-[0.95] tracking-tighter"
            >
              <span className="text-[#1E5F64]">Bright Minds,</span>
              <br />
              <span className="bg-gradient-to-r from-[#1E5F64] to-teal-400 bg-clip-text text-transparent">Bold Futures.</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-xl text-gray-600 leading-relaxed max-w-lg font-medium"
            >
              A boutique learning center designed to nurture the innovators, artists, and leaders of tomorrow. 
            </motion.p>

            <motion.div 
              variants={fadeUp}
              className="flex items-center gap-6 pt-4"
            >
              <motion.button 
                className="bg-[#1E5F64] text-white px-10 py-5 rounded-full flex items-center gap-3 font-semibold hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, gap: 20 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Programs <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="w-16 h-16 rounded-full bg-[#D4FF5E] text-[#1E5F64] flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} fill="currentColor" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 80, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
            }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#D4FF5E] to-teal-400 rounded-[50px] blur-2xl opacity-20" />
            <div className="aspect-[4/5] bg-gradient-to-br from-[#1E5F64] to-teal-600 rounded-[50px] overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1427504494963-86e0658107d1?w=600&h=750&fit=crop" 
                alt="Students Learning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E5F64]/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-[#1E5F64] text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { number: '500+', label: 'Students' },
            { number: '12', label: 'Programs' },
            { number: '95%', label: 'Success Rate' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-black text-[#D4FF5E]">{stat.number}</div>
              <div className="text-teal-200 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-white via-[#F8FCFD] to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <motion.h2 
              variants={fadeUp}
              className="text-sm font-black tracking-[0.3em] text-[#1E5F64] mb-6 uppercase"
            >
              Our Philosophy
            </motion.h2>
            <motion.h3 
              variants={fadeUp}
              className="text-5xl md:text-6xl font-black leading-[1.1] text-[#1E5F64] mb-10"
            >
              Every child is a natural scientist and philosopher.
            </motion.h3>
            <motion.div 
              variants={fadeUp}
              className="space-y-6"
            >
              {[
                { title: 'Holistic Development', desc: 'Nurturing mind, body, and social intelligence.' },
                { title: 'Certified Mentors', desc: 'Industry-leading educators and facilitators.' },
                { title: 'Modern Curriculum', desc: 'Blending traditional wisdom with innovation.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="flex gap-4 p-6 rounded-3xl border-2 border-[#D4FF5E]/30 hover:border-[#D4FF5E] hover:bg-[#D4FF5E]/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4FF5E] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={24} className="text-[#1E5F64]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1E5F64]">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="relative group"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-[#D4FF5E] to-teal-400 rounded-[50px] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop" 
              alt="Students collaborating"
              className="rounded-[50px] shadow-2xl relative z-10 object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-sm font-black tracking-[0.3em] text-[#1E5F64] mb-4 uppercase">Signature Programs</h2>
            <h3 className="text-6xl font-black text-[#1E5F64] leading-tight">
              Curated learning paths for modern growth.
            </h3>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                icon: Palette,
                title: 'Little Explorers',
                desc: 'Motor skills and emotional intelligence through tactile play and sensory arts.',
                image: 'https://images.unsplash.com/photo-1577720643272-265a322b5e76?w=500&h=600&fit=crop',
                color: 'from-pink-400 to-rose-600'
              },
              {
                icon: Laptop,
                title: 'Tech Ninjas',
                desc: 'Early exposure to logic, coding, and digital responsibility.',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=600&fit=crop',
                color: 'from-blue-400 to-cyan-600'
              },
              {
                icon: Globe,
                title: 'Global Citizens',
                desc: 'Public speaking and community project management for 10-15 year olds.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop',
                color: 'from-purple-400 to-indigo-600'
              }
            ].map((program, i) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -20 }}
                  className="group cursor-pointer"
                >
                  <div className="relative mb-8 overflow-hidden rounded-[40px] h-72">
                    <img 
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#D4FF5E] rounded-full group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-[#1E5F64]" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-[#1E5F64]">{program.title}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                    {program.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-[#1E5F64] to-teal-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 bg-[#D4FF5E] rounded-full blur-3xl -top-48 -right-48"
          />
        </div>
        <motion.div 
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-6xl font-black leading-tight mb-6">
            Ready to unlock potential?
          </h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto font-medium">
            Join Bidii Academy and give your child the edge they need to thrive in tomorrow's world.
          </p>
          <motion.button
            className="bg-[#D4FF5E] text-[#1E5F64] px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.button>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#F8FCFD] to-[#EAF4F5] rounded-[60px] p-10 lg:p-20 grid lg:grid-cols-2 gap-16">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-[#1E5F64] mb-6 leading-tight">
              Let's start the journey.
            </h2>
            <p className="text-lg text-teal-800 mb-12 font-medium">
              Book a tour, meet our facilitators, and discover how Bidii can transform your child's future.
            </p>
            <div className="space-y-8">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-[#1E5F64] font-bold cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#D4FF5E] rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>contact@bidii.edu</div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-[#1E5F64] font-bold cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#D4FF5E] rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div>+1 (555) 000-1234</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.form 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[40px] shadow-xl space-y-6"
          >
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E] placeholder-gray-400 transition-all"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E] placeholder-gray-400 transition-all"
            />
            <input 
              type="text" 
              placeholder="Child's Age" 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E] placeholder-gray-400 transition-all"
            />
            <textarea 
              placeholder="Tell us about your child" 
              rows="4" 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-[#D4FF5E] placeholder-gray-400 transition-all resize-none"
            ></textarea>
            <motion.button 
              className="w-full bg-[#1E5F64] text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#164a4e] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Application
            </motion.button>
          </motion.form>
        </div>
      </section>

      <footer className="py-16 border-t border-gray-100 bg-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4">Bidii Academy</p>
          <p className="text-xs text-gray-300">© 2024 Future Ready Education • Designed for tomorrow's leaders</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default BidiiAcademy;