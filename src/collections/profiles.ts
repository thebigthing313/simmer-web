import { QueryClient } from '@tanstack/query-core'
import { createCollection } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { SIMMERClient } from '@/services/data/client'
import { selectProfilesSchema } from '@/types/db-schemas'

export const profilesCollection = (
  supabase: SIMMERClient,
  queryClient: QueryClient,
) =>
  createCollection(
    queryCollectionOptions({
      queryKey: ['profiles'],
      queryFn: async () => {
        const { data } = await supabase.from('profiles').select('*')
        if (!data) return []
        return data.map((profile) => ({
          ...profile,
          created_at: new Date(profile.created_at),
          updated_at: profile.updated_at ? new Date(profile.updated_at) : null,
          deleted_at: profile.deleted_at ? new Date(profile.deleted_at) : null,
        }))
      },
      queryClient,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
      getKey: (item) => item.id,
      schema: selectProfilesSchema,
      onInsert: async ({ transaction }) => {
        const { modified: newProfile } = transaction.mutations[0]
        await supabase.from('profiles').insert(newProfile)
      },
      onUpdate: async ({ transaction }) => {
        const { modified: updatedProfile } = transaction.mutations[0]
        await supabase
          .from('profiles')
          .update(updatedProfile)
          .eq('id', updatedProfile.id)
      },
      onDelete: async ({ transaction }) => {
        const { original: deletedProfile } = transaction.mutations[0]
        await supabase.rpc('soft_delete_record', {
          p_record_id: deletedProfile.id,
          p_table_name: 'profiles',
        })
      },
    }),
  )
