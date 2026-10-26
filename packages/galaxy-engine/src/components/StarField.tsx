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
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Fine, crisp star glow
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const StarField: React.FC<StarFieldProps> = ({ count = 3000 }) => {
  const pointsRef = React.useRef<THREE.Points>(null);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);
  const graphicsQuality = useGalaxyStore((s) => s.graphicsQuality);

  const starCount = graphicsQuality === 'low' ? 1200 : graphicsQuality === 'medium' ? 2200 : count;
  const circleTexture = React.useMemo(() => createCircleTexture(), []);

  const [starGeometry] = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure white star
      new THREE.Color('#f0f9ff'), // Cool diamond white
      new THREE.Color('#bae6fd'), // Subtle blue-white
      new THREE.Color('#fed7aa'), // Warm white
    ];

    for (let i = 0; i < starCount; i++) {
      // Distribute stars in deep space sphere
      const radius = 100 + Math.random() * 120;
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

  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.002;
  });

  return (
    <points ref={pointsRef} geometry={starGeometry}>
      <pointsMaterial
        size={0.35}
        map={circleTexture}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
