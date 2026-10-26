'use client';

import * as React from 'react';
import {
  Printer,
  Download,
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
import { useGalaxyStore } from '@space/state';
import { Modal, Button, Badge } from '@space/ui';
import {
  profileData,
  experienceData,
  skillsData,
  skillCategoriesData,
  projectsData,
  educationData,
} from '@space/portfolio-content';
import { CopyButton } from '../common/CopyButton';

export const TraditionalCvModal: React.FC = () => {
  const activeOverlay = useGalaxyStore((s) => s.activeOverlay);
  const setActiveOverlay = useGalaxyStore((s) => s.setActiveOverlay);

  const isOpen = activeOverlay === 'cv-modal';

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setActiveOverlay('none')}
      title="Curriculum Vitae"
      subtitle="Official Professional Record"
      maxWidth="4xl"
      className="p-4 sm:p-8"
    >
      <div className="flex flex-col gap-6 text-slate-200">
        {/* Action Header bar inside modal */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="sm">
              Source Verified
            </Badge>
            <span className="text-xs text-slate-400">
              Matches authoritative CV PDF
            </span>
          </div>
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
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-inner flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                {profileData.name}
              </h1>
              <p className="text-lg font-semibold text-cyan-400 mt-1">
                {profileData.title}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profileData.location}</span>
              </div>
            </div>

            {/* Contact details grid */}
            <div className="flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <a href={`tel:${profileData.phone}`} className="hover:text-cyan-300">
                    {profileData.phone}
                  </a>
                </span>
                <CopyButton textToCopy={profileData.phone} label="Copy" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <a href={`mailto:${profileData.email}`} className="hover:text-cyan-300">
                    {profileData.email}
                  </a>
                </span>
                <CopyButton textToCopy={profileData.email} label="Copy" />
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
                  <ExternalLink className="w-3 h-3" />
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
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {profileData.summary}
            </p>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </h2>
            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-700 pl-4 py-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-base font-bold text-white">
                      {exp.role} • <span className="text-cyan-300 font-semibold">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2 mt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-1.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
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
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold">
              Key Technical Projects
            </h2>
            <div className="space-y-6">
              {projectsData.map((project) => (
                <div key={project.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{project.title}</span>
                      {project.clientContext && (
                        <span className="text-xs font-normal text-slate-400">
                          ({project.clientContext})
                        </span>
                      )}
                    </h3>
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs font-mono text-cyan-400/90 mb-3">
                    {project.technologies.join(' • ')}
                  </p>

                  <ul className="space-y-2 mb-3">
                    {project.highlights.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-1.5">•</span>
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
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="border-l-2 border-slate-700 pl-4 py-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-bold text-white">
                  {educationData.institution}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {educationData.period}
                </span>
              </div>
              <p className="text-sm text-cyan-300 font-medium mt-1">
                {educationData.degree}
              </p>
            </div>
          </section>

          {/* Technical Skills Catalog */}
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillCategoriesData.map((category) => {
                const items = skillsData.filter((s) => s.category === category.id);
                return (
                  <div key={category.id} className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <h3 className="text-xs font-semibold text-slate-300 mb-2">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant={skill.featured ? 'cyan' : 'neutral'}
                          size="sm"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

