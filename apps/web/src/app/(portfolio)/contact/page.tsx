'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Radio,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  ExternalLink,
  FileText,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { profileData } from '@space/portfolio-content';
import { useGalaxyStore } from '@space/state';
import { GlassPanel, Badge, Button } from '@space/ui';
import { CopyButton } from '@/components/common/CopyButton';

export default function ContactPage() {
  const setActiveOverlay = useGalaxyStore((s) => s.setActiveOverlay);

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
        <Badge variant="cyan" size="sm">
          Sector: Contact Beacon
        </Badge>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
              Direct Comm Relay
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get in Touch
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
          Open to fullstack and backend software engineering opportunities, enterprise system architectures, and technical collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Email Beacon Card */}
        <GlassPanel variant="elevated" blur="md" className="p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <CopyButton textToCopy={profileData.email} label="Copy Email" />
            </div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Email Dispatch
            </h2>
            <p className="text-base font-bold text-white break-all mb-4">
              {profileData.email}
            </p>
          </div>
          <a href={`mailto:${profileData.email}`}>
            <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Compose Email</span>
            </Button>
          </a>
        </GlassPanel>

        {/* Phone Beacon Card */}
        <GlassPanel variant="elevated" blur="md" className="p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <CopyButton textToCopy={profileData.phone} label="Copy Phone" />
            </div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Direct Telephone
            </h2>
            <p className="text-base font-bold text-white mb-4">
              {profileData.phone}
            </p>
          </div>
          <a href={`tel:${profileData.phone}`}>
            <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Call</span>
            </Button>
          </a>
        </GlassPanel>

        {/* GitHub Relay */}
        <GlassPanel variant="elevated" blur="md" className="p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                <GithubIcon className="w-5 h-5" />
              </div>
              <Badge variant="violet" size="sm">
                Code Repositories
              </Badge>
            </div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              GitHub Profile
            </h2>
            <p className="text-base font-bold text-white mb-4">
              github.com/Enbidi77
            </p>
          </div>
          <a href={profileData.githubUrl} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
              <span>View GitHub Repos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        </GlassPanel>

        {/* Location & Portfolio Hub */}
        <GlassPanel variant="elevated" blur="md" className="p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <Badge variant="amber" size="sm">
                Base of Operations
              </Badge>
            </div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Location
            </h2>
            <p className="text-base font-bold text-white mb-1">
              {profileData.location}
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Web: cv-portfolio.vercel.app
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveOverlay('cv-modal')}
            className="w-full gap-2 text-xs"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Verified CV Document</span>
          </Button>
        </GlassPanel>
      </div>

      {/* Professional Closing Statement */}
      <GlassPanel variant="glow-cyan" blur="lg" className="p-8 border border-cyan-500/30 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Ready to Engineer High-Throughput Solutions
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
          Whether you are designing distributed microservices, tuning mission-critical enterprise database workloads, or building real-time collaboration platforms, I welcome the opportunity to discuss how I can contribute to your engineering goals.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href={`mailto:${profileData.email}`}>
            <Button variant="glow" size="md">
              <Mail className="w-4 h-4 mr-2" />
              <span>Initiate Transmission</span>
            </Button>
          </a>
        </div>
      </GlassPanel>
    </div>
  );
}

