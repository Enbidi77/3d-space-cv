import { Experience, ExperienceSchema } from './schemas';

export const experienceData: Experience[] = [
  ExperienceSchema.parse({
    id: 'ty-xuan',
    role: 'Software Engineer (ERP & Database Systems)',
    company: 'Công ty TNHH Tỷ Xuân',
    period: '2025 – Present',
    isCurrent: true,
    location: 'Vietnam',
    summary:
      'Maintain, enhance, and optimize enterprise ERP modules supporting large-scale daily manufacturing operations and business reporting with deep SQL Server tuning and high-availability database engineering.',
    responsibilities: [
      'Maintain, enhance, and optimize enterprise ERP modules supporting large-scale daily manufacturing operations and business reporting.',
      'Develop and tune complex SQL Server stored procedures, views, and data aggregations to accelerate query execution and analytical reporting.',
      'Investigate, troubleshoot, and resolve production database incidents and application defects to maintain high system availability and data integrity.',
    ],
    technologies: [
      'SQL Server',
      'Database Optimization',
      'Stored Procedures',
      'ERP Architecture',
      'Query Tuning',
      'Data Integrity',
    ],
    stationCode: 'ORBIT-ALPHA-01',
    orbitRadius: 18,
    celestialTheme: {
      color: '#38bdf8', // Sky cyan
      glowColor: '#0284c7',
      iconName: 'Database',
    },
  }),
  ExperienceSchema.parse({
    id: 'tps-software',
    role: 'Backend / Fullstack Web Developer',
    company: 'TPS Software',
    period: '2023 – 2024',
    isCurrent: false,
    location: 'Ho Chi Minh City, Vietnam',
    summary:
      'Architected high-throughput microservices using Spring Boot & ASP.NET Core, decoupled cloud workloads via AWS Lambda & SQS, automated CI/CD to Azure, and developed modular React/Angular frontends.',
    responsibilities: [
      'Architected and implemented high-throughput RESTful APIs using Spring Boot and ASP.NET Core within distributed microservices environments.',
      'Integrated asynchronous AWS cloud infrastructure including Lambda, SQS, and SES for decoupled background jobs and notification processing.',
      'Automated CI/CD build and deployment pipelines using GitHub Actions targeting Azure App Service and Azure Virtual Machines.',
      'Developed modular, responsive UI components using React and Angular (Material UI) ensuring efficient API data binding.',
      'Collaborated actively in Agile/Scrum ceremonies, contributing to sprint planning, design reviews, backlog refinement, and coding standards.',
    ],
    technologies: [
      'Spring Boot',
      'ASP.NET Core',
      'Java',
      'C#',
      'React',
      'Angular',
      'Material UI',
      'AWS Lambda',
      'AWS SQS',
      'AWS SES',
      'Azure App Service',
      'Azure VM',
      'GitHub Actions',
      'Microservices',
      'Agile/Scrum',
    ],
    stationCode: 'ORBIT-BETA-02',
    orbitRadius: 28,
    celestialTheme: {
      color: '#a855f7', // Purple/Violet
      glowColor: '#7e22ce',
      iconName: 'Cpu',
    },
  }),
];

