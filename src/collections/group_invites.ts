import { QueryClient } from '@tanstack/query-core'
import { createCollection } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { SIMMERClient } from '@/services/data/client'
import { selectGroupInvitesSchema } from '@/types/db-schemas'

export const groupInvitesCollection = (
  supabase: SIMMERClient,
  queryClient: QueryClient,
) =>
  createCollection(
    queryCollectionOptions({
      queryKey: ['group_invites'],
      queryFn: async () => {
        const { data } = await supabase.from('group_invites').select('*')

        if (!data) return []
        return data.map((groupInvite) => ({
          ...groupInvite,
          expiration_date: groupInvite.expiration_date
            ? new Date(groupInvite.expiration_date)
            : null,
          created_at: new Date(groupInvite.created_at),
        }))
      },
      queryClient,
      staleTime: 1000 * 60 * 60 * 24, //1 day
      getKey: (item) => item.id,
      schema: selectGroupInvitesSchema,
      onInsert: async ({ transaction }) => {
        const { modified: newGroupInvite } = { ...transaction.mutations[0] }
        const processedInvite = {
          ...newGroupInvite,
          expiration_date: newGroupInvite.expiration_date
            ? newGroupInvite.expiration_date.toISOString()
            : null,
        }
        await supabase.from('group_invites').insert(processedInvite)
      },
      onUpdate: async ({ transaction }) => {
        const { modified: updatedGroupInvite } = transaction.mutations[0]
        const processedInvite = {
          ...updatedGroupInvite,
          expiration_date: updatedGroupInvite.expiration_date
            ? updatedGroupInvite.expiration_date.toISOString()
            : null,
        }
        await supabase
          .from('group_invites')
          .update(processedInvite)
          .eq('id', updatedGroupInvite.id)
      },
      onDelete: async ({ transaction }) => {
        const { original: deletedGroupInvite } = transaction.mutations[0]
        await supabase
          .from('group_invites')
          .delete()
          .eq('id', deletedGroupInvite.id)
      },
    }),
  )
