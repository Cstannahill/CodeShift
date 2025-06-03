// src/types/index.ts

// User and Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
  skillProfileId?: string;
  repositoriesCount: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

// Repository Types
export interface Repository {
  id: string;
  name: string;
  fullName: string;
  githubUrl: string;
  branch: string;
  status: "pending" | "analyzing" | "completed" | "failed";
  createdAt: string;
  analyzedAt?: string;
  technologies: {
    languages: Array<{ name: string; percentage: number }>;
    frameworks: string[];
    packages: Array<{ name: string; version: string }>;
  };
  metrics?: {
    complexity: number;
    quality: number;
    lastCommit: string;
    totalCommits: number;
    contributors: number;
  };
}

export interface RepositoryQueryParams {
  page?: number;
  limit?: number;
  status?: string;
}

export interface ConnectRepositoryRequest {
  githubUrl: string;
  branch?: string;
}

// Skill Profile Types
export interface SkillExperience {
  firstSeen: string;
  lastUsed: string;
  projectCount: number;
  totalLines: number;
}

export interface Skill {
  technology: string;
  category: "language" | "framework" | "library" | "tool";
  proficiency: number; // 1-10
  experience: SkillExperience;
  confidence: number; // 0-1
}

export interface SkillProfile {
  id: string;
  userId: string;
  skills: Skill[];
  strengths: string[];
  learningVelocity: {
    fastLearners: string[];
    steadyProgress: string[];
    recentFocus: string[];
  };
  updatedAt: string;
}

// Translation Types
export interface TranslationRequest {
  code: string;
  sourceFramework: string;
  targetFramework: string;
  options?: {
    preserveStructure?: boolean;
    modernSyntax?: boolean;
    includeTypes?: boolean;
  };
}

export interface TranslationResponse {
  id: string;
  success: boolean;
  source: {
    framework: string;
    code: string;
    packages: string[];
  };
  target: {
    framework: string;
    code: string;
    packages: string[];
    packageChanges: Array<{
      from: string;
      to: string;
      version: string;
    }>;
  };
  metadata: {
    confidence: number;
    warnings: string[];
    suggestions: string[];
    manualChangesRequired: string[];
  };
  createdAt: string;
}

export interface TranslationPattern {
  id: string;
  sourcePattern: string;
  targetPattern: string;
  description: string;
  usageCount: number;
  successRate: number;
  examples: Array<{
    before: string;
    after: string;
  }>;
}

// Learning Path Types
export interface LearningObjective {
  title: string;
  description: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode?: string;
  solution?: string;
  hints: string[];
}

export interface CodeExample {
  title: string;
  before: string;
  after: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  order: number;
  title: string;
  description: string;
  estimatedTime: number; // minutes
  type: "concept" | "practice" | "project";
  objectives: string[];
  content: string; // Markdown content
  examples: CodeExample[];
  exercises: Exercise[];
  completed: boolean;
  completedAt?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  from: {
    technology: string;
    currentProficiency: number;
  };
  to: {
    technology: string;
    targetProficiency: number;
  };
  estimatedDuration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  lessons: Lesson[];
  progress: number; // 0-100
  status: "active" | "completed" | "paused";
  createdAt: string;
  updatedAt: string;
}

export interface CreateLearningPathRequest {
  fromTechnology: string;
  toTechnology: string;
  proficiencyTarget?: number;
  timeCommitment?: "light" | "moderate" | "intensive";
  learningStyle?: "practical" | "theoretical" | "mixed";
}

// Dashboard Types
export interface DashboardStats {
  repositoriesAnalyzed: number;
  translationsCompleted: number;
  learningPathsActive: number;
  skillsTracked: number;
}

export interface RecentActivity {
  type: "analysis" | "translation" | "learning";
  title: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface SkillProgress {
  technology: string;
  previousLevel: number;
  currentLevel: number;
  trend: "improving" | "stable" | "declining";
}

export interface Recommendation {
  type: "learning" | "translation" | "skill";
  title: string;
  description: string;
  action: string;
  link: string;
}

export interface DashboardOverview {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  skillProgress: SkillProgress[];
  recommendations: Recommendation[];
}

// Analysis Job Types
export interface AnalysisJob {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number; // 0-100
  currentStep: string;
  error?: string;
}

// UI Types
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  duration?: number;
}

export interface Technology {
  name: string;
  displayName: string;
  category: string;
  description: string;
  popularity: number;
  related: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
