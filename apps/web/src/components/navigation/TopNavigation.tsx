'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  FileText,
  Boxes,
  Briefcase,
  Layers,
  GraduationCap,
  Radio,
  Eye,
  Menu,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useGalaxyStore, DestinationId } from '@space/state';
import { profileData } from '@space/portfolio-content';
import { Button, Badge } from '@space/ui';

export const TopNavigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const viewMode = useGalaxyStore((s) => s.viewMode);
  const setViewMode = useGalaxyStore((s) => s.setViewMode);
  const setActiveOverlay = useGalaxyStore((s) => s.setActiveOverlay);
  const isSoundEnabled = useGalaxyStore((s) => s.isSoundEnabled);
  const toggleSound = useGalaxyStore((s) => s.toggleSound);

  const navLinks: { label: string; href: string; destId: DestinationId; icon: React.ReactNode }[] = [
    { label: 'Home Base', href: '/', destId: 'home', icon: <Compass className="w-4 h-4" /> },
    { label: 'Career Orbit', href: '/career', destId: 'career', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Skills Map', href: '/skills', destId: 'skills', icon: <Layers className="w-4 h-4" /> },
    { label: 'Project Worlds', href: '/projects', destId: 'projects', icon: <Boxes className="w-4 h-4" /> },
    { label: 'Education', href: '/education', destId: 'education', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Contact Beacon', href: '/contact', destId: 'contact', icon: <Radio className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav
        aria-label="Primary Navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="flex items-center justify-between h-14 px-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-slate-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Logo / Engineer Identity */}
          <Link
            href="/"
            onClick={() => setDestination('home')}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
              <span className="text-xs font-mono font-bold text-cyan-300">BD</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {profileData.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                Backend & Fullstack
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href)) ||
                (pathname === '/' && currentDestination === link.destId);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDestination(link.destId)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle (3D vs 2D) */}
            <button
              type="button"
              onClick={() => setViewMode(viewMode === '3d' ? 'conventional' : '3d')}
              title={`Switch to ${viewMode === '3d' ? '2D Sector View' : '3D Galaxy'}`}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Eye className="w-4 h-4" />
              <span className="sr-only">Toggle 3D or 2D view</span>
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              title={isSoundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="sr-only">Toggle ambient sound</span>
            </button>

            {/* View CV Action */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveOverlay('cv-modal')}
              className="hidden sm:inline-flex gap-1.5 text-xs text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View CV</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-20 z-50 p-4 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800 flex flex-col gap-3 lg:hidden animate-in fade-in"
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setDestination(link.destId);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900/80 border border-slate-800/50'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setActiveOverlay('cv-modal');
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Interactive CV</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

