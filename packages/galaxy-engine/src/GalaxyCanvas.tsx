import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StarField } from './components/StarField';
import { CameraController } from './components/CameraController';
import { HeroSatellite } from './components/HeroSatellite';
import { PlanetHorizon } from './components/PlanetHorizon';
import { CareerOrbitNode } from './components/CareerOrbitNode';
import { ConstellationSystem } from './components/ConstellationSystem';
import { ProjectWorldsSystem } from './components/ProjectWorldsSystem';
import { EducationNode } from './components/EducationNode';
import { ContactBeaconNode } from './components/ContactBeaconNode';
import { OrbitLine } from './components/OrbitLine';
import { WebGLFallback } from './components/WebGLFallback';
import { useGalaxyStore } from '@space/state';

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export interface GalaxyCanvasProps {
  className?: string;
}

export const GalaxyCanvas: React.FC<GalaxyCanvasProps> = ({ className }) => {
  const [hasWebGL, setHasWebGL] = React.useState(true);
  const viewMode = useGalaxyStore((s) => s.viewMode);
  const setWebglSupported = useGalaxyStore((s) => s.setWebglSupported);
  const graphicsQuality = useGalaxyStore((s) => s.graphicsQuality);

  React.useEffect(() => {
    const available = isWebGLAvailable();
    setHasWebGL(available);
    setWebglSupported(available);
  }, [setWebglSupported]);

  if (!hasWebGL || viewMode === 'conventional') {
    return <WebGLFallback />;
  }

  const dpr = graphicsQuality === 'low' ? 1 : graphicsQuality === 'medium' ? 1.5 : [1, 2];

  return (
    <div className={`relative w-full h-full bg-[#010409] ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 4.5, 20], fov: 42, near: 0.1, far: 1000 }}
        dpr={dpr as any}
        gl={{
          antialias: graphicsQuality !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* Direct Solar Illumination (Matching space photography) */}
        <directionalLight
          position={[32, 24, 26]}
          intensity={2.8}
          color="#fffdf5"
          castShadow
        />

        {/* Ambient Earthshine (Electric blue Rayleigh reflection from planet below) */}
        <ambientLight intensity={0.5} color="#0284c7" />

        {/* Soft Secondary Rim Light */}
        <directionalLight position={[-20, -10, 10]} intensity={0.4} color="#38bdf8" />

        {/* Fine Pinpoint Stars in Deep Space */}
        <StarField />

        {/* Massive Curved Planetary Horizon with Swirling Atmosphere & Hurricane */}
        <PlanetHorizon />

        {/* Hero Orbital Communications Satellite (matching provided image) */}
        <HeroSatellite />

        {/* Orbital Trajectories for Career, Tech, and Project worlds */}
        <OrbitLine radius={24} color="#0284c7" opacity={0.15} />
        <OrbitLine radius={28} color="#818cf8" opacity={0.15} />
        <OrbitLine radius={32} color="#c084fc" opacity={0.15} />

        {/* Connected Stations along orbital sectors */}
        <CareerOrbitNode />
        <ConstellationSystem />
        <ProjectWorldsSystem />
        <EducationNode />
        <ContactBeaconNode />

        {/* Smooth Camera Controller */}
        <CameraController />

        {/* Interactive Orbital Viewport Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={70}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 8}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
