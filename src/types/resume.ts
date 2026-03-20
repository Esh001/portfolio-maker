export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface SectionVisibility {
  profile: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
}

export interface ResumeData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  visibility: SectionVisibility;
}

export const defaultResume: ResumeData = {
  profile: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.dev',
    summary:
      'Results-driven software engineer with 8+ years of experience building scalable web applications. Passionate about clean architecture, type safety, and developer experience.',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      startDate: '2021-01',
      endDate: 'Present',
      bullets: [
        'Led migration of legacy monolith to microservices architecture, reducing deploy times by 60%',
        'Mentored team of 4 junior engineers, conducting weekly code reviews and pair programming sessions',
        'Designed and implemented real-time data pipeline processing 1M+ events/day',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      startDate: '2018-06',
      endDate: '2020-12',
      bullets: [
        'Built customer-facing dashboard using React and TypeScript, serving 50K+ daily active users',
        'Implemented CI/CD pipeline with GitHub Actions, reducing release cycle from 2 weeks to 2 days',
      ],
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. Computer Science',
      year: '2018',
    },
  ],
  skills: [
    {
      id: '1',
      category: 'Languages',
      skills: ['TypeScript', 'Python', 'Go', 'Rust'],
    },
    {
      id: '2',
      category: 'Frameworks',
      skills: ['React', 'Next.js', 'FastAPI', 'Node.js'],
    },
    {
      id: '3',
      category: 'Tools',
      skills: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL'],
    },
  ],
  visibility: {
    profile: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
  },
};
