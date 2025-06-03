// src/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RootLayout } from "./components/layouts/RootLayout";
import { LoadingPage } from "./components/layouts/LoadingPage";
import { ProtectedRoute } from "@/pages/routes/ProtectedRoute";

// Lazy load pages for better performance
const LandingPage = lazy(() => import("@/pages/landing/LandingPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const RepositoriesPage = lazy(
  () => import("@/pages/repositories/RepositoriesPage")
);
const RepositoryDetailPage = lazy(
  () => import("@/pages/repositories/RepositoriesDetailPage")
);
const TranslationPage = lazy(
  () => import("@/pages/translation/TranslationPage")
);
const LearningPathsPage = lazy(
  () => import("@/pages/learning/LearningPathsPage")
);
const LearningPathDetailPage = lazy(
  () => import("@/pages/learning/LearningPathDetailPage")
);
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const AuthCallbackPage = lazy(() => import("@/pages/auth/AuthCallbackPage"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingPage />}>
              <LandingPage />
            </Suspense>
          }
        />

        <Route
          path="auth/callback"
          element={
            <Suspense fallback={<LoadingPage />}>
              <AuthCallbackPage />
            </Suspense>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<LoadingPage />}>
                <DashboardPage />
              </Suspense>
            }
          />

          <Route path="repositories">
            <Route
              index
              element={
                <Suspense fallback={<LoadingPage />}>
                  <RepositoriesPage />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <RepositoryDetailPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="translate"
            element={
              <Suspense fallback={<LoadingPage />}>
                <TranslationPage />
              </Suspense>
            }
          />

          <Route path="learn">
            <Route
              index
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LearningPathsPage />
                </Suspense>
              }
            />
            <Route
              path=":pathId"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LearningPathDetailPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="profile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProfilePage />
              </Suspense>
            }
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
