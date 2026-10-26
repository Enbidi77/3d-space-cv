import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CelestialLabel } from './CelestialLabel';
import { useGalaxyStore } from '@space/state';
import { educationData } from '@space/portfolio-content';

export const EducationNode: React.FC = () => {
  const stationRef = React.useRef<THREE.Group>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  useFrame((_, delta) => {
    if (reducedMotion || !stationRef.current) return;
    stationRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group
      position={[-18, -8, 14]}
      onClick={(e) => {
        e.stopPropagation();
        setDestination('education');
      }}
    >
      <group ref={stationRef}>
        {/* Core Research Sphere */}
        <mesh>
          <sphereGeometry args={[1.2, 24, 24]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Solar Panel Wing Left */}
        <mesh position={[-2.4, 0, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.9]} />
          <meshStandardMaterial
            color="#064e3b"
            emissive="#10b981"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Solar Panel Wing Right */}
        <mesh position={[2.4, 0, 0]}>
          <boxGeometry args={[2.0, 0.05, 0.9]} />
          <meshStandardMaterial
            color="#064e3b"
            emissive="#10b981"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Sensor Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.04, 16, 32]} />
          <meshBasicMaterial color="#6ee7b7" transparent opacity={0.6} />
        </mesh>
      </group>

      <pointLight color="#34d399" intensity={1.8} distance={12} />

      <CelestialLabel
        id="education"
        destinationId="education"
        title="Education Station"
        subtitle="Can Tho University (2019–2024)"
        accentColor="#34d399"
        position={[0, 2.6, 0]}
      />
    </group>
  );
};

