import * as React from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGalaxyStore } from '@space/state';
import { celestialDestinations, getDestinationById } from '@space/portfolio-content';

export const CameraController: React.FC = () => {
  const { camera } = useThree();
  const currentDestination = useGalaxyStore((s) => s.currentDestination);
  const isTraveling = useGalaxyStore((s) => s.isTraveling);
  const setIsTraveling = useGalaxyStore((s) => s.setIsTraveling);
  const reducedMotion = useGalaxyStore((s) => s.reducedMotion);

  const targetPos = React.useRef(new THREE.Vector3(0, 12, 28));
  const targetLookAt = React.useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = React.useRef(new THREE.Vector3(0, 0, 0));

  React.useEffect(() => {
    const dest = getDestinationById(currentDestination) || celestialDestinations[0];
    targetPos.current.set(...dest.cameraPosition);
    targetLookAt.current.set(...dest.cameraLookAt);

    if (reducedMotion) {
      camera.position.copy(targetPos.current);
      currentLookAt.current.copy(targetLookAt.current);
      camera.lookAt(targetLookAt.current);
      setIsTraveling(false);
    }
  }, [currentDestination, camera, reducedMotion, setIsTraveling]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    // Smooth lerp speed
    const lerpFactor = Math.min(delta * 2.8, 1);

    // Interpolate camera position
    camera.position.lerp(targetPos.current, lerpFactor);

    // Interpolate lookAt target
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);

    // Check if reached destination
    const posDist = camera.position.distanceTo(targetPos.current);
    const lookDist = currentLookAt.current.distanceTo(targetLookAt.current);

    if (isTraveling && posDist < 0.1 && lookDist < 0.1) {
      setIsTraveling(false);
    }
  });

  return null;
};

