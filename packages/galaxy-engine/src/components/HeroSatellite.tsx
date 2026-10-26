import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGalaxyStore } from '@space/state';
import { CelestialLabel } from './CelestialLabel';

// Procedural photovoltaic grid texture for the solar panels
function createSolarPanelTexture(): THREE.Texture {
  if (typeof document === 'undefined') {
    return new THREE.Texture();
  }
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Deep metallic space-blue base
  ctx.fillStyle = '#061730';
  ctx.fillRect(0, 0, 512, 256);

  // Photovoltaic silicon wafer cells
  const cols = 8;
  const rows = 4;
  const cellW = 512 / cols;
  const cellH = 256 / rows;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * cellW + 2;
      const y = r * cellH + 2;
      const w = cellW - 4;
      const h = cellH - 4;

      // Cell blue reflection gradient
      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, '#10396b');
      grad.addColorStop(0.5, '#0a254a');
      grad.addColorStop(1, '#051833');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Fine copper grid lines inside cell
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + h / 2);
      ctx.lineTo(x + w, y + h / 2);
      ctx.stroke();
    }
  }

  // Golden metallic mounting frame borders
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.strokeRect(1, 1, 510, 254);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const HeroSatellite: React.FC = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  const dishRef = React.useRef<THREE.Group>(null);
  const leftWingRef = React.useRef<THREE.Group>(null);
  const rightWingRef = React.useRef<THREE.Group>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  const solarTexture = React.useMemo(() => createSolarPanelTexture(), []);

  // Satellite floating orbital motion
  useFrame(({ clock }, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle micro-gravity attitude roll and pitch
    groupRef.current.position.y = 2.2 + Math.sin(t * 0.4) * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.04 - 0.15;
    groupRef.current.rotation.y += delta * 0.05;
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setDestination('home');
  };

  return (
    <group
      ref={groupRef}
      position={[0, 2.2, 8]}
      rotation={[0.2, -0.3, -0.15]}
      onClick={handleClick}
    >
      {/* 1. Main Satellite Bus (Avionics & Core Module) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#d1d5db"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Foil Insulation Panels (Gold/Silver Mylar patches) */}
      <mesh position={[0, 0, 1.11]}>
        <planeGeometry args={[1.5, 1.6]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0, 0, -1.11]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.5, 1.6]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Blue Thermal Radiator Panels on bus sides */}
      <mesh position={[1.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.6, 1.8]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-1.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.6, 1.8]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 2. High-Gain Parabolic Communications Dish (matching reference) */}
      <group ref={dishRef} position={[0.4, 0.4, 1.4]} rotation={[0.45, -0.35, 0.2]}>
        {/* Parabolic reflector bowl */}
        <mesh>
          <sphereGeometry args={[1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.7}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Focal feed horn tripod struts */}
        <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>

        {/* Sub-reflector antenna tip */}
        <mesh position={[0, 0, 1.2]}>
          <coneGeometry args={[0.18, 0.25, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* 3. Left Solar Array Wing */}
      <group ref={leftWingRef} position={[-4.2, 0.2, 0]} rotation={[0.15, 0, 0.08]}>
        {/* Main Panel Frame */}
        <mesh>
          <boxGeometry args={[5.2, 2.2, 0.08]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Photovoltaic silicon face */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[5.0, 2.0]} />
          <meshStandardMaterial
            map={solarTexture}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Structural Mounting Truss */}
        <mesh position={[2.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} />
        </mesh>
      </group>

      {/* 4. Right Solar Array Wing */}
      <group ref={rightWingRef} position={[4.2, 0.2, 0]} rotation={[0.15, 0, -0.08]}>
        {/* Main Panel Frame */}
        <mesh>
          <boxGeometry args={[5.2, 2.2, 0.08]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Photovoltaic silicon face */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[5.0, 2.0]} />
          <meshStandardMaterial
            map={solarTexture}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Structural Mounting Truss */}
        <mesh position={[-2.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} />
        </mesh>
      </group>

      {/* 5. Attitude Thruster Clusters & Sensor Mast */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.5} />
      </mesh>

      {/* Local Spotlight reflecting off satellite bus */}
      <pointLight color="#ffffff" intensity={2.0} distance={10} position={[2, 3, 4]} />

      {/* In-Scene Interactive Label */}
      <CelestialLabel
        id="home"
        destinationId="home"
        title="Orbital Comm Satellite"
        subtitle="Home Base • Fullstack Core"
        accentColor="#38bdf8"
        position={[0, 2.4, 0]}
      />
    </group>
  );
};

