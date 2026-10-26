import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  tagline: z.string(),
  location: z.string(),
  phone: z.string(),
  email: z.string().email(),
  portfolioUrl: z.string().url(),
  githubUrl: z.string().url(),
  summary: z.string(),
  highlights: z.array(z.string()),
  statusText: z.string(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  isCurrent: z.boolean(),
  location: z.string().optional(),
  summary: z.string(),
  responsibilities: z.array(z.string()),
  technologies: z.array(z.string()),
  stationCode: z.string(),
  orbitRadius: z.number(),
  celestialTheme: z.object({
    color: z.string(),
    glowColor: z.string(),
    iconName: z.string(),
  }),
});

export const SkillCategorySchema = z.enum([
  'languages',
  'backend',
  'frontend',
  'databases',
  'cloud',
  'messaging',
  'tools',
]);

export const SkillItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: SkillCategorySchema,
  description: z.string(),
  featured: z.boolean().default(false),
  relatedProjectIds: z.array(z.string()).default([]),
  relatedExperienceIds: z.array(z.string()).default([]),
  coordinates: z.tuple([z.number(), z.number(), z.number()]).optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  clientContext: z.string().optional(),
  summary: z.string(),
  fullDescription: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
  techGroups: z.record(z.string(), z.array(z.string())),
  liveDemoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  celestialBody: z.object({
    name: z.string(),
    type: z.enum(['terrestrial', 'gas-giant', 'ice-world', 'crystalline-station']),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    atmosphereColor: z.string(),
    hasRings: z.boolean(),
    orbitRadius: z.number(),
    orbitSpeed: z.number(),
    size: z.number(),
    texturePreset: z.string(),
  }),
  architecture: z.object({
    overview: z.string(),
    keyComponents: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })),
  }),
});

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  period: z.string(),
  description: z.string(),
  stationCode: z.string(),
});

export const CelestialDestinationSchema = z.object({
  id: z.enum(['home', 'career', 'skills', 'projects', 'education', 'contact']),
  slug: z.string(),
  name: z.string(),
  subtitle: z.string(),
  description: z.string(),
  celestialType: z.string(),
  position: z.tuple([z.number(), z.number(), z.number()]),
  cameraPosition: z.tuple([z.number(), z.number(), z.number()]),
  cameraLookAt: z.tuple([z.number(), z.number(), z.number()]),
  accentColor: z.string(),
  icon: z.string(),
  orbitRadius: z.number().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type CelestialDestination = z.infer<typeof CelestialDestinationSchema>;

