import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Mail,
  Sparkles,
} from 'lucide-react';

import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import { api } from '../api';
import {
  Github,
  Linkedin,
} from './CustomIcons';

const CAREER_START_DATE =
  '2025-05-06';

const premiumAlert =
  Swal.mixin({
    background:
      'rgba(15, 23, 42, 0.96)',

    color: '#fff',

    confirmButtonColor:
      '#7c3aed',

    customClass: {
      popup:
        'rounded-[28px] border border-white/10 backdrop-blur-xl shadow-2xl',

      title:
        'text-2xl font-bold',

      htmlContainer:
        'text-slate-300',

      confirmButton:
        'rounded-xl px-5 py-3 font-semibold',
    },
  });

export default function Hero() {
  const [
    resumeUrl,
    setResumeUrl,
  ] = useState('');

  const [
    projectsCount,
    setProjectsCount,
  ] = useState(0);

  const [
    skillsCount,
    setSkillsCount,
  ] = useState(0);

  const experienceYears =
    useMemo(() => {
      const start =
        new Date(
          CAREER_START_DATE
        );

      const now =
        new Date();

      const diffInMs =
        now - start;

      const years =
        diffInMs /
        (1000 *
          60 *
          60 *
          24 *
          365.25);

      return years.toFixed(
        1
      );
    }, []);

  useEffect(() => {
    const loadHeroData =
      async () => {
        try {
          const [
            projects,
            skills,
            resume,
          ] =
            await Promise.all(
              [
                api.getProjects(),
                api.getSkills(),
                api.resume(),
              ]
            );

          setProjectsCount(
            Array.isArray(
              projects
            )
              ? projects.length
              : 0
          );

          setSkillsCount(
            Array.isArray(
              skills
            )
              ? skills.length
              : 0
          );

          if (
            Array.isArray(
              resume
            ) &&
            resume.length >
              0
          ) {
            setResumeUrl(
              resume[0]
                ?.file ||
                ''
            );
          }
        } catch (
          error
        ) {
          console.error(
            error
          );
        }
      };

    loadHeroData();
  }, []);

  const handleResumeDownload =
    () => {
      toast.success(
        'Downloading Resume ✨'
      );

      premiumAlert.fire(
        {
          icon:
            'success',

          title:
            'Resume Download Started',

          text:
            'Thanks for viewing my resume 🚀',

          timer: 2500,

          showConfirmButton:
            false,
        }
      );
    };

  const stats = [
    {
      value: `${experienceYears}+`,
      label:
        'Years Experience',
      icon:
        Briefcase,
    },

    {
      value: `${projectsCount}+`,
      label:
        'Projects Built',
      icon:
        Sparkles,
    },

    {
      value: `${skillsCount}+`,
      label:
        'Tech Skills',
      icon:
        FileText,
    },
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-4.75rem)] items-center overflow-hidden py-12 sm:py-16 lg:py-20">

      {/* BACKGROUND */}

      <div
        aria-hidden
        className="absolute inset-0 opacity-70 dark:opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize:
            '4.5rem 4.5rem',
        }}
      />

      <div
        aria-hidden
        className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-violet-500/16 blur-3xl"
      />

      <div
        aria-hidden
        className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl"
      />

      <div className="container relative z-10">

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,24rem)] lg:gap-14">

          {/* LEFT */}

          <div className="flex flex-col items-start gap-6 text-left">

            <span className="pill border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              Open for Freelance &
              Full Stack
              Opportunities
            </span>

            <div className="space-y-4">

              <p className="section-kicker text-cyan-600 dark:text-cyan-400">

                Full Stack
                Developer

              </p>

              <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-[4.4rem]">

                Building

                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                  {' '}
                  scalable web
                  systems
                  {' '}
                </span>

                with clean
                backend
                architecture
                and modern UI.

              </h1>
            </div>

            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">

              Hi, I&apos;m
              Muhammed Nihad
              — a Full Stack
              Developer focused
              on Django,
              Django REST
              Framework,
              React, API
              development,
              responsive UI,
              and scalable
              web systems.

              I enjoy building
              production-ready
              applications with
              clean backend
              architecture and
              modern frontend
              experiences.

            </p>

            {/* STACK */}

            <div className="flex flex-wrap gap-2">

              {[
                'Django',
                'DRF',
                'React',
                'PostgreSQL',
                'Tailwind',
                'MSSQL',
              ].map(
                skill => (
                  <span
                    key={
                      skill
                    }
                    className="rounded-full border border-violet-500/15 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-600 dark:text-violet-300"
                  >
                    {
                      skill
                    }
                  </span>
                )
              )}
            </div>

            {/* BUTTONS */}

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">

              <a
                href="#projects"
                className="button-primary w-full sm:w-auto"
              >
                View Projects

                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="button-secondary w-full sm:w-auto"
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* SOCIALS */}

            <div className="flex flex-wrap items-center gap-3 pt-1">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href="mailto:muhammadnihad16@gmail.com"
                className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>

              {resumeUrl && (
                <a
                  href={
                    resumeUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={
                    handleResumeDownload
                  }
                  className="button-ghost min-h-11 rounded-2xl px-4 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">

            {stats.map(
              stat => {
                const Icon =
                  stat.icon;

                return (
                  <div
                    key={
                      stat.label
                    }
                    className="glass-card rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
                  >

                    <div className="mb-4 flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">

                        <Icon className="h-5 w-5" />

                      </div>

                    </div>

                    <p className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">

                      <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">

                        {
                          stat.value
                        }

                      </span>

                    </p>

                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">

                      {
                        stat.label
                      }

                    </p>

                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}