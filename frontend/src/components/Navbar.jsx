import React, { useState, useEffect } from 'react';
import { Shield, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { api } from '../api';

export default function Navbar({ isAdmin, setIsAdmin, onOpenLogin, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile drawer when viewport becomes desktop-sized
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    api.logout();
    setIsAdmin(false);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'About',      href: '#about'      },
    { name: 'Skills',     href: '#skills'     },
    { name: 'Projects',   href: '#projects'   },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact',    href: '#contact'    },
  ];

  return (
    <>
      {/* ── Fixed navbar bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 glass transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/5' : ''
        }`}
        style={{ borderBottom: '1px solid rgba(15,23,42,0.08)' }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#"
              className="flex-shrink-0 text-xl font-bold font-display tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Dev.Portfolio
              </span>
            </a>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* ── Desktop right controls ── */}
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700 text-slate-600 dark:text-gray-300 transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'dark'
                  ? <Sun  className="w-4 h-4 text-amber-400" />
                  : <Moon className="w-4 h-4 text-violet-500" />}
              </button>

              {/* Admin pill / login */}
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    <Shield className="w-3.5 h-3.5" /> Admin Mode
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-400 font-semibold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 font-semibold transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" /> Admin
                </button>
              )}
            </div>

            {/* ── Mobile right controls ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-gray-300 transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'dark'
                  ? <Sun  className="w-4 h-4 text-amber-400" />
                  : <Moon className="w-4 h-4 text-violet-500" />}
              </button>

              {isAdmin && (
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Shield className="w-3 h-3" /> Admin
                </span>
              )}

              <button
                onClick={() => setIsOpen(v => !v)}
                className="p-2 rounded-lg text-slate-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ borderTop: isOpen ? '1px solid rgba(15,23,42,0.07)' : 'none' }}
        >
          <div className="bg-white/95 dark:bg-slate-950/97 backdrop-blur-lg px-4 pt-3 pb-5 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-lg text-base font-semibold text-slate-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100 dark:border-white/10">
              {isAdmin ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-sm font-semibold hover:bg-rose-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Log Out Admin
                </button>
              ) : (
                <button
                  onClick={() => { onOpenLogin(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Spacer so content starts below fixed nav ── */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
