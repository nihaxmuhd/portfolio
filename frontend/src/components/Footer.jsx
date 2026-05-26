import React from 'react';
import { Lock, Heart } from 'lucide-react';

export default function Footer({ onOpenLogin, isAdmin }) {
  return (
    <footer className="section-divider py-10 bg-white/40 dark:bg-slate-950/60">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center">

          {/* Tech credits */}
          <p className="text-xs text-slate-500 dark:text-gray-500 flex items-center justify-center gap-1.5 flex-wrap">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 flex-shrink-0" />
            {' '}using React, Tailwind CSS, Django REST Framework &amp; SQLite
          </p>

          {/* Copyright + admin link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-500 dark:text-gray-400">
            {/* PLACEHOLDER: YOUR NAME */}
            <span>&copy; {new Date().getFullYear()} Muhammed Nihad. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-gray-600" aria-hidden>|</span>

            {isAdmin ? (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Admin Session Active
              </span>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-700 dark:text-gray-600 dark:hover:text-gray-300 hover:underline transition-colors"
                title="Admin Login"
              >
                <Lock className="w-3 h-3" /> Admin Access
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
