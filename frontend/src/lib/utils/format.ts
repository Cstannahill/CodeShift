// src/utils/format.ts
import { formatDistanceToNow, format, parseISO } from "date-fns";

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM d, yyyy");
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM d, yyyy h:mm a");
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatSkillLevel(level: number): string {
  if (level >= 9) return "Expert";
  if (level >= 7) return "Advanced";
  if (level >= 5) return "Intermediate";
  if (level >= 3) return "Beginner";
  return "Novice";
}
