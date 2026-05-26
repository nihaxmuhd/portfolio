import React, { useState, useEffect } from 'react';
import { Calendar, Briefcase, Plus, Edit, Trash2, X, Sparkles } from 'lucide-react';
import { api } from '../api';

const DEFAULTS = [
  {
    id: 'd1', company_name: 'Velmora Leather (Freelance)', role: 'Full-Stack Developer',
    start_date: '2026-01-15', end_date: '', is_current: true,
    description: 'Designed and developed a premium luxury landing page and backend.\nImplemented scroll-linked shoe deconstruction animations using GSAP and canvas.\nConnected Django REST endpoints with a React.js single-page application.',
    order: 1,
  },
  {
    id: 'd2', company_name: 'Zetca Live', role: 'Software Engineer Intern',
    start_date: '2025-09-01', end_date: '2025-12-15', is_current: false,
    description: 'Modernised administrative dashboards using React and responsive design principles.\nImplemented robust JWT authentication flow and automatic refresh token mechanics.\nRefactored state management to synchronise frontend states with REST API endpoints.',
    order: 2,
  },
  {
    id: 'd3', company_name: 'Startup Incubator', role: 'Business Management Intern',
    start_date: '2024-06-01', end_date: '2024-08-31', is_current: false,
    description: 'Bridged the gap between non-technical founders and developer teams.\nLed agile planning sessions and translated requirements into technical user stories.\nOptimised operations workflow saving 10+ hours of manual data entry per week.',
    order: 3,
  },
];

const formatDate = (s) => {
  if (!s) return '';
  return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

/* ── Experience card ──────────────────────────────────────── */
function ExpCard({ exp, isAdmin, onEdit, onDelete }) {
  const bullets = (exp.description || '').split('\n').filter(Boolean);
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200/50 dark:border-white/5 group relative">
      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(exp)} className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
          <button onClick={() => onDelete(exp.id)} className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-rose-400 hover:text-rose-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Date tag */}
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
        {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
      </p>

      <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white leading-snug">
        {exp.role}
      </h3>
      <p className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-4">{exp.company_name}</p>

      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience({ isAdmin }) {
  const [experiences, setExperiences] = useState([]);
  const [loading,     setLoading    ] = useState(true);
  const [isFormOpen,  setIsFormOpen ] = useState(false);
  const [editingId,   setEditingId  ] = useState(null);

  // Form fields
  const [company,     setCompany    ] = useState('');
  const [role,        setRole       ] = useState('');
  const [startDate,   setStartDate  ] = useState('');
  const [endDate,     setEndDate    ] = useState('');
  const [isCurrent,   setIsCurrent  ] = useState(false);
  const [description, setDescription] = useState('');
  const [order,       setOrder      ] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getExperiences();
        setExperiences(data?.length ? data : DEFAULTS);
      } catch {
        setExperiences(DEFAULTS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const resetForm = () => {
    setCompany(''); setRole(''); setStartDate(''); setEndDate('');
    setIsCurrent(false); setDescription(''); setOrder(0); setEditingId(null);
  };

  const openAdd = () => { resetForm(); setIsFormOpen(true); };

  const openEdit = (exp) => {
    setEditingId(exp.id);
    setCompany(exp.company_name);
    setRole(exp.role);
    setStartDate(exp.start_date);
    setEndDate(exp.end_date || '');
    setIsCurrent(exp.is_current);
    setDescription(exp.description);
    setOrder(exp.order);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      company_name: company, role,
      start_date: startDate,
      end_date: isCurrent ? null : (endDate || null),
      is_current: isCurrent,
      description,
      order: parseInt(order) || 0,
    };
    try {
      if (editingId) {
        const u = await api.updateExperience(editingId, payload);
        setExperiences(ps => ps.map(x => x.id === editingId ? u : x));
      } else {
        const c = await api.createExperience(payload);
        setExperiences(ps => [...ps.filter(x => !String(x.id).startsWith('d')), c]);
      }
      setIsFormOpen(false); resetForm();
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    if (String(id).startsWith('d')) { setExperiences(ps => ps.filter(x => x.id !== id)); return; }
    try { await api.deleteExperience(id); setExperiences(ps => ps.filter(x => x.id !== id)); }
    catch (err) { alert('Error: ' + err.message); }
  };

  const sorted = [...experiences].sort((a, b) => (a.order || 0) - (b.order || 0) || new Date(b.start_date) - new Date(a.start_date));

  const inputCls = 'w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors';
  const labelCls = 'block text-xs text-slate-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider';

  return (
    <section id="experience" className="section-divider py-20 md:py-28 bg-slate-50/30 dark:bg-slate-950/30">
      <div className="container">

        {/* ── Heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Work Experience
            </h2>
            <p className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-widest mt-2">
              My professional timeline and roles
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => { if (isFormOpen) { setIsFormOpen(false); resetForm(); } else openAdd(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors flex-shrink-0"
            >
              {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isFormOpen ? 'Cancel' : 'Add Experience'}
            </button>
          )}
        </div>

        {/* ── Add/Edit form ── */}
        {isFormOpen && (
          <form onSubmit={handleSubmit} className="mb-12 p-6 rounded-2xl glass-card border border-slate-200/60 dark:border-white/10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelCls}>Company</label><input value={company} onChange={e => setCompany(e.target.value)} className={inputCls} placeholder="e.g., Google" required /></div>
              <div><label className={labelCls}>Role</label><input value={role} onChange={e => setRole(e.target.value)} className={inputCls} placeholder="e.g., Software Engineer" required /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div><label className={labelCls}>Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} required /></div>
              <div><label className={`${labelCls} ${isCurrent ? 'opacity-40' : ''}`}>End Date</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={`${inputCls} ${isCurrent ? 'opacity-40 cursor-not-allowed' : ''}`} disabled={isCurrent} /></div>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-gray-300 cursor-pointer pb-1">
                <input type="checkbox" checked={isCurrent} onChange={e => setIsCurrent(e.target.checked)} className="rounded accent-violet-600 w-4 h-4" />
                Current Role
              </label>
            </div>
            <div>
              <label className={labelCls}>Description (one bullet per line)</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" className={inputCls + ' font-sans'} placeholder={'Built X using Y\nImproved Z by W%'} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Order</label><input type="number" value={order} onChange={e => setOrder(e.target.value)} className={inputCls} /></div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">{editingId ? 'Save Changes' : 'Create Record'}</button>
              <button type="button" onClick={() => { setIsFormOpen(false); resetForm(); }} className="px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 font-semibold text-sm transition-colors">Cancel</button>
            </div>
          </form>
        )}

        {/*
          Timeline layout:
          Mobile  → single column, vertical rule on the LEFT, dot to the left of card
          Desktop → alternating left/right, rule at centre
        */}
        <div className="relative timeline-line-wrapper">
          {/* The vertical rule — only visible on md+ via CSS */}
          <div className="timeline-line" aria-hidden />

          <div className="space-y-8 md:space-y-12">
            {sorted.map((exp, idx) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row md:items-start gap-0 md:gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot — centred on mobile left, centred between cols on md */}
                <div
                  className={`
                    hidden md:flex absolute left-1/2 -translate-x-1/2 top-5
                    w-10 h-10 rounded-full bg-white dark:bg-slate-950 border-2 border-violet-500
                    items-center justify-center text-violet-600 dark:text-violet-400 z-10
                    shadow-md shadow-violet-500/20
                  `}
                >
                  <Briefcase className="w-4 h-4" />
                </div>

                {/* Card — takes half width on desktop */}
                <div className={`w-full md:w-[calc(50%-2.5rem)] ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {/* Mobile dot + line on left */}
                  <div className="flex md:hidden items-start gap-4 mb-2">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-violet-500 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-sm">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      {idx < sorted.length - 1 && <div className="w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-violet-500/60 to-transparent mt-1" />}
                    </div>
                    <ExpCard exp={exp} isAdmin={isAdmin} onEdit={openEdit} onDelete={handleDelete} />
                  </div>
                  <div className="hidden md:block">
                    <ExpCard exp={exp} isAdmin={isAdmin} onEdit={openEdit} onDelete={handleDelete} />
                  </div>
                </div>

                {/* Spacer for the other half on desktop */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <p className="text-center text-slate-400 dark:text-gray-500 italic py-12">No experience records yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
