import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | undefined | null) {
  return Number(value ?? 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function discountPercent(price: number, after?: number) {
  if (!after || after >= price) return 0;
  return Math.round(((price - after) / price) * 100);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
