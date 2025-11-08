// Auto-generated schema file for lookup_units table
// Generated on: 2025-11-08T04:30:42.703Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodLookupUnitsRow.parse(dataFromSupabase);

import z from 'zod';

export const ZodLookupUnitsRow = z.object({
	abbreviation: z.string(),
	base_unit_id: z.uuid().nullable(),
	conversion_factor: z.number(),
	conversion_offset: z.number(),
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	id: z.uuid(),
	unit_name: z.string(),
	unit_system: z.enum(["si", "imperial", "us_customary"]).nullable(),
	unit_type: z.enum(["weight", "distance", "area", "volume", "temperature", "time", "count"]),
});

export const ZodLookupUnitsInsert = z.object({
	abbreviation: z.string(),
	base_unit_id: z.uuid().nullable().optional(),
	conversion_factor: z.number(),
	conversion_offset: z.number().optional(),
	id: z.uuid().optional(),
	unit_name: z.string(),
	unit_system: z.enum(["si", "imperial", "us_customary"]).nullable().optional(),
	unit_type: z.enum(["weight", "distance", "area", "volume", "temperature", "time", "count"]),
});

export const ZodLookupUnitsUpdate = ZodLookupUnitsInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodLookupUnitsRowToDb = z.object({
	abbreviation: z.string(),
	base_unit_id: z.uuid().nullable(),
	conversion_factor: z.number(),
	conversion_offset: z.number(),
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	id: z.uuid(),
	unit_name: z.string(),
	unit_system: z.enum(["si", "imperial", "us_customary"]).nullable(),
	unit_type: z.enum(["weight", "distance", "area", "volume", "temperature", "time", "count"]),
});

export const ZodLookupUnitsInsertToDb = z.object({
	abbreviation: z.string(),
	base_unit_id: z.uuid().nullable().optional(),
	conversion_factor: z.number(),
	conversion_offset: z.number().optional(),
	id: z.uuid().optional(),
	unit_name: z.string(),
	unit_system: z.enum(["si", "imperial", "us_customary"]).nullable().optional(),
	unit_type: z.enum(["weight", "distance", "area", "volume", "temperature", "time", "count"]),
});

export const ZodLookupUnitsUpdateToDb = ZodLookupUnitsInsertToDb.partial();

export type ZodLookupUnitsRowType = z.infer<typeof ZodLookupUnitsRow>;
export type ZodLookupUnitsInsertType = z.infer<typeof ZodLookupUnitsInsert>;
export type ZodLookupUnitsUpdateType = z.infer<typeof ZodLookupUnitsUpdate>;
export type ZodLookupUnitsRowToDbType = z.infer<typeof ZodLookupUnitsRowToDb>;
export type ZodLookupUnitsInsertToDbType = z.infer<typeof ZodLookupUnitsInsertToDb>;
export type ZodLookupUnitsUpdateToDbType = z.infer<typeof ZodLookupUnitsUpdateToDb>;
