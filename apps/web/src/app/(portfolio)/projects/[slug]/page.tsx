import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Layers,
  Globe,
  Radio,
  Server,
} from 'lucide-react';
import { projectsData, Project } from '@space/portfolio-content';
import { GlassPanel, Badge, Button } from '@space/ui';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Technical Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const prevProject = projectsData[(projectIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];
  const { celestialBody, architecture } = project;

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Worlds</span>
        </Link>
        <Badge variant="violet" size="sm">
          Planet: {celestialBody.name}
        </Badge>
      </div>

      {/* Hero Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: celestialBody.primaryColor }}
          />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {project.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          {project.title}
        </h1>

        {project.clientContext && (
          <p className="text-sm text-cyan-400 font-mono mb-4">
            Client Context: {project.clientContext}
          </p>
        )}

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          {project.fullDescription}
        </p>

        {/* Live and Source Links */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
              <Button variant="primary" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span>Open Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <span>View Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Key Highlights */}
      <section className="mb-10">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold">
          CV-Verified Highlights & Responsibilities
        </h2>
        <GlassPanel variant="elevated" blur="lg" className="p-6 border border-slate-800">
          <ul className="space-y-3">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </section>

      {/* Architecture Breakdown */}
      <section className="mb-10">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold flex items-center gap-2">
          <Server className="w-4 h-4" />
          <span>Technical Architecture</span>
        </h2>
        <div className="space-y-4">
          <GlassPanel variant="default" blur="md" className="p-6 border border-slate-800">
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {architecture.overview}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {architecture.keyComponents.map((comp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <h3 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{comp.name}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* Technologies by Role */}
      <section className="mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold">
          Technology Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(project.techGroups).map(([group, techs]) => (
            <GlassPanel key={group} variant="subtle" blur="sm" className="p-4 border border-slate-800/80">
              <h3 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                {group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {techs.map((tech) => (
                  <Badge key={tech} variant="neutral" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Navigation between projects */}
      <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-500">Previous</span>
            <span className="font-semibold line-clamp-1">{prevProject.title}</span>
          </div>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase text-slate-500">Next</span>
            <span className="font-semibold line-clamp-1">{nextProject.title}</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

