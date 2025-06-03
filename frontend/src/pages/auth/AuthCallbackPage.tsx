// src/features/auth/AuthCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "@/hooks/queries/useAuth";
import { LoadingPage } from "@/components/layouts/LoadingPage";
import { useErrorHandler } from "@/hooks/common/useErrorHandler";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate: login } = useLogin();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      handleError(new Error(error), "Authentication failed");
      navigate("/", { replace: true });
      return;
    }

    if (code) {
      // In a real app, this would send the code to your backend
      // For now, simulate successful login
      setTimeout(() => {
        login(undefined, {
          onSuccess: () => {
            navigate("/dashboard", { replace: true });
          },
          onError: (error) => {
            handleError(error, "Login failed");
            navigate("/", { replace: true });
          },
        });
      }, 1000);
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams, login, navigate, handleError]);

  return <LoadingPage message="Completing sign in..." />;
}
