import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { educationData } from '@space/portfolio-content';
import { GlassPanel, Badge } from '@space/ui';

export const metadata: Metadata = {
  title: 'Education Station | Nguyen Bao Duy - Academic History',
  description:
    'Academic foundations: Bachelor in Information Technology at Can Tho University (2019 – 2024).',
};

export default function EducationPage() {
  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Galaxy View</span>
        </Link>
        <Badge variant="emerald" size="sm">
          Sector: Education Station
        </Badge>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Academic Research Module
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Education
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
          Formal computer science foundations, algorithm engineering, database design, and distributed systems training.
        </p>
      </div>

      {/* Degree Card */}
      <GlassPanel
        variant="elevated"
        blur="lg"
        className="p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80 mb-6">
          <span className="text-xs font-mono text-emerald-400">
            [{educationData.stationCode}]
          </span>
          <span className="text-xs font-mono text-slate-400">
            {educationData.period}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {educationData.institution}
        </h2>

        <p className="text-lg font-semibold text-emerald-300 mb-6">
          {educationData.degree}
        </p>

        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          {educationData.description}
        </p>
      </GlassPanel>
    </div>
  );
}

