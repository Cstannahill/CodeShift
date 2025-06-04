// src/utils/validation.ts
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidGithubUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;

  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname === "github.com" && urlObj.pathname.split("/").length >= 3
    );
  } catch {
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateCode(code: string): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!code.trim()) {
    issues.push("Code cannot be empty");
  }

  if (code.length > 50000) {
    issues.push("Code is too long (max 50,000 characters)");
  }

  // Basic syntax checks
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push("Mismatched braces detected");
  }

  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    issues.push("Mismatched parentheses detected");
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
