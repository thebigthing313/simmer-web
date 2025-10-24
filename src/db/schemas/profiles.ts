import { z } from "zod";
import type { IsIdentical } from "@/lib/utils";
import type { Insert, Row, Update } from "@/types/data-types";

type DBProfileRow = Row<"profiles">;
type DBProfileInsert = Insert<"profiles">;
type DBProfileUpdate = Update<"profiles">;

export const ZodProfileRow = z.object({
  avatar_url: z.url().nullable(),
  bio: z.string().nullable(),
  created_at: z.iso.datetime(),
  created_by: z.uuid().nullable(),
  deleted_at: z.iso.datetime().nullable(),
  deleted_by: z.uuid().nullable(),
  first_name: z.string(),
  id: z.uuid(),
  last_name: z.string(),
  profile_photo_url: z.url().nullable(),
  updated_at: z.iso.datetime().nullable(),
  updated_by: z.uuid().nullable(),
  user_id: z.uuid().nullable(),
});

export const ZodProfileInsert = z.object({
  avatar_url: z.url().nullable().optional(),
  bio: z.string().nullable().optional(),
  first_name: z.string(),
  id: z.uuid().optional(),
  last_name: z.string(),
  profile_photo_url: z.url().nullable().optional(),
  user_id: z.uuid().nullable().optional(),
});

export const ZodProfileUpdate = z.object({
  avatar_url: z.url().nullable().optional(),
  bio: z.string().nullable().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  profile_photo_url: z.url().nullable().optional(),
  user_id: z.uuid().nullable().optional(),
});

export type ZodProfileRowType = z.infer<typeof ZodProfileRow>;
export type ZodProfileInsertType = z.infer<typeof ZodProfileInsert>;
export type ZodProfileUpdateType = z.infer<typeof ZodProfileUpdate>;

export type VerifyProfileRow = IsIdentical<DBProfileRow, ZodProfileRowType>;
export type VerifyProfileInsert = IsIdentical<
  DBProfileInsert,
  ZodProfileInsertType
>;
export type VerifyProfileUpdate = IsIdentical<
  DBProfileUpdate,
  ZodProfileUpdateType
>;

export const assertZodRow: ZodProfileRowType = {} as DBProfileRow;
export const assertDBRow: DBProfileRow = {} as ZodProfileRowType;

export const assertZodInsert: ZodProfileInsertType = {} as DBProfileInsert;
export const assertDBInsert: DBProfileInsert = {} as ZodProfileInsertType;

export const assertZodUpdate: ZodProfileUpdateType = {} as DBProfileUpdate;
export const assertDBUpdate: DBProfileUpdate = {} as ZodProfileUpdateType;
