import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

import {
  CheckCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send
} from 'lucide-react';

const premiumAlert = Swal.mixin({
  background: 'rgba(15, 23, 42, 0.96)',
  color: '#fff',

  confirmButtonColor: '#7c3aed',
  cancelButtonColor: '#334155',

  customClass: {
    popup:
      'rounded-[28px] border border-white/10 backdrop-blur-xl shadow-2xl',
    title: 'text-2xl font-bold',
    htmlContainer: 'text-slate-300',
    confirmButton:
      'rounded-xl px-5 py-3 font-semibold',
    cancelButton:
      'rounded-xl px-5 py-3 font-semibold',
  },
});

const CONTACT_DETAILS = [
  {
    icon: Mail,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-600',
    label: 'Email Me',
    value: 'muhammadnihad16@gmail.com',
    href:
      'https://mail.google.com/mail/?view=cm&fs=1&to=muhammadnihad16@gmail.com',
  },

  {
    icon: Phone,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-600',
    label: 'Call Me',
    value: '+91 9562733638',
    href: 'tel:+919562733638',
  },

  {
    icon: MapPin,
    color: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20 group-hover:bg-rose-600',
    label: 'Location',
    value: 'Kozhikode, India',
    href: 'https://maps.app.goo.gl/KBV43sUVsqz1ziGy7',
  },
];

export default function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/contact/',
        {
          name,
          email,
          message,
        }
      );

      setSent(true);

      toast.success('Message sent successfully ✨');

      premiumAlert.fire({
        icon: 'success',
        title: 'Message Delivered',
        text: 'Thanks for reaching out. I will reply soon.',
      });

      setName('');
      setEmail('');
      setMessage('');

    } catch (error) {

      console.error(error);

      toast.error('Unable to send message');

      premiumAlert.fire({
        icon: 'error',
        title: 'Message Failed',
        text: 'Something went wrong while sending the message.',
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <section
      id="contact"
      className="section-shell section-divider bg-slate-50/55 dark:bg-slate-950/20"
    >

      <div className="container">

        {/* SECTION HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="section-heading centered mb-14 md:mb-16"
        >

          <p className="section-kicker text-cyan-600 dark:text-cyan-400">
            Get in touch
          </p>

          <h2 className="section-title text-slate-950 dark:text-white">
            Let&apos;s build something thoughtful together.
          </h2>

          <p className="section-copy">
            Reach out for freelance work, product collaboration,
            or a quick conversation about a project you want
            to shape well from the start.
          </p>

        </motion.div>

        {/* MAIN GRID */}

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] lg:gap-8">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >

            <div className="glass-card rounded-[2rem] p-6 sm:p-7">

              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Contact details
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                If you already know what you need,
                the fastest route is email.
                If not, send a message and we can shape the scope together.
              </p>

            </div>

            {CONTACT_DETAILS.map(
              ({ icon: Icon, color, bg, label, value, href }) => {

                const content = (

                  <div
                    className="
                      glass-card
                      group
                      flex
                      cursor-pointer
                      items-center
                      gap-4
                      rounded-[1.6rem]
                      p-4
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]
                      hover:border-violet-500/30
                      sm:p-5
                    "
                  >

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        ${bg}
                        ${color}
                        transition-all
                        duration-300
                        group-hover:text-white
                      `}
                    >

                      <Icon className="h-5 w-5" />

                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        {label}
                      </p>

                      <p className="truncate pt-1 text-sm font-semibold text-slate-800 dark:text-white sm:text-base">
                        {value}
                      </p>

                    </div>

                  </div>
                );

                return href ? (

                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>

                ) : (

                  <div key={label}>
                    {content}
                  </div>

                );
              }
            )}
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-card rounded-[2rem] p-6 sm:p-8"
          >

            {sent ? (

              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 140
                  }}
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >

                  <CheckCircle className="h-8 w-8" />

                </motion.div>

                <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  Message sent
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Thanks for reaching out.
                  I&apos;ll get back to you as soon as possible,
                  usually within one business day.
                </p>

                <button
                  onClick={() => setSent(false)}
                  className="button-secondary mt-6"
                >
                  Send Another
                </button>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div className="flex items-center gap-3 pb-2 text-slate-950 dark:text-white">

                  <div className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-violet-500/10
                    text-violet-600
                    dark:text-violet-400
                  ">

                    <MessageSquare className="h-5 w-5" />

                  </div>

                  <div>

                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      Send a direct message
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      A simple form for inquiries and collaboration ideas.
                    </p>

                  </div>
                </div>

                {/* NAME */}

                <div>

                  <label className="ui-label">
                    Your Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      ui-input
                      focus:ring-2
                      focus:ring-violet-500/40
                      focus:border-violet-500
                      transition-all
                      duration-300
                    "
                    placeholder="Muhammed Nihad"
                    required
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="ui-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      ui-input
                      focus:ring-2
                      focus:ring-violet-500/40
                      focus:border-violet-500
                      transition-all
                      duration-300
                    "
                    placeholder="you@example.com"
                    required
                  />

                </div>

                {/* MESSAGE */}

                <div>

                  <label className="ui-label">
                    Message
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    className="
                      ui-textarea
                      focus:ring-2
                      focus:ring-violet-500/40
                      focus:border-violet-500
                      transition-all
                      duration-300
                    "
                    placeholder="Hi, I'd love to discuss a project..."
                    required
                  />

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    button-primary
                    w-full
                    disabled:translate-y-0
                    disabled:opacity-60
                  "
                >

                  {loading ? (

                    <span className="flex items-center justify-center gap-2">

                      <span className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                      "></span>

                      Sending...

                    </span>

                  ) : (

                    <span className="flex items-center justify-center gap-2">

                      Send Message

                      <Send className="h-4 w-4" />

                    </span>

                  )}

                </button>

              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}