import { Award, Briefcase, GraduationCap, Heart } from 'lucide-react';

const TRAITS = [
  {
    icon: Briefcase,
    color: 'text-violet-600 dark:text-violet-400',
    title: 'Product Mindset',
    body: 'I approach engineering decisions with business goals, customer outcomes, and maintainable delivery in mind.',
  },
  {
    icon: Award,
    color: 'text-cyan-600 dark:text-cyan-400',
    title: 'Full-Stack Execution',
    body: 'From backend modeling and APIs to polished frontend states, I enjoy owning the full product experience.',
  },
  {
    icon: Heart,
    color: 'text-rose-500 dark:text-rose-400',
    title: 'Design Care',
    body: 'I focus on clear interfaces, responsive systems, and details that make products feel calm and premium.',
  },
  {
    icon: GraduationCap,
    color: 'text-amber-500 dark:text-amber-400',
    title: 'Always Improving',
    body: 'I keep refining my craft through systems thinking, modern React patterns, and better frontend architecture.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-shell section-divider">
      <div className="container">
        <div className="section-heading centered mb-14 md:mb-16">
          <p className="section-kicker text-violet-600 dark:text-violet-400">About me</p>
          <h2 className="section-title text-slate-950 dark:text-white">Strategy, engineering, and interface craft in one workflow.</h2>
          <p className="section-copy">
            My background blends business thinking with software delivery, which helps me build solutions that are both technically sound and useful in the real world.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="space-y-5">
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Bridging management insight with full-stack implementation.
              </h3>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                I come from a background that combines business administration, coordination, and a deep interest in building software.
                That perspective lets me see code not just as implementation, but as a way to solve operational problems clearly and sustainably.
              </p>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                My journey into development grew from wanting better systems than the off-the-shelf tools around me. That pushed me into Python,
                Django, API design, relational data modeling, and modern frontend work where usability matters just as much as correctness.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 dark:border-white/8 dark:bg-slate-950/60">
              <div className="bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-white">My philosophy</span>
              </div>
              <p className="px-5 py-5 text-sm italic leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
                Great software sits at the intersection of user empathy, reliable architecture, and a frontend experience that feels intentionally designed from the first click.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {TRAITS.map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="glass-card rounded-[1.75rem] p-6">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900/80 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
