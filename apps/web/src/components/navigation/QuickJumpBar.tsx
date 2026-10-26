'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Compass,
  Briefcase,
  Layers,
  Boxes,
  GraduationCap,
  Radio,
} from 'lucide-react';
import { useGalaxyStore, DestinationId } from '@space/state';
import { Tooltip } from '@space/ui';

export const QuickJumpBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const setDestination = useGalaxyStore((s) => s.setDestination);

  const items: {
    id: DestinationId;
    href: string;
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    { id: 'home', href: '/', label: 'Home Base', icon: <Compass className="w-4 h-4" />, color: '#38bdf8' },
    { id: 'career', href: '/career', label: 'Career Orbit', icon: <Briefcase className="w-4 h-4" />, color: '#0ea5e9' },
    { id: 'skills', href: '/skills', label: 'Skills Map', icon: <Layers className="w-4 h-4" />, color: '#818cf8' },
    { id: 'projects', href: '/projects', label: 'Project Worlds', icon: <Boxes className="w-4 h-4" />, color: '#c084fc' },
    { id: 'education', href: '/education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, color: '#34d399' },
    { id: 'contact', href: '/contact', label: 'Contact Beacon', icon: <Radio className="w-4 h-4" />, color: '#f43f5e' },
  ];

  const handleNavigate = (destId: DestinationId, href: string) => {
    setDestination(destId);
    if (pathname !== href && pathname !== '/') {
      router.push(href);
    }
  };

  return (
    <nav
      aria-label="Celestial Sector Quick Navigation"
      className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
    >
      {items.map((item) => {
        const isSelected = currentDestination === item.id;

        return (
          <Tooltip key={item.id} content={item.label} side="top">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleNavigate(item.id, item.href)}
              aria-label={`Jump to ${item.label}`}
              aria-pressed={isSelected}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-lg scale-110'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
              style={{
                boxShadow: isSelected ? `0 0 16px ${item.color}55` : undefined,
                border: isSelected ? `1.5px solid ${item.color}` : '1px solid transparent',
              }}
            >
              {item.icon}
              {isSelected && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full animate-ping"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          </Tooltip>
        );
      })}
    </nav>
  );
};

