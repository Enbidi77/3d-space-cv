import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StarField } from './components/StarField';
import { NebulaClouds } from './components/NebulaClouds';
import { CameraController } from './components/CameraController';
import { HomeBaseNode } from './components/HomeBaseNode';
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
    <div className={`relative w-full h-full bg-[#030712] ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 12, 28], fov: 45, near: 0.1, far: 1000 }}
        dpr={dpr as any}
        gl={{
          antialias: graphicsQuality !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* Deep Space Lighting */}
        <ambientLight intensity={0.4} color="#0f172a" />
        <directionalLight position={[10, 20, 15]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-15, -10, -10]} intensity={0.5} color="#38bdf8" />

        {/* Global Starfield & Cosmic Dust */}
        <StarField />
        <NebulaClouds />

        {/* System Orbital Rails */}
        <OrbitLine radius={21} color="#0284c7" opacity={0.18} />
        <OrbitLine radius={23} color="#818cf8" opacity={0.18} />
        <OrbitLine radius={27} color="#c084fc" opacity={0.18} />
        <OrbitLine radius={24} color="#34d399" opacity={0.18} />
        <OrbitLine radius={28} color="#f43f5e" opacity={0.18} />

        {/* Celestial Destinations */}
        <HomeBaseNode />
        <CareerOrbitNode />
        <ConstellationSystem />
        <ProjectWorldsSystem />
        <EducationNode />
        <ContactBeaconNode />

        {/* Camera Navigation Controller */}
        <CameraController />

        {/* User Interaction Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={6}
          maxDistance={75}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

