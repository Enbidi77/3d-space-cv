import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGalaxyStore } from '@space/state';

export const NebulaClouds: React.FC = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);
  const graphicsQuality = useGalaxyStore((s) => s.graphicsQuality);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.005;
  });

  if (graphicsQuality === 'low') return null;

  return (
    <group ref={groupRef}>
      {/* Cloud 1 - Cyan / Deep Navy */}
      <mesh position={[-25, 5, -20]} scale={[35, 20, 25]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cloud 2 - Violet / Indigo */}
      <mesh position={[20, -8, 15]} scale={[40, 25, 30]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cloud 3 - Subtle Central Glow */}
      <mesh position={[0, 0, 0]} scale={[55, 30, 55]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#1e1b4b"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

