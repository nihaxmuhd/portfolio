import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, Sparkles } from 'lucide-react';
import { api } from '../api';

const CATEGORIES = ['Backend', 'Frontend', 'Tools/Others'];

const CAT_COLORS = {
  'Backend':      'from-violet-500 to-purple-500',
  'Frontend':     'from-cyan-500 to-blue-500',
  'Tools/Others': 'from-emerald-500 to-teal-500',
};

const DEFAULTS = [
  { id: 'd1',  name: 'Python',                   category: 'Backend',      proficiency: 90, order: 1 },
  { id: 'd2',  name: 'Django',                   category: 'Backend',      proficiency: 85, order: 2 },
  { id: 'd3',  name: 'Django REST Framework',    category: 'Backend',      proficiency: 85, order: 3 },
  { id: 'd4',  name: 'RESTful APIs',             category: 'Backend',      proficiency: 90, order: 4 },
  { id: 'd5',  name: 'Databases (SQL)',           category: 'Backend',      proficiency: 80, order: 5 },
  { id: 'd6',  name: 'JavaScript',               category: 'Frontend',     proficiency: 85, order: 1 },
  { id: 'd7',  name: 'React.js',                 category: 'Frontend',     proficiency: 80, order: 2 },
  { id: 'd8',  name: 'Tailwind CSS',             category: 'Frontend',     proficiency: 90, order: 3 },
  { id: 'd9',  name: 'HTML5 & CSS3',             category: 'Frontend',     proficiency: 95, order: 4 },
  { id: 'd10', name: 'Git',                      category: 'Tools/Others', proficiency: 85, order: 1 },
  { id: 'd11', name: 'GitHub',                   category: 'Tools/Others', proficiency: 90, order: 2 },
  { id: 'd12', name: 'Postman',                  category: 'Tools/Others', proficiency: 80, order: 3 },
  { id: 'd13', name: 'AI-assisted Development',  category: 'Tools/Others', proficiency: 95, order: 4 },
];

/* ── Skill row with progress bar ──────────────────────────── */
function SkillRow({ skill, gradientClass, isAdmin, onEdit, onDelete }) {
  return (
    <div className="space-y-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-800 dark:text-gray-200 truncate">
          {skill.name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold font-mono bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
            {skill.proficiency}%
          </span>
          {isAdmin && (
            <div className="flex gap-1">
              <button onClick={() => onEdit(skill)} className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" title="Edit"><Edit className="w-3 h-3" /></button>
              <button onClick={() => onDelete(skill.id)} className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-rose-400 hover:text-rose-600 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      </div>
      {/* Bar track */}
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-700`}
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  );
}

/* ── Inline edit form for a single skill ─────────────────── */
function InlineEditForm({ skill, onSave, onCancel }) {
  const [name, setName]               = useState(skill.name);
  const [proficiency, setProficiency] = useState(skill.proficiency);

  return (
    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-3">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
      />
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 dark:text-gray-400 w-10 flex-shrink-0">{proficiency}%</span>
        <input
          type="range" min="0" max="100" value={proficiency}
          onChange={e => setProficiency(Number(e.target.value))}
          className="flex-1 accent-violet-600 cursor-pointer"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">Cancel</button>
        <button onClick={() => onSave({ ...skill, name, proficiency })} className="px-3 py-1 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors flex items-center gap-1">
          <Save className="w-3 h-3" /> Save
        </button>
      </div>
    </div>
  );
}

export default function Skills({ isAdmin }) {
  const [skills,     setSkills    ] = useState([]);
  const [loading,    setLoading   ] = useState(true);
  const [editingId,  setEditingId ] = useState(null);
  const [isAdding,   setIsAdding  ] = useState(false);

  // Add-form states
  const [newName,        setNewName       ] = useState('');
  const [newCategory,    setNewCategory   ] = useState('Backend');
  const [newProficiency, setNewProficiency] = useState(80);
  const [newOrder,       setNewOrder      ] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getSkills();
        setSkills(data?.length ? data : DEFAULTS);
      } catch {
        setSkills(DEFAULTS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const s = await api.createSkill({ name: newName, category: newCategory, proficiency: newProficiency, order: parseInt(newOrder) || 0 });
      setSkills(ps => [...ps.filter(x => !String(x.id).startsWith('d')), s]);
      setIsAdding(false);
      setNewName(''); setNewCategory('Backend'); setNewProficiency(80); setNewOrder(0);
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleUpdate = async (updated) => {
    try {
      const s = await api.updateSkill(updated.id, { name: updated.name, category: updated.category, proficiency: updated.proficiency, order: updated.order });
      setSkills(ps => ps.map(x => x.id === s.id ? s : x));
      setEditingId(null);
    } catch (err) { alert('Error: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    if (String(id).startsWith('d')) { setSkills(ps => ps.filter(x => x.id !== id)); return; }
    try { await api.deleteSkill(id); setSkills(ps => ps.filter(x => x.id !== id)); }
    catch (err) { alert('Error: ' + err.message); }
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat).sort((a, b) => (a.order || 0) - (b.order || 0));
    return acc;
  }, {});

  const inputCls = 'w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 transition-colors';

  return (
    <section id="skills" className="section-divider py-20 md:py-28 bg-slate-50/60 dark:bg-slate-950/20">
      <div className="container">

        {/* ── Heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Skills &amp; Tech Stack
            </h2>
            <p className="text-violet-500 dark:text-violet-400 text-xs font-semibold uppercase tracking-widest mt-2">
              My tools and languages for building digital systems
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsAdding(v => !v)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors flex-shrink-0"
            >
              {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isAdding ? 'Cancel' : 'Add Skill'}
            </button>
          )}
        </div>

        {/* ── Add skill form ── */}
        {isAdding && (
          <form onSubmit={handleCreate} className="mb-10 p-6 rounded-2xl glass-card border border-slate-200/60 dark:border-white/10 max-w-xl mx-auto space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" /> Add a New Skill
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Skill Name</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className={inputCls} placeholder="e.g., GraphQL" required />
              </div>
              <div>
                <label className="block text-xs text-slate-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Proficiency ({newProficiency}%)</label>
                <input type="range" min="0" max="100" value={newProficiency} onChange={e => setNewProficiency(Number(e.target.value))} className="w-full accent-violet-600 cursor-pointer mt-1" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Order</label>
                <input type="number" value={newOrder} onChange={e => setNewOrder(e.target.value)} className={inputCls} placeholder="0" />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">Save Skill</button>
          </form>
        )}

        {/* ── Skill cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map(cat => {
            const gradient = CAT_COLORS[cat] || 'from-violet-500 to-cyan-500';
            const list = grouped[cat] || [];
            return (
              <div key={cat} className="p-6 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200/60 dark:border-white/5 shadow-sm">
                {/* Category header */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/8">
                  <h3 className="font-bold text-slate-900 dark:text-white font-display">{cat}</h3>
                  <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    {list.length}
                  </span>
                </div>

                <div className="space-y-5">
                  {list.length > 0 ? list.map(skill => (
                    <div key={skill.id}>
                      {editingId === skill.id ? (
                        <InlineEditForm skill={skill} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
                      ) : (
                        <SkillRow
                          skill={skill}
                          gradientClass={gradient}
                          isAdmin={isAdmin}
                          onEdit={s => setEditingId(s.id)}
                          onDelete={handleDelete}
                        />
                      )}
                    </div>
                  )) : (
                    <p className="text-xs text-slate-400 dark:text-gray-500 italic">No skills in this category</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
