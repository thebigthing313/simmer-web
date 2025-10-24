import { z } from "zod";
import type { IsIdentical } from "@/lib/utils";
import type { Insert, Row, Update } from "@/types/data-types";

type DBGroupRow = Row<"groups">;
type DBGroupInsert = Insert<"groups">;
type DBGroupUpdate = Update<"groups">;

export const ZodGroupRow = z.object({
  address: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.uuid().nullable(),
  deleted_at: z.iso.datetime().nullable(),
  deleted_by: z.uuid().nullable(),
  fax: z.string().nullable(),
  group_name: z.string(),
  id: z.uuid(),
  logo_url: z.url().nullable(),
  phone: z.string(),
  short_name: z.string(),
  updated_at: z.iso.datetime().nullable(),
  updated_by: z.uuid().nullable(),
  website_url: z.url().nullable(),
});

export const ZodGroupInsert = z.object({
  address: z.string(),
  fax: z.string().nullable().optional(),
  group_name: z.string(),
  id: z.uuid().optional(),
  logo_url: z.url().nullable().optional(),
  phone: z.string(),
  short_name: z.string(),
  website_url: z.url().nullable().optional(),
});

export const ZodGroupUpdate = z.object({
  address: z.string().optional(),
  fax: z.string().nullable().optional(),
  group_name: z.string().optional(),
  logo_url: z.url().nullable().optional(),
  phone: z.string().optional(),
  short_name: z.string().optional(),
  website_url: z.url().nullable().optional(),
});

export type ZodGroupRowType = z.infer<typeof ZodGroupRow>;
export type ZodGroupInsertType = z.infer<typeof ZodGroupInsert>;
export type ZodGroupUpdateType = z.infer<typeof ZodGroupUpdate>;

export type VerifyGroupRow = IsIdentical<DBGroupRow, ZodGroupRowType>;
export type VerifyGroupInsert = IsIdentical<DBGroupInsert, ZodGroupInsertType>;
export type VerifyGroupUpdate = IsIdentical<DBGroupUpdate, ZodGroupUpdateType>;

export const assertZodRow: ZodGroupRowType = {} as DBGroupRow;
export const assertDBRow: DBGroupRow = {} as ZodGroupRowType;

export const assertZodInsert: ZodGroupInsertType = {} as DBGroupInsert;
export const assertDBInsert: DBGroupInsert = {} as ZodGroupInsertType;

export const assertZodUpdate: ZodGroupUpdateType = {} as DBGroupUpdate;
export const assertDBUpdate: DBGroupUpdate = {} as ZodGroupUpdateType;
