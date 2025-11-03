import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
	if (str.length === 0) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function buildChangeSet<T extends object>(
	defaultValues: T,
	newValues: T,
) {
	const changes: Partial<T> = {};

	for (const key in defaultValues) {
		if (Object.hasOwn(defaultValues, key)) {
			if (defaultValues[key] !== newValues[key]) {
				changes[key] = newValues[key];
			}
		}
	}

	return changes;
}
