import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import z from 'zod';
import {
	SharedLayout,
	SharedSidebar,
	SharedSidebarInset,
} from '@/components/layout/shared-layout';
import { Spinner } from '@/components/ui/spinner';
import { getClaims } from '@/simmerbase/auth/get-claims';
import { groups } from '@/simmerbase/db/collections/groups';
import { profiles } from '@/simmerbase/db/collections/profiles';
import { useGroupBySlug } from '@/simmerbase/db/hooks/use-group';
import { useProfile } from '@/simmerbase/db/hooks/use-profile';
import { SidebarContents } from './-components/sidebar-contents';

const ParamsSchema = z.object({
	groupSlug: z.string(),
});

export const Route = createFileRoute('/$groupSlug')({
	beforeLoad: async ({ params }) => {
		const claims = await getClaims();
		const { user_id, user_email, profile_id, groups } = claims;
		if (!user_id || !profile_id) throw redirect({ to: '/login' });
		const groupMatch = groups.find((g) => g.short_name === params.groupSlug);
		if (!groupMatch) throw new Error('Access denied to this group.');
		return {
			user_id,
			user_email,
			profile_id,
			group_role: groupMatch.role,
			group_id: groupMatch.group_id,
		};
	},
	params: {
		parse: (raw) => ParamsSchema.parse(raw),
	},
	component: () => (
		<ErrorBoundary fallback={<div>Something went wrong.</div>}>
			<Suspense fallback={<AppLoading />}>
				<RouteComponent />
			</Suspense>
		</ErrorBoundary>
	),
	loader: async ({ params }) => {
		const { groupSlug } = params;
		await groups.preload();
		await profiles.preload();
		return { crumb: groupSlug.toUpperCase() };
	},
});

function RouteComponent() {
	const { profile_id, group_role } = Route.useRouteContext();
	const { groupSlug } = Route.useParams();
	const navigate = useNavigate();
	const { data: profile } = useProfile(profile_id);
	const { data: group } = useGroupBySlug(groupSlug);

	return (
		<SharedLayout>
			<SharedSidebar
				groupProps={{
					name: group.group_name,
					role: group_role || 'Member',
					logo_url: group.logo_url || undefined,
					onClick: () => {
						navigate({ from: '/$groupSlug', to: './settings' });
					},
				}}
			>
				<SidebarContents />
			</SharedSidebar>
			<SharedSidebarInset
				userButtonProps={{
					imageUrl: profile.avatar_url || undefined,
					fallback: `${profile.first_name[0]}${profile.last_name[0]}`,
					onClick: () => {
						navigate({ to: '/' });
					},
				}}
			>
				<Outlet />
			</SharedSidebarInset>
		</SharedLayout>
	);
}

function AppLoading() {
	return (
		<div className="flex flex-col gap-2 w-full justify-center items-center">
			<img
				className="w-[300px] animate-pulse"
				src="/simmer-logo.svg"
				alt="SIMMER logo"
			/>
			<div>
				Loading...
				<Spinner />
			</div>
		</div>
	);
}
