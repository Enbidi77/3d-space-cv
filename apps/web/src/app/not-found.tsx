import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { GlassPanel, Button } from '@space/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030712]">
      <GlassPanel variant="elevated" blur="lg" className="max-w-md w-full p-8 text-center border border-slate-800">
        <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-6 h-6 animate-spin-slow" />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Error 404: Deep Space Anomaly
        </span>
        <h1 className="text-2xl font-bold text-white mt-1 mb-3">
          Coordinates Not Found
        </h1>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The celestial destination or trajectory you requested is beyond known navigational charts.
        </p>
        <Link href="/">
          <Button variant="glow" size="sm" className="w-full gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home Base</span>
          </Button>
        </Link>
      </GlassPanel>
    </div>
  );
}

