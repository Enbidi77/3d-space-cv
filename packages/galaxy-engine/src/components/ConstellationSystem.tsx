import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CelestialLabel } from './CelestialLabel';
import { useGalaxyStore } from '@space/state';
import { skillsData, skillCategoriesData } from '@space/portfolio-content';

export const ConstellationSystem: React.FC = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const selectedCategory = useGalaxyStore((s) => s.selectedSkillCategory);
  const setSelectedCategory = useGalaxyStore((s) => s.setSelectedSkillCategory);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
  });

  // Calculate lines between skills in the same category
  const constellationLines = React.useMemo(() => {
    const lineElements: React.ReactNode[] = [];

    skillCategoriesData.forEach((category) => {
      const itemsInCat = skillsData.filter((s) => s.category === category.id && s.coordinates);
      for (let i = 0; i < itemsInCat.length - 1; i++) {
        const p1 = new THREE.Vector3(...(itemsInCat[i].coordinates as [number, number, number]));
        const p2 = new THREE.Vector3(...(itemsInCat[i + 1].coordinates as [number, number, number]));
        const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const isHighlighted = !selectedCategory || selectedCategory === category.id;

        const material = new THREE.LineBasicMaterial({
          color: category.constellationColor,
          transparent: true,
          opacity: isHighlighted ? 0.45 : 0.1,
          blending: THREE.AdditiveBlending,
        });

        const line = new THREE.Line(geo, material);

        lineElements.push(
          <primitive key={`line-${itemsInCat[i].id}-${itemsInCat[i + 1].id}`} object={line} />
        );
      }
    });

    return lineElements;
  }, [selectedCategory]);

  return (
    <group
      position={[-20, 8, -10]}
      onClick={(e) => {
        e.stopPropagation();
        setDestination('skills');
      }}
    >
      <group ref={groupRef}>
        {/* Constellation Connecting Lines */}
        {constellationLines}

        {/* Skill Node Stars */}
        {skillsData.map((skill) => {
          if (!skill.coordinates) return null;
          const [x, y, z] = skill.coordinates;
          const isCategoryMatch = !selectedCategory || selectedCategory === skill.category;
          const categoryInfo = skillCategoriesData.find((c) => c.id === skill.category);
          const color = categoryInfo ? categoryInfo.constellationColor : '#818cf8';

          return (
            <group
              key={skill.id}
              position={[x * 0.5, y * 0.5, z * 0.5]}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(skill.category);
                setDestination('skills');
              }}
            >
              <mesh>
                <sphereGeometry args={[skill.featured ? 0.32 : 0.22, 16, 16]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={isCategoryMatch ? (skill.featured ? 1.6 : 1.0) : 0.2}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      <CelestialLabel
        id="skills"
        destinationId="skills"
        title="Technology Constellations"
        subtitle="7 Technical Star Clusters"
        accentColor="#818cf8"
        position={[0, 4.2, 0]}
      />
    </group>
  );
};
