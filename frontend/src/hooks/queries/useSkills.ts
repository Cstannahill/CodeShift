// src/hooks/queries/useSkills.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services/api";
import type { SkillProfile } from "@/types";

export function useSkillProfile() {
  return useQuery({
    queryKey: ["skills", "profile"],
    queryFn: skillService.getProfile,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useUpdateSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skills: Array<{ technology: string; proficiency: number }>) =>
      skillService.updateSkills(skills),
    onSuccess: (data) => {
      queryClient.setQueryData(["skills", "profile"], data);
    },
  });
}
