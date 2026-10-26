import * as React from 'react';
import { Html } from '@react-three/drei';
import { useGalaxyStore, DestinationId } from '@space/state';

export interface CelestialLabelProps {
  id: string;
  destinationId?: DestinationId;
  title: string;
  subtitle?: string;
  iconName?: string;
  accentColor?: string;
  distanceFactor?: number;
  position?: [number, number, number];
  onClick?: () => void;
}

export const CelestialLabel: React.FC<CelestialLabelProps> = ({
  id,
  destinationId,
  title,
  subtitle,
  accentColor = '#38bdf8',
  distanceFactor = 28,
  position = [0, 2.5, 0],
  onClick,
}) => {
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const showCelestialLabels = useGalaxyStore((s) => s.showCelestialLabels);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const isSelected = destinationId ? currentDestination === destinationId : false;

  if (!showCelestialLabels) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else if (destinationId) {
      setDestination(destinationId);
    }
  };

  return (
    <Html
      position={position}
      center
      distanceFactor={distanceFactor}
      zIndexRange={[10, 0]}
      className="pointer-events-auto select-none"
    >
      <button
        type="button"
        suppressHydrationWarning
        onClick={handleClick}
        aria-label={`Navigate to ${title}`}
        style={{
          borderColor: isSelected ? accentColor : 'rgba(51, 65, 85, 0.6)',
          boxShadow: isSelected
            ? `0 0 20px ${accentColor}66, inset 0 0 10px ${accentColor}33`
            : '0 4px 12px rgba(0,0,0,0.5)',
        }}
        className="group flex flex-col items-center px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border transition-all duration-300 hover:scale-110 hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="text-xs font-bold tracking-wide uppercase transition-colors group-hover:text-cyan-300"
            style={{ color: isSelected ? accentColor : '#f1f5f9' }}
          >
            {title}
          </span>
        </div>
        {subtitle && (
          <span className="text-[10px] text-slate-400 font-mono tracking-tight group-hover:text-slate-300">
            {subtitle}
          </span>
        )}
      </button>
    </Html>
  );
};

