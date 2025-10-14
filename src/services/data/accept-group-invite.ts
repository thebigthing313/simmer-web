import { SIMMERClient } from './client'

export async function acceptGroupInvite(
  supabase: SIMMERClient,
  inviteId: string,
) {
  const { data, error } = await supabase
    .from('group_invites')
    .update({ is_accepted: true })
    .eq('id', inviteId)
    .single()
  if (error) throw error
  return data
}
