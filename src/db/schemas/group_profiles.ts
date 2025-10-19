import { z } from 'zod'
import type { IsIdentical } from '@/lib/utils'
import type { Insert, Row, Update } from '@/types/data-types'

type DBGroupProfileRow = Row<'group_profiles'>
type DBGroupProfileInsert = Insert<'group_profiles'>
type DBGroupProfileUpdate = Update<'group_profiles'>

export const ZodGroupProfileRow = z.object({
  created_at: z.iso.datetime(),
  created_by: z.uuid().nullable(),
  group_id: z.uuid(),
  id: z.uuid(),
  is_active: z.boolean(),
  profile_id: z.uuid(),
  role: z.enum(['owner', 'admin', 'manager', 'collector', 'member']),
  updated_at: z.iso.datetime().nullable(),
  updated_by: z.uuid().nullable(),
})

export const ZodGroupProfileInsert = z.object({
  group_id: z.uuid(),
  id: z.uuid().optional(),
  is_active: z.boolean().optional(),
  profile_id: z.uuid(),
  role: z.enum(['owner', 'admin', 'manager', 'collector', 'member']),
})

export const ZodGroupProfileUpdate = z.object({
  group_id: z.uuid().optional(),
  is_active: z.boolean().optional(),
  profile_id: z.uuid().optional(),
  role: z.enum(['owner', 'admin', 'manager', 'collector', 'member']).optional(),
})

export type ZodGroupProfileRowType = z.infer<typeof ZodGroupProfileRow>
export type ZodGroupProfileInsertType = z.infer<typeof ZodGroupProfileInsert>
export type ZodGroupProfileUpdateType = z.infer<typeof ZodGroupProfileUpdate>

export type VerifyGroupProfileRow = IsIdentical<
  DBGroupProfileRow,
  ZodGroupProfileRowType
>
export type VerifyGroupProfileInsert = IsIdentical<
  DBGroupProfileInsert,
  ZodGroupProfileInsertType
>
export type VerifyGroupProfileUpdate = IsIdentical<
  DBGroupProfileUpdate,
  ZodGroupProfileUpdateType
>

export const assertZodRow: ZodGroupProfileRowType = {} as DBGroupProfileRow
export const assertDBRow: DBGroupProfileRow = {} as ZodGroupProfileRowType

export const assertZodInsert: ZodGroupProfileInsertType =
  {} as DBGroupProfileInsert
export const assertDBInsert: DBGroupProfileInsert =
  {} as ZodGroupProfileInsertType

export const assertZodUpdate: ZodGroupProfileUpdateType =
  {} as DBGroupProfileUpdate
export const assertDBUpdate: DBGroupProfileUpdate =
  {} as ZodGroupProfileUpdateType
