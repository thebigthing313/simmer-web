import { z } from 'zod'
import type { IsIdentical } from '@/lib/utils'
import type { Insert, Row, Update } from '@/types/data-types'

type DBGroupInviteRow = Row<'group_invites'>
type DBGroupInviteInsert = Insert<'group_invites'>
type DBGroupInviteUpdate = Update<'group_invites'>

export const ZodGroupInviteRow = z.object({
  created_at: z.iso.datetime(),
  created_by: z.uuid().nullable(),
  expiration_date: z.iso.datetime().nullable(),
  group_id: z.uuid(),
  id: z.uuid(),
  is_accepted: z.boolean(),
  role: z.enum(['owner', 'admin', 'manager', 'collector', 'member']),
  user_id: z.uuid(),
})

export const ZodGroupInviteInsert = z.object({
  expiration_date: z.iso.datetime().nullable().optional(),
  group_id: z.uuid(),
  id: z.uuid().optional(),
  is_accepted: z.boolean().optional(),
  role: z.enum(['owner', 'admin', 'manager', 'collector', 'member']),
  user_id: z.uuid(),
})

export const ZodGroupInviteUpdate = z.object({
  expiration_date: z.iso.datetime().nullable().optional(),
  group_id: z.uuid().optional(),
  is_accepted: z.boolean().optional(),
  role: z.enum(['owner', 'admin', 'manager', 'collector', 'member']).optional(),
  user_id: z.uuid().optional(),
})

export type ZodGroupInviteRowType = z.infer<typeof ZodGroupInviteRow>
export type ZodGroupInviteInsertType = z.infer<typeof ZodGroupInviteInsert>
export type ZodGroupInviteUpdateType = z.infer<typeof ZodGroupInviteUpdate>

export type VerifyGroupInviteRow = IsIdentical<
  DBGroupInviteRow,
  ZodGroupInviteRowType
>
export type VerifyGroupInviteInsert = IsIdentical<
  DBGroupInviteInsert,
  ZodGroupInviteInsertType
>
export type VerifyGroupInviteUpdate = IsIdentical<
  DBGroupInviteUpdate,
  ZodGroupInviteUpdateType
>

export const assertZodRow: ZodGroupInviteRowType = {} as DBGroupInviteRow
export const assertDBRow: DBGroupInviteRow = {} as ZodGroupInviteRowType

export const assertZodInsert: ZodGroupInviteInsertType =
  {} as DBGroupInviteInsert
export const assertDBInsert: DBGroupInviteInsert =
  {} as ZodGroupInviteInsertType

export const assertZodUpdate: ZodGroupInviteUpdateType =
  {} as DBGroupInviteUpdate
export const assertDBUpdate: DBGroupInviteUpdate =
  {} as ZodGroupInviteUpdateType
