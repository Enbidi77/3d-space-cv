import { Profile, ProfileSchema } from './schemas';

export const profileData: Profile = ProfileSchema.parse({
  name: 'Nguyen Bao Duy',
  title: 'Fullstack & Backend Software Engineer',
  tagline: 'Java · Spring Boot · C# · ASP.NET Core · Next.js · Distributed Systems',
  location: 'Can Tho / Ho Chi Minh City, Vietnam',
  phone: '(+84) 0789 526 780',
  email: 'nguyenduy.fwk@gmail.com',
  portfolioUrl: 'https://cv-portfolio.vercel.app',
  githubUrl: 'https://github.com/Enbidi77',
  summary:
    'Software Engineer with 2+ years of experience engineering scalable web platforms and distributed backend services using Java (Spring Boot) and C# (ASP.NET Core) alongside modern Next.js/React frontend architectures. Experienced in database schema design and stored procedure optimization across SQL Server and PostgreSQL, event-driven messaging, and microservices. Proven background in deploying cloud solutions on AWS and Azure via automated CI/CD pipelines.',
  highlights: [
    '2+ years engineering scalable web platforms & distributed backend services',
    'Core expertise in Java (Spring Boot), C# (ASP.NET Core), Next.js & React',
    'Database schema design & stored procedure optimization on SQL Server & PostgreSQL',
    'Asynchronous event-driven messaging with AWS SQS/Lambda, Kafka, RabbitMQ & Redis',
    'Automated CI/CD deployments targeting AWS and Azure cloud infrastructures',
  ],
  statusText: 'Available for high-impact backend & fullstack engineering roles',
});

