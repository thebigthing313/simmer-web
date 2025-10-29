// Auto-generated schema file for profiles table
// Generated on: 2025-10-29T03:34:09.313Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
// - Fields named 'geom': PostGIS geometry data (GeoJSON when queried via RPC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodProfilesRow.parse(dataFromSupabase);

import z from 'zod';
import { NameSchema } from './fields';

export const ZodProfilesRow = z.object({
	avatar_url: z.url().nullable(),
	bio: z.string().nullable(),
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()),
	created_by: z.uuid().nullable(),
	deleted_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable(),
	deleted_by: z.uuid().nullable(),
	first_name: NameSchema,
	id: z.uuid(),
	last_name: NameSchema,
	profile_photo_url: z.url().nullable(),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable(),
	updated_by: z.uuid().nullable(),
	user_id: z.uuid().nullable(),
});

export const ZodProfilesInsert = z.object({
	avatar_url: z.url().nullable().optional(),
	bio: z.string().nullable().optional(),
	first_name: NameSchema,
	last_name: NameSchema,
	profile_photo_url: z.url().nullable().optional(),
	user_id: z.uuid().nullable().optional(),
});

export const ZodProfilesUpdate = ZodProfilesInsert.partial();

export type ZodProfilesRowType = z.infer<typeof ZodProfilesRow>;
export type ZodProfilesInsertType = z.infer<typeof ZodProfilesInsert>;
export type ZodProfilesUpdateType = z.infer<typeof ZodProfilesUpdate>;
