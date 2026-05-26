import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Edit, Plus, Sparkles, Trash2, X } from 'lucide-react';
import { api } from '../api';



const formatDate = value => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const timelineVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ExpCard({ exp, isAdmin, onEdit, onDelete, index }) {
  const bullets = (exp.description || '').split('\n').filter(Boolean);

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -6 }}
      className="glass-card group relative overflow-hidden rounded-[2rem] p-6 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 opacity-90"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-10 ${index % 2 === 0 ? '-right-8' : '-left-8'} h-28 w-28 rounded-full bg-violet-500/10 blur-2xl`}
      />

      {isAdmin && (
        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button onClick={() => onEdit(exp)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-violet-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-violet-400">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(exp.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-rose-500 hover:text-rose-600 dark:bg-slate-800 dark:text-rose-400">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date)}
        </p>
        {exp.is_current && (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Current
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{exp.role}</h3>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{exp.company_name}</p>

      <ul className="mt-6 space-y-3">
        {bullets.map(bullet => (
          <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <span className="mt-2 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Experience({ isAdmin }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState(0);

useEffect(() => {
  (async () => {
    try {
      const data =
        await api.getExperiences();

      setExperiences(
        Array.isArray(
          data
        )
          ? data
          : []
      );
    } catch (
      error
    ) {
      console.error(
        'Experience fetch failed:',
        error
      );

      setExperiences(
        []
      );
    } finally {
      setLoading(
        false
      );
    }
  })();
}, []);

  const resetForm = () => {
    setCompany('');
    setRole('');
    setStartDate('');
    setEndDate('');
    setIsCurrent(false);
    setDescription('');
    setOrder(0);
    setEditingId(null);
  };

  const openEdit = exp => {
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

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      company_name: company,
      role,
      start_date: startDate,
      end_date: isCurrent ? null : (endDate || null),
      is_current: isCurrent,
      description,
      order: parseInt(order, 10) || 0,
    };

    try {
      const isPersistedExperience = editingId && !String(editingId).startsWith('d');

      if (isPersistedExperience) {
        const updated = await api.updateExperience(editingId, payload);
        setExperiences(prev => prev.map(item => (item.id === editingId ? updated : item)));
      } else {
        const created = await api.createExperience(payload);
        setExperiences(prev => [...prev.filter(item => !String(item.id).startsWith('d')), created]);
      }

      setIsFormOpen(false);
      resetForm();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this experience?')) return;

    if (String(id).startsWith('d')) {
      setExperiences(prev => prev.filter(item => item.id !== id));
      return;
    }

    try {
      await api.deleteExperience(id);
      setExperiences(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const sorted = [...experiences].sort((a, b) => (a.order || 0) - (b.order || 0) || new Date(b.start_date) - new Date(a.start_date));

  return (
    <section id="experience" className="section-shell section-divider overflow-hidden bg-slate-50/35 dark:bg-slate-950/25">
      <div aria-hidden="true" className="pointer-events-none absolute left-[-8rem] top-32 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-56 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container relative">
        <div className="section-header-row">
          <div className="section-heading">
            <p className="section-kicker text-cyan-600 dark:text-cyan-400">Work experience</p>
            <h2 className="section-title text-slate-950 dark:text-white">A timeline with more presence, motion, and professional polish.</h2>
            <p className="section-copy">
              Experience across product-facing engineering and coordination work, presented as a richer animated journey without changing the underlying functionality.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                if (isFormOpen) {
                  setIsFormOpen(false);
                  resetForm();
                } else {
                  resetForm();
                  setIsFormOpen(true);
                }
              }}
              className="button-primary shrink-0"
            >
              {isFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {isFormOpen ? 'Cancel' : 'Add Experience'}
            </button>
          )}
        </div>

        {isFormOpen && (
          <form onSubmit={handleSubmit} className="glass-card mx-auto mb-10 max-w-4xl rounded-[2rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Sparkles className="h-4 w-4 text-violet-500" />
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="ui-label">Company</label>
                <input value={company} onChange={e => setCompany(e.target.value)} className="ui-input" required />
              </div>
              <div>
                <label className="ui-label">Role</label>
                <input value={role} onChange={e => setRole(e.target.value)} className="ui-input" required />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:items-end">
              <div>
                <label className="ui-label">Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="ui-input" required />
              </div>
              <div>
                <label className={`ui-label ${isCurrent ? 'opacity-50' : ''}`}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className={`ui-input ${isCurrent ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={isCurrent}
                />
              </div>
              <label className="flex min-h-[2.85rem] items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200">
                <input type="checkbox" checked={isCurrent} onChange={e => setIsCurrent(e.target.checked)} className="h-4 w-4 rounded accent-violet-600" />
                Current Role
              </label>
            </div>

            <div className="mt-4">
              <label className="ui-label">Description (one bullet per line)</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" className="ui-textarea" required />
            </div>

            <div className="mt-4 max-w-xs">
              <label className="ui-label">Order</label>
              <input type="number" value={order} onChange={e => setOrder(e.target.value)} className="ui-input" />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="button-primary flex-1">
                {editingId ? 'Save Changes' : 'Create Record'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="button-secondary flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-500 dark:text-slate-400">Loading experience...</div>
        ) : sorted.length > 0 ? (
          <motion.div
            className="timeline-line-wrapper"
            variants={timelineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="timeline-line" aria-hidden />

            <div className="space-y-6 md:space-y-10">
              {sorted.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative grid gap-4 md:grid-cols-2 md:gap-10"
                >
                  <div className={`${index % 2 === 0 ? 'md:pr-12' : 'md:order-2 md:pl-12'}`}>
                    <div className="flex items-start gap-4 md:block">
                      <div className="flex flex-col items-center md:hidden">
                        <motion.div
                          animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 0 rgba(139,92,246,0.0)', '0 0 0 10px rgba(139,92,246,0.08)', '0 0 0 rgba(139,92,246,0.0)'] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-violet-500 bg-white text-violet-600 shadow-sm dark:bg-slate-950 dark:text-violet-400"
                        >
                          <Briefcase className="h-4 w-4" />
                        </motion.div>
                        {index < sorted.length - 1 && <div className="mt-2 min-h-12 w-0.5 flex-1 bg-gradient-to-b from-violet-500/80 via-cyan-400/60 to-transparent" />}
                      </div>
                      <div className="flex-1">
                        <ExpCard exp={exp} isAdmin={isAdmin} onEdit={openEdit} onDelete={handleDelete} index={index} />
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 0 ? 'hidden md:block md:pl-12' : 'hidden md:block md:order-1 md:pr-12'}`} />

                  <motion.div
                    animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 0 rgba(139,92,246,0.0)', '0 0 0 16px rgba(139,92,246,0.08)', '0 0 0 rgba(139,92,246,0.0)'] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                    className="absolute left-1/2 top-8 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-violet-500 bg-white text-violet-600 shadow-lg shadow-violet-500/20 dark:bg-slate-950 dark:text-violet-400 md:flex"
                  >
                    <Briefcase className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <p className="py-10 text-center text-sm italic text-slate-500 dark:text-slate-400">No experience records yet.</p>
        )}
      </div>
    </section>
  );
}
