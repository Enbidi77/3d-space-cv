import { Project, ProjectSchema } from './schemas';

export const projectsData: Project[] = [
  ProjectSchema.parse({
    id: 'realtime-collaboration',
    slug: 'realtime-collaboration',
    title: 'Real-Time Enterprise Collaboration Monorepo',
    category: 'Real-Time Systems & Monorepo Architecture',
    summary:
      'Production-ready collaboration monorepo providing low-latency chat, peer-to-peer audio/video streaming via WebRTC, multi-tenant PostgreSQL schemas, and background task queues.',
    fullDescription:
      'Architected as an enterprise-grade monorepo to power synchronized modern workspace communications. The backend utilizes NestJS with modular microservices and Prisma ORM, providing real-time WebSocket communication, presence status tracking, and signaling for peer-to-peer WebRTC audio and video streaming. Multi-tenant PostgreSQL schemas ensure data isolation with strict Role-Based Access Control (RBAC), and BullMQ with Redis handles asynchronous background jobs and email delivery.',
    highlights: [
      'Architected a production-ready monorepo facilitating real-time chat, audio/video calling, and workspace collaboration.',
      'Implemented low-latency WebSocket messaging, live presence tracking, and WebRTC signaling for peer-to-peer streaming.',
      'Engineered PostgreSQL multi-tenant database schemas with Prisma ORM, implementing RBAC security and BullMQ task queues.',
    ],
    technologies: [
      'NestJS',
      'Next.js 14',
      'PostgreSQL',
      'Prisma',
      'WebRTC',
      'Redis',
      'BullMQ',
      'TypeScript',
      'WebSocket',
    ],
    techGroups: {
      Backend: ['NestJS', 'Prisma', 'BullMQ', 'Redis'],
      Frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
      Networking: ['WebSocket', 'WebRTC Signaling'],
      Database: ['PostgreSQL (Multi-tenant)'],
    },
    liveDemoUrl: 'https://cv-portfolio.vercel.app',
    githubUrl: 'https://github.com/Enbidi77',
    celestialBody: {
      name: 'Comms-Nova',
      type: 'terrestrial',
      primaryColor: '#38bdf8', // Cyan
      secondaryColor: '#1e40af', // Deep blue
      atmosphereColor: '#67e8f9',
      hasRings: true,
      orbitRadius: 22,
      orbitSpeed: 0.15,
      size: 2.2,
      texturePreset: 'signal-grid',
    },
    architecture: {
      overview:
        'A unified monorepo leveraging NestJS modular architecture, WebRTC signaling channels, Prisma multi-tenant data layer, and Redis/BullMQ task processing.',
      keyComponents: [
        {
          name: 'WebRTC & WebSocket Gateway',
          description:
            'Handles persistent duplex connections for real-time presence indicators, instant messaging broadcast, and peer connection negotiation.',
        },
        {
          name: 'Multi-Tenant Data Layer',
          description:
            'PostgreSQL partitioned schemas orchestrated by Prisma ORM with fine-grained role-based access control (RBAC).',
        },
        {
          name: 'Distributed Task Queue',
          description:
            'BullMQ powered by Redis cluster for background jobs, media processing notifications, and scheduled queue consumption.',
        },
      ],
    },
  }),

  ProjectSchema.parse({
    id: 'vehicle-rental',
    slug: 'vehicle-rental-platform',
    title: 'Vehicle Rental Management Platform',
    category: 'Enterprise Cloud Logistics & API Engineering',
    clientContext: 'New Zealand',
    summary:
      'Vehicle fleet management APIs and booking lifecycle workflows for an international client, decoupled with AWS Lambda and SQS for asynchronous event handling.',
    fullDescription:
      'Engineered for an international vehicle rental client based in New Zealand. The platform delivers high-throughput backend APIs built on Spring Boot and .NET Core, coordinating end-to-end booking lifecycles, vehicle telemetry status, and reservation holds. Heavy background tasks including status dispatching, customer notifications, and automated PDF invoice generation are decoupled using AWS SQS and AWS Lambda. A responsive Angular management console with Material UI enables operations staff to monitor fleet states in real time.',
    highlights: [
      'Engineered vehicle fleet management APIs and booking lifecycle workflows for an international client.',
      'Integrated AWS SQS and Lambda for asynchronous booking notifications, status updates, and invoice generation.',
      'Designed indexed PostgreSQL relational database schemas and built responsive Angular UI management modules.',
    ],
    technologies: [
      'Spring Boot',
      '.NET Core',
      'Angular',
      'AWS Lambda',
      'AWS SQS',
      'PostgreSQL',
      'Material UI',
      'Docker',
    ],
    techGroups: {
      Backend: ['Spring Boot', '.NET Core'],
      Cloud: ['AWS Lambda', 'AWS SQS', 'AWS SES'],
      Frontend: ['Angular', 'Material UI'],
      Database: ['PostgreSQL (Indexed)'],
    },
    githubUrl: 'https://github.com/Enbidi77',
    celestialBody: {
      name: 'Logistics-Prime',
      type: 'ice-world',
      primaryColor: '#a855f7', // Violet
      secondaryColor: '#4c1d95',
      atmosphereColor: '#c084fc',
      hasRings: false,
      orbitRadius: 32,
      orbitSpeed: 0.1,
      size: 2.6,
      texturePreset: 'orbital-routes',
    },
    architecture: {
      overview:
        'Cloud-native event-driven design separating the synchronous booking gateway from asynchronous invoice and notification processors via AWS SQS.',
      keyComponents: [
        {
          name: 'Core Booking Engine',
          description:
            'Spring Boot and .NET Core RESTful endpoints managing reservation validations, vehicle allocation locks, and pricing rules.',
        },
        {
          name: 'Asynchronous Cloud Pipeline',
          description:
            'AWS SQS queues trigger AWS Lambda functions for non-blocking invoice rendering and automated email delivery.',
        },
        {
          name: 'Indexed Relational Store',
          description:
            'PostgreSQL database engineered with composite indexes and audit trails for high-concurrency booking lookups.',
        },
      ],
    },
  }),

  ProjectSchema.parse({
    id: 'broker-loan-matching',
    slug: 'broker-loan-matching-portal',
    title: 'Broker Loan Matching & Ingestion Portal',
    category: 'Financial Data Ingestion & Search Optimization',
    summary:
      'High-performance broker portal featuring an Elasticsearch lender matching engine, live third-party financial rate ingestion workers, and Dapper Database-First optimization.',
    fullDescription:
      'Built to empower financial brokers with instantaneous filtering of optimal loan products across dynamic market offerings. The system implements an Elasticsearch indexing engine for complex multi-criteria matching across interest rates, loan-to-value ratios, and lender criteria. Scheduled background synchronization workers securely pull third-party market rates via external APIs. The backend utilizes a high-efficiency Database-First architecture with Dapper micro-ORM and optimized SQL Server stored procedures for lightning-fast queries.',
    highlights: [
      'Built lender matching engine allowing brokers to filter optimal loan products using Elasticsearch search indexing.',
      'Engineered scheduled background sync workers pulling live third-party rates via secure external APIs.',
      'Implemented high-efficiency Database-First architecture with Dapper ORM and optimized stored procedures.',
    ],
    technologies: [
      'ASP.NET Core',
      'Elasticsearch',
      'SQL Server',
      'Dapper',
      'C#',
      'REST APIs',
      'Stored Procedures',
    ],
    techGroups: {
      Backend: ['ASP.NET Core', 'C#', 'Dapper ORM'],
      Search: ['Elasticsearch Indexing'],
      Database: ['SQL Server', 'Optimized Stored Procedures'],
      Integration: ['Scheduled Rate Ingestion Workers'],
    },
    githubUrl: 'https://github.com/Enbidi77',
    celestialBody: {
      name: 'Aegis-Data-Cluster',
      type: 'crystalline-station',
      primaryColor: '#34d399', // Emerald
      secondaryColor: '#064e3b',
      atmosphereColor: '#6ee7b7',
      hasRings: true,
      orbitRadius: 42,
      orbitSpeed: 0.08,
      size: 2.4,
      texturePreset: 'crystalline-mesh',
    },
    architecture: {
      overview:
        'Dual-store architecture combining SQL Server as the single source of truth with Elasticsearch for inverted-index multi-parameter loan search queries.',
      keyComponents: [
        {
          name: 'Elasticsearch Query Engine',
          description:
            'Indexed product catalog allowing sub-second filtering across LTV tiers, fee structures, and borrower eligibility rules.',
        },
        {
          name: 'Scheduled Ingestion Workers',
          description:
            'Background background workers orchestrating secure API calls to third-party rate providers with incremental data sync.',
        },
        {
          name: 'Dapper Data Access Layer',
          description:
            'High-efficiency micro-ORM mapping against hand-tuned SQL Server stored procedures, reducing object-allocation overhead.',
        },
      ],
    },
  }),

  ProjectSchema.parse({
    id: 'forex-predictive',
    slug: 'forex-predictive-analytics',
    title: 'Forex Predictive Analytics & Real-Time Social Platform',
    category: 'Market Analytics & Real-Time Social Platform',
    summary:
      'Containerized market trend prediction dashboard and interactive social platform featuring JWT authentication, WebSocket messaging, and Redis Pub/Sub.',
    fullDescription:
      'Engineered a dual-purpose platform combining financial market observation with an interactive trader community. The backend is built with Spring Boot, packaged with Docker, and deployed via automated GitLab CI/CD pipelines. Real-time trend visualization dashboards are paired with a social platform featuring secure JWT authentication, full-duplex WebSocket messaging, and Redis Pub/Sub for low-latency market discussion broadcasts and user notifications.',
    highlights: [
      'Built market trend prediction dashboard containerized with Docker and automated via GitLab CI/CD pipelines.',
      'Developed interactive social media platform featuring JWT auth, WebSocket real-time messaging, and Redis Pub/Sub.',
    ],
    technologies: [
      'Spring Boot',
      'Vue.js',
      'Next.js',
      'Redis Pub/Sub',
      'Docker',
      'GitLab CI/CD',
      'WebSocket',
      'JWT',
    ],
    techGroups: {
      Backend: ['Spring Boot', 'JWT Security', 'Redis Pub/Sub'],
      Frontend: ['Vue.js', 'Next.js', 'WebSocket Client'],
      DevOps: ['Docker Containerization', 'GitLab CI/CD'],
      RealTime: ['WebSocket Gateway', 'Redis Channel Streaming'],
    },
    liveDemoUrl: 'https://cv-portfolio.vercel.app',
    githubUrl: 'https://github.com/Enbidi77',
    celestialBody: {
      name: 'Forex-Chronos',
      type: 'gas-giant',
      primaryColor: '#f59e0b', // Amber
      secondaryColor: '#78350f',
      atmosphereColor: '#fde68a',
      hasRings: true,
      orbitRadius: 52,
      orbitSpeed: 0.06,
      size: 3.0,
      texturePreset: 'gas-banding',
    },
    architecture: {
      overview:
        'A microservice architecture combining Spring Boot analytical endpoints, containerized Docker workers, and Redis Pub/Sub event distribution.',
      keyComponents: [
        {
          name: 'Analytics & Prediction API',
          description:
            'Spring Boot service managing market trend aggregation and historical metric distribution.',
        },
        {
          name: 'Redis Pub/Sub & WebSocket Broker',
          description:
            'Broadcast engine relaying live trade chatter, community signals, and instant notification packets.',
        },
        {
          name: 'Containerized CI/CD Workflow',
          description:
            'Docker multi-stage builds automated through GitLab CI/CD for zero-downtime rolling updates.',
        },
      ],
    },
  }),
];

