// Auto-generated schema file for group_invites table
// Generated on: 2025-11-08T04:29:43.951Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodGroupInvitesRow.parse(dataFromSupabase);

import z from 'zod';

export const ZodGroupInvitesRow = z.object({
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	created_by: z.uuid().nullable().optional(),
	expiration_date: z.preprocess((val) => typeof val === "string" ? new Date(val.includes("T") ? val : `${val}T00:00:00Z`) : val, z.date()),
	group_id: z.uuid(),
	id: z.uuid(),
	is_accepted: z.boolean(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
	user_id: z.uuid(),
});

export const ZodGroupInvitesInsert = z.object({
	expiration_date: z.preprocess((val) => typeof val === "string" ? new Date(val.includes("T") ? val : `${val}T00:00:00Z`) : val, z.date()),
	group_id: z.uuid(),
	id: z.uuid().optional(),
	is_accepted: z.boolean().optional(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
	user_id: z.uuid(),
});

export const ZodGroupInvitesUpdate = ZodGroupInvitesInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodGroupInvitesRowToDb = z.object({
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	created_by: z.uuid().nullable().optional(),
	expiration_date: z.preprocess((val) => val instanceof Date ? val.toISOString().split("T")[0] : val, z.string()),
	group_id: z.uuid(),
	id: z.uuid(),
	is_accepted: z.boolean(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
	updated_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
	user_id: z.uuid(),
});

export const ZodGroupInvitesInsertToDb = z.object({
	expiration_date: z.preprocess((val) => val instanceof Date ? val.toISOString().split("T")[0] : val, z.string()),
	group_id: z.uuid(),
	id: z.uuid().optional(),
	is_accepted: z.boolean().optional(),
	role: z.enum(["owner", "admin", "manager", "collector", "member"]),
	user_id: z.uuid(),
});

export const ZodGroupInvitesUpdateToDb = ZodGroupInvitesInsertToDb.partial();

export type ZodGroupInvitesRowType = z.infer<typeof ZodGroupInvitesRow>;
export type ZodGroupInvitesInsertType = z.infer<typeof ZodGroupInvitesInsert>;
export type ZodGroupInvitesUpdateType = z.infer<typeof ZodGroupInvitesUpdate>;
export type ZodGroupInvitesRowToDbType = z.infer<typeof ZodGroupInvitesRowToDb>;
export type ZodGroupInvitesInsertToDbType = z.infer<typeof ZodGroupInvitesInsertToDb>;
export type ZodGroupInvitesUpdateToDbType = z.infer<typeof ZodGroupInvitesUpdateToDb>;
