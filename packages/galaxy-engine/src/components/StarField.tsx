import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGalaxyStore } from '@space/state';

export interface StarFieldProps {
  count?: number;
}

export const StarField: React.FC<StarFieldProps> = ({ count = 3500 }) => {
  const pointsRef = React.useRef<THREE.Points>(null);
  const dustRef = React.useRef<THREE.Points>(null);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);
  const graphicsQuality = useGalaxyStore((s) => s.graphicsQuality);

  const starCount = graphicsQuality === 'low' ? 1200 : graphicsQuality === 'medium' ? 2400 : count;

  const [starGeometry, starColors] = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#818cf8'), // Indigo
      new THREE.Color('#c084fc'), // Violet
      new THREE.Color('#fbbf24'), // Warm amber
    ];

    for (let i = 0; i < starCount; i++) {
      // Generate spherical distribution around universe
      const radius = 60 + Math.random() * 160;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return [geo, colors];
  }, [starCount]);

  const dustGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const dustCount = graphicsQuality === 'low' ? 300 : 800;
    const positions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const radius = 10 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 20;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = radius * Math.sin(theta);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [graphicsQuality]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <group>
      {/* Outer Stars */}
      <points ref={pointsRef} geometry={starGeometry}>
        <pointsMaterial
          size={1.2}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner Cosmic Dust */}
      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          size={2.2}
          color="#38bdf8"
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

