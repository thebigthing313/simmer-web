/* eslint-disable @typescript-eslint/naming-convention */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
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
  [K in keyof T]: T[K]
} & {}

export function buildChangedFields<T extends Record<string, any>>(
  value: Partial<T>,
  defaults: Partial<T>,
) {
  const keys = new Set<string>([
    ...Object.keys(defaults),
    ...Object.keys(value),
  ])
  const changed: Partial<T> = {}
  keys.forEach((k) => {
    const newVal = (value as any)[k]
    const oldVal = (defaults as any)[k]
    if (newVal !== oldVal) {
      ;(changed as any)[k] = newVal
    }
  })
  return changed
}

export type IsSuperset<A, B> = B extends A ? A : B
export type IsIdentical<A, B> =
  IsSuperset<A, B> extends A
    ? IsSuperset<B, A> extends B
      ? A
      : {
          ERROR: 'Zod type is missing a Supabase field or Zod field is narrower'
          Supabase: A
          Zod: B
        }
    : {
        ERROR: 'Zod type is missing a Supabase field or Zod field is wider'
        Supabase: A
        Zod: B
      }
