# CodeShift Frontend

A modern React application built with TypeScript, Vite, and Tailwind CSS for intelligent code translation and personalized learning.

## Features

- 🤖 AI-powered code translation between frameworks
- 📊 Intelligent repository analysis and skill profiling
- 🎓 Personalized learning paths
- 🎨 Modern, responsive UI with dark mode support
- ⚡ Fast development with Vite and HMR
- 🔒 Type-safe with TypeScript
- 📱 Mobile-friendly design

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Project Structure

```tree
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components
│   └── layouts/        # Layout components
├── pages/              # Feature-based modules
│   ├── auth/           # Authentication
│   ├── dashboard/      # Dashboard
│   ├── repositories/   # Repository management
│   ├── translation/    # Code translation
│   └── learning/       # Learning paths
├── hooks/              # Custom React hooks
├── services/           # API services (mock data)
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Key Features

### Code Translation

- Framework-aware code translation
- Real-time syntax highlighting
- Translation confidence scoring
- Package dependency mapping

### Repository Analysis

- GitHub integration
- Technology detection
- Code quality metrics
- Skill impact analysis

### Learning Paths

- AI-generated personalized curricula
- Interactive lessons and exercises
- Progress tracking
- Adaptive learning content

### Profile Management

- Skill assessment and tracking
- Learning velocity analysis
- Achievement system
- Customizable preferences

## Mock Data

The application currently uses mock data services to simulate backend functionality. This allows for realistic frontend development and testing without requiring a running backend service.

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new code
3. Use the established component and hook patterns
4. Test your changes thoroughly

## License

This project is licensed under the MIT License.
