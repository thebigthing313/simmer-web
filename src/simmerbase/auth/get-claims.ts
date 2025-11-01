import { z } from 'zod';
import { getSupabaseClient } from '../client';

interface JwtClaims {
	iss: string;
	aud: string | string[];
	exp: number;
	iat: number;
	sub: string;
	role: string;
	aal: 'aal1' | 'aal2';
	session_id: string;
	email: string;
	phone: string;
	is_anonymous: boolean;
	jti?: string;
	nbf?: number;
	app_metadata?: Record<string, unknown>;
	user_metadata?: Record<string, unknown>;
	amr?: Array<{
		method: string;
		timestamp: number;
	}>;
	ref?: string; // Only in anon/service role tokens
}

export const GroupSchema = z.object({
	group_id: z.string(),
	role: z.string(),
});

type Group = z.infer<typeof GroupSchema>;

export const ReturnedClaimsSchema = z.object({
	user_id: z.uuid().nullable(),
	user_email: z.email().nullable(),
	profile_id: z.uuid().nullable(),
	groups: z.array(GroupSchema),
});

export type ReturnedClaims = z.infer<typeof ReturnedClaimsSchema>;

export async function getClaims() {
	const supabase = getSupabaseClient();

	async function fetchClaims(): Promise<ReturnedClaims> {
		const { data, error: _error } = await supabase.auth.getClaims();

		function isGroup(g: unknown): g is Group {
			return GroupSchema.safeParse(g).success;
		}

		if (!data)
			return ReturnedClaimsSchema.parse({
				user_id: null,
				user_email: null,
				profile_id: null,
				groups: [],
			});

		const claims = data.claims as JwtClaims;

		const appMeta =
			typeof claims.app_metadata === 'object' && claims.app_metadata !== null
				? (claims.app_metadata as Record<string, unknown>)
				: ({} as Record<string, unknown>);

		const rawGroups = appMeta.groups;

		const returnedClaims: ReturnedClaims = {
			user_id: claims.sub,
			user_email: claims.email,
			profile_id:
				typeof appMeta.profile_id === 'string' ? appMeta.profile_id : null,
			groups: Array.isArray(rawGroups) ? rawGroups.filter(isGroup) : [],
		};

		return ReturnedClaimsSchema.parse(returnedClaims);
	}

	const claims = await fetchClaims();
	return claims;
}
