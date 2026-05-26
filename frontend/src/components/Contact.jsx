import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

const CONTACT_DETAILS = [
  {
    icon: Mail,
    color: 'text-violet-600 dark:text-violet-400',
    bg:    'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-600',
    label: 'Email Me',
    /* PLACEHOLDER: YOUR EMAIL */
    value: 'nihad@example.com',
    href:  'mailto:nihad@example.com',
  },
  {
    icon: Phone,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg:    'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-600',
    label: 'Call Me',
    /* PLACEHOLDER: YOUR PHONE */
    value: '+91 98765 43210',
    href:  'tel:+919876543210',
  },
  {
    icon: MapPin,
    color: 'text-rose-500 dark:text-rose-400',
    bg:    'bg-rose-500/10 border-rose-500/20 group-hover:bg-rose-600',
    label: 'Location',
    /* PLACEHOLDER: YOUR CITY */
    value: 'Kerala, India',
    href:  null,
  },
];

export default function Contact() {
  const [name,    setName   ] = useState('');
  const [email,   setEmail  ] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent,    setSent   ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setSent(true);
      setName(''); setEmail(''); setMessage('');
    }, 1400);
  };

  const inp = 'w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/8 focus:outline-none focus:border-violet-500 text-slate-900 dark:text-white text-sm transition-colors';

  return (
    <section id="contact" className="section-divider py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="container">

        {/* ── Heading ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-widest mt-3">
            Let's collaborate or build something together
          </p>
        </div>

        {/*
          Two-column: details (left) | form (right)
          Stack on mobile, side-by-side on lg
        */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* ── Left: Contact details ── */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-5">
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Contact Details</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                Have a project idea, job inquiry, or want to discuss collaboration? Reach out via the form or the links below.
              </p>
            </div>
            {CONTACT_DETAILS.map(({ icon: Icon, color, bg, label, value, href }) => {
              const inner = (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900/20 hover:border-violet-300 dark:hover:border-violet-500/20 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all group shadow-sm">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${color} ${bg} group-hover:text-white transition-colors flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{value}</p>
                  </div>
                </div>
              );
              return href
                ? <a key={label} href={href}>{inner}</a>
                : <div key={label}>{inner}</div>;
            })}
          </div>

          {/* ── Right: Message form ── */}
          <div className="w-full flex-1">
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10">
              {sent ? (
                <div className="py-14 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h4>
                  <p className="text-sm text-slate-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-300 font-semibold text-sm transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-4">
                    <MessageSquare className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <span>Send a Direct Message</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Your Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className={inp} placeholder="Muhammed Nihad" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inp} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" className={inp + ' font-sans'} placeholder="Hi, I'd love to build a project with you…" required />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-500/20 transition-all"
                  >
                    {loading ? 'Sending…' : <><span>Send Message</span><Send className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
