import { useEffect, useState } from 'react';
import { Edit, Plus, Save, Sparkles, Trash2, X } from 'lucide-react';
import { api } from '../api';

const CATEGORIES = ['Backend', 'Frontend', 'Tools/Others'];

const CAT_COLORS = {
  Backend: 'from-violet-500 to-purple-500',
  Frontend: 'from-cyan-500 to-blue-500',
  'Tools/Others': 'from-emerald-500 to-teal-500',
};

const DEFAULTS = [
  { id: 'd1', name: 'Python', category: 'Backend', proficiency: 90, order: 1 },
  { id: 'd2', name: 'Django', category: 'Backend', proficiency: 85, order: 2 },
  { id: 'd3', name: 'Django REST Framework', category: 'Backend', proficiency: 85, order: 3 },
  { id: 'd4', name: 'RESTful APIs', category: 'Backend', proficiency: 90, order: 4 },
  { id: 'd5', name: 'Databases (SQL)', category: 'Backend', proficiency: 80, order: 5 },
  { id: 'd6', name: 'JavaScript', category: 'Frontend', proficiency: 85, order: 1 },
  { id: 'd7', name: 'React.js', category: 'Frontend', proficiency: 80, order: 2 },
  { id: 'd8', name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, order: 3 },
  { id: 'd9', name: 'HTML5 and CSS3', category: 'Frontend', proficiency: 95, order: 4 },
  { id: 'd10', name: 'Git', category: 'Tools/Others', proficiency: 85, order: 1 },
  { id: 'd11', name: 'GitHub', category: 'Tools/Others', proficiency: 90, order: 2 },
  { id: 'd12', name: 'Postman', category: 'Tools/Others', proficiency: 80, order: 3 },
  { id: 'd13', name: 'AI-assisted Development', category: 'Tools/Others', proficiency: 95, order: 4 },
];

function SkillRow({ skill, gradientClass, isAdmin, onEdit, onDelete }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{skill.name}</span>
        <div className="flex shrink-0 items-center gap-2">
          <span className={`text-xs font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
            {skill.proficiency}%
          </span>
          {isAdmin && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(skill)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:text-violet-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-violet-400"
                title="Edit"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(skill.id)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-rose-500 transition-colors hover:text-rose-600 dark:bg-slate-800 dark:text-rose-400"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-700`} style={{ width: `${skill.proficiency}%` }} />
      </div>
    </div>
  );
}

function InlineEditForm({ skill, onSave, onCancel }) {
  const [name, setName] = useState(skill.name);
  const [proficiency, setProficiency] = useState(skill.proficiency);

  return (
    <div className="space-y-4 rounded-[1.4rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/60">
      <input value={name} onChange={e => setName(e.target.value)} className="ui-input" />
      <div className="flex items-center gap-3">
        <span className="w-10 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">{proficiency}%</span>
        <input
          type="range"
          min="0"
          max="100"
          value={proficiency}
          onChange={e => setProficiency(Number(e.target.value))}
          className="flex-1 cursor-pointer accent-violet-600"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="button-ghost min-h-10 rounded-xl px-4 text-xs">Cancel</button>
        <button onClick={() => onSave({ ...skill, name, proficiency })} className="button-primary min-h-10 rounded-xl px-4 text-xs">
          <Save className="h-3.5 w-3.5" />
          Save
        </button>
      </div>
    </div>
  );
}

export default function Skills({ isAdmin }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Backend');
  const [newProficiency, setNewProficiency] = useState(80);
  const [newOrder, setNewOrder] = useState(0);

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

  const handleCreate = async e => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      const created = await api.createSkill({
        name: newName,
        category: newCategory,
        proficiency: newProficiency,
        order: parseInt(newOrder, 10) || 0,
      });

      setSkills(prev => [...prev.filter(item => !String(item.id).startsWith('d')), created]);
      setIsAdding(false);
      setNewName('');
      setNewCategory('Backend');
      setNewProficiency(80);
      setNewOrder(0);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleUpdate = async updated => {
    try {
      const saved = await api.updateSkill(updated.id, {
        name: updated.name,
        category: updated.category,
        proficiency: updated.proficiency,
        order: updated.order,
      });

      setSkills(prev => prev.map(item => (item.id === saved.id ? saved : item)));
      setEditingId(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this skill?')) return;

    if (String(id).startsWith('d')) {
      setSkills(prev => prev.filter(item => item.id !== id));
      return;
    }

    try {
      await api.deleteSkill(id);
      setSkills(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const grouped = CATEGORIES.reduce((acc, category) => {
    acc[category] = skills
      .filter(skill => skill.category === category)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    return acc;
  }, {});

  return (
    <section id="skills" className="section-shell section-divider bg-slate-50/55 dark:bg-slate-950/20">
      <div className="container">
        <div className="section-header-row">
          <div className="section-heading">
            <p className="section-kicker text-violet-600 dark:text-violet-400">Skills and tech stack</p>
            <h2 className="section-title text-slate-950 dark:text-white">Tools I rely on to build stable, usable products.</h2>
            <p className="section-copy">
              A balanced stack across backend engineering, frontend craft, and delivery tools that keep work maintainable as projects grow.
            </p>
          </div>

          {isAdmin && (
            <button onClick={() => setIsAdding(prev => !prev)} className="button-primary shrink-0">
              {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {isAdding ? 'Cancel' : 'Add Skill'}
            </button>
          )}
        </div>

        {isAdding && (
          <form onSubmit={handleCreate} className="glass-card mx-auto mb-10 max-w-3xl rounded-[2rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Add a New Skill
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="ui-label">Skill Name</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="ui-input" placeholder="GraphQL" required />
              </div>
              <div>
                <label className="ui-label">Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="ui-select">
                  {CATEGORIES.map(category => <option key={category}>{category}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="ui-label">Proficiency ({newProficiency}%)</label>
                <input type="range" min="0" max="100" value={newProficiency} onChange={e => setNewProficiency(Number(e.target.value))} className="mt-4 w-full cursor-pointer accent-violet-600" />
              </div>
              <div>
                <label className="ui-label">Order</label>
                <input type="number" value={newOrder} onChange={e => setNewOrder(e.target.value)} className="ui-input" />
              </div>
            </div>

            <button type="submit" className="button-primary mt-6 w-full">Save Skill</button>
          </form>
        )}

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-500 dark:text-slate-400">Loading skills...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {CATEGORIES.map(category => {
              const gradient = CAT_COLORS[category] || 'from-violet-500 to-cyan-500';
              const list = grouped[category] || [];

              return (
                <div key={category} className="glass-card rounded-[2rem] p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-200/70 pb-4 dark:border-white/10">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{category}</h3>
                    <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                      {list.length}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {list.length > 0 ? (
                      list.map(skill => (
                        <div key={skill.id}>
                          {editingId === skill.id ? (
                            <InlineEditForm skill={skill} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
                          ) : (
                            <SkillRow
                              skill={skill}
                              gradientClass={gradient}
                              isAdmin={isAdmin}
                              onEdit={setEditingId}
                              onDelete={handleDelete}
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm italic text-slate-500 dark:text-slate-400">No skills in this category yet.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
