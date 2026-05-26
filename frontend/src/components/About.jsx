// // import React from 'react';
// // import { Briefcase, Award, Heart, GraduationCap } from 'lucide-react';

// // const TRAITS = [
// //   { icon: Briefcase,    color: 'text-violet-600 dark:text-violet-400', title: 'Product Mindset',    body: 'Applying management principles to build scalable features that align with key user metrics.' },
// //   { icon: Award,        color: 'text-cyan-600 dark:text-cyan-400',     title: 'Full-Stack Flow',    body: 'Handling everything from Django model design, DRF serializers, custom auth, to React state.' },
// //   { icon: Heart,        color: 'text-rose-500 dark:text-rose-400',     title: 'UX & Design',        body: 'Creating sleek interfaces, glassmorphic effects, and responsive grids for a premium impression.' },
// //   { icon: GraduationCap,color: 'text-amber-500 dark:text-amber-400',   title: 'Always Learning',   body: 'Continuously upgrading skills in systems design, caching strategies, and modern React patterns.' },
// // ];

// // export default function About() {
// //   return (
// //     <section id="about" className="section-divider py-20 md:py-28">
// //       <div className="container">

// //         {/* ── Heading ── */}
// //         <div className="text-center mb-14">
// //           <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
// //             About Me
// //           </h2>
// //           <p className="text-violet-500 dark:text-violet-400 text-xs font-semibold uppercase tracking-widest mt-3">
// //             The intersection of business strategy and software engineering
// //           </p>
// //         </div>

// //         {/*
// //           Desktop: narrative (7 cols) | trait cards (5 cols)
// //           Mobile:  stacked vertically
// //         */}
// //         <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

// //           {/* ── Left: Narrative ── */}
// //           <div className="w-full lg:flex-[7] space-y-6">
// //             <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug">
// //               Bridging management insight with full-stack implementation.
// //             </h3>

// //             {/* PLACEHOLDER: YOUR BACKGROUND STORY */}
// //             <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
// //               I come from a unique background combining business administration and project
// //               coordination with a passion for software development. This dual-lens approach
// //               lets me see software not just as syntax, but as a mechanism to achieve strategic
// //               organisational goals and solve practical pain points.
// //             </p>
// //             <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
// //               My journey into programming started when I realised many operational problems in
// //               corporate settings could be automated. Rather than relying on off-the-shelf tools,
// //               I dove deep into Python, web architectures, database schemas, and modern responsive
// //               user interfaces.
// //             </p>

// //             {/* PLACEHOLDER: YOUR PHILOSOPHY */}
// //             <div className="mt-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
// //               <div className="px-4 py-2 bg-violet-600">
// //                 <span className="text-[10px] uppercase font-bold text-white tracking-wider">My Philosophy</span>
// //               </div>
// //               <p className="px-5 py-4 text-sm italic text-slate-700 dark:text-gray-300 leading-relaxed">
// //                 "Great software is built at the intersection of extreme user empathy, clean API
// //                 design, and modular code. I write code that is clean to read, easy to test, and
// //                 delivers value from day one."
// //               </p>
// //             </div>
// //           </div>

// //           {/* ── Right: Trait cards ── */}
// //           <div className="w-full lg:flex-[5] grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {TRAITS.map(({ icon: Icon, color, title, body }) => (
// //               <div
// //                 key={title}
// //                 className="p-5 rounded-2xl glass-card border border-slate-200/50 dark:border-white/5 flex flex-col gap-3"
// //               >
// //                 <span className={color}><Icon className="w-7 h-7" /></span>
// //                 <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
// //                 <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{body}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// import React from 'react';
// import { Briefcase, Award, Heart, GraduationCap } from 'lucide-react';

// const TRAITS = [
//   { icon: Briefcase,    color: 'text-violet-600 dark:text-violet-400', title: 'Product Mindset',    body: 'Applying management principles to build scalable features that align with key user metrics.' },
//   { icon: Award,        color: 'text-cyan-600 dark:text-cyan-400',     title: 'Full-Stack Flow',    body: 'Handling everything from Django model design, DRF serializers, custom auth, to React state.' },
//   { icon: Heart,        color: 'text-rose-500 dark:text-rose-400',     title: 'UX & Design',        body: 'Creating sleek interfaces, glassmorphic effects, and responsive grids for a premium impression.' },
//   { icon: GraduationCap,color: 'text-amber-500 dark:text-amber-400',   title: 'Always Learning',    body: 'Continuously upgrading skills in systems design, caching strategies, and modern React patterns.' },
// ];

// export default function About() {
//   return (
//     <section id="about" className="section-divider py-20 md:py-28">
//       <div className="container mx-auto px-4 max-w-6xl">

//         {/* ── Heading ── */}
//         <div className="text-center mb-14">
//           <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
//             About Me
//           </h2>
//           <p className="text-violet-500 dark:text-violet-400 text-xs font-semibold uppercase tracking-widest mt-3">
//             The intersection of business strategy and software engineering
//           </p>
//         </div>

//         {/* ── Layout Wrapper (Grid for narrative vs cards) ── */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

//           {/* ── Left: Narrative (7 Columns) ── */}
//           <div className="w-full lg:col-span-7 space-y-6">
//             <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug">
//               Bridging management insight with full-stack implementation.
//             </h3>

//             <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
//               I come from a unique background combining business administration and project
//               coordination with a passion for software development. This dual-lens approach
//               lets me see software not just as syntax, but as a mechanism to achieve strategic
//               organisational goals and solve practical pain points.
//             </p>
//             <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
//               My journey into programming started when I realised many operational problems in
//               corporate settings could be automated. Rather than relying on off-the-shelf tools,
//               I dive deep into Python, web architectures, database schemas, and modern responsive
//               user interfaces.
//             </p>

//             {/* Philosophy Box */}
//             <div className="mt-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
//               <div className="px-4 py-2 bg-violet-600">
//                 <span className="text-[10px] uppercase font-bold text-white tracking-wider">My Philosophy</span>
//               </div>
//               <p className="px-5 py-4 text-sm italic text-slate-700 dark:text-gray-300 leading-relaxed">
//                 "Great software is built at the intersection of extreme user empathy, clean API
//                 design, and modular code. I write code that is clean to read, easy to test, and
//                 delivers value from day one."
//               </p>
//             </div>
//           </div>

//           {/* ── Right: Trait cards (5 Columns) ── */}
//           <div className="w-full lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
//             {TRAITS.map(({ icon: Icon, color, title, body }) => (
//               <div
//                 key={title}
//                 className="p-5 rounded-2xl glass-card border border-slate-200/50 dark:border-white/5 flex flex-col gap-3"
//               >
//                 <span className={color}><Icon className="w-7 h-7" /></span>
//                 <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
//                 <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{body}</p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react';
import { Briefcase, Award, Heart, GraduationCap } from 'lucide-react';

const TRAITS = [
  { icon: Briefcase,    color: 'text-violet-600 dark:text-violet-400', title: 'Product Mindset',    body: 'Applying management principles to build scalable features that align with key user metrics.' },
  { icon: Award,        color: 'text-cyan-600 dark:text-cyan-400',     title: 'Full-Stack Flow',    body: 'Handling everything from Django model design, DRF serializers, custom auth, to React state.' },
  { icon: Heart,        color: 'text-rose-500 dark:text-rose-400',     title: 'UX & Design',        body: 'Creating sleek interfaces, glassmorphic effects, and responsive grids for a premium impression.' },
  { icon: GraduationCap,color: 'text-amber-500 dark:text-amber-400',   title: 'Always Learning',    body: 'Continuously upgrading skills in systems design, caching strategies, and modern React patterns.' },
];

export default function About() {
  return (
    <section id="about" className="section-divider py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* ── Heading ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="text-violet-500 dark:text-violet-400 text-xs font-semibold uppercase tracking-widest mt-3">
            The intersection of business strategy and software engineering
          </p>
        </div>

        {/* ── Layout Wrapper (12-Column Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Left: Narrative (7 Columns) ── */}
          <div className="w-full lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug">
              Bridging management insight with full-stack implementation.
            </h3>

            <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
              I come from a unique background combining business administration and project
              coordination with a passion for software development. This dual-lens approach
              lets me see software not just as syntax, but as a mechanism to achieve strategic
              organisational goals and solve practical pain points.
            </p>
            <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed">
              My journey into programming started when I realised many operational problems in
              corporate settings could be automated. Rather than relying on off-the-shelf tools,
              I dive deep into Python, web architectures, database schemas, and modern responsive
              user interfaces.
            </p>

            {/* Philosophy Box */}
            <div className="mt-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
              <div className="px-4 py-2 bg-violet-600">
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">My Philosophy</span>
              </div>
              <p className="px-5 py-4 text-sm italic text-slate-700 dark:text-gray-300 leading-relaxed">
                "Great software is built at the intersection of extreme user empathy, clean API
                design, and modular code. I write code that is clean to read, easy to test, and
                delivers value from day one."
              </p>
            </div>
          </div>

          {/* ── Right: Trait cards (5 Columns) ── */}
          <div className="w-full lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {TRAITS.map(({ icon: Icon, color, title, body }) => (
              <div
                key={title}
                className="p-5 rounded-2xl glass-card border border-slate-200/50 dark:border-white/5 flex flex-col gap-3"
              >
                <span className={color}><Icon className="w-7 h-7" /></span>
                <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}