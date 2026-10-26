import type { Metadata } from 'next';
import Link from 'next/link';
import { Boxes, ArrowLeft, ExternalLink, ArrowRight, CheckCircle2, Globe, Cpu } from 'lucide-react';
import { projectsData } from '@space/portfolio-content';
import { GlassPanel, Badge, Button } from '@space/ui';

export const metadata: Metadata = {
  title: 'Project Worlds | Nguyen Bao Duy - Key Technical Projects',
  description:
    'Featured software engineering projects: Real-Time Enterprise Collaboration Monorepo, Vehicle Rental Management Platform, Broker Loan Matching Portal, and Forex Predictive Analytics.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Galaxy View</span>
        </Link>
        <Badge variant="violet" size="sm">
          Sector: Project Worlds
        </Badge>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Planetary System
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Software Projects
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
          Four production-grade systems showcasing backend architecture, real-time protocols, asynchronous cloud integrations, and database performance tuning.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsData.map((project) => {
          const { celestialBody } = project;

          return (
            <GlassPanel
              key={project.id}
              variant="elevated"
              blur="lg"
              className="p-6 sm:p-8 border border-slate-800/80 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* World Identity Bar */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: celestialBody.primaryColor }}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Planet: {celestialBody.name}
                    </span>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {project.category}
                  </Badge>
                </div>

                {/* Title & Client Context */}
                <div className="mb-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>
                  {project.clientContext && (
                    <span className="text-xs font-medium text-cyan-400 block mt-1">
                      Client Context: {project.clientContext}
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="neutral" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <Link href={`/projects/${project.slug}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}

