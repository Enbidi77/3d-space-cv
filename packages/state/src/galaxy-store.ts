import { create } from 'zustand';
import { CelestialDestination } from '@space/portfolio-content';

export type DestinationId = 'home' | 'career' | 'skills' | 'projects' | 'education' | 'contact';
export type ViewMode = '3d' | 'conventional' | 'cv';
export type GraphicsQuality = 'high' | 'medium' | 'low';
export type ActiveOverlay = 'none' | 'cv-modal' | 'project-modal' | 'shortcuts' | 'mobile-nav';

export interface GalaxyState {
  currentDestination: DestinationId;
  viewMode: ViewMode;
  graphicsQuality: GraphicsQuality;
  reducedMotion: boolean;
  webglSupported: boolean;
  isTraveling: boolean;
  focusedId: string | null;
  selectedSkillCategory: string | null;
  activeOverlay: ActiveOverlay;
  isSoundEnabled: boolean;
  showCelestialLabels: boolean;

  // Actions
  setDestination: (destination: DestinationId) => void;
  setViewMode: (mode: ViewMode) => void;
  setGraphicsQuality: (quality: GraphicsQuality) => void;
  setReducedMotion: (reduced: boolean) => void;
  setWebglSupported: (supported: boolean) => void;
  setIsTraveling: (isTraveling: boolean) => void;
  setFocusedId: (id: string | null) => void;
  setSelectedSkillCategory: (category: string | null) => void;
  setActiveOverlay: (overlay: ActiveOverlay) => void;
  toggleSound: () => void;
  toggleCelestialLabels: () => void;
  resetToHome: () => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  currentDestination: 'home',
  viewMode: '3d',
  graphicsQuality: 'high',
  reducedMotion: false,
  webglSupported: true,
  isTraveling: false,
  focusedId: null,
  selectedSkillCategory: null,
  activeOverlay: 'none',
  isSoundEnabled: false,
  showCelestialLabels: true,

  setDestination: (destination) =>
    set({
      currentDestination: destination,
      focusedId: null,
      isTraveling: true,
    }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setGraphicsQuality: (graphicsQuality) => set({ graphicsQuality }),

  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  setWebglSupported: (webglSupported) =>
    set((state) => ({
      webglSupported,
      viewMode: webglSupported ? state.viewMode : 'conventional',
    })),

  setIsTraveling: (isTraveling) => set({ isTraveling }),

  setFocusedId: (focusedId) => set({ focusedId }),

  setSelectedSkillCategory: (selectedSkillCategory) => set({ selectedSkillCategory }),

  setActiveOverlay: (activeOverlay) => set({ activeOverlay }),

  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),

  toggleCelestialLabels: () =>
    set((state) => ({ showCelestialLabels: !state.showCelestialLabels })),

  resetToHome: () =>
    set({
      currentDestination: 'home',
      focusedId: null,
      selectedSkillCategory: null,
      activeOverlay: 'none',
      isTraveling: true,
    }),
}));

