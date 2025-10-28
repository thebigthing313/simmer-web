import type { Tables } from './supabase-types';

export type TransformedRow<T> = {
	[K in keyof T]: K extends `${string}_at` | `${string}_date`
		? T[K] extends string
			? Date
			: T[K]
		: T[K];
};

export type Group = TransformedRow<Tables<'groups'>>;
export type GroupProfile = TransformedRow<Tables<'group_profiles'>>;
export type GroupInvite = TransformedRow<Tables<'group_invites'>>;
export type Region = TransformedRow<Tables<'regions'>>;
export type Profile = TransformedRow<Tables<'profiles'>>;
