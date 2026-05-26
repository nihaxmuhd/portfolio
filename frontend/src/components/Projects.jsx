import React, { useState, useEffect } from 'react';
import { ExternalLink, Plus, Edit, Trash2, X, Sparkles, Image, CheckCircle2 } from 'lucide-react';
import { Github } from './CustomIcons';
import { api } from '../api';

/* ── Helpers ────────────────────────────────────────────── */
const STATUS_BADGE = {
  'Completed':   'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'In Progress': 'bg-amber-500/10  text-amber-600  dark:text-amber-400',
  'Planning':    'bg-slate-500/10  text-slate-500  dark:text-slate-400',
};

const PROGRESS_BAR = {
  'Completed':   'from-emerald-500 to-teal-400',
  'In Progress': 'from-amber-500 to-orange-400',
  'Planning':    'from-slate-400 to-slate-500',
};

const DEFAULTS = [
  {
    id: 'd1', title: 'Velmora Leather Landing Page', order: 1,
    project_progress: 100, status: 'Completed',
    description: 'A visually stunning e-commerce landing page with smooth scroll-triggered shoe deconstruction animations, premium interactive cards, and a minimalist design system.',
    tech_stack: 'React.js, Tailwind CSS, GSAP, Canvas, Django, SQLite',
    github_url: 'https://github.com/yourusername/velmora-leather',
    live_url:   'https://velmoraleather.demo',
    image_url:  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd2', title: 'Zetca Live Dashboard', order: 2,
    project_progress: 85, status: 'In Progress',
    description: 'A secure admin panel with real-time data visualisations of company metrics, user accounts, and billing history. Features full JWT session-handling.',
    tech_stack: 'React.js, Tailwind CSS, Recharts, Django REST Framework, PostgreSQL',
    github_url: 'https://github.com/yourusername/zetca-live-admin',
    live_url:   'https://zetcalive.demo',
    image_url:  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd3', title: 'Wallchemy Textures API', order: 3,
    project_progress: 100, status: 'Completed',
    description: 'A RESTful API serving architectural textures and materials. Built with optimised Django queries, custom pagination, and complete CORS integration.',
    tech_stack: 'Python, Django REST Framework, SQLite, Postman',
    github_url: 'https://github.com/yourusername/wallchemy-textures-api',
    live_url:   'https://wallchemy.demo',
    image_url:  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
];

/* ── Project Card ──────────────────────────────────────── */
function ProjectCard({ proj, isAdmin, onEdit, onDelete, isFinished }) {
  const tags     = (proj.tech_stack || '').split(',').map(t => t.trim()).filter(Boolean);
  const progress = proj.project_progress ?? (isFinished ? 100 : 0);
  const status   = proj.status || (isFinished ? 'Completed' : 'Planning');

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-card border border-slate-200/50 dark:border-white/5 h-full">

      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950 flex-shrink-0">
        {proj.image_url ? (
          <img
            src={proj.image_url}
            alt={proj.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
            <Image className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Admin hover controls */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(proj)} className="p-1.5 rounded bg-slate-900/80 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-slate-800"><Edit className="w-3.5 h-3.5" /></button>
            <button onClick={() => onDelete(proj.id)} className="p-1.5 rounded bg-slate-900/80 backdrop-blur-sm text-rose-400 hover:text-rose-300 hover:bg-slate-800"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
          {proj.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-grow">
          {proj.description}
        </p>

        {/* Status / Progress */}
        {isFinished ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Finished</span>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className={`px-2 py-0.5 rounded ${STATUS_BADGE[status] ?? STATUS_BADGE['Planning']}`}>{status}</span>
              <span className="text-slate-500 dark:text-gray-400">{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${PROGRESS_BAR[status] ?? PROGRESS_BAR['Planning']}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t, i) => (
            <span key={i} className="text-[10px] font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/15 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-3 mt-auto border-t border-slate-200/50 dark:border-white/5 text-sm text-slate-500 dark:text-gray-400">
          {proj.github_url && (
            <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github className="w-4 h-4" /><span>Source</span>
            </a>
          )}
          {proj.live_url && (
            <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto">
              <ExternalLink className="w-4 h-4" /><span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Admin form ─────────────────────────────────────────── */
function ProjectForm({ editingId, initial, onSubmit, onCancel }) {
  const [title,    setTitle   ] = useState(initial.title    || '');
  const [desc,     setDesc    ] = useState(initial.description   || '');
  const [stack,    setStack   ] = useState(initial.tech_stack    || '');
  const [ghUrl,    setGhUrl   ] = useState(initial.github_url    || '');
  const [liveUrl,  setLiveUrl ] = useState(initial.live_url      || '');
  const [imgUrl,   setImgUrl  ] = useState(initial.image_url     || '');
  const [order,    setOrder   ] = useState(initial.order         ?? 0);
  const [progress, setProgress] = useState(initial.project_progress ?? 100);
  const [status,   setStatus  ] = useState(initial.status        || 'Completed');

  const inp = 'w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors';
  const lbl = 'block text-xs text-slate-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider';

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    onSubmit({
      title, description: desc, tech_stack: stack,
      github_url: ghUrl || null, live_url: liveUrl || null,
      image_url: imgUrl.trim() || `https://picsum.photos/id/${Math.floor(Math.random() * 90) + 10}/600/400`,
      order: parseInt(order) || 0, project_progress: progress, status,
    });
  };

  return (
    <form onSubmit={submit} className="mb-10 p-6 rounded-2xl glass-card border border-slate-200/60 dark:border-white/10 max-w-2xl mx-auto space-y-4">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-violet-500" /> {editingId ? 'Edit Project' : 'Add New Project'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={lbl}>Title</label><input type="text" value={title} onChange={e=>setTitle(e.target.value)} className={inp} placeholder="e.g., E-commerce API" required /></div>
        <div><label className={lbl}>Order</label><input type="number" value={order} onChange={e=>setOrder(e.target.value)} className={inp} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)} className={inp}>
            <option>Completed</option><option>In Progress</option><option>Planning</option>
          </select>
        </div>
        <div>
          <label className={lbl}>Progress ({progress}%)</label>
          <div className="flex items-center gap-3 h-9">
            <input type="range" min="0" max="100" value={progress} onChange={e=>setProgress(Number(e.target.value))} className="flex-1 accent-violet-600 cursor-pointer" />
            <span className="text-xs font-mono text-slate-500 dark:text-gray-400 w-8 text-right">{progress}%</span>
          </div>
        </div>
      </div>
      <div><label className={lbl}>Description</label><textarea value={desc} onChange={e=>setDesc(e.target.value)} rows="4" className={inp+' font-sans'} required /></div>
      <div><label className={lbl}>Tech Stack (comma-separated)</label><input type="text" value={stack} onChange={e=>setStack(e.target.value)} className={inp} placeholder="React, Django, PostgreSQL" required /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={lbl}>GitHub URL</label><input type="url" value={ghUrl} onChange={e=>setGhUrl(e.target.value)} className={inp} placeholder="https://github.com/…" /></div>
        <div><label className={lbl}>Live Demo URL</label><input type="url" value={liveUrl} onChange={e=>setLiveUrl(e.target.value)} className={inp} placeholder="https://…" /></div>
      </div>
      <div>
        <label className={lbl}>Image URL (optional)</label>
        <div className="relative">
          <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="url" value={imgUrl} onChange={e=>setImgUrl(e.target.value)} className={inp+' pl-10'} placeholder="https://images.unsplash.com/… or leave blank" />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">{editingId ? 'Save Changes' : 'Publish'}</button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 font-semibold text-sm transition-colors">Cancel</button>
      </div>
    </form>
  );
}

/* ── Grid heading ──────────────────────────────────────── */
function GridHeading({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
      <div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">{title}</h2>
        <p className="text-violet-500 dark:text-violet-400 text-[11px] font-bold uppercase tracking-widest mt-1.5">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

/* ── Main component ────────────────────────────────────── */
export default function Projects({ isAdmin }) {
  const [projects,    setProjects   ] = useState([]);
  const [loading,     setLoading    ] = useState(true);
  const [isFormOpen,  setIsFormOpen ] = useState(false);
  const [editingId,   setEditingId  ] = useState(null);
  const [formInitial, setFormInitial] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getProjects();
        setProjects(data?.length ? data : DEFAULTS);
      } catch { setProjects(DEFAULTS); }
      finally  { setLoading(false); }
    })();
  }, []);

  const openAdd  = () => { setEditingId(null); setFormInitial({}); setIsFormOpen(true); };
  const openEdit = (p) => { setEditingId(p.id); setFormInitial(p); setIsFormOpen(true); };
  const closeForm = () => { setIsFormOpen(false); setEditingId(null); setFormInitial({}); };

  const handleFormSubmit = async (payload) => {
    try {
      if (editingId) {
        const u = await api.updateProject(editingId, payload);
        setProjects(ps => ps.map(p => p.id === editingId ? u : p));
      } else {
        const c = await api.createProject(payload);
        setProjects(ps => [...ps.filter(p => !String(p.id).startsWith('d')), c]);
      }
      closeForm();
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    if (String(id).startsWith('d')) { setProjects(ps => ps.filter(p => p.id !== id)); return; }
    try { await api.deleteProject(id); setProjects(ps => ps.filter(p => p.id !== id)); }
    catch (err) { alert('Error: ' + err.message); }
  };

  const sorted   = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0) || b.id - a.id);
  const active   = sorted.filter(p => !(Number(p.project_progress) === 100 && p.status === 'Completed'));
  const finished = sorted.filter(p =>   Number(p.project_progress) === 100 && p.status === 'Completed');

  if (loading) return (
    <section id="projects" className="section-divider py-20">
      <div className="container text-center py-16 text-slate-400 dark:text-gray-500">Loading projects…</div>
    </section>
  );

  return (
    <section id="projects" className="section-divider py-20 md:py-28">
      <div className="container">

        {/* ── Featured / Active ── */}
        <GridHeading
          title="Featured Projects"
          subtitle="Active work and recent highlights"
          action={isAdmin && (
            <button
              onClick={isFormOpen ? closeForm : openAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors flex-shrink-0"
            >
              {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isFormOpen ? 'Cancel' : 'Add Project'}
            </button>
          )}
        />

        {isFormOpen && (
          <ProjectForm
            editingId={editingId}
            initial={formInitial}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        )}

        {active.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map(p => <ProjectCard key={p.id} proj={p} isAdmin={isAdmin} onEdit={openEdit} onDelete={handleDelete} isFinished={false} />)}
          </div>
        ) : (
          <p className="text-slate-400 dark:text-gray-500 italic text-center py-8">No active projects right now.</p>
        )}

        {/* ── Finished ── */}
        {finished.length > 0 && (
          <div className="mt-24 pt-12 border-t-2 border-slate-200 dark:border-white/8">
            <GridHeading
              title="Finished Projects"
              subtitle="Completed and shipped — fully archived"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {finished.map(p => <ProjectCard key={p.id} proj={p} isAdmin={isAdmin} onEdit={openEdit} onDelete={handleDelete} isFinished={true} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
