// Auto-generated schema file for profiles table
// Generated on: 2025-11-01T22:19:49.474Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodProfilesRow.parse(dataFromSupabase);

import z from 'zod';

export const ZodProfilesRow = z.object({
	avatar_url: z.url().nullable(),
	bio: z.string().nullable(),
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	created_by: z.uuid().nullable().optional(),
	deleted_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	deleted_by: z.uuid().nullable().optional(),
	first_name: z.string(),
	id: z.uuid(),
	last_name: z.string(),
	profile_photo_url: z.url().nullable(),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
	user_id: z.uuid().nullable(),
});

export const ZodProfilesInsert = z.object({
	avatar_url: z.url().nullable().optional(),
	bio: z.string().nullable().optional(),
	first_name: z.string(),
	id: z.uuid().optional(),
	last_name: z.string(),
	profile_photo_url: z.url().nullable().optional(),
	user_id: z.uuid().nullable().optional(),
});

export const ZodProfilesUpdate = ZodProfilesInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodProfilesRowToDb = z.object({
	avatar_url: z.url().nullable(),
	bio: z.string().nullable(),
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	created_by: z.uuid().nullable().optional(),
	deleted_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	deleted_by: z.uuid().nullable().optional(),
	first_name: z.string(),
	id: z.uuid(),
	last_name: z.string(),
	profile_photo_url: z.url().nullable(),
	updated_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
	user_id: z.uuid().nullable(),
});

export const ZodProfilesInsertToDb = z.object({
	avatar_url: z.url().nullable().optional(),
	bio: z.string().nullable().optional(),
	first_name: z.string(),
	id: z.uuid().optional(),
	last_name: z.string(),
	profile_photo_url: z.url().nullable().optional(),
	user_id: z.uuid().nullable().optional(),
});

export const ZodProfilesUpdateToDb = ZodProfilesInsertToDb.partial();

export type ZodProfilesRowType = z.infer<typeof ZodProfilesRow>;
export type ZodProfilesInsertType = z.infer<typeof ZodProfilesInsert>;
export type ZodProfilesUpdateType = z.infer<typeof ZodProfilesUpdate>;
export type ZodProfilesRowToDbType = z.infer<typeof ZodProfilesRowToDb>;
export type ZodProfilesInsertToDbType = z.infer<typeof ZodProfilesInsertToDb>;
export type ZodProfilesUpdateToDbType = z.infer<typeof ZodProfilesUpdateToDb>;
