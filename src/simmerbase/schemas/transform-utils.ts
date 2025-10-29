/**
 * Utility functions for transforming data from Supabase types to application types
 */

import type { Row, Table } from '../data-types';
import type { Tables } from '../supabase-types';

/**
 * Transforms a timestamp string from Supabase to a Date object
 * Handles both ISO strings with and without timezone information
 *
 * @param isoString - ISO 8601 timestamp string from Supabase
 * @returns Date object or null if input is null/undefined
 */
export function parseTimestamp(
	isoString: string | null | undefined,
): Date | null {
	if (!isoString) return null;
	return new Date(isoString);
}

/**
 * Transforms a date string from Supabase to a Date object in UTC
 * Appends 'T00:00:00Z' to ensure UTC interpretation (matching Postgres date behavior)
 *
 * @param dateString - Date string in format 'YYYY-MM-DD' from Supabase
 * @returns Date object in UTC or null if input is null/undefined
 *
 * @example
 * parseDate('2024-01-15') // Returns Date object for 2024-01-15 00:00:00 UTC
 */
export function parseDate(dateString: string | null | undefined): Date | null {
	if (!dateString) return null;
	// Append time and timezone to force UTC interpretation
	const utcDateString = dateString.includes('T')
		? dateString
		: `${dateString}T00:00:00Z`;
	return new Date(utcDateString);
}

/**
 * Transforms a row object from Supabase, converting all timestamp and date fields to Date objects
 *
 * @param row - Raw row object from Supabase (with string dates)
 * @param _table - The table name for type inference (not used at runtime)
 * @returns Transformed row with Date objects for timestamp and date fields
 */
export function transformRow<T extends Table>(
	row: Tables<T>,
	_table: T,
): Row<T> {
	const transformed = { ...row } as unknown as Row<T>;

	for (const key in row) {
		const value = row[key];

		// Skip if value is not a string
		if (typeof value !== 'string') continue;

		// Transform timestamp fields (*_at)
		if (key.endsWith('_at')) {
			(transformed as Record<string, unknown>)[key] = parseTimestamp(value);
		}
		// Transform date fields (*_date)
		else if (key.endsWith('_date')) {
			(transformed as Record<string, unknown>)[key] = parseDate(value);
		}
	}

	return transformed;
}

/**
 * Transforms an array of row objects from Supabase
 *
 * @param rows - Array of raw row objects from Supabase
 * @param _table - The table name for type inference (not used at runtime)
 * @returns Array of transformed rows with Date objects
 */
export function transformRows<T extends Table>(
	rows: Tables<T>[],
	_table: T,
): Row<T>[] {
	return rows.map((row) => transformRow(row, _table));
}
