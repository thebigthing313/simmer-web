import { QueryClient } from '@tanstack/query-core'
import { createCollection } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { SIMMERClient } from '@/services/data/client'
import { publicGroupsRowSchema } from '@/types/db-schemas'

export const groupsCollection = (
  supabase: SIMMERClient,
  queryClient: QueryClient,
  user_id: string,
  profile_id: string,
) =>
  createCollection(
    queryCollectionOptions({
      queryKey: ['groups', `user_id:${user_id}`, `profile_id:${profile_id}`],
      queryFn: async () => {
        const { data: joinedGroups } = await supabase
          .from('groups')
          .select('*, group_profiles(profile_id)')
          .eq('group_profiles.profile_id', profile_id)

        const { data: invitedGroups } = await supabase
          .from('groups')
          .select('*, group_invites(user_id)')
          .eq('group_invites.user_id', user_id)

        if (!joinedGroups && !invitedGroups) return []
        const groups = [...(joinedGroups ?? []), ...(invitedGroups ?? [])]
        return groups
      },
      queryClient,
      staleTime: 1000 * 60 * 60 * 24, //1 day
      getKey: (item) => item.id,
      schema: publicGroupsRowSchema,
      onInsert: async ({ transaction }) => {
        const { modified: newGroup } = transaction.mutations[0]
        await supabase.from('groups').insert(newGroup)
      },
      onUpdate: async ({ transaction }) => {
        const { modified: updatedGroup } = transaction.mutations[0]
        await supabase
          .from('groups')
          .update(updatedGroup)
          .eq('id', updatedGroup.id)
      },
      onDelete: async ({ transaction }) => {
        const { original: deletedGroup } = transaction.mutations[0]
        await supabase.rpc('soft_delete_record', {
          p_record_id: deletedGroup.id,
          p_table_name: 'groups',
        })
      },
    }),
  )
