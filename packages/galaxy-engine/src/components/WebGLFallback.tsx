import * as React from 'react';
import { celestialDestinations } from '@space/portfolio-content';
import { useGalaxyStore, DestinationId } from '@space/state';

export const WebGLFallback: React.FC = () => {
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const setDestination = useGalaxyStore((s) => s.setDestination);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950 pointer-events-auto">
      {/* 2D Cosmic Radial Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-950/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-violet-950/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-slate-900/30 blur-3xl pointer-events-none" />

      {/* Static Star Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 180px, #38bdf8, rgba(0,0,0,0)), radial-gradient(1px 1px at 80px 220px, #c084fc, rgba(0,0,0,0))',
          backgroundSize: '250px 250px',
        }}
      />

      {/* 2D Celestial Navigation Nodes Map */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8 max-w-md">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            2D Celestial Navigation System
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            System Sector Map
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Optimized mode active for low-power devices, reduced motion, or WebGL-restricted browsers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl w-full">
          {celestialDestinations.map((dest) => {
            const isSelected = currentDestination === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setDestination(dest.id as DestinationId)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-500/80 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: dest.accentColor }}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {dest.celestialType}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {dest.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

