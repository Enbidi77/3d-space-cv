import { describe, it, expect } from 'vitest';
import {
  profileData,
  ProfileSchema,
  experienceData,
  ExperienceSchema,
  skillsData,
  SkillItemSchema,
  projectsData,
  ProjectSchema,
  educationData,
  EducationSchema,
  celestialDestinations,
  CelestialDestinationSchema,
} from '../src';

describe('Portfolio Content Validation', () => {
  it('validates profile data against ProfileSchema', () => {
    expect(() => ProfileSchema.parse(profileData)).not.toThrow();
    expect(profileData.name).toBe('Nguyen Bao Duy');
    expect(profileData.email).toBe('nguyenduy.fwk@gmail.com');
    expect(profileData.portfolioUrl).toBe('https://cv-portfolio.vercel.app');
    expect(profileData.githubUrl).toBe('https://github.com/Enbidi77');
  });

  it('validates all experience entries against ExperienceSchema', () => {
    expect(experienceData).toHaveLength(2);
    experienceData.forEach((exp) => {
      expect(() => ExperienceSchema.parse(exp)).not.toThrow();
      expect(exp.responsibilities.length).toBeGreaterThan(0);
      expect(exp.technologies.length).toBeGreaterThan(0);
    });

    const tyXuan = experienceData.find((e) => e.id === 'ty-xuan');
    expect(tyXuan).toBeDefined();
    expect(tyXuan?.company).toBe('Công ty TNHH Tỷ Xuân');
    expect(tyXuan?.isCurrent).toBe(true);

    const tps = experienceData.find((e) => e.id === 'tps-software');
    expect(tps).toBeDefined();
    expect(tps?.company).toBe('TPS Software');
    expect(tps?.isCurrent).toBe(false);
  });

  it('validates skills data against SkillItemSchema', () => {
    expect(skillsData.length).toBeGreaterThan(15);
    skillsData.forEach((skill) => {
      expect(() => SkillItemSchema.parse(skill)).not.toThrow();
      expect(skill.name).toBeTruthy();
      expect(skill.category).toBeTruthy();
    });
  });

  it('validates all 4 key projects against ProjectSchema', () => {
    expect(projectsData).toHaveLength(4);
    const expectedSlugs = [
      'realtime-collaboration',
      'vehicle-rental-platform',
      'broker-loan-matching-portal',
      'forex-predictive-analytics',
    ];

    projectsData.forEach((project) => {
      expect(() => ProjectSchema.parse(project)).not.toThrow();
      expect(expectedSlugs).toContain(project.slug);
      expect(project.highlights.length).toBeGreaterThan(0);
      expect(project.celestialBody.name).toBeTruthy();
      expect(project.architecture.keyComponents.length).toBeGreaterThan(0);
    });
  });

  it('validates education data against EducationSchema', () => {
    expect(() => EducationSchema.parse(educationData)).not.toThrow();
    expect(educationData.institution).toBe('Can Tho University');
    expect(educationData.degree).toBe("Bachelor's in Information Technology");
    expect(educationData.period).toBe('2019 – 2024');
  });

  it('validates celestial destinations', () => {
    expect(celestialDestinations).toHaveLength(6);
    const destinationIds = celestialDestinations.map((d) => d.id);
    expect(destinationIds).toEqual(['home', 'career', 'skills', 'projects', 'education', 'contact']);

    celestialDestinations.forEach((dest) => {
      expect(() => CelestialDestinationSchema.parse(dest)).not.toThrow();
      expect(dest.position).toHaveLength(3);
      expect(dest.cameraPosition).toHaveLength(3);
      expect(dest.cameraLookAt).toHaveLength(3);
    });
  });
});

