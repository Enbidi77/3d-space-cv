'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Compass } from 'lucide-react';
import { GlassPanel, Button } from '@space/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030712]">
      <GlassPanel variant="elevated" blur="lg" className="max-w-md w-full p-8 text-center border border-rose-500/30">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
          Telemetry Signal Disruption
        </span>
        <h1 className="text-2xl font-bold text-white mt-1 mb-3">
          Subsystem Encountered an Error
        </h1>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          {error.message || 'An unexpected navigational glitch occurred while rendering this celestial sector.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" size="sm" onClick={() => reset()} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Reset Subsystem</span>
          </Button>
          <Link href="/">
            <Button variant="primary" size="sm" className="gap-2">
              <Compass className="w-4 h-4" />
              <span>Home Base</span>
            </Button>
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}

