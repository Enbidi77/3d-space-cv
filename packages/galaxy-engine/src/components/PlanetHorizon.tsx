import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGalaxyStore } from '@space/state';

// Generate procedural atmospheric cloud & storm vortex texture matching satellite photography
function createPlanetTexture(): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // 1. Deep ocean base gradient (deep midnight navy to oceanic azure)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  oceanGrad.addColorStop(0, '#040d1a');
  oceanGrad.addColorStop(0.3, '#08203e');
  oceanGrad.addColorStop(0.6, '#0f386b');
  oceanGrad.addColorStop(1, '#05182e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // 2. Continents and shallow landmass silhouettes
  ctx.fillStyle = '#0f293b';
  for (let i = 0; i < 14; i++) {
    const cx = (i * 160 + 80) % 2048;
    const cy = 350 + Math.sin(i * 1.5) * 200;
    ctx.beginPath();
    ctx.arc(cx, cy, 90 + Math.sin(i) * 50, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Golden sunlit atmospheric wash (warm sunlight illuminating the upper-right hemisphere)
  const sunWash = ctx.createRadialGradient(1450, 500, 50, 1450, 500, 850);
  sunWash.addColorStop(0, 'rgba(234, 155, 78, 0.45)');
  sunWash.addColorStop(0.35, 'rgba(202, 120, 54, 0.25)');
  sunWash.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
  sunWash.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunWash;
  ctx.fillRect(0, 0, 2048, 1024);

  // 4. Massive swirling hurricane / cyclone storm system (matching the reference photo)
  const cycloneX = 1350;
  const cycloneY = 480;
  ctx.save();
  ctx.translate(cycloneX, cycloneY);

  // Spiral arms of the storm
  for (let arm = 0; arm < 3; arm++) {
    const baseAngle = (arm * Math.PI * 2) / 3;
    ctx.beginPath();
    for (let r = 15; r < 400; r += 4) {
      const angle = baseAngle + Math.log(r) * 2.8;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r * 0.75; // perspective flattening
      if (r === 15) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(245, 235, 220, 0.42)';
    ctx.lineWidth = 28;
    ctx.stroke();

    // Warm sunlit rim on storm arms
    ctx.strokeStyle = 'rgba(217, 140, 68, 0.35)';
    ctx.lineWidth = 14;
    ctx.stroke();
  }

  // Cyclone Eye
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI * 2);
  ctx.fillStyle = '#061324';
  ctx.fill();

  ctx.restore();

  // 5. Broad horizontal cloud streams across the planet
  for (let j = 0; j < 35; j++) {
    const y = 200 + j * 20 + Math.sin(j * 0.8) * 40;
    ctx.beginPath();
    ctx.ellipse(
      (j * 110) % 2048,
      y,
      280 + (j % 5) * 80,
      12 + (j % 3) * 6,
      Math.sin(j) * 0.15,
      0,
      Math.PI * 2
    );
    // Warm sunlit clouds on the right, cool white/blue clouds on the left
    ctx.fillStyle = j % 2 === 0 ? 'rgba(240, 230, 215, 0.28)' : 'rgba(200, 225, 245, 0.22)';
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

export const PlanetHorizon: React.FC = () => {
  const planetRef = React.useRef<THREE.Mesh>(null);
  const cloudRef = React.useRef<THREE.Mesh>(null);
  const atmosphereRef = React.useRef<THREE.Mesh>(null);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  const planetTexture = React.useMemo(() => createPlanetTexture(), []);

  // Earth / Planet positioning:
  // An enormous sphere placed below the camera so the curved horizon sweeps majestically
  // across the lower third of the scene, exactly like low-Earth orbit satellite photos.
  const planetRadius = 75;
  const planetPosition: [number, number, number] = [6, -79, -5];

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.003;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.0045;
    }
  });

  // Custom Fresnel Rayleigh scattering atmosphere shader for the brilliant electric blue horizon limb
  const atmosphereMaterial = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float intensity = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 4.0);
          
          // Brilliant electric blue to pure white limb edge
          vec3 limbColor = mix(vec3(0.05, 0.55, 1.0), vec3(0.85, 0.95, 1.0), intensity * 1.2);
          gl_FragColor = vec4(limbColor, intensity * 0.95);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <group position={planetPosition}>
      {/* 1. Base Planet Surface with Cyclones and Continents */}
      <mesh ref={planetRef} rotation={[0.2, 0.8, -0.15]}>
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      {/* 2. Swirling Cloud Layer */}
      <mesh ref={cloudRef} rotation={[0.22, 0.85, -0.12]}>
        <sphereGeometry args={[planetRadius + 0.35, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Electric Blue Rayleigh Atmosphere Glow Shell */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[planetRadius + 1.8, 64, 64]} />
      </mesh>

      {/* 4. Horizon Laser Rim Light - creates that razor-sharp vibrant glow seen in LEO photos */}
      <mesh position={[0, planetRadius * 0.98, -planetRadius * 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[planetRadius * 0.22, 0.3, 16, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

