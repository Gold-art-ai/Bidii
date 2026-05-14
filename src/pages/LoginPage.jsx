import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, User, Mail, Lock, AlertCircle } from 'lucide-react';
import apiClient from '../api/apiClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const { data } = await apiClient.post(endpoint, payload);

      localStorage.setItem('bidii_token', data.token);
      localStorage.setItem('bidii_user', JSON.stringify({
        name: data.name,
        email: data.email,
        studentId: data.studentId,
      }));

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4FF5E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4FF5E]/3 rounded-full blur-[100px]" />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Back to home */}
      <a
        href="/"
        className="absolute top-8 left-8 text-[#F8F7F4]/40 hover:text-[#D4FF5E] transition-colors text-[12px] font-bold uppercase tracking-widest flex items-center gap-2"
      >
        ← BIDII.
      </a>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-10">
          
          {/* Header */}
          <div className="mb-10">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4FF5E] mb-3 block">
                Bidii Academy
              </span>
              <h1 className="text-3xl font-serif text-[#F8F7F4] leading-tight">
                {mode === 'login' ? 'Welcome back.' : 'Join the academy.'}
              </h1>
              <p className="text-[#7A7A7A] text-sm mt-2">
                {mode === 'login'
                  ? 'Sign in to manage your college applications.'
                  : 'Create your account to get started.'}
              </p>
            </motion.div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative mb-5">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A]" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-11 pr-4 text-[#F8F7F4] placeholder-[#4A4A4A] text-sm outline-none focus:border-[#D4FF5E]/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A]" />
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-11 pr-4 text-[#F8F7F4] placeholder-[#4A4A4A] text-sm outline-none focus:border-[#D4FF5E]/50 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-11 pr-12 text-[#F8F7F4] placeholder-[#4A4A4A] text-sm outline-none focus:border-[#D4FF5E]/50 focus:bg-white/8 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#F8F7F4] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Submit */}
            <motion.button
              id="submit-auth"
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-[#D4FF5E] text-[#1A1A1A] py-4 rounded-xl font-bold uppercase tracking-[0.15em] text-[12px] flex items-center justify-center gap-3 disabled:opacity-60 transition-opacity mt-2"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </form>

          {/* Switch mode */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[#7A7A7A] text-sm">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                id="switch-auth-mode"
                onClick={switchMode}
                className="text-[#D4FF5E] font-semibold hover:underline"
              >
                {mode === 'login' ? 'Register' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[#4A4A4A] text-[11px] mt-6 uppercase tracking-widest">
          © 2026 Bidii Academy
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
