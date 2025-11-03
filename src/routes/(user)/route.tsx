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
import { SidebarContents } from './-components/sidebar-contents';

export const Route = createFileRoute('/(user)')({
	beforeLoad: async () => {
		const claims = await getClaims();
		const { user_id, user_email, profile_id, groups } = claims;
		if (!user_id || !profile_id) throw redirect({ to: '/' });
		return { user_id, user_email, profile_id, groups };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	return (
		<SharedLayout>
			<SharedSidebar groupProps={{ onClick: () => {} }}>
				<SidebarContents />
			</SharedSidebar>
			<SharedSidebarInset
				userButtonProps={{
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
