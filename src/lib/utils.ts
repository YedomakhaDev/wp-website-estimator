import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes safely: clsx resolves conditionals/arrays into a
// string, twMerge then drops earlier classes that conflict with later ones
// (e.g. `p-6 p-4` → `p-4`), so a `className` prop can always override a
// component's defaults.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
