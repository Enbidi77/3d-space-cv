import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CelestialLabel } from './CelestialLabel';
import { useGalaxyStore } from '@space/state';
import { experienceData } from '@space/portfolio-content';

export const CareerOrbitNode: React.FC = () => {
  const stationRef = React.useRef<THREE.Group>(null);
  const ringRef = React.useRef<THREE.Mesh>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  useFrame((_, delta) => {
    if (reducedMotion || !stationRef.current) return;
    stationRef.current.rotation.y += delta * 0.15;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group
      position={[18, 4, -12]}
      onClick={(e) => {
        e.stopPropagation();
        setDestination('career');
      }}
    >
      <group ref={stationRef}>
        {/* Main Station Spindle */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 3.2, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Central Habitation Torus */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.22, 16, 48]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0369a1"
            emissiveIntensity={0.6}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Sub-Station: Ty Xuan (Active Station - 2025-Present) */}
        <group position={[2.6, 0.8, 0]}>
          <mesh>
            <octahedronGeometry args={[0.7]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              wireframe={false}
            />
          </mesh>
          <pointLight color="#38bdf8" intensity={1.5} distance={6} />
        </group>

        {/* Sub-Station: TPS Software (2023-2024) */}
        <group position={[-2.6, -0.8, 0]}>
          <mesh>
            <dodecahedronGeometry args={[0.6]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#7e22ce"
              emissiveIntensity={0.8}
            />
          </mesh>
          <pointLight color="#a855f7" intensity={1.2} distance={5} />
        </group>
      </group>

      {/* Outer Beacon Light */}
      <pointLight color="#0284c7" intensity={2} distance={15} />

      <CelestialLabel
        id="career"
        destinationId="career"
        title="Career Orbit"
        subtitle="2 Enterprise Stations (2023–Present)"
        accentColor="#0ea5e9"
        position={[0, 2.8, 0]}
      />
    </group>
  );
};

