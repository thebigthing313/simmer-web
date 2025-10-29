/**
 * Example usage of the generated schemas and transformation utilities
 */

import {
	ZodGroupsInsert,
	type ZodGroupsInsertType,
	ZodGroupsRow,
	type ZodGroupsRowType,
} from './groups';

// Example 1: Using automatic preprocessing (NEW in Zod v4!)
async function fetchGroupsWithPreprocessing() {
	// Simulated Supabase response (strings for dates)
	const rawGroupsFromSupabase = [
		{
			id: '123e4567-e89b-12d3-a456-426614174000',
			group_name: 'Acme Corp',
			short_name: 'Acme',
			address: '123 Main St',
			phone: '+1 234-567-8900',
			fax: null,
			logo_url: 'https://example.com/logo.png',
			website_url: 'https://acme.com',
			created_at: '2024-01-15T10:30:00Z', // ISO string from Supabase
			created_by: '456e4567-e89b-12d3-a456-426614174001',
			updated_at: '2024-01-20T15:45:00Z',
			updated_by: null,
			deleted_at: null,
			deleted_by: null,
		},
	];

	// Parse with automatic date conversion! ✨
	const groups = rawGroupsFromSupabase.map((group) =>
		ZodGroupsRow.parse(group),
	);

	// Dates are now Date objects automatically!
	console.log(groups[0].created_at instanceof Date); // true
	console.log(groups[0].created_at.toISOString()); // '2024-01-15T10:30:00.000Z'

	return groups;
}

// Example 1b: Manual transformation (still available if needed)
async function fetchGroupsManually() {
	// Manual approach if you need more control
	const { transformRows } = await import('./transform-utils');

	// Example raw data (types inferred from first example)
	const rawGroupsFromSupabase: Parameters<typeof transformRows<'groups'>>[0] = [
		{
			id: '123e4567-e89b-12d3-a456-426614174000',
			group_name: 'Acme Corp',
			short_name: 'Acme',
			address: '123 Main St',
			phone: '+1 234-567-8900',
			fax: null,
			logo_url: 'https://example.com/logo.png',
			website_url: 'https://acme.com',
			created_at: '2024-01-15T10:30:00Z',
			created_by: '456e4567-e89b-12d3-a456-426614174001',
			updated_at: '2024-01-20T15:45:00Z',
			updated_by: null,
			deleted_at: null,
			deleted_by: null,
		},
	];
	const groups = transformRows(rawGroupsFromSupabase, 'groups');

	return groups;
}

// Example 2: Validating data with Zod
function validateGroup(data: unknown): ZodGroupsRowType {
	// This will throw if validation fails
	return ZodGroupsRow.parse(data);
}

// Example 3: Safe parsing with error handling
function safeValidateGroup(data: unknown) {
	const result = ZodGroupsRow.safeParse(data);

	if (result.success) {
		return { success: true, data: result.data };
	}

	return {
		success: false,
		errors: result.error.issues.map((issue) => ({
			path: issue.path.join('.'),
			message: issue.message,
		})),
	};
}

// Example 4: Validating insert data
function validateInsertData(data: unknown): ZodGroupsInsertType {
	return ZodGroupsInsert.parse(data);
}

// Example 5: Creating insert data
const newGroup: ZodGroupsInsertType = {
	group_name: 'New Company',
	short_name: 'NewCo',
	address: '456 Oak Ave',
	phone: '+1 555-123-4567',
	website_url: 'https://newco.com',
	// All fields are optional due to .partial()
	// id, created_at, etc. are automatically handled by the database
};

// Validate before inserting
ZodGroupsInsert.parse(newGroup);
console.log('Insert data is valid!');

// Example 6: Handling date fields with _date suffix
function handleDateField() {
	// If you have a field like 'birth_date' or 'event_date'
	// Supabase returns: '2024-01-15'
	// You need to convert it to: new Date('2024-01-15T00:00:00Z')

	const rawDate = '2024-01-15';

	// Option 1: Use the parseDate utility
	// import { parseDate } from './transform-utils';
	// const date = parseDate(rawDate);

	// Option 2: Manual transformation
	const date = new Date(`${rawDate}T00:00:00Z`);

	console.log(date.toISOString()); // '2024-01-15T00:00:00.000Z'

	return date;
}

// Example 7: Working with GeoJSON fields
interface GeoJSONPoint {
	type: 'Point';
	coordinates: [number, number]; // [longitude, latitude]
}

async function handleGeomField() {
	// When you query a geometry field via RPC, you get GeoJSON
	// const result = await supabase.rpc('get_location', { id: '...' });

	const geomFromSupabase: GeoJSONPoint = {
		type: 'Point',
		coordinates: [-122.4194, 37.7749], // San Francisco
	};

	// You can validate it with the GeoJSONSchema
	// import { GeoJSONSchema } from './fields';
	// GeoJSONSchema.parse(geomFromSupabase);

	return geomFromSupabase;
}

// Export examples for use
export {
	fetchGroupsWithPreprocessing,
	fetchGroupsManually,
	validateGroup,
	safeValidateGroup,
	validateInsertData,
	handleDateField,
	handleGeomField,
};
