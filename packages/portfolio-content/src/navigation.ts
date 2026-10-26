import { CelestialDestination, CelestialDestinationSchema } from './schemas';

export const celestialDestinations: CelestialDestination[] = [
  CelestialDestinationSchema.parse({
    id: 'home',
    slug: '',
    name: 'Home Base',
    subtitle: 'System Core & Overview',
    description: 'Central engineering hub showcasing summary, core architecture focus, and quick universe jump points.',
    celestialType: 'Radiant Stellar Core',
    position: [0, 0, 0],
    cameraPosition: [0, 12, 28],
    cameraLookAt: [0, 0, 0],
    accentColor: '#38bdf8', // Cyan
    icon: 'Compass',
  }),
  CelestialDestinationSchema.parse({
    id: 'career',
    slug: 'career',
    name: 'Career Orbit',
    subtitle: 'Professional Stations & Timeline',
    description: 'Work experience as orbital stations: Công ty TNHH Tỷ Xuân (ERP & Database) and TPS Software (Microservices & Cloud).',
    celestialType: 'Orbital Ring Station',
    position: [18, 4, -12],
    cameraPosition: [24, 7, -4],
    cameraLookAt: [18, 4, -12],
    accentColor: '#0ea5e9', // Deep Sky Blue
    icon: 'Briefcase',
    orbitRadius: 21,
  }),
  CelestialDestinationSchema.parse({
    id: 'skills',
    slug: 'skills',
    name: 'Technology Constellations',
    subtitle: '7 Technical Star Clusters',
    description: 'Interactive node network of languages, backend frameworks, databases, cloud, messaging, and DevOps.',
    celestialType: 'Stellar Constellation Matrix',
    position: [-20, 8, -10],
    cameraPosition: [-16, 12, -2],
    cameraLookAt: [-20, 8, -10],
    accentColor: '#818cf8', // Indigo
    icon: 'Layers',
    orbitRadius: 23,
  }),
  CelestialDestinationSchema.parse({
    id: 'projects',
    slug: 'projects',
    name: 'Project Worlds',
    subtitle: '4 Interactive Celestial Worlds',
    description: 'Planetary environments hosting Real-Time Collaboration, Vehicle Rental, Broker Loan Matching, and Forex Analytics.',
    celestialType: 'Planetary System',
    position: [0, -6, 26],
    cameraPosition: [0, 2, 36],
    cameraLookAt: [0, -6, 26],
    accentColor: '#c084fc', // Violet
    icon: 'Boxes',
    orbitRadius: 27,
  }),
  CelestialDestinationSchema.parse({
    id: 'education',
    slug: 'education',
    name: 'Education Station',
    subtitle: 'Can Tho University IT Research Module',
    description: "Bachelor's in Information Technology (2019 – 2024), foundational computer science and systems training.",
    celestialType: 'Orbital Research Facility',
    position: [-18, -8, 14],
    cameraPosition: [-12, -4, 20],
    cameraLookAt: [-18, -8, 14],
    accentColor: '#34d399', // Emerald
    icon: 'GraduationCap',
    orbitRadius: 24,
  }),
  CelestialDestinationSchema.parse({
    id: 'contact',
    slug: 'contact',
    name: 'Contact Beacon',
    subtitle: 'Deep-Space Communication Relay',
    description: 'Direct communication channels: Email, Phone, GitHub repository links, and downloadable CV.',
    celestialType: 'Subspace Comm Beacon',
    position: [22, -6, 16],
    cameraPosition: [16, -2, 22],
    cameraLookAt: [22, -6, 16],
    accentColor: '#f43f5e', // Rose/Beacon
    icon: 'Radio',
    orbitRadius: 28,
  }),
];

export const getDestinationById = (id: string): CelestialDestination | undefined => {
  return celestialDestinations.find((d) => d.id === id);
};

export const getDestinationBySlug = (slug: string): CelestialDestination | undefined => {
  return celestialDestinations.find((d) => d.slug === slug);
};

