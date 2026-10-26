import * as React from 'react';
import * as THREE from 'three';

export interface OrbitLineProps {
  radius: number;
  color?: string;
  opacity?: number;
  rotation?: [number, number, number];
  segments?: number;
}

export const OrbitLine: React.FC<OrbitLineProps> = ({
  radius,
  color = '#38bdf8',
  opacity = 0.25,
  rotation = [Math.PI / 2, 0, 0],
  segments = 128,
}) => {
  const lineGeometry = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, segments]);

  const lineObject = React.useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(lineGeometry, material);
    line.rotation.set(...rotation);
    return line;
  }, [lineGeometry, color, opacity, rotation]);

  return <primitive object={lineObject} />;
};
