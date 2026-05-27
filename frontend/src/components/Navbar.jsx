import { useEffect, useState } from 'react';
import { LogOut, Menu, Moon, Shield, Sun, X } from 'lucide-react';
import { api } from '../api';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isAdmin, setIsAdmin, onOpenLogin, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = () => {
  try {
    api.logout();

    localStorage.removeItem(
      "authToken"
    );

    localStorage.removeItem(
      "authUsername"
    );

    sessionStorage.clear();

    setIsAdmin(false);
    setIsOpen(false);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  } catch (error) {
    console.error(error);

    window.location.reload();
  }
};
  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'glass border-slate-200/70 shadow-lg shadow-slate-900/5 dark:border-white/10'
            : 'border-transparent bg-white/70 dark:bg-slate-950/65 backdrop-blur-xl'
        }`}
      >
        <div className="container">
          <div className="flex h-18 items-center justify-between gap-4 py-3">
            <a
              href="#"
              className="min-w-0 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                Dev.Portfolio
              </span>
            </a>

            <div className="hidden items-center gap-6 lg:flex xl:gap-7">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-violet-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-violet-500" />}
              </button>

              {isAdmin ? (
                <>
                  <span className="pill border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Shield className="h-3.5 w-3.5" />
                    Admin Mode
                  </span>
                  <button
                    onClick={handleLogout}
                    className="button-ghost min-h-11 rounded-2xl px-4 text-sm text-rose-500 hover:text-rose-600 dark:text-rose-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-600 transition-colors hover:text-violet-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-violet-500" />}
              </button>

              <button
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 transition-colors hover:text-violet-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? 'max-h-[75vh] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden border-t border-slate-200/70 bg-white/95 dark:border-white/10 dark:bg-slate-950/95`}
        >
          <div className="container py-4">
            <div className="surface-blur rounded-3xl p-3">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-600 dark:text-slate-200 dark:hover:bg-slate-800/70 dark:hover:text-violet-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-3 border-t border-slate-200/70 pt-3 dark:border-white/10">
                {isAdmin ? (
                  <div className="space-y-3">
                    <div className="pill w-full justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Shield className="h-3.5 w-3.5" />
                      Admin Session Active
                    </div>
                    <button
                      onClick={handleLogout}
                      className="button-ghost w-full rounded-2xl text-rose-500 dark:text-rose-400"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenLogin();
                      setIsOpen(false);
                    }}
                    className="button-primary w-full rounded-2xl"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-[4.75rem]" aria-hidden="true" />
    </>
  );
}
