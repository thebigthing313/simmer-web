import { getSupabaseClient } from '../client';

export async function acceptGroupInvite(inviteId: string): Promise<void> {
	const supabase = getSupabaseClient();
	const { error } = await supabase
		.from('group_invites')
		.update({ is_accepted: true })
		.eq('id', inviteId);

	if (error) throw error;
}
