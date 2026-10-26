import * as React from 'react';
import * as THREE from 'three';
import { Billboard, Text } from '@react-three/drei';
import { useGalaxyStore, DestinationId } from '@space/state';

export interface CelestialLabelProps {
  id: string;
  destinationId?: DestinationId;
  title: string;
  subtitle?: string;
  iconName?: string;
  accentColor?: string;
  distanceFactor?: number;
  position?: [number, number, number];
  onClick?: () => void;
}

export const CelestialLabel: React.FC<CelestialLabelProps> = ({
  id,
  destinationId,
  title,
  subtitle,
  accentColor = '#38bdf8',
  position = [0, 2.5, 0],
  onClick,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const showCelestialLabels = useGalaxyStore((s) => s.showCelestialLabels);
  const setDestination = useGalaxyStore((s) => s.setDestination);
  const isSelected = destinationId ? currentDestination === destinationId : false;

  React.useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  if (!showCelestialLabels) return null;

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else if (destinationId) {
      setDestination(destinationId);
    }
  };

  const scale = hovered || isSelected ? 1.15 : 1.0;
  const pillWidth = Math.max(3.2, title.length * 0.22 + 1.2);
  const pillHeight = subtitle ? 1.0 : 0.7;

  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group
          scale={[scale, scale, scale]}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
        >
          {/* Background Glass Pill */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[pillWidth, pillHeight]} />
            <meshBasicMaterial
              color="#030712"
              transparent
              opacity={0.88}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Border Glow Wireframe */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[pillWidth + 0.08, pillHeight + 0.08]} />
            <meshBasicMaterial
              color={isSelected || hovered ? accentColor : '#334155'}
              wireframe
              transparent
              opacity={isSelected || hovered ? 0.9 : 0.4}
            />
          </mesh>

          {/* Glowing Ping Dot */}
          <mesh position={[-pillWidth / 2 + 0.4, subtitle ? 0.15 : 0, 0.02]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial
              color={accentColor}
              toneMapped={false}
            />
          </mesh>

          {/* Title Text */}
          <Text
            position={[-pillWidth / 2 + 0.65, subtitle ? 0.15 : 0, 0.03]}
            anchorX="left"
            anchorY="middle"
            fontSize={0.28}
            color={isSelected || hovered ? accentColor : '#f1f5f9'}
            letterSpacing={0.05}
          >
            {title.toUpperCase()}
          </Text>

          {/* Subtitle Text */}
          {subtitle && (
            <Text
              position={[-pillWidth / 2 + 0.65, -0.2, 0.03]}
              anchorX="left"
              anchorY="middle"
              fontSize={0.16}
              color="#94a3b8"
              letterSpacing={0.02}
            >
              {subtitle}
            </Text>
          )}
        </group>
      </Billboard>
    </group>
  );
};
