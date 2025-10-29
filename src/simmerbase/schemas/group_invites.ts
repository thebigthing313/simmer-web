// Auto-generated schema file for group_invites table
// Generated on: 2025-10-29T03:34:59.376Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
// - Fields named 'geom': PostGIS geometry data (GeoJSON when queried via RPC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodGroup_invitesRow.parse(dataFromSupabase);

import z from 'zod';

export const ZodGroup_invitesRow = z.object({
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()),
	created_by: z.uuid().nullable(),
	expiration_date: z.preprocess((val) => typeof val === "string" ? new Date(val.includes("T") ? val : `${val}T00:00:00Z`) : val, z.date()).nullable(),
	group_id: z.uuid(),
	id: z.uuid(),
	is_accepted: z.boolean(),
	role: z.string(),
	user_id: z.uuid(),
});

export const ZodGroup_invitesInsert = z.object({
	expiration_date: z.preprocess((val) => typeof val === "string" ? new Date(val.includes("T") ? val : `${val}T00:00:00Z`) : val, z.date()).nullable().optional(),
	group_id: z.uuid(),
	is_accepted: z.boolean().optional(),
	role: z.string(),
	user_id: z.uuid(),
});

export const ZodGroup_invitesUpdate = ZodGroup_invitesInsert.partial();

export type ZodGroup_invitesRowType = z.infer<typeof ZodGroup_invitesRow>;
export type ZodGroup_invitesInsertType = z.infer<typeof ZodGroup_invitesInsert>;
export type ZodGroup_invitesUpdateType = z.infer<typeof ZodGroup_invitesUpdate>;
