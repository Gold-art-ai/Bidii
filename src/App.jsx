import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Globe, Laptop, Palette, Star, Check, X, Video } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

// ─── Protected Route Guard ────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('bidii_token');
  return token ? children : <Navigate to="/login" replace />;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-[#F8F7F4]/80 backdrop-blur-md border-b border-[#1A1A1A]/5' : 'py-8 bg-transparent'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-xl font-serif tracking-tight font-bold">BIDII.</a>
        <div className="hidden md:flex items-center gap-10">
          {['Experiences', 'Host', 'Package', 'Location', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] font-medium uppercase tracking-widest text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors">
              {item}
            </a>
          ))}
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/login'}
          className="bg-[#1A1A1A] text-[#F8F7F4] px-6 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-wider"
        >
          Student Portal
        </motion.button>
      </div>
    </motion.nav>
  );
};

const SectionHeading = ({ number, title, subtitle }) => (
  <div className="mb-16 md:mb-24">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="block text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A7A7A] mb-4"
    >
      {number} — {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-7xl font-serif leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#1A1A1A]/10 py-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-xl md:text-2xl font-serif">{question}</span>
        <div className="p-2 rounded-full border border-[#1A1A1A]/10 group-hover:bg-[#1A1A1A] group-hover:text-[#F8F7F4] transition-all">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-[#7A7A7A] leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A1A] font-sans selection:bg-[#D4FF5E] selection:text-[#1A1A1A] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#7A7A7A]">
              Premium Education — Est. 2026
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[120px] font-serif leading-[0.9] tracking-tight mb-12"
          >
            Bright Minds,<br />Bold Futures.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-xl mx-auto space-y-10"
          >
            <p className="text-lg md:text-xl text-[#7A7A7A] leading-relaxed font-medium">
              A boutique learning center designed to nurture the innovators, artists, and leaders of tomorrow through depth, craft, and mastery.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/login'}
              className="bg-[#1A1A1A] text-[#F8F7F4] px-10 py-5 rounded-full text-[13px] font-bold uppercase tracking-widest"
            >
              Apply for a Seat
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4FF5E]/10 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Intro Reveal */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-[#1A1A1A] text-[#F8F7F4]">
        <div className="max-w-5xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-serif leading-tight md:leading-snug"
          >
            This is a workshop for those who believe mastery is built slowly, intentionally, and by hand. For those who seek depth in an age of distractions. No crowds. No shortcuts. Just focus, mentorship, and the space to grow.
          </motion.p>
        </div>
      </section>

      {/* Programs (Sticky Scroll) */}
      <section id="experiences" className="py-32 md:py-64 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeading 
              number="001" 
              subtitle="The Experience" 
              title="Every moment designed for depth and craft." 
            />
            <p className="text-xl text-[#7A7A7A] leading-relaxed max-w-md font-medium">
              We move beyond measurements and timers. Learn to read the room, feel the progress, and work with confidence under real conditions.
            </p>
          </div>
          
          <div className="space-y-32">
            {[
                  {
                    id: '01',
                    title: 'Little Explorers',
                    desc: 'Motor skills and emotional intelligence through tactile play and sensory arts. Master the foundations of curiosity.',
                    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80', // kids sensory play
                    icon: Palette
                  },
                  {
                    id: '02',
                    title: 'Tech Ninjas',
                    desc: 'Early exposure to logic, coding, and digital responsibility. Move beyond consumption into creation.',
                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // coding/tech
                    icon: Laptop
                  },
                  {
                    id: '03',
                    title: 'Global Citizens',
                    desc: 'Public speaking and community project management. Developing the leaders of tomorrow, today.',
                    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', // teamwork/discussion
                    icon: Globe

              }
            ].map((program, i) => (
              <motion.div 
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl mb-8 relative">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-[#F8F7F4]/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                    <program.icon size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{program.title}</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="font-serif text-3xl text-[#1A1A1A]/20">{program.id}</span>
                  <div>
                    <h3 className="text-3xl font-serif mb-4">{program.title}</h3>
                    <p className="text-[#7A7A7A] leading-relaxed font-medium">
                      {program.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-32 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-4 h-[600px] md:h-[800px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[40px] overflow-hidden group"
            >
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000&q=80" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
            <div className="grid grid-rows-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[40px] overflow-hidden group"
              >
                <img src="https://images.unsplash.com/photo-1427504494963-86e0658107d1?w=1000&q=80" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[40px] overflow-hidden group"
              >
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&q=80" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Included List */}
      <section id="package" className="py-32 md:py-64 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            number="002" 
            subtitle="The Details" 
            title="What's Included in the Journey" 
          />
          <div className="space-y-px bg-[#1A1A1A]/10 border-y border-[#1A1A1A]/10">
            {[
              { title: 'Personal Guidance', desc: 'Direct access to facilitators throughout the experience.' },
              { title: 'Curated Materials', desc: 'All tools, resources, and learning materials are provided.' },
              { title: 'Modern Curriculum', desc: 'Blending traditional wisdom with innovative tech and arts.' },
              { title: 'Growth Tracking', desc: 'Detailed assessment and progress reports for each student.' },
              { title: 'Alumni Network', desc: 'Access to a community of innovators and leaders.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-white py-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <h4 className="text-2xl font-serif">{item.title}</h4>
                <p className="text-[#7A7A7A] max-w-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 md:py-64 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24">
            {[
              {
                quote: "The setting, the pace, the level of attention. It felt more like an apprenticeship than a class. Bidii reshaped my child's relationship with learning.",
                author: "Sofia Klein",
                role: "Parent & Designer"
              },
              {
                quote: "I came expecting simple lessons. We left with intuition and confidence. This is not for everyone, and that’s exactly why it’s powerful.",
                author: "Daniel Hart",
                role: "Tech Entrepreneur"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} className="fill-[#D4FF5E] text-[#D4FF5E]" />)}
                </div>
                <p className="text-3xl font-serif leading-relaxed mb-10 italic text-[#1A1A1A]/80">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-sm tracking-widest uppercase">{t.author}</p>
                  <p className="text-[#7A7A7A] text-xs uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 md:py-64 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            number="003" 
            subtitle="Common Questions" 
            title="Frequently Asked Questions" 
          />
          <div className="mt-12">
            {[
              { q: "Who is this for?", a: "Designed for children aged 5-15 who are curious, creative, and ready to move beyond traditional learning boundaries." },
              { q: "How many people attend each edition?", a: "We maintain an intentional 6:1 student-to-mentor ratio to ensure depth of interaction." },
              { q: "What is the application process?", a: "We review every application to ensure alignment with our philosophy. Success is about curiosity, not just grades." },
              { q: "Is the curriculum certified?", a: "Yes, our facilitators are certified industry professionals and educators with over 15 years of experience." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA / Application */}
      <section id="host" className="py-32 md:py-64 px-6 md:px-12 bg-[#1A1A1A] text-[#F8F7F4]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24">
          <div>
            <SectionHeading 
              number="004" 
              subtitle="The Application" 
              title="Ready to unlock potential?" 
            />
            <p className="text-xl text-[#F8F7F4]/60 leading-relaxed mb-12">
              Participation is limited and intentionally curated. We review every application to ensure alignment, commitment, and a focused group environment.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                <div className="w-10 h-10 rounded-full border border-[#F8F7F4]/20 flex items-center justify-center">
                  <Check size={16} />
                </div>
                Personal Response within 48 Hours
              </div>
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                <div className="w-10 h-10 rounded-full border border-[#F8F7F4]/20 flex items-center justify-center">
                  <Check size={16} />
                </div>
                Private Orientation Tour
              </div>
            </div>
          </div>
          
          <motion.form 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4]/40">Full Name</label>
                <input type="text" className="w-full bg-transparent border-b border-[#F8F7F4]/20 py-4 outline-none focus:border-[#D4FF5E] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4]/40">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-[#F8F7F4]/20 py-4 outline-none focus:border-[#D4FF5E] transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4]/40">Current Skill Level / Age</label>
              <input type="text" className="w-full bg-transparent border-b border-[#F8F7F4]/20 py-4 outline-none focus:border-[#D4FF5E] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4]/40">Tell us about your child</label>
              <textarea rows="4" className="w-full bg-transparent border-b border-[#F8F7F4]/20 py-4 outline-none focus:border-[#D4FF5E] transition-colors resize-none" />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#D4FF5E] text-[#1A1A1A] py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[12px]"
            >
              Submit Application
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-[#1A1A1A]/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
          <div className="max-w-xs">
            <h3 className="text-2xl font-serif mb-6">BIDII</h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">
              Curated learning experiences for the next generation of global citizens and innovators.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-6">Navigation</h5>
              <div className="space-y-4 flex flex-col">
                {['Experiences', 'Host', 'Package', 'Location', 'FAQ'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-6">Social</h5>
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center gap-2 text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"><Globe size={14} /> Instagram</a>
                <a href="#" className="flex items-center gap-2 text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"><X size={14} /> X / Twitter</a>
                <a href="#" className="flex items-center gap-2 text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"><Video size={14} /> Youtube</a>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-6">Legal</h5>
              <div className="space-y-4 flex flex-col">
                <a href="#" className="text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-[#1A1A1A]/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A7A7A]">
          <span>© 2026 Bidii Academy</span>
          <span>Made by Goldy</span>
        </div>
      </footer>
    </div>
  );
};

// ─── Root App with Router ────────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Catch-all → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;