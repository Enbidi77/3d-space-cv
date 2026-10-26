# Content Management & Extensibility Guide

All content is managed through typed, Zod-validated TypeScript modules located in `packages/portfolio-content/src/`. This decouples the presentation and 3D rendering engines from raw resume data.

---

## 1. Adding a New Work Experience

Open `packages/portfolio-content/src/experience.ts`:

```typescript
import { ExperienceSchema } from './schemas';

export const experienceData: Experience[] = [
  ExperienceSchema.parse({
    id: 'new-company-id',
    role: 'Senior Backend Engineer',
    company: 'Next Unicorn Corp',
    period: '2026 – Present',
    isCurrent: true,
    location: 'Ho Chi Minh City, Vietnam',
    summary: 'Brief overview of responsibilities and technical scale.',
    responsibilities: [
      'Architected distributed event-driven pipelines using Apache Kafka.',
      'Reduced query latencies across multi-terabyte SQL Server clusters.',
    ],
    technologies: ['Java', 'Spring Boot', 'Kafka', 'SQL Server'],
    stationCode: 'ORBIT-GAMMA-03',
    orbitRadius: 36,
    celestialTheme: {
      color: '#38bdf8',
      glowColor: '#0284c7',
      iconName: 'Server',
    },
  }),
  // ... existing experiences
];
```

The career orbit timeline, 3D sub-station markers, and traditional CV modal will update automatically.

---

## 2. Adding a New Project World

Open `packages/portfolio-content/src/projects.ts`:

```typescript
import { ProjectSchema } from './schemas';

export const projectsData: Project[] = [
  ProjectSchema.parse({
    id: 'ai-trading-bot',
    slug: 'ai-trading-bot',
    title: 'High-Frequency Quantitative Engine',
    category: 'Distributed Systems & Finance',
    summary: 'Ultra-low latency algorithmic order execution engine.',
    fullDescription: 'Comprehensive case study text explaining the problem, design, and architecture...',
    highlights: [
      'Engineered order book state engine processing 50k events/sec.',
      'Implemented zero-allocation memory buffers in C# .NET Core.',
    ],
    technologies: ['C#', 'ASP.NET Core', 'Redis', 'Docker'],
    techGroups: {
      Backend: ['C#', '.NET 9'],
      Infrastructure: ['Docker', 'AWS'],
    },
    liveDemoUrl: 'https://...', // Optional
    githubUrl: 'https://github.com/...', // Optional
    celestialBody: {
      name: 'Chronos-X',
      type: 'crystalline-station',
      primaryColor: '#34d399',
      secondaryColor: '#064e3b',
      atmosphereColor: '#6ee7b7',
      hasRings: true,
      orbitRadius: 60,
      orbitSpeed: 0.05,
      size: 2.8,
      texturePreset: 'crystalline-mesh',
    },
    architecture: {
      overview: 'System topology and event loop diagram...',
      keyComponents: [
        { name: 'Order Gateway', description: 'WebSocket endpoint...' },
      ],
    },
  }),
  // ... existing projects
];
```

The 3D Project Worlds planetary system, `/projects` gallery, and `/projects/[slug]` detail page generate statically with zero additional configuration.

---

## 3. Adding a New Skill Item

Open `packages/portfolio-content/src/skills.ts`:

```typescript
{
  id: 'graphql',
  name: 'GraphQL',
  category: 'backend', // 'languages' | 'backend' | 'frontend' | 'databases' | 'cloud' | 'messaging' | 'tools'
  description: 'Schema-first API design with query resolution and DataLoader batching.',
  featured: false,
  relatedProjectIds: ['realtime-collaboration'],
  relatedExperienceIds: ['tps-software'],
  coordinates: [5, 3, -1],
}
```

The new skill immediately joins its parent constellation, receives an interactive node in the 3D matrix, and appears in the filterable search tabs.

