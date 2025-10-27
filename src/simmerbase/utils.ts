import type { Database } from './supabase-types';

/**
 * Represents the keys of the public tables in the database.
 */
export type Table = keyof Database['public']['Tables'];

/**
 * The row type for a specific table T.
 * @template T - The table name.
 */
export type Row<T extends Table> = Database['public']['Tables'][T]['Row'];

/**
 * The insert type for a specific table T.
 * @template T - The table name.
 */
export type Insert<T extends Table> = Database['public']['Tables'][T]['Insert'];

/**
 * The update type for a specific table T.
 * @template T - The table name.
 */
export type Update<T extends Table> = Database['public']['Tables'][T]['Update'];

/**
 * Represents the keys of the public enums in the database.
 */
export type Enum = keyof Database['public']['Enums'];

/**
 * The value type for a specific enum T.
 * @template T - The enum name.
 */
export type EnumValue<T extends Enum> = Database['public']['Enums'][T];

/**
 * A helper type that transforms certain fields in a row to Date if they end with '_at' or '_date' and are strings.
 * @template T - The original row type.
 */
type TransformedRow<T> = {
	[K in keyof T]: // Check if the key ends with '_at' or '_date' AND the original type is string
	K extends `${string}_at` | `${string}_date`
		? T[K] extends string
			? Date
			: T[K] // If it matches and is a string, make it Date
		: T[K]; // Otherwise, keep the original type
};

/**
 * The transformed row type for a specific table T, used in the app.
 * Fields ending with '_at' or '_date' that are strings are converted to Date.
 * @template T - The table name.
 */
export type AppRow<T extends Table> = TransformedRow<Row<T>>;

const canonicalKeyMap = new Map<string, unknown>();

/**
 * Generates a stable, unique string key from any number of primitive arguments.
 * @param args - Rest parameters of primitive values (number, string, boolean, null, undefined).
 * @returns A stable, unique string key.
 */
export const serializeKey = (
	...args: (string | number | boolean | null | undefined)[]
): string => {
	return args
		.map((arg) => {
			if (typeof arg === 'object' && arg !== null) {
				return String(arg);
			}
			return String(arg);
		})
		.join('::');
};

/**
 * Ensures a single, stable object reference for a variable number of parameters.
 * @template T - The specific object type the caller expects the key to be
 * (e.g., { year: number, employee_id: string }).
 * @param args - The parameters (e.g., year, employee_id).
 * @returns The stable object reference, asserted to type T.
 */
export const getCanonicalKey = <T extends object>(
	...args: Array<string | number | boolean | null | undefined>
): T => {
	const serializedKey = serializeKey(...args);

	if (!canonicalKeyMap.has(serializedKey)) {
		// Store an empty object, but use unknown for flexibility
		canonicalKeyMap.set(serializedKey, {} as unknown);
	}

	// Retrieve and cast to T (still unsafe, but now explicit)
	const value = canonicalKeyMap.get(serializedKey) as T;

	return value;
};

/**
 * Transforms string dates/timestamps in a record into native JavaScript Date objects
 * based on the '_at' and '_date' naming conventions.
 * Appends 'T00:00:00.000Z' to date-only fields to ensure UTC interpretation.
 * @param record The raw object returned from Supabase.
 * @returns The object with date fields converted to Date objects.
 */
export function transformDates<T>(record: T): T {
	if (!record || typeof record !== 'object' || Array.isArray(record)) {
		return record;
	}

	const newRecord = { ...record };

	for (const key in newRecord) {
		if (Object.hasOwn(newRecord, key)) {
			const value = newRecord[key];

			if (typeof value === 'string') {
				let date: Date | null = null;

				// --- Date-Only Fields ---
				if (key.endsWith('_date')) {
					// Force UTC interpretation by appending the time/zone indicator.
					date = new Date(`${value}T00:00:00.000Z`);
				} // --- Timestamp Fields ---
				else if (key.endsWith('_at')) {
					// Timestamps already contain the zone, so use them directly.
					date = new Date(value);
				}

				if (date && !Number.isNaN(date.getTime())) {
					// @ts-expect-error - TS ignores the potential Date assignment error here
					newRecord[key] = date;
				}
			}
		}
	}

	// Returns the record with Date objects, asserted as the input type T
	return newRecord as T;
}

/**
 * Transforms native JavaScript Date objects in a record back into ISO 8601 strings
 * for insertion or update in the Supabase API.
 * @param record The object from the application (potentially with Date objects).
 * @returns The object with Date fields converted to ISO strings.
 */
export function transformDatesToStrings<T>(record: T): T {
	if (!record || typeof record !== 'object' || Array.isArray(record)) {
		return record;
	}

	const newRecord = { ...record };

	for (const key in newRecord) {
		if (Object.hasOwn(newRecord, key)) {
			const value = newRecord[key];

			// Check if the value is a native Date object
			if (value instanceof Date) {
				// @ts-expect-error - TS ignores the potential Date assignment error here
				newRecord[key] = value.toISOString();
			}
		}
	}

	// Returns the record with string dates, asserted as the input type T
	return newRecord as T;
}
