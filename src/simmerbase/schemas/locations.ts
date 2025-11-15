// Auto-generated schema file for locations table
// Generated on: 2025-11-11T01:56:12.818Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodLocationsRow.parse(dataFromSupabase);

import z from 'zod';
import { GeoJSONSchema } from './fields';

export const ZodLocationsRow = z.object({
	address: z.string().nullable(),
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	created_by: z.uuid().nullable().optional(),
	geom: GeoJSONSchema.optional(),
	group_id: z.uuid(),
	id: z.uuid(),
	location_name: z.string(),
	notes: z.string().nullable(),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	updated_by: z.uuid().nullable().optional(),
});

export const ZodLocationsInsert = z.object({
	address: z.string().nullable().optional(),
	group_id: z.uuid(),
	id: z.uuid().optional(),
	location_name: z.string(),
	notes: z.string().nullable().optional(),
});

export const ZodLocationsUpdate = ZodLocationsInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodLocationsRowToDb = z.object({
	address: z.string().nullable(),
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	created_by: z.uuid().nullable().optional(),
	geom: GeoJSONSchema.optional(),
	group_id: z.uuid(),
	id: z.uuid(),
	location_name: z.string(),
	notes: z.string().nullable(),
	updated_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	updated_by: z.uuid().nullable().optional(),
});

export const ZodLocationsInsertToDb = z.object({
	address: z.string().nullable().optional(),
	group_id: z.uuid(),
	id: z.uuid().optional(),
	location_name: z.string(),
	notes: z.string().nullable().optional(),
});

export const ZodLocationsUpdateToDb = ZodLocationsInsertToDb.partial();

export type ZodLocationsRowType = z.infer<typeof ZodLocationsRow>;
export type ZodLocationsInsertType = z.infer<typeof ZodLocationsInsert>;
export type ZodLocationsUpdateType = z.infer<typeof ZodLocationsUpdate>;
export type ZodLocationsRowToDbType = z.infer<typeof ZodLocationsRowToDb>;
export type ZodLocationsInsertToDbType = z.infer<typeof ZodLocationsInsertToDb>;
export type ZodLocationsUpdateToDbType = z.infer<typeof ZodLocationsUpdateToDb>;
