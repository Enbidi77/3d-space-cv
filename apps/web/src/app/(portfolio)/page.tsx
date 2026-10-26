'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { HeroIntroOverlay } from '@/components/overlays/HeroIntroOverlay';
import { useGalaxyStore } from '@space/state';
import { celestialDestinations, getDestinationById } from '@space/portfolio-content';
import { GlassPanel, Button, Badge } from '@space/ui';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

// Dynamically load GalaxyCanvas on client only
const GalaxyCanvas = dynamic(
  () => import('@space/galaxy-engine').then((mod) => mod.GalaxyCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            Initializing Celestial Coordinate Engine...
          </span>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const selectedDest = getDestinationById(currentDestination) || celestialDestinations[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030712]">
      {/* 3D Galaxy Canvas */}
      <div className="absolute inset-0 z-0">
        <GalaxyCanvas />
      </div>

      {/* Opening Scene Intro Overlay */}
      <HeroIntroOverlay />

      {/* Selected Destination In-Scene Card (appears when visitor clicks or navigates to a celestial body) */}
      {currentDestination !== 'home' && (
        <div className="absolute top-20 right-6 z-20 max-w-sm w-full pointer-events-auto animate-in slide-in-from-right-4 duration-300">
          <GlassPanel
            variant="elevated"
            blur="lg"
            className="p-5 border border-slate-700/80 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: selectedDest.accentColor }}
              />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                {selectedDest.celestialType}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1">
              {selectedDest.name}
            </h2>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              {selectedDest.description}
            </p>
            <Link href={`/${selectedDest.slug}`}>
              <Button variant="glow" size="sm" className="w-full gap-2 text-xs">
                <span>Explore {selectedDest.name} Station</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}

