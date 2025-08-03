import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan className dengan aman
 * @param inputs string atau array className
 * @returns string className yang sudah digabung
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassValue = string | undefined | null | boolean | Record<string, boolean>;
