// src/hooks/common/useErrorHandler.ts
import { useCallback } from "react";
import { useNotifications } from "./useNotifications";
import { handleApiError, getErrorMessage } from "@/lib/utils/error";

export function useErrorHandler() {
  const { showNotification } = useNotifications();

  const handleError = useCallback(
    (error: unknown, title: string = "Error") => {
      const appError = handleApiError(error);

      showNotification({
        type: "error",
        title,
        message: appError.message,
      });

      // Log to console for debugging
      console.error("Error handled:", appError);

      return appError;
    },
    [showNotification]
  );

  return { handleError };
}
