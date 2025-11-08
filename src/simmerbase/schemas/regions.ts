// Auto-generated schema file for regions table
// Generated on: 2025-11-08T04:29:50.088Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodRegionsRow.parse(dataFromSupabase);

import z from 'zod';
import { GeoJSONSchema } from './fields';

export const ZodRegionsRow = z.object({
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	created_by: z.uuid().nullable().optional(),
	geom: GeoJSONSchema,
	group_id: z.uuid().nullable(),
	id: z.uuid(),
	parent_id: z.uuid().nullable(),
	region_name: z.string(),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	updated_by: z.uuid().nullable().optional(),
});

export const ZodRegionsInsert = z.object({
	geom: GeoJSONSchema,
	group_id: z.uuid().nullable().optional(),
	id: z.uuid().optional(),
	parent_id: z.uuid().nullable().optional(),
	region_name: z.string(),
});

export const ZodRegionsUpdate = ZodRegionsInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodRegionsRowToDb = z.object({
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	created_by: z.uuid().nullable().optional(),
	geom: GeoJSONSchema,
	group_id: z.uuid().nullable(),
	id: z.uuid(),
	parent_id: z.uuid().nullable(),
	region_name: z.string(),
	updated_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	updated_by: z.uuid().nullable().optional(),
});

export const ZodRegionsInsertToDb = z.object({
	geom: GeoJSONSchema,
	group_id: z.uuid().nullable().optional(),
	id: z.uuid().optional(),
	parent_id: z.uuid().nullable().optional(),
	region_name: z.string(),
});

export const ZodRegionsUpdateToDb = ZodRegionsInsertToDb.partial();

export type ZodRegionsRowType = z.infer<typeof ZodRegionsRow>;
export type ZodRegionsInsertType = z.infer<typeof ZodRegionsInsert>;
export type ZodRegionsUpdateType = z.infer<typeof ZodRegionsUpdate>;
export type ZodRegionsRowToDbType = z.infer<typeof ZodRegionsRowToDb>;
export type ZodRegionsInsertToDbType = z.infer<typeof ZodRegionsInsertToDb>;
export type ZodRegionsUpdateToDbType = z.infer<typeof ZodRegionsUpdateToDb>;
