import { supabase } from '@/simmerbase/client';

export async function forgotPassword(email: string): Promise<void> {
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password`,
	});

	if (error) throw error;
}
