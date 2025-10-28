import { supabase } from '@/simmerbase/client';

/**
 * Represents the authentication status and metadata for a user.
 */
export type AuthStatus = {
	user_id?: string;
	user_email?: string;
	profile_id?: string;
	default_group?: string;
	groups?: Array<{ group_id: string; role: string }>;
};

/**
 * Represents the Auth object, which includes AuthStatus, a refresh method, and an optional error.
 */
export type Auth = AuthStatus & {
	/**
	 * Refreshes the JWT and returns updated Auth.
	 */
	refresh: () => Promise<Auth>;
	/**
	 * If an error occurred during fetching or refreshing, it will be set here.
	 */
	error?: Error;
};

/**
 * Fetches the current user's JWT claims and returns an Auth object.
 * All properties in AuthStatus are optional and may be undefined if not present.
 * If an error occurs, it will be included in the returned Auth object.
 *
 * @param supabase - The Supabase client instance
 * @returns An Auth object with user_id, profile_id, default_group, groups, a refresh() method, and optional error.
 */
export async function getAuth(): Promise<Auth> {
	// Define the expected structure for group entries in app_metadata
	type GroupRole = { group_id: string; role: string };

	// Type predicate to narrow unknown values to GroupRole
	function isGroupRole(g: unknown): g is GroupRole {
		return (
			typeof g === 'object' &&
			g !== null &&
			'group_id' in g &&
			'role' in g &&
			typeof (g as Record<string, unknown>).group_id === 'string' &&
			typeof (g as Record<string, unknown>).role === 'string'
		);
	}

	async function fetchClaims(): Promise<AuthStatus & { error?: Error }> {
		const { data: session, error: sessionError } =
			await supabase.auth.getSession();

		if (sessionError || !session.session) {
			return { error: sessionError ?? new Error('No session found') };
		}

		const { data, error: supabaseError } = await supabase.auth.getClaims();

		if (supabaseError || !data?.claims) {
			return {
				error: supabaseError ?? new Error('No session or claims found'),
			};
		}

		const { claims } = data;

		// Safely coerce app_metadata to a record so we can look up custom fields
		const appMeta =
			typeof claims.app_metadata === 'object' && claims.app_metadata !== null
				? (claims.app_metadata as Record<string, unknown>)
				: ({} as Record<string, unknown>);

		const rawGroups = appMeta.groups;

		return {
			user_id: typeof claims.sub === 'string' ? claims.sub : undefined,
			user_email: typeof claims.email === 'string' ? claims.email : undefined,
			profile_id:
				typeof appMeta.profile_id === 'string' ? appMeta.profile_id : undefined,
			default_group:
				typeof appMeta.default_group === 'string'
					? appMeta.default_group
					: undefined,
			groups: Array.isArray(rawGroups)
				? rawGroups.filter(isGroupRole)
				: undefined,
		};
	}

	// The refresh method: refreshes the session (gets a new JWT) and then fetches claims
	const refresh = async (): Promise<Auth> => {
		const { error: refreshError } = await supabase.auth.refreshSession();
		if (refreshError) {
			return { refresh, error: refreshError };
		}
		const status = await fetchClaims();
		return { ...status, refresh };
	};

	const status = await fetchClaims();

	return {
		...status,
		refresh,
	};
}
