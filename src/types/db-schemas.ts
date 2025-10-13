import z from 'zod'

export const selectProfilesSchema = z.object({
  id: z.uuid(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  user_id: z.uuid().nullish(),
  profile_photo_url: z.url().nullish(),
  avatar_url: z.url().nullish(),
  bio: z.string().nullish(),
})

export const selectGroupsSchema = z.object({
  id: z.uuid(),
  group_name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  short_name: z.string().min(1),
  fax: z.string().nullish(),
  website_url: z.url().nullish(),
  logo_url: z.url().nullish(),
})

export const selectGroupProfilesSchema = z.object({
  id: z.uuid(),
  group_id: z.uuid(),
  profile_id: z.uuid(),
  role: z.enum(['owner', 'manager', 'collector', 'admin', 'member']),
  is_active: z.boolean(),
})

export const selectGroupInvitesSchema = z.object({
  id: z.uuid(),
  group_id: z.uuid(),
  user_id: z.uuid(),
  role: z.enum(['owner', 'manager', 'collector', 'admin', 'member']),
  expiration_date: z.date().nullish(),
  is_accepted: z.boolean(),
})
