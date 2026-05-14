import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, LogOut, Trash2, Edit3, X, Check, AlertCircle,
  GraduationCap, BookOpen, Clock, ChevronDown
} from 'lucide-react';
import apiClient from '../api/apiClient';

// ─── Status badge colours ────────────────────────────────────────────────────
const STATUS_CONFIG = {
  PENDING:   { label: 'Pending',   color: 'bg-amber-400/15 text-amber-400   border-amber-400/20' },
  ACCEPTED:  { label: 'Accepted',  color: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20' },
  REJECTED:  { label: 'Rejected',  color: 'bg-red-400/15 text-red-400     border-red-400/20' },
  WITHDRAWN: { label: 'Withdrawn', color: 'bg-[#7A7A7A]/15 text-[#7A7A7A]  border-[#7A7A7A]/20' },
};

const STATUSES = ['PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'];

// ─── Empty state ─────────────────────────────────────────────────────────────
const EmptyState = ({ onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-32 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-[#D4FF5E]/10 flex items-center justify-center mb-6">
      <GraduationCap size={36} className="text-[#D4FF5E]" />
    </div>
    <h3 className="text-2xl font-serif text-[#F8F7F4] mb-3">No applications yet</h3>
    <p className="text-[#7A7A7A] mb-8 max-w-sm">
      Start building your future — apply to colleges and track every application in one place.
    </p>
    <motion.button
      id="empty-add-btn"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onAdd}
      className="bg-[#D4FF5E] text-[#1A1A1A] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[12px] flex items-center gap-2"
    >
      <Plus size={16} /> Apply Now
    </motion.button>
  </motion.div>
);

// ─── Application Modal (create / edit) ───────────────────────────────────────
const ApplicationModal = ({ application, onClose, onSave }) => {
  const isEditing = !!application?.id;
  const [form, setForm] = useState({
    collegeName: application?.collegeName || '',
    program: application?.program || '',
    status: application?.status || 'PENDING',
    notes: application?.notes || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSave(form, isEditing ? application.id : null);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#1A1A1A] border border-white/8 rounded-3xl p-8 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-serif text-[#F8F7F4]">
            {isEditing ? 'Edit Application' : 'New Application'}
          </h2>
          <button
            id="modal-close"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-[#7A7A7A] hover:text-[#F8F7F4] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* College Name */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A7A] block mb-2">
              College Name *
            </label>
            <input
              id="college-name"
              type="text"
              value={form.collegeName}
              onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
              placeholder="e.g. Harvard University"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-[#F8F7F4] placeholder-[#4A4A4A] text-sm outline-none focus:border-[#D4FF5E]/50 transition-all"
            />
          </div>

          {/* Program */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A7A] block mb-2">
              Program / Course *
            </label>
            <input
              id="program"
              type="text"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
              placeholder="e.g. Computer Science BSc"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-[#F8F7F4] placeholder-[#4A4A4A] text-sm outline-none focus:border-[#D4FF5E]/50 transition-all"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A7A] block mb-2">
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-[#F8F7F4] text-sm outline-none focus:border-[#D4FF5E]/50 transition-all cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-[#1A1A1A]">
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7A7A] pointer-events-none" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A7A] block mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Deadlines, requirements, personal notes..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-[#F8F7F4] placeholder-[#4A4A4A] text-sm outline-none focus:border-[#D4FF5E]/50 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              id="modal-cancel"
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/10 text-[#7A7A7A] hover:text-[#F8F7F4] hover:border-white/20 py-3.5 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <motion.button
              id="modal-save"
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#D4FF5E] text-[#1A1A1A] py-3.5 rounded-xl text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <><Check size={14} /> {isEditing ? 'Save Changes' : 'Submit'}</>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Application Card ─────────────────────────────────────────────────────────
const ApplicationCard = ({ app, onEdit, onDelete }) => {
  const { label, color } = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING;
  const date = new Date(app.appliedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[#F8F7F4] font-serif text-lg leading-tight truncate">
            {app.collegeName}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <BookOpen size={12} className="text-[#7A7A7A] shrink-0" />
            <span className="text-[#7A7A7A] text-sm truncate">{app.program}</span>
          </div>
        </div>
        <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${color}`}>
          {label}
        </span>
      </div>

      {app.notes && (
        <p className="text-[#5A5A5A] text-sm leading-relaxed mb-4 line-clamp-2">
          {app.notes}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[#5A5A5A] text-xs">
          <Clock size={11} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            id={`edit-${app.id}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(app)}
            className="p-2 rounded-lg bg-white/5 hover:bg-[#D4FF5E]/10 text-[#7A7A7A] hover:text-[#D4FF5E] transition-all"
          >
            <Edit3 size={14} />
          </motion.button>
          <motion.button
            id={`delete-${app.id}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(app.id)}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-400/10 text-[#7A7A7A] hover:text-red-400 transition-all"
          >
            <Trash2 size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const user = JSON.parse(localStorage.getItem('bidii_user') || '{}');

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('bidii_token')) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/api/applications');
      setApplications(data);
    } catch {
      // 401 handled by interceptor
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  // Save (create or update)
  const handleSave = async (form, id) => {
    if (id) {
      await apiClient.put(`/api/applications/${id}`, form);
    } else {
      await apiClient.post('/api/applications', form);
    }
    await fetchApplications();
  };

  // Delete
  const handleDelete = async (id) => {
    await apiClient.delete(`/api/applications/${id}`);
    setDeleteConfirm(null);
    await fetchApplications();
  };

  const handleLogout = () => {
    localStorage.removeItem('bidii_token');
    localStorage.removeItem('bidii_user');
    navigate('/login');
  };

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'PENDING').length,
    accepted: applications.filter(a => a.status === 'ACCEPTED').length,
    rejected: applications.filter(a => a.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F8F7F4]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4FF5E]/4 rounded-full blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-serif font-bold tracking-tight">BIDII.</a>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[#F8F7F4] text-sm font-semibold">{user.name}</p>
              <p className="text-[#7A7A7A] text-xs">{user.email}</p>
            </div>
            <motion.button
              id="logout-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#7A7A7A] hover:text-[#F8F7F4] text-sm transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4FF5E] block mb-2"
            >
              Student Portal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif leading-tight"
            >
              My Applications
            </motion.h1>
          </div>
          <motion.button
            id="open-apply-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setEditingApp(null); setModalOpen(true); }}
            className="bg-[#D4FF5E] text-[#1A1A1A] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[12px] flex items-center gap-2 shrink-0"
          >
            <Plus size={16} /> New Application
          </motion.button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Total',    value: stats.total,    color: 'text-[#F8F7F4]' },
            { label: 'Pending',  value: stats.pending,  color: 'text-amber-400' },
            { label: 'Accepted', value: stats.accepted, color: 'text-emerald-400' },
            { label: 'Rejected', value: stats.rejected, color: 'text-red-400' },
          ].map((s) => (
            <div key={s.label} className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A7A] mb-2">{s.label}</p>
              <p className={`text-3xl font-serif ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Application list */}
        {loading ? (
          <div className="flex justify-center py-32">
            <svg className="animate-spin h-8 w-8 text-[#D4FF5E]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          </div>
        ) : applications.length === 0 ? (
          <EmptyState onAdd={() => { setEditingApp(null); setModalOpen(true); }} />
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onEdit={(a) => { setEditingApp(a); setModalOpen(true); }}
                  onDelete={(id) => setDeleteConfirm(id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <ApplicationModal
            application={editingApp}
            onClose={() => { setModalOpen(false); setEditingApp(null); }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1A1A1A] border border-white/8 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-5">
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h3 className="text-xl font-serif text-[#F8F7F4] mb-2">Delete Application?</h3>
              <p className="text-[#7A7A7A] text-sm mb-8">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  id="cancel-delete"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-white/10 text-[#7A7A7A] hover:text-[#F8F7F4] py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  id="confirm-delete"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-500/80 hover:bg-red-500 text-white py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
