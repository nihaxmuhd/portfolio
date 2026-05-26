import {
  Code2,
  Database,
  Layers3,
  Rocket,
} from 'lucide-react';

const CARDS = [
  {
    icon: Code2,
    color:
      'text-violet-600 dark:text-violet-400',
    title:
      'Backend Development',
    body:
      'Focused on Django, Django REST Framework, authentication systems, scalable APIs, and clean backend architecture.',
  },

  {
    icon: Layers3,
    color:
      'text-cyan-600 dark:text-cyan-400',
    title:
      'Frontend Development',
    body:
      'Building responsive React interfaces with Tailwind CSS, reusable components, and smooth user experiences.',
  },

  {
    icon: Database,
    color:
      'text-emerald-600 dark:text-emerald-400',
    title:
      'Database & APIs',
    body:
      'Experience working with PostgreSQL, MSSQL, SQLite, REST APIs, and structured data systems.',
  },

  {
    icon: Rocket,
    color:
      'text-amber-500 dark:text-amber-400',
    title:
      'Continuous Learning',
    body:
      'Always improving through real-world projects, better system design, and modern development practices.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-shell section-divider"
    >
      <div className="container">

        {/* HEADER */}

        <div className="section-heading centered mb-14 md:mb-16">

          <p className="section-kicker text-violet-600 dark:text-violet-400">
            About Me
          </p>

          <h2 className="section-title text-slate-950 dark:text-white">

            Building reliable
            full-stack systems
            with clean code and
            modern interfaces.

          </h2>

          <p className="section-copy max-w-3xl mx-auto">

            I focus on building
            scalable web
            applications with
            clean backend
            architecture,
            responsive frontend
            interfaces, and
            production-ready
            systems that solve
            real problems.

          </p>

        </div>

        {/* GRID */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">

          {/* LEFT */}

          <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">

            <div className="space-y-5">

              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">

                Full Stack
                Developer
                specialized in
                Django and React.

              </h3>

              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">

                Hi, I&apos;m
                Muhammed Nihad,
                a developer who
                enjoys building
                practical and
                scalable web
                systems.

                My focus is on
                backend
                architecture,
                REST API
                development,
                authentication,
                database design,
                and modern
                frontend
                interfaces using
                React.

              </p>

              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">

                I work mainly
                with Django,
                Django REST
                Framework,
                React.js,
                Tailwind CSS,
                PostgreSQL,
                MSSQL, and
                scalable API
                systems.

                I enjoy creating
                applications that
                are clean,
                maintainable,
                responsive, and
                practical for
                real-world usage.

              </p>

              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">

                I continuously
                improve my skills
                by building
                projects,
                exploring better
                architecture
                patterns, and
                learning modern
                full-stack
                development
                workflows.

              </p>

            </div>

            {/* PHILOSOPHY */}

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 dark:border-white/8 dark:bg-slate-950/60">

              <div className="bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3">

                <span className="text-xs font-bold uppercase tracking-[0.22em] text-white">

                  Development
                  Philosophy

                </span>

              </div>

              <p className="px-5 py-5 text-sm italic leading-7 text-slate-700 dark:text-slate-300 sm:text-base">

                I believe great
                software comes
                from clean
                architecture,
                maintainable
                systems, and a
                frontend
                experience that
                feels simple,
                responsive, and
                reliable.

              </p>

            </div>
          </div>

          {/* RIGHT */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">

            {CARDS.map(
              ({
                icon:
                  Icon,
                color,
                title,
                body,
              }) => (
                <div
                  key={
                    title
                  }
                  className="glass-card rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >

                  <div
                    className={`
                      mb-4
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                      dark:bg-slate-900
                      ${color}
                    `}
                  >

                    <Icon className="h-6 w-6" />

                  </div>

                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">

                    {title}

                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">

                    {body}

                  </p>

                </div>
              )
            )}

          </div>
        </div>
      </div>
    </section>
  );
}