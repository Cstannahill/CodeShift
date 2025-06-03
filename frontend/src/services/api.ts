// src/services/api.ts

import type {
  User,
  AuthResponse,
  Repository,
  RepositoryQueryParams,
  ConnectRepositoryRequest,
  SkillProfile,
  TranslationRequest,
  TranslationResponse,
  LearningPath,
  CreateLearningPathRequest,
  DashboardOverview,
  AnalysisJob,
  Technology,
  TranslationPattern,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

import {
  mockUser,
  mockRepositories,
  mockSkillProfile,
  mockTranslationResponse,
  mockLearningPaths,
  mockDashboardOverview,
  mockTechnologies,
  mockTranslationPatterns,
  delay,
} from "./mockData";

// Auth Service
export const authService = {
  async login(): Promise<AuthResponse> {
    await delay(1000);
    return {
      accessToken: "mock_token_" + Date.now(),
      user: mockUser,
    };
  },

  async logout(): Promise<void> {
    await delay(500);
  },

  async getCurrentUser(): Promise<User> {
    await delay(800);
    return mockUser;
  },
};

// Repository Service
export const repositoryService = {
  async list(
    params?: RepositoryQueryParams
  ): Promise<PaginatedResponse<Repository>> {
    await delay(1200);

    let filteredRepos = [...mockRepositories];

    if (params?.status) {
      filteredRepos = filteredRepos.filter(
        (repo) => repo.status === params.status
      );
    }

    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filteredRepos.slice(startIndex, endIndex),
      total: filteredRepos.length,
      page,
      limit,
    };
  },

  async get(id: string): Promise<Repository> {
    await delay(800);
    const repo = mockRepositories.find((r) => r.id === id);
    if (!repo) {
      throw new Error("Repository not found");
    }
    return repo;
  },

  async connect(request: ConnectRepositoryRequest): Promise<Repository> {
    await delay(2000);

    const newRepo: Repository = {
      id: "repo_" + Date.now(),
      name: request.githubUrl.split("/").pop() || "unknown",
      fullName: request.githubUrl.replace("https://github.com/", ""),
      githubUrl: request.githubUrl,
      branch: request.branch || "main",
      status: "pending",
      createdAt: new Date().toISOString(),
      technologies: {
        languages: [],
        frameworks: [],
        packages: [],
      },
    };

    return newRepo;
  },

  async analyze(repositoryId: string): Promise<AnalysisJob> {
    await delay(1000);

    return {
      jobId: "job_" + Date.now(),
      status: "queued",
      progress: 0,
      currentStep: "Initializing analysis...",
    };
  },

  async getAnalysisStatus(jobId: string): Promise<AnalysisJob> {
    await delay(500);

    // Simulate progress
    const progress = Math.min(100, Math.random() * 100);
    const status = progress === 100 ? "completed" : "processing";

    return {
      jobId,
      status,
      progress,
      currentStep:
        status === "completed"
          ? "Analysis complete"
          : "Analyzing code patterns...",
    };
  },
};

// Skill Service
export const skillService = {
  async getProfile(): Promise<SkillProfile> {
    await delay(1000);
    return mockSkillProfile;
  },

  async updateSkills(
    skills: Array<{ technology: string; proficiency: number }>
  ): Promise<SkillProfile> {
    await delay(1500);

    // Simulate updating skills
    const updatedProfile = { ...mockSkillProfile };
    skills.forEach(({ technology, proficiency }) => {
      const skillIndex = updatedProfile.skills.findIndex(
        (s) => s.technology === technology
      );
      if (skillIndex >= 0) {
        updatedProfile.skills[skillIndex].proficiency = proficiency;
      }
    });

    return updatedProfile;
  },
};

// Translation Service
export const translationService = {
  async translateCode(
    request: TranslationRequest
  ): Promise<TranslationResponse> {
    await delay(3000); // Simulate AI processing time

    // Generate a realistic response based on the request
    const response: TranslationResponse = {
      ...mockTranslationResponse,
      id: "trans_" + Date.now(),
      source: {
        ...mockTranslationResponse.source,
        framework: request.sourceFramework,
        code: request.code,
      },
      target: {
        ...mockTranslationResponse.target,
        framework: request.targetFramework,
      },
      createdAt: new Date().toISOString(),
    };

    // Simulate different confidence levels based on code complexity
    const codeComplexity = request.code.length;
    if (codeComplexity < 500) {
      response.metadata.confidence = 0.95 + Math.random() * 0.04;
    } else if (codeComplexity < 1500) {
      response.metadata.confidence = 0.85 + Math.random() * 0.1;
    } else {
      response.metadata.confidence = 0.75 + Math.random() * 0.15;
    }

    return response;
  },

  async analyzeCode(request: Omit<TranslationRequest, "options">): Promise<{
    feasible: boolean;
    confidence: number;
    detectedPatterns: string[];
    warnings: string[];
    estimatedComplexity: "simple" | "moderate" | "complex";
  }> {
    await delay(1500);

    const codeLength = request.code.length;
    const complexity =
      codeLength < 500 ? "simple" : codeLength < 1500 ? "moderate" : "complex";

    return {
      feasible: true,
      confidence:
        complexity === "simple"
          ? 0.95
          : complexity === "moderate"
            ? 0.85
            : 0.75,
      detectedPatterns: ["React components", "Hook usage", "Event handlers"],
      warnings:
        complexity === "complex"
          ? ["Complex logic detected", "Manual review recommended"]
          : [],
      estimatedComplexity: complexity,
    };
  },

  async getPatterns(
    source?: string,
    target?: string
  ): Promise<TranslationPattern[]> {
    await delay(800);

    let patterns = [...mockTranslationPatterns];

    if (source && target) {
      // Filter patterns based on source/target frameworks
      patterns = patterns.filter(
        (pattern) =>
          pattern.description.toLowerCase().includes(source.toLowerCase()) ||
          pattern.description.toLowerCase().includes(target.toLowerCase())
      );
    }

    return patterns;
  },
};

// Learning Service
export const learningService = {
  async getPaths(): Promise<LearningPath[]> {
    await delay(1000);
    return mockLearningPaths;
  },

  async getPath(pathId: string): Promise<LearningPath> {
    await delay(800);
    const path = mockLearningPaths.find((p) => p.id === pathId);
    if (!path) {
      throw new Error("Learning path not found");
    }
    return path;
  },

  async createPath(request: CreateLearningPathRequest): Promise<LearningPath> {
    await delay(4000); // Simulate AI generation time

    const newPath: LearningPath = {
      id: "lp_" + Date.now(),
      title: `From ${request.fromTechnology} to ${request.toTechnology}: A Personalized Journey`,
      from: {
        technology: request.fromTechnology,
        currentProficiency: 7.0, // Would be inferred from skill profile
      },
      to: {
        technology: request.toTechnology,
        targetProficiency: request.proficiencyTarget || 8.0,
      },
      estimatedDuration:
        request.timeCommitment === "intensive"
          ? "2-3 weeks"
          : request.timeCommitment === "light"
            ? "6-8 weeks"
            : "4-5 weeks",
      difficulty: "intermediate",
      prerequisites: ["Basic JavaScript", "React fundamentals"],
      lessons: [
        {
          id: "lesson_" + Date.now(),
          order: 1,
          title: `Introduction to ${request.toTechnology}`,
          description: `Learn the basics of ${request.toTechnology} and how it compares to ${request.fromTechnology}`,
          estimatedTime: 45,
          type: "concept",
          objectives: [`Understand ${request.toTechnology} fundamentals`],
          content: `# Introduction to ${request.toTechnology}\n\nGenerated lesson content...`,
          examples: [],
          exercises: [],
          completed: false,
        },
      ],
      progress: 0,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newPath;
  },

  async completeLesson(
    pathId: string,
    lessonId: string
  ): Promise<{
    success: boolean;
    pathProgress: number;
    nextLessonId?: string;
  }> {
    await delay(1000);

    return {
      success: true,
      pathProgress: Math.min(100, Math.random() * 100),
      nextLessonId: "lesson_" + (Date.now() + 1),
    };
  },
};

// Dashboard Service
export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    await delay(1200);
    return mockDashboardOverview;
  },
};

// Search Service
export const searchService = {
  async getTechnologies(query?: string): Promise<Technology[]> {
    await delay(600);

    let technologies = [...mockTechnologies];

    if (query) {
      technologies = technologies.filter(
        (tech) =>
          tech.name.toLowerCase().includes(query.toLowerCase()) ||
          tech.displayName.toLowerCase().includes(query.toLowerCase())
      );
    }

    return technologies;
  },

  async getTranslationPaths(
    from?: string,
    to?: string
  ): Promise<
    Array<{
      from: string;
      to: string;
      supported: boolean;
      confidence: number;
      examplesCount: number;
      commonUseCases: string[];
    }>
  > {
    await delay(800);

    // Mock translation path availability
    return [
      {
        from: "React",
        to: "TypeScript React",
        supported: true,
        confidence: 0.95,
        examplesCount: 156,
        commonUseCases: [
          "Type safety",
          "Better IDE support",
          "Code documentation",
        ],
      },
      {
        from: "Next.js",
        to: "Vite React",
        supported: true,
        confidence: 0.88,
        examplesCount: 89,
        commonUseCases: [
          "Faster builds",
          "Simpler configuration",
          "Modern tooling",
        ],
      },
      {
        from: "Express.js",
        to: "NestJS",
        supported: true,
        confidence: 0.82,
        examplesCount: 67,
        commonUseCases: [
          "Better architecture",
          "TypeScript support",
          "Dependency injection",
        ],
      },
    ];
  },
};

// Error simulation utility
export const simulateError = (probability: number = 0.1) => {
  if (Math.random() < probability) {
    throw new Error("Simulated network error");
  }
};
