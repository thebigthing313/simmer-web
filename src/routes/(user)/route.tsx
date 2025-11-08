import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
	SharedLayout,
	SharedSidebar,
	SharedSidebarInset,
} from '@/components/layout/shared-layout';
import { Spinner } from '@/components/ui/spinner';
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
	component: () => (
		<ErrorBoundary fallback={<div>Something went wrong.</div>}>
			<Suspense fallback={<AppLoading />}>
				<RouteComponent />
			</Suspense>
		</ErrorBoundary>
	),
});

function RouteComponent() {
	const { profile_id } = Route.useRouteContext();
	const navigate = useNavigate();
	const { data } = useProfile(profile_id);

	return (
		<SharedLayout>
			<SharedSidebar groupProps={{ onClick: () => {} }}>
				<SidebarContents />
			</SharedSidebar>
			<SharedSidebarInset
				userButtonProps={{
					imageUrl: data.avatar_url || undefined,
					fallback: `${data.first_name[0]}${data.last_name[0]}`,
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
