import { Education, EducationSchema } from './schemas';

export const educationData: Education = EducationSchema.parse({
  id: 'can-tho-university',
  institution: 'Can Tho University',
  degree: "Bachelor's in Information Technology",
  period: '2019 – 2024',
  description:
    "Completed a comprehensive Bachelor's degree in Information Technology at Can Tho University, building deep fundamentals in data structures, algorithms, object-oriented programming, database management systems, and software engineering methodologies.",
  stationCode: 'ACADEMIC-STATION-CTU',
});

