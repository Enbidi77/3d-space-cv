import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, ArrowLeft, Database, Cpu, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { experienceData } from '@space/portfolio-content';
import { GlassPanel, Badge, Button } from '@space/ui';

export const metadata: Metadata = {
  title: 'Career Orbit | Nguyen Bao Duy - Professional Experience',
  description:
    'Chronological engineering stations: Software Engineer (ERP & Database Systems) at Công ty TNHH Tỷ Xuân and Backend / Fullstack Web Developer at TPS Software.',
};

export default function CareerPage() {
  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Breadcrumb / Back to Galaxy */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Galaxy View</span>
        </Link>
        <Badge variant="cyan" size="sm">
          Sector: Career Orbit
        </Badge>
      </div>

      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Orbital Station Timeline
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work Experience
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
          Over 2+ years of engineering scalable web platforms, distributed microservices, and enterprise database modules with proven production reliability.
        </p>
      </div>

      {/* Stations Timeline */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-0.5 before:bg-slate-800">
        {experienceData.map((exp, index) => {
          const isTyXuan = exp.id === 'ty-xuan';

          return (
            <div key={exp.id} className="relative pl-10 md:pl-16">
              {/* Station Marker */}
              <div
                className={`absolute left-2.5 md:left-6.5 -translate-x-1/2 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  exp.isCurrent
                    ? 'border-cyan-400 bg-cyan-950 shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                    : 'border-violet-400 bg-violet-950 shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    exp.isCurrent ? 'bg-cyan-400 animate-ping' : 'bg-violet-400'
                  }`}
                />
              </div>

              {/* Station Card */}
              <GlassPanel
                variant="elevated"
                blur="lg"
                className={`p-6 sm:p-8 border transition-all duration-300 ${
                  exp.isCurrent
                    ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Station metadata header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400">
                      [{exp.stationCode}]
                    </span>
                    {exp.isCurrent && (
                      <Badge variant="cyan" size="sm">
                        Active Station
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {exp.period}
                  </span>
                </div>

                {/* Role and Employer */}
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h2>
                  <p className="text-base font-semibold text-cyan-300 mt-1">
                    {exp.company}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {exp.summary}
                </p>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                    Core Engineering Contributions
                  </h3>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                    Station Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="neutral" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </div>
          );
        })}
      </div>
    </div>
  );
}

