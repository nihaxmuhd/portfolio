import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit,
  ExternalLink,
  Image as ImageIcon,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { Github } from './CustomIcons';
import { api } from '../api';

const STATUS_BADGE = {
  Completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'In Progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Planning: 'bg-slate-500/10 text-slate-500 dark:text-slate-400',
};

const PROGRESS_BAR = {
  Completed: 'from-emerald-500 to-teal-400',
  'In Progress': 'from-amber-500 to-orange-400',
  Planning: 'from-slate-400 to-slate-500',
};

const DEFAULTS = [
  {
    id: 'd1',
    title: 'Velmora Leather Landing Page',
    order: 1,
    project_progress: 100,
    status: 'Completed',
    description: 'A premium e-commerce landing page with smooth scroll-triggered product animation, editorial layouts, and a polished design system.',
    tech_stack: 'React.js, Tailwind CSS, GSAP, Canvas, Django, SQLite',
    github_url: 'https://github.com/yourusername/velmora-leather',
    live_url: 'https://velmoraleather.demo',
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'd2',
    title: 'Zetca Live Dashboard',
    order: 2,
    project_progress: 85,
    status: 'In Progress',
    description: 'A secure admin dashboard with real-time metrics, JWT authentication handling, and responsive data visualization patterns.',
    tech_stack: 'React.js, Tailwind CSS, Recharts, Django REST Framework, PostgreSQL',
    github_url: 'https://github.com/yourusername/zetca-live-admin',
    live_url: 'https://zetcalive.demo',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'd3',
    title: 'Wallchemy Textures API',
    order: 3,
    project_progress: 100,
    status: 'Completed',
    description: 'A REST API for architectural textures with optimized Django queries, custom pagination, and deployment-ready backend tooling.',
    tech_stack: 'Python, Django REST Framework, SQLite, Postman',
    github_url: 'https://github.com/yourusername/wallchemy-textures-api',
    live_url: 'https://wallchemy.demo',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
  },
];

const normalizeProject = project => {
  const galleryImages = Array.isArray(project.gallery_images) && project.gallery_images.length > 0
    ? project.gallery_images
    : project.image_url
      ? [{ id: `legacy-${project.id}`, url: project.image_url, source: 'url' }]
      : [];

  return {
    ...project,
    project_images: Array.isArray(project.project_images) ? project.project_images : [],
    gallery_images: galleryImages,
  };
};

function ProjectCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const hasMultipleImages = images.length > 1;
  const safeIndex = images.length ? Math.min(activeIndex, images.length - 1) : 0;

  const goToIndex = index => {
    if (!images.length) return;
    const normalized = (index + images.length) % images.length;
    setActiveIndex(normalized);
  };

  const handleTouchStart = event => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = event => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      goToIndex(safeIndex + (deltaX < 0 ? 1 : -1));
    }
    setTouchStartX(null);
  };

  if (!images.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
        <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-600" />
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[safeIndex].id || images[safeIndex].url}
          src={images[safeIndex].url}
          alt={`${title} preview ${safeIndex + 1}`}
          className="h-full w-full object-cover"
          loading="lazy"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={() => goToIndex(activeIndex - 1)}
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur transition-colors hover:bg-slate-900/85"
            aria-label="Previous project image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goToIndex(activeIndex + 1)}
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur transition-colors hover:bg-slate-900/85"
            aria-label="Next project image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/55 px-3 py-1.5 backdrop-blur">
            {images.map((image, index) => (
              <button
                key={image.id || image.url}
                type="button"
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === safeIndex ? 'w-6 bg-white' : 'w-2.5 bg-white/45'}`}
                aria-label={`Go to project image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ proj, isAdmin, onEdit, onDelete, isFinished }) {
  const tags = (proj.tech_stack || '').split(',').map(item => item.trim()).filter(Boolean);
  const progress = proj.project_progress ?? (isFinished ? 100 : 0);
  const status = proj.status || (isFinished ? 'Completed' : 'Planning');

  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden rounded-[2rem]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
        <ProjectCarousel images={proj.gallery_images || []} title={proj.title} />

        {isAdmin && (
          <div className="absolute right-4 top-4 z-20 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onEdit(proj)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950/80 text-slate-200 backdrop-blur hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(proj.id)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950/80 text-rose-300 backdrop-blur hover:text-rose-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {(proj.gallery_images?.length || 0) > 1 && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            {proj.gallery_images.length} images
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
          {proj.title}
        </h3>

        <p className="flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{proj.description}</p>

        {isFinished ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Finished</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className={`rounded-full px-3 py-1 ${STATUS_BADGE[status] ?? STATUS_BADGE.Planning}`}>{status}</span>
              <span className="text-slate-500 dark:text-slate-400">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className={`h-full rounded-full bg-gradient-to-r ${PROGRESS_BAR[status] ?? PROGRESS_BAR.Planning}`} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="rounded-full border border-violet-500/15 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold text-violet-600 dark:text-violet-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-slate-200/70 pt-4 text-sm dark:border-white/10">
          {proj.github_url && (
            <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="button-ghost min-h-10 rounded-xl px-4">
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
          {proj.live_url && (
            <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="button-primary min-h-10 rounded-xl px-4 sm:ml-auto">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function UploadPreview({ image, onRemove }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.25rem] border border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-950/70">
      <img src={image.url} alt={image.name} className="aspect-[4/3] w-full object-cover" />
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">{image.name}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{image.label}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900/80 text-white transition-colors hover:bg-rose-500"
          aria-label={`Remove ${image.name}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ProjectForm({ editingId, initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [desc, setDesc] = useState(initial.description || '');
  const [stack, setStack] = useState(initial.tech_stack || '');
  const [ghUrl, setGhUrl] = useState(initial.github_url || '');
  const [liveUrl, setLiveUrl] = useState(initial.live_url || '');
  const [imgUrl, setImgUrl] = useState(initial.image_url || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [progress, setProgress] = useState(initial.project_progress ?? 100);
  const [status, setStatus] = useState(initial.status || 'Completed');
  const [existingImages, setExistingImages] = useState(initial.project_images || []);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const submit = e => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    const fallbackUrl = imgUrl.trim() || (!existingImages.length && !newImagePreviews.length
      ? `https://picsum.photos/id/${Math.floor(Math.random() * 90) + 10}/900/560`
      : '');

    onSubmit({
      title,
      description: desc,
      tech_stack: stack,
      github_url: ghUrl || null,
      live_url: liveUrl || null,
      image_url: fallbackUrl || null,
      order: parseInt(order, 10) || 0,
      project_progress: progress,
      status,
      existing_image_ids: existingImages.map(image => image.id),
      sync_existing_images: Boolean(editingId),
      new_images: newImagePreviews.map(image => image.file),
    });
  };

  useEffect(() => {
    return () => {
      newImagePreviews.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, [newImagePreviews]);

  const existingImagePreviews = existingImages.map(image => ({
    id: image.id,
    name: `Image ${typeof image.order === 'number' ? image.order + 1 : image.id}`,
    label: 'Saved in backend',
    url: image.url,
  }));

  const handleFileSelect = event => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const previews = files.map(file => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      label: 'New upload',
      url: URL.createObjectURL(file),
      file,
    }));

    setNewImagePreviews(prev => [...prev, ...previews]);
    event.target.value = '';
  };

  const removeSelectedFile = previewId => {
    setNewImagePreviews(prev => {
      const imageToRemove = prev.find(image => image.id === previewId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(image => image.id !== previewId);
    });
  };

  const removeExistingImage = imageId => {
    setExistingImages(prev => prev.filter(image => image.id !== imageId));
  };

  return (
    <form onSubmit={submit} className="glass-card mx-auto mb-10 max-w-5xl rounded-[2rem] p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        <Sparkles className="h-4 w-4 text-violet-500" />
        {editingId ? 'Edit Project' : 'Add New Project'}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="ui-label">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="ui-input" required />
        </div>
        <div>
          <label className="ui-label">Order</label>
          <input type="number" value={order} onChange={e => setOrder(e.target.value)} className="ui-input" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="ui-label">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="ui-select">
            <option>Completed</option>
            <option>In Progress</option>
            <option>Planning</option>
          </select>
        </div>
        <div>
          <label className="ui-label">Progress ({progress}%)</label>
          <div className="flex min-h-[2.85rem] items-center gap-3">
            <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(Number(e.target.value))} className="flex-1 cursor-pointer accent-violet-600" />
            <span className="w-10 text-right text-xs font-bold text-slate-500 dark:text-slate-400">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="ui-label">Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows="4" className="ui-textarea" required />
      </div>

      <div className="mt-4">
        <label className="ui-label">Tech Stack</label>
        <input type="text" value={stack} onChange={e => setStack(e.target.value)} className="ui-input" placeholder="React, Django, PostgreSQL" required />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="ui-label">GitHub URL</label>
          <input type="url" value={ghUrl} onChange={e => setGhUrl(e.target.value)} className="ui-input" placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="ui-label">Live Demo URL</label>
          <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="ui-input" placeholder="https://..." />
        </div>
      </div>

      <div className="mt-4">
        <label className="ui-label">Fallback External Image URL</label>
        <div className="relative">
          <ImageIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="url" value={imgUrl} onChange={e => setImgUrl(e.target.value)} className="ui-input pl-11" placeholder="Optional if you also want to support an external image" />
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-dashed border-violet-300/60 bg-violet-500/5 p-5 dark:border-violet-500/30 dark:bg-violet-500/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Project gallery uploads</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload multiple local images. They&apos;ll be stored in Django media and shown as a responsive slider.</p>
          </div>
          <label className="button-primary cursor-pointer">
            <Upload className="h-4 w-4" />
            Upload Images
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
          </label>
        </div>

        {(existingImagePreviews.length > 0 || newImagePreviews.length > 0) ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {existingImagePreviews.map(image => (
              <UploadPreview key={`existing-${image.id}`} image={image} onRemove={() => removeExistingImage(image.id)} />
            ))}
            {newImagePreviews.map(image => (
              <UploadPreview key={`new-${image.id}`} image={image} onRemove={() => removeSelectedFile(image.id)} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.25rem] bg-white/75 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
            No uploaded images selected yet.
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="button-primary flex-1">
          {editingId ? 'Save Changes' : 'Publish'}
        </button>
        <button type="button" onClick={onCancel} className="button-secondary flex-1 sm:flex-none">
          Cancel
        </button>
      </div>
    </form>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="section-header-row">
      <div className="section-heading">
        <p className="section-kicker text-cyan-600 dark:text-cyan-400">{subtitle}</p>
        <h2 className="section-title text-slate-950 dark:text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export default function Projects({ isAdmin }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formInitial, setFormInitial] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getProjects();
        setProjects((data?.length ? data : DEFAULTS).map(normalizeProject));
      } catch {
        setProjects(DEFAULTS.map(normalizeProject));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormInitial({});
    setIsFormOpen(true);
  };

  const openEdit = project => {
    setEditingId(project.id);
    setFormInitial(normalizeProject(project));
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormInitial({});
  };

  const handleFormSubmit = async payload => {
    try {
      const isPersistedProject = editingId && !String(editingId).startsWith('d');

      if (isPersistedProject) {
        const updated = normalizeProject(await api.updateProject(editingId, payload));
        setProjects(prev => prev.map(project => (project.id === editingId ? updated : project)));
      } else {
        const created = normalizeProject(await api.createProject(payload));
        setProjects(prev => [...prev.filter(project => !String(project.id).startsWith('d')), created]);
      }
      closeForm();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;

    if (String(id).startsWith('d')) {
      setProjects(prev => prev.filter(project => project.id !== id));
      return;
    }

    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const sorted = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));
  const active = sorted.filter(project => !(Number(project.project_progress) === 100 && project.status === 'Completed'));
  const finished = sorted.filter(project => Number(project.project_progress) === 100 && project.status === 'Completed');

  if (loading) {
    return (
      <section id="projects" className="section-shell section-divider">
        <div className="container py-16 text-center text-sm text-slate-500 dark:text-slate-400">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-shell section-divider">
      <div className="container">
        <SectionHeader
          title="Featured projects shaped for real use and clean presentation."
          subtitle="Active work and recent highlights"
          action={
            isAdmin && (
              <button onClick={isFormOpen ? closeForm : openAdd} className="button-primary shrink-0">
                {isFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {isFormOpen ? 'Cancel' : 'Add Project'}
              </button>
            )
          }
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {active.map(project => (
              <ProjectCard
                key={project.id}
                proj={project}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onDelete={handleDelete}
                isFinished={false}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm italic text-slate-500 dark:text-slate-400">No active projects right now.</p>
        )}

        {finished.length > 0 && (
          <div className="mt-20 border-t border-slate-200/80 pt-12 dark:border-white/10">
            <SectionHeader title="Finished projects" subtitle="Completed and shipped" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {finished.map(project => (
                <ProjectCard
                  key={project.id}
                  proj={project}
                  isAdmin={isAdmin}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  isFinished
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
