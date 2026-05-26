import { useState } from 'react';
import { CheckCircle, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';

const CONTACT_DETAILS = [
  {
    icon: Mail,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-600',
    label: 'Email Me',
    value: 'nihad@example.com',
    href: 'mailto:nihad@example.com',
  },
  {
    icon: Phone,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-600',
    label: 'Call Me',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    color: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20 group-hover:bg-rose-600',
    label: 'Location',
    value: 'Kerala, India',
    href: null,
  },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1400);
  };

  return (
    <section id="contact" className="section-shell section-divider bg-slate-50/55 dark:bg-slate-950/20">
      <div className="container">
        <div className="section-heading centered mb-14 md:mb-16">
          <p className="section-kicker text-cyan-600 dark:text-cyan-400">Get in touch</p>
          <h2 className="section-title text-slate-950 dark:text-white">Let&apos;s build something thoughtful together.</h2>
          <p className="section-copy">
            Reach out for freelance work, product collaboration, or a quick conversation about a project you want to shape well from the start.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] lg:gap-8">
          <div className="grid gap-4">
            <div className="glass-card rounded-[2rem] p-6 sm:p-7">
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Contact details</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                If you already know what you need, the fastest route is email. If not, send a message and we can shape the scope together.
              </p>
            </div>

            {CONTACT_DETAILS.map(({ icon: Icon, color, bg, label, value, href }) => {
              const content = (
                <div className="glass-card group flex items-center gap-4 rounded-[1.6rem] p-4 sm:p-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${bg} ${color} transition-colors group-hover:text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="truncate pt-1 text-sm font-semibold text-slate-800 dark:text-white sm:text-base">{value}</p>
                  </div>
                </div>
              );

              return href ? (
                <a key={label} href={href}>
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          <div className="glass-card rounded-[2rem] p-6 sm:p-8">
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Message sent</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible, usually within one business day.
                </p>
                <button onClick={() => setSent(false)} className="button-secondary mt-6">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-3 pb-2 text-slate-950 dark:text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">Send a direct message</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">A simple form for inquiries and collaboration ideas.</p>
                  </div>
                </div>

                <div>
                  <label className="ui-label">Your Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="ui-input" placeholder="Muhammed Nihad" required />
                </div>
                <div>
                  <label className="ui-label">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="ui-input" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="ui-label">Message</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows="6" className="ui-textarea" placeholder="Hi, I&apos;d love to discuss a project..." required />
                </div>
                <button type="submit" disabled={loading} className="button-primary w-full disabled:translate-y-0 disabled:opacity-60">
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
