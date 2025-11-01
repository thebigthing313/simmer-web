// Auto-generated schema file for group_profiles table
// Generated on: 2025-11-01T22:19:37.140Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodGroupProfilesRow.parse(dataFromSupabase);

import z from 'zod';

export const ZodGroupProfilesRow = z.object({
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	created_by: z.uuid().nullable().optional(),
	deleted_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	deleted_by: z.uuid().nullable().optional(),
	group_id: z.uuid(),
	id: z.uuid(),
	is_active: z.boolean(),
	profile_id: z.uuid(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
});

export const ZodGroupProfilesInsert = z.object({
	group_id: z.uuid(),
	id: z.uuid().optional(),
	is_active: z.boolean().optional(),
	profile_id: z.uuid(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
});

export const ZodGroupProfilesUpdate = ZodGroupProfilesInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodGroupProfilesRowToDb = z.object({
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	created_by: z.uuid().nullable().optional(),
	deleted_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	deleted_by: z.uuid().nullable().optional(),
	group_id: z.uuid(),
	id: z.uuid(),
	is_active: z.boolean(),
	profile_id: z.uuid(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
	updated_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
});

export const ZodGroupProfilesInsertToDb = z.object({
	group_id: z.uuid(),
	id: z.uuid().optional(),
	is_active: z.boolean().optional(),
	profile_id: z.uuid(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
});

export const ZodGroupProfilesUpdateToDb = ZodGroupProfilesInsertToDb.partial();

export type ZodGroupProfilesRowType = z.infer<typeof ZodGroupProfilesRow>;
export type ZodGroupProfilesInsertType = z.infer<typeof ZodGroupProfilesInsert>;
export type ZodGroupProfilesUpdateType = z.infer<typeof ZodGroupProfilesUpdate>;
export type ZodGroupProfilesRowToDbType = z.infer<typeof ZodGroupProfilesRowToDb>;
export type ZodGroupProfilesInsertToDbType = z.infer<typeof ZodGroupProfilesInsertToDb>;
export type ZodGroupProfilesUpdateToDbType = z.infer<typeof ZodGroupProfilesUpdateToDb>;
