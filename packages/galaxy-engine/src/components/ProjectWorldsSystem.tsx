import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CelestialLabel } from './CelestialLabel';
import { OrbitLine } from './OrbitLine';
import { useGalaxyStore } from '@space/state';
import { projectsData, Project } from '@space/portfolio-content';

interface ProjectPlanetProps {
  project: Project;
  angle: number;
  radius: number;
}

const ProjectPlanet: React.FC<ProjectPlanetProps> = ({ project, angle, radius }) => {
  const meshRef = React.useRef<THREE.Group>(null);
  const ringsRef = React.useRef<THREE.Mesh>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const setFocusedId = useGalaxyStore((s) => s.setFocusedId);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.15;
    }
  });

  const handlePlanetClick = (e: React.MouseEvent | any) => {
    e.stopPropagation();
    setFocusedId(project.id);
    setDestination('projects');
  };

  const { celestialBody } = project;

  return (
    <group position={[x, 0, z]}>
      <group
        ref={meshRef}
        onClick={handlePlanetClick}
      >
        {/* Planet Core Sphere */}
        {celestialBody.type === 'crystalline-station' ? (
          <mesh>
            <icosahedronGeometry args={[celestialBody.size * 0.5, 1]} />
            <meshStandardMaterial
              color={celestialBody.primaryColor}
              emissive={celestialBody.secondaryColor}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        ) : (
          <mesh>
            <sphereGeometry args={[celestialBody.size * 0.5, 32, 32]} />
            <meshStandardMaterial
              color={celestialBody.primaryColor}
              emissive={celestialBody.secondaryColor}
              emissiveIntensity={0.5}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        )}

        {/* Atmosphere / Glow Shell */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[celestialBody.size * 0.5, 24, 24]} />
          <meshBasicMaterial
            color={celestialBody.atmosphereColor}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Optional Planetary Rings */}
        {celestialBody.hasRings && (
          <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry
              args={[celestialBody.size * 0.65, celestialBody.size * 0.95, 48]}
            />
            <meshBasicMaterial
              color={celestialBody.atmosphereColor}
              transparent
              opacity={0.45}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}
      </group>

      {/* Local Planet Label */}
      <CelestialLabel
        id={project.id}
        title={celestialBody.name}
        subtitle={project.title.slice(0, 24) + '...'}
        accentColor={celestialBody.primaryColor}
        position={[0, celestialBody.size * 0.5 + 1.2, 0]}
        onClick={() => {
          setFocusedId(project.id);
          setDestination('projects');
        }}
      />
    </group>
  );
};

export const ProjectWorldsSystem: React.FC = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group
      position={[0, -6, 26]}
      onClick={(e) => {
        e.stopPropagation();
        setDestination('projects');
      }}
    >
      {/* Central Beacon of Project Hub */}
      <mesh>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#7e22ce"
          emissiveIntensity={1.4}
        />
      </mesh>
      <pointLight color="#c084fc" intensity={2} distance={20} />

      {/* Shared Orbits & Planets */}
      <OrbitLine radius={5} color="#38bdf8" opacity={0.2} />
      <OrbitLine radius={8.5} color="#a855f7" opacity={0.2} />
      <OrbitLine radius={12} color="#34d399" opacity={0.2} />
      <OrbitLine radius={15.5} color="#f59e0b" opacity={0.2} />

      <group ref={groupRef}>
        {projectsData.map((project, index) => {
          const angles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
          const radii = [5, 8.5, 12, 15.5];
          return (
            <ProjectPlanet
              key={project.id}
              project={project}
              angle={angles[index % 4]}
              radius={radii[index % 4]}
            />
          );
        })}
      </group>

      <CelestialLabel
        id="projects"
        destinationId="projects"
        title="Project Worlds"
        subtitle="4 Interactive Planetary Showcase"
        accentColor="#c084fc"
        position={[0, 3.4, 0]}
      />
    </group>
  );
};

