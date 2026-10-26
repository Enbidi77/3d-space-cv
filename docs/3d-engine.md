# 3D Galaxy Engine Documentation

The galaxy engine is housed in `packages/galaxy-engine`. It renders a fully interactive 3D universe using Three.js, `@react-three/fiber`, and `@react-three/drei`.

---

## Engine Architecture

```text
packages/galaxy-engine/
├── GalaxyCanvas.tsx           # WebGL canvas wrapper with error boundaries & lights
├── components/
│   ├── StarField.tsx          # Procedural 3-tier star particles & cosmic dust
│   ├── NebulaClouds.tsx       # Volumetric-style cosmic gas shells
│   ├── CameraController.tsx   # Smooth slerp/lerp camera tweening system
│   ├── HomeBaseNode.tsx       # Central radiant star core & rotating rings
│   ├── CareerOrbitNode.tsx    # Spindle station with Ty Xuan & TPS docking hubs
│   ├── ConstellationSystem.tsx# Connected 3D graph representing technical skills
│   ├── ProjectWorldsSystem.tsx# 4 procedural planetary bodies with orbital rings
│   ├── EducationNode.tsx      # CTU research station with twin solar arrays
│   ├── ContactBeaconNode.tsx  # Pulsing comm spire transmitting signal ripples
│   ├── OrbitLine.tsx          # Precision orbital track rendering
│   ├── CelestialLabel.tsx     # Drei HTML interactive annotations
│   └── WebGLFallback.tsx      # CSS/Canvas 2D sector map for low-power/no-WebGL
```

---

## Key Technical Features

### 1. Multi-Tier Procedural Starfield
- Uses `THREE.BufferGeometry` with separate vertex color and position buffers.
- Over 3,500 distant stars distributed in a spherical shell (radius 60 to 220) with random astrological color temperatures (white, cyan, violet, amber).
- 800 inner cosmic dust particles orbiting the galactic plane.
- Rotates slowly in the rendering loop using delta-timed frame ticks.

### 2. Smooth Camera Controller
- The camera controller (`CameraController`) monitors `currentDestination` in the Zustand store.
- When a destination changes, the target position (`targetPos`) and lookAt target (`targetLookAt`) smoothly lerp toward the coordinates defined in `packages/portfolio-content/src/navigation.ts`.
- When `reducedMotion` is active or triggered by OS preferences, the camera jumps directly to the coordinates without lerping.

### 3. Dynamic Quality Adjustments
- Supports three graphics tiers:
  - **High:** Full antialiasing, device pixel ratio [1, 2], 3500 stars, volumetric nebulae, and rotational animations.
  - **Medium:** DPR 1.5, 2400 stars, standard materials.
  - **Low:** DPR 1, 1200 stars, disabled nebula shells, reduced particle counts.

### 4. Interactive 3D Annotations (`CelestialLabel`)
- Powered by `@react-three/drei`'s `Html` projection.
- Pins stay centered over their corresponding celestial object, scale realistically with distance, and provide clickable, accessible HTML button affordances.

