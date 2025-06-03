// src/services/mockData.ts

import type {
  User,
  Repository,
  SkillProfile,
  TranslationResponse,
  LearningPath,
  DashboardOverview,
  TranslationPattern,
  Technology,
} from "@/types";

// Mock User Data
export const mockUser: User = {
  id: "1",
  username: "ctan-dev",
  email: "ctan-dev@example.com",
  avatarUrl: "/avatar.jpg",
  plan: "pro",
  createdAt: "2024-01-15T10:30:00Z",
  skillProfileId: "sp_1",
  repositoriesCount: 5,
};

// Mock Repositories
export const mockRepositories: Repository[] = [
  {
    id: "repo_1",
    name: "react-todo-app",
    fullName: "ctan-dev/react-todo-app",
    githubUrl: "https://github.com/ctan-dev/react-todo-app",
    branch: "main",
    status: "completed",
    createdAt: "2024-01-20T14:30:00Z",
    analyzedAt: "2024-01-20T14:35:00Z",
    technologies: {
      languages: [
        { name: "JavaScript", percentage: 78.5 },
        { name: "CSS", percentage: 15.2 },
        { name: "HTML", percentage: 6.3 },
      ],
      frameworks: ["React", "Create React App"],
      packages: [
        { name: "react", version: "18.2.0" },
        { name: "react-dom", version: "18.2.0" },
        { name: "styled-components", version: "5.3.0" },
      ],
    },
    metrics: {
      complexity: 6.5,
      quality: 8.2,
      lastCommit: "2024-01-19T16:20:00Z",
      totalCommits: 47,
      contributors: 2,
    },
  },
  {
    id: "repo_2",
    name: "nextjs-dashboard",
    fullName: "ctan-dev/nextjs-dashboard",
    githubUrl: "https://github.com/ctan-dev/nextjs-dashboard",
    branch: "main",
    status: "completed",
    createdAt: "2024-01-18T09:15:00Z",
    analyzedAt: "2024-01-18T09:22:00Z",
    technologies: {
      languages: [
        { name: "TypeScript", percentage: 82.1 },
        { name: "CSS", percentage: 12.4 },
        { name: "JavaScript", percentage: 5.5 },
      ],
      frameworks: ["Next.js", "React"],
      packages: [
        { name: "next", version: "14.0.0" },
        { name: "react", version: "18.2.0" },
        { name: "tailwindcss", version: "3.3.0" },
        { name: "recharts", version: "2.8.0" },
      ],
    },
    metrics: {
      complexity: 8.1,
      quality: 9.0,
      lastCommit: "2024-01-17T11:30:00Z",
      totalCommits: 89,
      contributors: 3,
    },
  },
  {
    id: "repo_3",
    name: "express-api",
    fullName: "ctan-dev/express-api",
    githubUrl: "https://github.com/ctan-dev/express-api",
    branch: "main",
    status: "analyzing",
    createdAt: "2024-01-22T08:45:00Z",
    technologies: {
      languages: [
        { name: "JavaScript", percentage: 85.0 },
        { name: "JSON", percentage: 15.0 },
      ],
      frameworks: ["Express.js"],
      packages: [
        { name: "express", version: "4.18.0" },
        { name: "mongoose", version: "7.0.0" },
        { name: "cors", version: "2.8.5" },
      ],
    },
  },
];

// Mock Skill Profile
export const mockSkillProfile: SkillProfile = {
  id: "sp_1",
  userId: "1",
  skills: [
    {
      technology: "JavaScript",
      category: "language",
      proficiency: 8.5,
      experience: {
        firstSeen: "2021-03-15T00:00:00Z",
        lastUsed: "2024-01-22T00:00:00Z",
        projectCount: 12,
        totalLines: 15420,
      },
      confidence: 0.95,
    },
    {
      technology: "React",
      category: "framework",
      proficiency: 8.0,
      experience: {
        firstSeen: "2021-06-10T00:00:00Z",
        lastUsed: "2024-01-22T00:00:00Z",
        projectCount: 8,
        totalLines: 12340,
      },
      confidence: 0.92,
    },
    {
      technology: "TypeScript",
      category: "language",
      proficiency: 6.5,
      experience: {
        firstSeen: "2022-01-20T00:00:00Z",
        lastUsed: "2024-01-20T00:00:00Z",
        projectCount: 4,
        totalLines: 5680,
      },
      confidence: 0.85,
    },
    {
      technology: "Next.js",
      category: "framework",
      proficiency: 7.5,
      experience: {
        firstSeen: "2022-05-15T00:00:00Z",
        lastUsed: "2024-01-18T00:00:00Z",
        projectCount: 3,
        totalLines: 8920,
      },
      confidence: 0.88,
    },
    {
      technology: "CSS",
      category: "language",
      proficiency: 7.0,
      experience: {
        firstSeen: "2021-02-10T00:00:00Z",
        lastUsed: "2024-01-22T00:00:00Z",
        projectCount: 10,
        totalLines: 6750,
      },
      confidence: 0.9,
    },
  ],
  strengths: [
    "Modern React patterns (hooks, context)",
    "Component architecture",
    "State management",
    "API integration",
  ],
  learningVelocity: {
    fastLearners: ["Next.js", "React"],
    steadyProgress: ["TypeScript", "Node.js"],
    recentFocus: ["TypeScript", "Testing"],
  },
  updatedAt: "2024-01-22T12:00:00Z",
};

// Mock Translation Response
export const mockTranslationResponse: TranslationResponse = {
  id: "trans_1",
  success: true,
  source: {
    framework: "Next.js",
    code: `// Next.js component with getServerSideProps
  import { GetServerSideProps } from 'next';
  import { useRouter } from 'next/router';
  
  interface Props {
    user: { id: string; name: string; email: string };
  }
  
  export default function UserProfile({ user }: Props) {
    const router = useRouter();
    
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <button onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const res = await fetch(\`\${process.env.API_URL}/users/\${id}\`);
    const user = await res.json();
    
    return { props: { user } };
  };`,
    packages: ["next", "react"],
  },
  target: {
    framework: "Vite React",
    code: `// Vite React component with React Query
  import { useParams, useNavigate } from 'react-router-dom';
  import { useQuery } from '@tanstack/react-query';
  
  interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export default function UserProfile() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const { data: user, isLoading, error } = useQuery({
      queryKey: ['user', id],
      queryFn: async () => {
        const res = await fetch(\`/api/users/\${id}\`);
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json() as User;
      },
      enabled: !!id
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user</div>;
    if (!user) return <div>User not found</div>;
    
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }`,
    packages: ["react", "react-router-dom", "@tanstack/react-query"],
    packageChanges: [
      { from: "next", to: "react-router-dom", version: "^6.20.0" },
      { from: "", to: "@tanstack/react-query", version: "^5.8.0" },
    ],
  },
  metadata: {
    confidence: 0.94,
    warnings: [
      "API routes need to be implemented separately",
      "Environment variables may need updating",
    ],
    suggestions: [
      "Consider adding error boundaries",
      "Add loading states for better UX",
      "Implement proper error handling",
    ],
    manualChangesRequired: [
      "Set up React Router configuration",
      "Configure React Query provider",
      "Update API endpoint URLs",
    ],
  },
  createdAt: "2024-01-22T15:30:00Z",
};

// Mock Learning Paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: "lp_1",
    title: "From Next.js to Vite: A Personalized Journey",
    from: {
      technology: "Next.js",
      currentProficiency: 7.5,
    },
    to: {
      technology: "Vite",
      targetProficiency: 8.0,
    },
    estimatedDuration: "4 weeks",
    difficulty: "intermediate",
    prerequisites: ["React basics", "JavaScript ES6+"],
    lessons: [
      {
        id: "lesson_1",
        order: 1,
        title: "Why Vite? Understanding the differences from Next.js",
        description:
          "Learn the fundamental differences between Next.js and Vite, and why you might choose one over the other.",
        estimatedTime: 45,
        type: "concept",
        objectives: [
          "Understand Vite's build philosophy",
          "Compare development experience",
          "Identify migration benefits",
        ],
        content:
          "# Why Vite?\n\nVite offers a fundamentally different approach to build tooling...",
        examples: [
          {
            title: "Development Server Speed",
            before:
              "// Next.js dev server startup\nnpm run dev # Takes 10-15 seconds",
            after:
              "// Vite dev server startup\nnpm run dev # Takes 2-3 seconds",
            explanation:
              "Vite uses native ES modules and esbuild for faster cold starts",
          },
        ],
        exercises: [],
        completed: true,
        completedAt: "2024-01-20T10:30:00Z",
      },
      {
        id: "lesson_2",
        order: 2,
        title: "Project setup and configuration",
        description:
          "Set up a new Vite project and understand the configuration options.",
        estimatedTime: 60,
        type: "practice",
        objectives: [
          "Create a new Vite project",
          "Understand vite.config.ts",
          "Configure plugins and aliases",
        ],
        content: "# Project Setup\n\nLet's create your first Vite project...",
        examples: [],
        exercises: [
          {
            id: "ex_1",
            title: "Create Vite Project",
            description: "Use the Vite CLI to create a new React project",
            hints: [
              "Use npm create vite@latest",
              "Choose React + TypeScript template",
            ],
          },
        ],
        completed: true,
        completedAt: "2024-01-21T14:15:00Z",
      },
      {
        id: "lesson_3",
        order: 3,
        title: "React Router setup and configuration",
        description: "Learn how to set up routing in Vite using React Router.",
        estimatedTime: 75,
        type: "practice",
        objectives: [
          "Install and configure React Router",
          "Create route definitions",
          "Handle dynamic routes",
        ],
        content:
          "# React Router Configuration\n\nUnlike Next.js file-based routing...",
        examples: [
          {
            title: "Route Configuration",
            before:
              "// Next.js pages/users/[id].tsx\nexport default function UserPage() { ... }",
            after:
              '// React Router route definition\n<Route path="/users/:id" element={<UserPage />} />',
            explanation:
              "React Router uses explicit route configuration instead of file-based routing",
          },
        ],
        exercises: [],
        completed: false,
      },
    ],
    progress: 67,
    status: "active",
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-21T14:15:00Z",
  },
];

// Mock Dashboard Overview
export const mockDashboardOverview: DashboardOverview = {
  stats: {
    repositoriesAnalyzed: 5,
    translationsCompleted: 12,
    learningPathsActive: 2,
    skillsTracked: 8,
  },
  recentActivity: [
    {
      type: "translation",
      title: "Translated Next.js component to Vite",
      timestamp: "2024-01-22T15:30:00Z",
      metadata: { confidence: 0.94, framework: "Next.js → Vite" },
    },
    {
      type: "learning",
      title: "Completed lesson: React Router setup",
      timestamp: "2024-01-21T14:15:00Z",
      metadata: { lesson: "lesson_3", path: "Next.js to Vite" },
    },
    {
      type: "analysis",
      title: "Analyzed express-api repository",
      timestamp: "2024-01-22T08:45:00Z",
      metadata: {
        repository: "express-api",
        technologies: ["Express.js", "MongoDB"],
      },
    },
  ],
  skillProgress: [
    {
      technology: "TypeScript",
      previousLevel: 6.0,
      currentLevel: 6.5,
      trend: "improving",
    },
    {
      technology: "React",
      previousLevel: 8.0,
      currentLevel: 8.0,
      trend: "stable",
    },
    {
      technology: "Vite",
      previousLevel: 2.0,
      currentLevel: 5.8,
      trend: "improving",
    },
  ],
  recommendations: [
    {
      type: "learning",
      title: "Complete TypeScript Advanced Patterns",
      description:
        "Based on your recent projects, advanced TypeScript would boost your productivity",
      action: "Start Learning Path",
      link: "/learn/typescript-advanced",
    },
    {
      type: "translation",
      title: "Migrate Express API to NestJS",
      description: "Your Express.js code could benefit from NestJS structure",
      action: "Start Translation",
      link: "/translate?from=express&to=nestjs",
    },
  ],
};

// Mock Technologies
export const mockTechnologies: Technology[] = [
  {
    name: "react",
    displayName: "React",
    category: "framework",
    description: "A JavaScript library for building user interfaces",
    popularity: 95,
    related: ["next.js", "vite", "typescript"],
  },
  {
    name: "nextjs",
    displayName: "Next.js",
    category: "framework",
    description: "Full-stack React framework with built-in optimizations",
    popularity: 88,
    related: ["react", "vite", "vercel"],
  },
  {
    name: "vite",
    displayName: "Vite",
    category: "build-tool",
    description: "Fast build tool and development server",
    popularity: 75,
    related: ["react", "vue", "rollup"],
  },
  {
    name: "typescript",
    displayName: "TypeScript",
    category: "language",
    description: "Typed superset of JavaScript",
    popularity: 85,
    related: ["javascript", "react", "node.js"],
  },
];

// Mock Translation Patterns
export const mockTranslationPatterns: TranslationPattern[] = [
  {
    id: "pattern_1",
    sourcePattern: "useRouter hook",
    targetPattern: "useNavigate + useLocation",
    description: "Convert Next.js useRouter to React Router equivalents",
    usageCount: 156,
    successRate: 0.98,
    examples: [
      {
        before: 'const router = useRouter(); router.push("/dashboard");',
        after: 'const navigate = useNavigate(); navigate("/dashboard");',
      },
    ],
  },
  {
    id: "pattern_2",
    sourcePattern: "getServerSideProps",
    targetPattern: "useQuery hook",
    description:
      "Convert server-side data fetching to client-side with React Query",
    usageCount: 89,
    successRate: 0.91,
    examples: [
      {
        before: "export const getServerSideProps = async (context) => { ... }",
        after:
          "const { data, isLoading } = useQuery({ queryKey: [...], queryFn: ... });",
      },
    ],
  },
];

// Delay utility for simulating network latency
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
