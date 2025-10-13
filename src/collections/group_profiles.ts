import { QueryClient } from '@tanstack/query-core'
import { createCollection } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { SIMMERClient } from '@/services/data/client'
import { selectGroupProfilesSchema } from '@/types/db-schemas'

export const groupProfilesCollection = (
  supabase: SIMMERClient,
  queryClient: QueryClient,
) =>
  createCollection(
    queryCollectionOptions({
      queryKey: ['group_profiles'],
      queryFn: async () => {
        const { data } = await supabase.from('group_profiles').select('*')

        if (!data) return []
        return data.map((groupProfile) => ({
          ...groupProfile,
          created_at: new Date(groupProfile.created_at),
          updated_at: groupProfile.updated_at
            ? new Date(groupProfile.updated_at)
            : null,
        }))
      },
      queryClient,
      staleTime: 1000 * 60 * 60 * 24, //1 day
      getKey: (item) => item.id,
      schema: selectGroupProfilesSchema,
      onInsert: async ({ transaction }) => {
        const { modified: newGroupProfile } = transaction.mutations[0]
        await supabase.from('group_profiles').insert(newGroupProfile)
      },
      onUpdate: async ({ transaction }) => {
        const { modified: updatedGroupProfile } = transaction.mutations[0]
        await supabase
          .from('group_profiles')
          .update(updatedGroupProfile)
          .eq('id', updatedGroupProfile.id)
      },
      onDelete: async ({ transaction }) => {
        const { original: deletedGroupProfile } = transaction.mutations[0]
        await supabase.rpc('soft_delete_record', {
          p_record_id: deletedGroupProfile.id,
          p_table_name: 'group_profiles',
        })
      },
    }),
  )
