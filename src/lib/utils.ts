import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(
  path: string,
  size: string = "original",
): string {
  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  if (!path) {
    return "";
  }

  return `${baseUrl}/${size}${path}`;
}
