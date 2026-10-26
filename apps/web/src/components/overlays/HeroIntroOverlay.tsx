'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, FileText, Send, ChevronDown } from 'lucide-react';
import { profileData } from '@space/portfolio-content';
import { useGalaxyStore } from '@space/state';
import { GlassPanel, Button, Badge } from '@space/ui';

export const HeroIntroOverlay: React.FC = () => {
  const [minimized, setMinimized] = React.useState(false);
  const setActiveOverlay = useGalaxyStore((s) => s.setActiveOverlay);
  const setDestination = useGalaxyStore((s) => s.setDestination);

  if (minimized) {
    return (
      <div className="absolute top-24 left-6 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Show Universe Briefing</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
      <GlassPanel
        variant="elevated"
        blur="xl"
        className="pointer-events-auto max-w-2xl w-full p-6 sm:p-8 md:p-10 border border-slate-700/70 shadow-[0_20px_70px_rgba(0,0,0,0.85)] text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Subtle decorative radial highlights */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

        {/* Location & Status Pill */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="cyan" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{profileData.location}</span>
          </Badge>
          <Badge variant="neutral" size="sm">
            <span>2+ Years Experience</span>
          </Badge>
        </div>

        {/* Developer Name */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 uppercase">
          {profileData.name}
        </h1>

        {/* Professional Title */}
        <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-3">
          {profileData.title}
        </h2>

        {/* Core Tech Stack Line */}
        <p className="text-xs sm:text-sm font-mono text-slate-300 tracking-wide mb-6 px-2">
          {profileData.tagline}
        </p>

        {/* Short Concept Line */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
          Welcome to my interactive 3D universe. Every celestial body represents a production engineering chapter: ERP systems, distributed microservices, real-time WebRTC, and elastic search architectures.
        </p>

        {/* Three Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Action 1: Explore My Universe */}
          <Button
            variant="glow"
            size="md"
            onClick={() => setMinimized(true)}
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            <span>Explore My Universe</span>
          </Button>

          {/* Action 2: View My CV */}
          <Button
            variant="secondary"
            size="md"
            onClick={() => setActiveOverlay('cv-modal')}
            className="w-full sm:w-auto"
          >
            <FileText className="w-4 h-4 mr-1.5 text-cyan-400" />
            <span>View My CV</span>
          </Button>

          {/* Action 3: Contact Me */}
          <Link
            href="/contact"
            onClick={() => {
              setDestination('contact');
              setMinimized(true);
            }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="md"
              className="w-full"
            >
              <Send className="w-4 h-4 mr-1.5 text-rose-400" />
              <span>Contact Me</span>
            </Button>
          </Link>
        </div>

        {/* Subtle dismiss / interaction hint */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
          <span>Click anywhere in space to navigate or rotate</span>
          <button
            type="button"
            onClick={() => setMinimized(true)}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            Minimize Briefing
          </button>
        </div>
      </GlassPanel>
    </div>
  );
};

