import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import {
	SharedLayout,
	SharedSidebar,
	SharedSidebarInset,
} from '@/components/layout/shared-layout';
import { getClaims } from '@/simmerbase/auth/get-claims';
import { useProfile } from '@/simmerbase/db/hooks/use-profile';
import { SidebarContents } from './-components/sidebar-contents';

export const Route = createFileRoute('/(user)')({
	beforeLoad: async () => {
		const claims = await getClaims();
		const { user_id, user_email, profile_id, groups } = claims;
		if (!user_id || !profile_id) throw redirect({ to: '/login' });
		return { user_id, user_email, profile_id, groups };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { profile_id } = Route.useRouteContext();
	const navigate = useNavigate();
	const { data } = useProfile(profile_id);
	if (!data) return null;
	return (
		<SharedLayout>
			<SharedSidebar groupProps={{ onClick: () => {} }}>
				<SidebarContents />
			</SharedSidebar>
			<SharedSidebarInset
				userButtonProps={{
					imageUrl: data.avatar_url || undefined,
					fallback: `${data.first_name?.[0]}${data.last_name?.[0]}`,
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
