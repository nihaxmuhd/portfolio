import { Heart, Lock } from 'lucide-react';

export default function Footer({ onOpenLogin, isAdmin }) {
  return (
    <footer className="section-divider bg-white/45 py-10 dark:bg-slate-950/55">
      <div className="container">
        <div className="glass rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
            <div className="space-y-2">
              <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300 lg:justify-start">
                Built with
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                using React, Tailwind CSS, Django REST Framework, and SQLite
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                &copy; {new Date().getFullYear()} Muhammed Nihad. All rights reserved.
              </p>
            </div>

            {isAdmin ? (
              <span className="pill border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Admin Session Active
              </span>
            ) : (
              <button onClick={onOpenLogin} className="button-ghost">
                <Lock className="h-4 w-4" />
                Admin Access
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
