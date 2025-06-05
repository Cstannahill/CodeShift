# CodeShift

> **Intelligent Code Translation and Personalized Learning Platform**

CodeShift is a modern web application that leverages AI to help developers translate code between different frameworks and technologies, while providing personalized learning paths to enhance their skills.

## 🚀 Project Status

- **Frontend**: ✅ **Production Ready** - Fully developed React application with comprehensive features
- **Backend**: 🚧 **In Development** - Basic structure in place, API implementation in progress

## ✨ Features

### 🤖 AI-Powered Code Translation

- **Framework Translation**: Convert code between React, Vue, Angular, Next.js, Express.js, and more
- **Real-time Editor**: Monaco Editor with syntax highlighting and intelligent suggestions
- **Confidence Scoring**: AI-powered translation confidence metrics
- **Package Mapping**: Automatic dependency translation and recommendations

### 📊 Repository Analysis

- **GitHub Integration**: Connect and analyze your repositories
- **Technology Detection**: Automatic identification of frameworks and libraries
- **Code Quality Metrics**: Comprehensive analysis of code health and complexity
- **Skill Impact**: Understand how projects contribute to your skill development

### 🎓 Personalized Learning

- **AI-Generated Curricula**: Custom learning paths based on your current skills and goals
- **Interactive Lessons**: Hands-on exercises and real-world projects
- **Progress Tracking**: Monitor your learning velocity and achievements
- **Adaptive Content**: Content that adjusts to your learning style and pace

### 👤 Developer Profiling

- **Skill Assessment**: Comprehensive evaluation of technical capabilities
- **Learning Analytics**: Track progress, strengths, and areas for improvement
- **Achievement System**: Unlock badges and milestones as you grow
- **Career Guidance**: Personalized recommendations for skill development

## 🛠️ Tech Stack

### Frontend (Production Ready)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with HMR
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **State Management**: Zustand stores
- **Data Fetching**: TanStack Query
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React

### Backend (In Development)

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (planned)
- **Authentication**: JWT-based auth (planned)
- **AI Integration**: OpenAI/Anthropic APIs (planned)
- **Containerization**: Docker & Docker Compose

## 🏗️ Project Structure

```tree
codeshift/
├── frontend/                    # React application (production ready)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Base UI components (Button, Input, etc.)
│   │   │   ├── layouts/         # Layout components (Header, Sidebar, etc.)
│   │   │   ├── features/        # Feature-specific components
│   │   │   │   ├── learning/    # Learning path components
│   │   │   │   ├── repositories/ # Repository management
│   │   │   │   └── translation/ # Code translation features
│   │   │   ├── providers/       # React context providers
│   │   │   └── CodeEditor/      # Monaco editor wrapper
│   │   ├── pages/               # Page-level components
│   │   │   ├── auth/            # Authentication pages
│   │   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── learning/        # Learning path pages
│   │   │   ├── profile/         # User profile pages
│   │   │   ├── repositories/    # Repository pages
│   │   │   ├── translation/     # Translation pages
│   │   │   └── routes/          # Route definitions
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── common/          # General-purpose hooks
│   │   │   └── queries/         # Data fetching hooks
│   │   ├── lib/                 # Core utilities and configuration
│   │   │   ├── stores/          # Zustand state management
│   │   │   └── utils/           # Helper functions and utilities
│   │   ├── services/            # API services & mock data
│   │   ├── styles/              # Global styles and themes
│   │   ├── types/               # TypeScript type definitions
│   │   └── assets/              # Static assets (images, icons)
│   ├── public/                  # Public static files
│   └── config files             # Vite, TypeScript, Tailwind configs
├── backend/                     # FastAPI application (in development)
│   ├── src/
│   │   ├── api/                 # API routes and schemas
│   │   │   └── auth/            # Authentication endpoints
│   │   ├── core/                # Core functionality
│   │   ├── database/            # Database models and connections
│   │   ├── services/            # Business logic services
│   │   └── workers/             # Background task workers
│   └── tests/                   # Backend tests
├── docker/                      # Docker configuration
└── config files                 # Package.json, docker-compose, etc.
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Python** 3.9+ (for backend development)
- **pnpm** (recommended) or npm

### Frontend Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Cstannahill/CodeShift.git
   cd codeshift
   ```

2. **Install dependencies**

   ```bash
   cd frontend
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app runs with mock data, so no backend is required for frontend development

### Full Stack Development (Optional)

```bash
# Install all dependencies
pnpm install

# Start both frontend and backend
pnpm dev

# Or use Docker
docker-compose up -d
```

## 📱 Available Scripts

### Root Level

- `pnpm dev` - Start both frontend and backend
- `pnpm dev:frontend` - Start only frontend
- `pnpm dev:backend` - Start only backend (when ready)
- `pnpm build` - Build for production
- `pnpm docker:up` - Start with Docker Compose

### Frontend Specific

- `pnpm dev` - Development server with HMR
- `pnpm build` - Production build
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - TypeScript type checking

## 🎨 Design System

CodeShift features a custom design system with:

- **ctan.dev Brand Identity**: Custom color palette with gold/amber accents
- **Dark Mode**: Full dark theme support
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliant components
- **Modern UI**: Clean, professional interface with subtle animations

## 📊 Current Capabilities

### ✅ Fully Implemented (Frontend)

- Complete user interface and user experience
- Mock data services for realistic development
- All major features implemented with mock responses
- Responsive design and accessibility
- Type-safe TypeScript implementation
- Comprehensive component library

### 🚧 In Progress (Backend)

- API endpoint structure
- Database schema design
- Authentication system
- AI service integrations

### 📋 Planned Features

- Real backend API integration
- Live GitHub repository analysis
- Advanced AI-powered recommendations
- Collaborative learning features
- Enterprise features and dashboards

## 🤝 Contributing

We welcome contributions! The frontend is stable and ready for feature additions, while the backend offers opportunities for foundational development.

### Frontend Contributions

- UI/UX improvements
- New feature implementations
- Performance optimizations
- Accessibility enhancements

### Backend Contributions

- API endpoint implementation
- Database schema design
- AI service integrations
- Authentication systems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Frontend Demo**: Available at [localhost:3000](http://localhost:3000) when running
- **Documentation**: See `frontend/README.md` for detailed frontend docs
- **Fine-Tuning Guide**: Dataset and parameter reference in `docs/`
- **Issues**: Report bugs and request features via GitHub Issues

---

**Note**: The frontend is fully functional with mock data, allowing for complete feature demonstration and development without requiring the backend to be operational.
