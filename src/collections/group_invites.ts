import { QueryClient } from '@tanstack/query-core'
import { createCollection } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { SIMMERClient } from '@/services/data/client'
import { publicGroupInvitesRowSchema } from '@/types/db-schemas'

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
        return data
      },
      queryClient,
      staleTime: 1000 * 60 * 60 * 24, //1 day
      getKey: (item) => item.id,
      schema: publicGroupInvitesRowSchema,
      onInsert: async ({ transaction }) => {
        const { modified: newGroupInvite } = { ...transaction.mutations[0] }

        await supabase.from('group_invites').insert(newGroupInvite)
      },
      onUpdate: async ({ transaction }) => {
        const { modified: updatedGroupInvite } = transaction.mutations[0]
        await supabase
          .from('group_invites')
          .update(updatedGroupInvite)
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
