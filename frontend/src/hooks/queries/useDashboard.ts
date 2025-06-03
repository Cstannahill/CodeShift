// src/hooks/queries/useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/api";

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: dashboardService.getOverview,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
