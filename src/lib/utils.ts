import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility type to simplify and "flatten" a given type `T`.
 * It reconstructs the type by mapping over its properties,
 * removing intersections and making the resulting type easier to read in editor tooltips.
 *
 * @template T - The type to prettify.
 * @example
 * type A = { a: number } & { b: string };
 * type B = Prettify<A>; // { a: number; b: string }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
