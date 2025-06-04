// src/features/landing/LandingPage.tsx
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/lib/stores/authStore";
import { useLogin } from "@/hooks/queries/useAuth";
import {
  Code2,
  GitBranch,
  GraduationCap,
  Zap,
  ArrowRight,
  Github,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const { mutate: login, isPending: isLogging } = useLogin();

  const handleGitHubLogin = () => {
    login();
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Code Translation
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Transform Your Code,
            <span className="text-primary"> Accelerate Learning</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intelligent code translation between frameworks with personalized
            learning paths. Migrate faster, learn smarter, code better.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" onClick={handleGitHubLogin} loading={isLogging}>
              <Github className="h-5 w-5 mr-2" />
              Start with GitHub
            </Button>
            <Button size="lg" onClick={handleGitHubLogin} loading={isLogging}>
              <Code2 className="h-5 w-5 mr-2" />
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose CodeShift?</h2>
            <p className="text-xl text-muted-foreground">
              More than just code translation - a complete learning ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Intelligent Translation</CardTitle>
                <CardDescription>
                  AI-powered code translation that understands frameworks, not
                  just syntax
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Framework-aware translations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Package dependency mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Quality confidence scoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GitBranch className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Smart Analysis</CardTitle>
                <CardDescription>
                  Analyze your repositories to build comprehensive skill
                  profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Skill level assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Technology detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Personalized Learning</CardTitle>
                <CardDescription>
                  Custom learning paths based on your existing skills and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Adaptive curricula
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Interactive lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Real code examples
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Code?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers who are accelerating their learning
            with CodeShift
          </p>
          <Button size="lg" onClick={handleGitHubLogin} loading={isLogging}>
            <Github className="h-5 w-5 mr-2" />
            Get Started Free
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
