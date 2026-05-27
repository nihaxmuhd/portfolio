import { useState } from 'react';
import { AlertCircle, Loader2, Lock, User, X } from 'lucide-react';
import { api } from '../api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(
        username,
        password
      );

      onLoginSuccess();

      setUsername("");
      setPassword("");

      onClose();

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md">
      <div className="glass-card relative w-full max-w-md rounded-[2rem] p-6 text-slate-900 shadow-2xl dark:text-white sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close login modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="font-display text-3xl font-bold tracking-tight">Admin Authentication</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Access secure inline editing controls.</p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="ui-label">Username</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="ui-input !pl-12"
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          <div>
            <label className="ui-label">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="ui-input !pl-12"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="button-primary mt-2 w-full disabled:translate-y-0 disabled:opacity-60">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
