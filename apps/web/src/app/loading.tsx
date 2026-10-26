export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Synchronizing Celestial Coordinates...
        </span>
      </div>
    </div>
  );
}

