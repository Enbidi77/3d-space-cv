import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CelestialLabel } from './CelestialLabel';
import { useGalaxyStore } from '@space/state';

export const ContactBeaconNode: React.FC = () => {
  const wave1Ref = React.useRef<THREE.Mesh>(null);
  const wave2Ref = React.useRef<THREE.Mesh>(null);
  const spireRef = React.useRef<THREE.Mesh>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;

    const t = clock.getElapsedTime();
    if (wave1Ref.current) {
      const s1 = 1 + (t * 0.8) % 2.5;
      wave1Ref.current.scale.set(s1, s1, s1);
      (wave1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        1 - s1 / 3.5
      );
    }
    if (wave2Ref.current) {
      const s2 = 1 + ((t + 1.25) * 0.8) % 2.5;
      wave2Ref.current.scale.set(s2, s2, s2);
      (wave2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        1 - s2 / 3.5
      );
    }
    if (spireRef.current) {
      spireRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group
      position={[22, -6, 16]}
      onClick={(e) => {
        e.stopPropagation();
        setDestination('contact');
      }}
    >
      {/* Central Spire */}
      <mesh ref={spireRef}>
        <coneGeometry args={[0.5, 3.2, 8]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#be123c"
          emissiveIntensity={1.2}
          metalness={0.9}
        />
      </mesh>

      {/* Signal Emission Waves */}
      <mesh ref={wave1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.3, 32]} />
        <meshBasicMaterial
          color="#fb7185"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={wave2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.3, 32]} />
        <meshBasicMaterial
          color="#fb7185"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight color="#f43f5e" intensity={2.5} distance={15} />

      <CelestialLabel
        id="contact"
        destinationId="contact"
        title="Contact Beacon"
        subtitle="Direct Comm Relays & Channels"
        accentColor="#f43f5e"
        position={[0, 2.6, 0]}
      />
    </group>
  );
};

