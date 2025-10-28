import { supabase } from '@/simmerbase/client';

export async function resetPassword(password: string) {
	const { data, error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) throw error;

	return data;
}
