import { describe, it, expect, beforeEach } from 'vitest';
import { useGalaxyStore } from '../src';

describe('Galaxy State Store', () => {
  beforeEach(() => {
    useGalaxyStore.getState().resetToHome();
  });

  it('initializes with default home destination and 3d mode', () => {
    const state = useGalaxyStore.getState();
    expect(state.currentDestination).toBe('home');
    expect(state.viewMode).toBe('3d');
    expect(state.graphicsQuality).toBe('high');
    expect(state.reducedMotion).toBe(false);
  });

  it('updates destination correctly and flags isTraveling', () => {
    const { setDestination } = useGalaxyStore.getState();
    setDestination('projects');

    const state = useGalaxyStore.getState();
    expect(state.currentDestination).toBe('projects');
    expect(state.isTraveling).toBe(true);
  });

  it('switches view mode between 3d and conventional', () => {
    const { setViewMode } = useGalaxyStore.getState();
    setViewMode('conventional');
    expect(useGalaxyStore.getState().viewMode).toBe('conventional');

    setViewMode('3d');
    expect(useGalaxyStore.getState().viewMode).toBe('3d');
  });

  it('handles webgl support toggle cleanly with fallback to conventional', () => {
    const { setWebglSupported } = useGalaxyStore.getState();
    setWebglSupported(false);

    const state = useGalaxyStore.getState();
    expect(state.webglSupported).toBe(false);
    expect(state.viewMode).toBe('conventional');
  });

  it('toggles sound preference', () => {
    const { toggleSound } = useGalaxyStore.getState();
    const initialSound = useGalaxyStore.getState().isSoundEnabled;
    toggleSound();
    expect(useGalaxyStore.getState().isSoundEnabled).toBe(!initialSound);
  });

  it('resets to home correctly', () => {
    const store = useGalaxyStore.getState();
    store.setDestination('career');
    store.setActiveOverlay('cv-modal');

    store.resetToHome();

    const resetState = useGalaxyStore.getState();
    expect(resetState.currentDestination).toBe('home');
    expect(resetState.activeOverlay).toBe('none');
    expect(resetState.isTraveling).toBe(true);
  });
});

