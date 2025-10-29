// Auto-generated schema file for group_profiles table
// Generated on: 2025-10-29T03:35:06.762Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
// - Fields named 'geom': PostGIS geometry data (GeoJSON when queried via RPC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodGroup_profilesRow.parse(dataFromSupabase);

import z from 'zod';

export const ZodGroup_profilesRow = z.object({
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()),
	created_by: z.uuid().nullable(),
	group_id: z.uuid(),
	id: z.uuid(),
	is_active: z.boolean(),
	profile_id: z.uuid(),
	role: z.string(),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable(),
	updated_by: z.uuid().nullable(),
});

export const ZodGroup_profilesInsert = z.object({
	group_id: z.uuid(),
	is_active: z.boolean().optional(),
	profile_id: z.uuid(),
	role: z.string(),
});

export const ZodGroup_profilesUpdate = ZodGroup_profilesInsert.partial();

export type ZodGroup_profilesRowType = z.infer<typeof ZodGroup_profilesRow>;
export type ZodGroup_profilesInsertType = z.infer<typeof ZodGroup_profilesInsert>;
export type ZodGroup_profilesUpdateType = z.infer<typeof ZodGroup_profilesUpdate>;
