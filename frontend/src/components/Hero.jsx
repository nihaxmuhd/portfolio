import { ArrowRight, Mail, FileText } from 'lucide-react';
import { Github, Linkedin } from './CustomIcons';

const STATS = [
  { value: '3+',  label: 'Years Coding'    },
  { value: '10+', label: 'Projects Built'  },
  { value: '5+',  label: 'Tech Stacks'     },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-16 md:py-24">
      {/* Grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.04) 1px,transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />
      {/* Ambient glows */}
      <div aria-hidden className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-500/10  blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="container relative z-10 w-full py-4">
        {/* Two-column: text left, stats right — stacks vertically on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">

          {/* ── Left: Text (always full width on mobile, flex-1 on desktop) ── */}
          <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Available for projects &amp; freelance
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              {/* PLACEHOLDER: YOUR FULL NAME */}
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Muhammed&nbsp;Nihad
              </span>
            </h1>

            {/* PLACEHOLDER: YOUR TITLE */}
            <p className="text-lg sm:text-2xl font-bold font-display text-slate-600 dark:text-gray-300">
              Full-Stack Developer &amp; UI/UX Designer
            </p>

            {/* PLACEHOLDER: YOUR BIO */}
            <p className="text-base text-slate-500 dark:text-gray-400 max-w-lg leading-relaxed">
              I bridge the gap between complex backend architectures and highly
              polished, interactive user interfaces. Specialising in Python,
              Django, React.js, and modern styling frameworks.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/40 text-slate-800 dark:text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
              >
                Let's Talk
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 text-slate-400 dark:text-gray-500">
              {/* PLACEHOLDER: REPLACE HREFS */}
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all" title="GitHub"><Github className="w-5 h-5" /></a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:your.email@example.com" className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all" title="Email"><Mail className="w-5 h-5" /></a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all" title="Resume"><FileText className="w-5 h-5" /></a>
            </div>
          </div>

          {/* ── Right: Stats — horizontal row on mobile, vertical column on lg ── */}
          <div className="w-full lg:w-auto flex flex-row lg:flex-col justify-center gap-4 flex-shrink-0">
            {STATS.map(s => (
              <div key={s.label} className="glass-card rounded-2xl px-5 lg:px-7 py-4 lg:py-5 text-center flex-1 lg:flex-none lg:min-w-[8rem] border border-slate-200/50 dark:border-white/5">
                <p className="text-2xl lg:text-3xl font-extrabold font-display bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mt-1 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce text-slate-400 dark:text-gray-500">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </section>
  );
}
