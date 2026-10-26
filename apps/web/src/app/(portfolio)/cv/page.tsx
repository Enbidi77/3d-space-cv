'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Printer,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import {
  profileData,
  experienceData,
  skillsData,
  skillCategoriesData,
  projectsData,
  educationData,
} from '@space/portfolio-content';
import { GlassPanel, Badge, Button } from '@space/ui';
import { CopyButton } from '@/components/common/CopyButton';

export default function CvPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top action bar */}
      <div className="mb-6 flex items-center justify-between no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Galaxy View</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </Button>
        </div>
      </div>

      {/* CV Document Container */}
      <div className="p-6 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl flex flex-col gap-8 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight uppercase">
              {profileData.name}
            </h1>
            <p className="text-lg font-semibold text-cyan-400 print:text-cyan-700 mt-1">
              {profileData.title}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 print:text-slate-600 mt-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profileData.location}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-2 text-xs text-slate-300 print:text-slate-700">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`tel:${profileData.phone}`} className="hover:text-cyan-300">
                  {profileData.phone}
                </a>
              </span>
              <div className="no-print">
                <CopyButton textToCopy={profileData.phone} label="Copy" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${profileData.email}`} className="hover:text-cyan-300">
                  {profileData.email}
                </a>
              </span>
              <div className="no-print">
                <CopyButton textToCopy={profileData.email} label="Copy" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <a
                href={profileData.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1"
              >
                cv-portfolio.vercel.app
                <ExternalLink className="w-3 h-3 no-print" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1"
              >
                github.com/Enbidi77
                <ExternalLink className="w-3 h-3 no-print" />
              </a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-cyan-800 mb-2 font-bold">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800">
            {profileData.summary}
          </p>
        </section>

        {/* Work Experience */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-cyan-800 mb-4 font-bold flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Work Experience</span>
          </h2>
          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="border-l-2 border-slate-700 print:border-slate-300 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-base font-bold text-white print:text-black">
                    {exp.role} • <span className="text-cyan-300 print:text-cyan-800 font-semibold">{exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400 print:text-slate-600">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2 mt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed flex items-start gap-2">
                      <span className="text-cyan-400 print:text-cyan-800 mt-1.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3 no-print">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="neutral" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Technical Projects */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-cyan-800 mb-4 font-bold">
            Key Technical Projects
          </h2>
          <div className="space-y-6">
            {projectsData.map((project) => (
              <div key={project.id} className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800/80 print:border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-base font-bold text-white print:text-black flex items-center gap-2">
                    <span>{project.title}</span>
                    {project.clientContext && (
                      <span className="text-xs font-normal text-slate-400 print:text-slate-600">
                        ({project.clientContext})
                      </span>
                    )}
                  </h3>
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-400 print:text-cyan-700 hover:text-cyan-300 flex items-center gap-1 font-medium no-print"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-xs font-mono text-cyan-400/90 print:text-cyan-800 mb-3">
                  {project.technologies.join(' • ')}
                </p>

                <ul className="space-y-2 mb-3">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed flex items-start gap-2">
                      <span className="text-cyan-400 print:text-cyan-800 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-cyan-800 mb-3 font-bold flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </h2>
          <div className="border-l-2 border-slate-700 print:border-slate-300 pl-4 py-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-base font-bold text-white print:text-black">
                {educationData.institution}
              </h3>
              <span className="text-xs font-mono text-slate-400 print:text-slate-600">
                {educationData.period}
              </span>
            </div>
            <p className="text-sm text-cyan-300 print:text-cyan-800 font-medium mt-1">
              {educationData.degree}
            </p>
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-cyan-800 mb-4 font-bold flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span>Technical Skills</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategoriesData.map((category) => {
              const items = skillsData.filter((s) => s.category === category.id);
              return (
                <div key={category.id} className="p-3.5 rounded-xl bg-slate-950/40 print:bg-slate-50 border border-slate-800/60 print:border-slate-200">
                  <h3 className="text-xs font-semibold text-slate-300 print:text-slate-800 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill.id}
                        className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 print:bg-slate-200 print:text-slate-800"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

