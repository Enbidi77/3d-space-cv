import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGalaxyStore } from '@space/state';

export interface StarFieldProps {
  count?: number;
}

function createCircleTexture(): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Create soft radial glow falloff (bright core to completely transparent edge)
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
  gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
  gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.05)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const StarField: React.FC<StarFieldProps> = ({ count = 3500 }) => {
  const pointsRef = React.useRef<THREE.Points>(null);
  const dustRef = React.useRef<THREE.Points>(null);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);
  const graphicsQuality = useGalaxyStore((s) => s.graphicsQuality);

  const starCount = graphicsQuality === 'low' ? 1200 : graphicsQuality === 'medium' ? 2400 : count;

  // Memoize procedural soft circle texture
  const circleTexture = React.useMemo(() => createCircleTexture(), []);

  const [starGeometry] = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure star white
      new THREE.Color('#38bdf8'), // Radiant cyan
      new THREE.Color('#818cf8'), // Distant indigo
      new THREE.Color('#c084fc'), // Cosmic violet
      new THREE.Color('#fbbf24'), // Warm stellar amber
    ];

    for (let i = 0; i < starCount; i++) {
      // Generate spherical distribution around universe
      const radius = 70 + Math.random() * 150;
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

    return [geo];
  }, [starCount]);

  const dustGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const dustCount = graphicsQuality === 'low' ? 250 : 600;
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);

    const dustColors = [
      new THREE.Color('#38bdf8'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
    ];

    for (let i = 0; i < dustCount; i++) {
      // Keep cosmic dust in a broad galactic disc avoiding camera near plane
      const radius = 16 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = radius * Math.sin(theta);

      const col = dustColors[i % dustColors.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [graphicsQuality]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * 0.015;
    }
  });

  return (
    <group>
      {/* Outer Stars with soft circular texture */}
      <points ref={pointsRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.65}
          map={circleTexture}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle Inner Cosmic Dust with soft circular texture */}
      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          size={0.85}
          map={circleTexture}
          vertexColors
          transparent
          opacity={0.3}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
