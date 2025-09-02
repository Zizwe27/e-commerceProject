import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName: string): string {
  // Convert page name to URL-friendly format
  return `/${pageName.toLowerCase().replace(/\s+/g, '-')}`
}
