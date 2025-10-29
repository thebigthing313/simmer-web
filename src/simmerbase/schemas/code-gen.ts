import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Table } from '../data-types';

function generate(table: Table) {
	console.log('Generating schema for', table);
	const supabaseTypesPath = path.join(
		process.cwd(),
		'src/simmerbase/supabase-types.ts',
	);
	const content = fs.readFileSync(supabaseTypesPath, 'utf-8');
	console.log('Read file, length', content.length);

	// parse enums
	const enumRegex = /Enums: \{([\s\S]*?)\}/;
	const enumMatch = content.match(enumRegex);
	const enums: Record<string, string[]> = {};
	if (enumMatch) {
		const enumContent = enumMatch[1];
		const enumLines = enumContent
			.split(';')
			.map((s) => s.trim())
			.filter((s) => s);
		for (const line of enumLines) {
			const [name, values] = line.split(':');
			if (name && values) {
				const vals = values.split('|').map((v) => v.trim().replace(/"/g, ''));
				enums[name.trim()] = vals;
			}
		}
	}

	// find table - use word boundary to match exact table name
	const tableRegex = new RegExp(`\\b${table}: \\{([\\s\\S]*?)\\n\\s{6}\\};`);
	const tableMatch = content.match(tableRegex);
	console.log('tableMatch', !!tableMatch);
	if (!tableMatch) throw new Error(`Table ${table} not found`);
	const tableContent = tableMatch[1];

	// parse Row
	const rowRegex = /Row: \{([\s\S]*?)\n\s{8}\};/;
	const rowMatch = tableContent.match(rowRegex);
	if (!rowMatch) throw new Error('Row not found');
	const rowFields = parseFields(rowMatch[1]);

	// parse Insert to detect optional fields
	const insertRegex = /Insert: \{([\s\S]*?)\n\s{8}\};/;
	const insertMatch = tableContent.match(insertRegex);
	if (!insertMatch) throw new Error('Insert not found');
	const insertFields = parseFields(insertMatch[1]);

	// generate Zod
	const zodRow = generateZod(rowFields, enums);

	// Detect which audit fields exist in the table
	const auditFields = [
		'id',
		'created_at',
		'created_by',
		'deleted_at',
		'deleted_by',
		'updated_at',
		'updated_by',
	];
	const existingAuditFields = auditFields.filter((field) => field in rowFields);

	// Generate Insert schema with correct optional fields
	const zodInsert = generateZodInsert(insertFields, existingAuditFields, enums);

	const imports = getImports(rowFields);
	const importLine = imports ? `import { ${imports} } from './fields';\n` : '';

	// write the file
	const output = `// Auto-generated schema file for ${table} table
// Generated on: ${new Date().toISOString()}
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
// - Fields named 'geom': PostGIS geometry data (GeoJSON when queried via RPC)
//
// You can validate data directly without manual transformation:
//   const validated = Zod${capitalize(table)}Row.parse(dataFromSupabase);

import z from 'zod';
${importLine}
export const Zod${capitalize(table)}Row = z.object({
${zodRow}
});

export const Zod${capitalize(table)}Insert = z.object({
${zodInsert}
});

export const Zod${capitalize(table)}Update = Zod${capitalize(table)}Insert.partial();

export type Zod${capitalize(table)}RowType = z.infer<typeof Zod${capitalize(table)}Row>;
export type Zod${capitalize(table)}InsertType = z.infer<typeof Zod${capitalize(table)}Insert>;
export type Zod${capitalize(table)}UpdateType = z.infer<typeof Zod${capitalize(table)}Update>;
`;

	const outputFile = `src/simmerbase/schemas/${table}.ts`;
	fs.writeFileSync(path.join(process.cwd(), outputFile), output);
}

function parseFields(
	content: string,
): Record<string, { type: string; optional: boolean }> {
	const fields: Record<string, { type: string; optional: boolean }> = {};
	const lines = content
		.split(';')
		.map((s) => s.trim())
		.filter((s) => s);
	for (const line of lines) {
		const [fieldPart, type] = line.split(':').map((s) => s.trim());
		if (fieldPart && type) {
			// Check if field name ends with ? (e.g., "created_at?")
			const optional = fieldPart.endsWith('?');
			const field = fieldPart.replace('?', '').trim();
			fields[field] = { type, optional };
		}
	}
	return fields;
}

function generateZod(
	fields: Record<string, { type: string; optional: boolean }>,
	enums: Record<string, string[]>,
): string {
	const lines = [];
	for (const [field, { type }] of Object.entries(fields)) {
		const zodType = mapTypeToZod(field, type, enums);
		lines.push(`\t${field}: ${zodType},`);
	}
	return lines.join('\n');
}

function generateZodInsert(
	insertFields: Record<string, { type: string; optional: boolean }>,
	auditFieldsToOmit: string[],
	enums: Record<string, string[]>,
): string {
	const lines = [];
	for (const [field, { type, optional }] of Object.entries(insertFields)) {
		// Skip audit fields that will be omitted
		if (auditFieldsToOmit.includes(field)) continue;

		let zodType = mapTypeToZod(field, type, enums);
		// Add .optional() for fields that are optional in Insert
		if (optional) {
			zodType += '.optional()';
		}
		lines.push(`\t${field}: ${zodType},`);
	}
	return lines.join('\n');
}

function mapTypeToZod(
	field: string,
	type: string,
	enums: Record<string, string[]>,
): string {
	const isNullable = type.includes('| null');

	// Handle enum types
	if (type.includes('Database["public"]["Enums"]')) {
		const enumName = type.match(/Enums"\]\["([^"]+)"/)?.[1];
		if (enumName && enums[enumName]) {
			const base = `z.enum([${enums[enumName].map((v) => `"${v}"`).join(', ')}])`;
			return isNullable ? `${base}.nullable()` : base;
		} else {
			return isNullable ? 'z.string().nullable()' : 'z.string()';
		}
	}

	// Handle timestamp fields (*_at) - ISO strings from Supabase, Date in app
	if (field.match(/_at$/)) {
		const base =
			'z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date())';
		return isNullable ? `${base}.nullable()` : base;
	}

	// Handle date fields (*_date) - ISO strings from Supabase, Date in app
	if (field.match(/_date$/)) {
		const base =
			'z.preprocess((val) => typeof val === "string" ? new Date(val.includes("T") ? val : `$' +
			'{val}T00:00:00Z`) : val, z.date())';
		return isNullable ? `${base}.nullable()` : base;
	}

	// Handle PostGIS geometry fields - unknown in Supabase, GeoJSON when queried
	if (field === 'geom' || type === 'unknown') {
		// GeoJSON can be Point, LineString, Polygon, etc.
		return isNullable ? 'GeoJSONSchema.nullable()' : 'GeoJSONSchema';
	}

	// Handle UUID fields (id, *_id, *_by)
	if (field === 'id' || field.match(/_id$/) || field.match(/_by$/)) {
		return isNullable ? 'z.uuid().nullable()' : 'z.uuid()';
	}

	// Handle URL fields
	if (field.includes('url')) {
		return isNullable ? 'z.url().nullable()' : 'z.url()';
	} // Handle email fields
	if (field.includes('email')) {
		return isNullable ? 'EmailSchema.nullable()' : 'EmailSchema';
	}

	// Handle phone fields
	if (field.includes('phone')) {
		return isNullable ? 'PhoneNumberSchema.nullable()' : 'PhoneNumberSchema';
	}

	// Handle name fields
	if (field.includes('name')) {
		return isNullable ? 'NameSchema.nullable()' : 'NameSchema';
	}

	// Handle primitive types
	if (type === 'string' || type === 'string | null') {
		return isNullable ? 'z.string().nullable()' : 'z.string()';
	}

	if (type === 'number' || type === 'number | null') {
		return isNullable ? 'z.number().nullable()' : 'z.number()';
	}

	if (type === 'boolean' || type === 'boolean | null') {
		return isNullable ? 'z.boolean().nullable()' : 'z.boolean()';
	}

	if (type === 'Json' || type === 'Json | null') {
		return isNullable ? 'z.any().nullable()' : 'z.any()';
	}

	// Default fallback
	return isNullable ? 'z.string().nullable()' : 'z.string()';
}

function getImports(
	fields: Record<string, { type: string; optional: boolean }>,
): string {
	const imports = new Set<string>();
	for (const [field, { type }] of Object.entries(fields)) {
		if (field.includes('email')) imports.add('EmailSchema');
		if (field.includes('phone')) imports.add('PhoneNumberSchema');
		if (field.includes('name')) imports.add('NameSchema');
		if (field === 'geom' || type === 'unknown') imports.add('GeoJSONSchema');
	}
	return Array.from(imports).join(', ');
}

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

// Main execution
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	const table = process.argv[2] as Table;
	if (!table) {
		console.error('Usage: tsx src/simmerbase/schemas/code-gen.ts <table>');
		process.exit(1);
	}
	generate(table);
	console.log(`Generated schema for ${table}`);
}
