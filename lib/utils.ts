import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats tag color to tailwind class. Ex. bg_red_200 -> bg-red-200
export const twClassFormatter = (input: string) => {
  return input.replace(/_/g, "-");
}

export const env = (envName: string) => {
  const key = process.env[envName];
  if (key === undefined) throw new Error(`missing env key ${envName}`);
  else return key;
};
