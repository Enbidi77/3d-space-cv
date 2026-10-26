import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CelestialLabel } from './CelestialLabel';
import { useGalaxyStore } from '@space/state';

export const HomeBaseNode: React.FC = () => {
  const coreRef = React.useRef<THREE.Mesh>(null);
  const ring1Ref = React.useRef<THREE.Mesh>(null);
  const ring2Ref = React.useRef<THREE.Mesh>(null);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);
  const setDestination = useGalaxyStore((s) => s.setDestination);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={() => setDestination('home')}>
      {/* Central Star Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Atmospheric Glow Shell */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Tech Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.4, 0.04, 16, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Tech Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[4.0, 0.03, 16, 64]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point Light for surrounding objects */}
      <pointLight color="#38bdf8" intensity={4} distance={35} decay={2} />

      <CelestialLabel
        id="home"
        destinationId="home"
        title="Home Base"
        subtitle="Fullstack & Backend Core"
        accentColor="#38bdf8"
        position={[0, 3.8, 0]}
      />
    </group>
  );
};

