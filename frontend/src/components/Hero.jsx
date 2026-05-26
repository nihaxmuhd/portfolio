import { ArrowRight, FileText, Mail } from 'lucide-react';
import { Github, Linkedin } from './CustomIcons';

const STATS = [
  { value: '3+', label: 'Years Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: '5+', label: 'Tech Stacks' },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.75rem)] items-center overflow-hidden py-12 sm:py-16 lg:py-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 dark:opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
        }}
      />
      <div aria-hidden className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-violet-500/16 blur-3xl" />
      <div aria-hidden className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,24rem)] lg:gap-14">
          <div className="flex flex-col items-start gap-6 text-left">
            <span className="pill border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available for projects and freelance
            </span>

            <div className="space-y-4">
              <p className="section-kicker text-cyan-600 dark:text-cyan-400">Full-stack developer and UI designer</p>
              <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-[4.4rem]">
                Building
                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent"> polished digital products </span>
                with depth, speed, and care.
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Hi, I&apos;m Muhammed Nihad. I design and develop portfolio-grade web experiences with clean Django architecture,
              thoughtful React interfaces, and production-ready frontend systems that feel refined on every screen.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a href="#projects" className="button-primary w-full sm:w-auto">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="button-secondary w-full sm:w-auto">
                Let&apos;s Talk
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a href="mailto:your.email@example.com" className="button-ghost min-h-11 rounded-2xl px-4 text-sm" title="Email">
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a href="#" className="button-ghost min-h-11 rounded-2xl px-4 text-sm" title="Resume">
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="glass-card rounded-[1.75rem] p-6 sm:p-7"
              >
                <p className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">{stat.value}</span>
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
