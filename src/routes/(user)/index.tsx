import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { H4 } from '@/components/typography';
import { Spinner } from '@/components/ui/spinner';
import { useProfile } from '@/simmerbase/db/hooks/use-profile';
import { MyGroupsCard } from './-components/my-groups-card';
import { MyInvitesCard } from './-components/my-invites-card';

export const Route = createFileRoute('/(user)/')({
	component: App,
});

function App() {
	const { profile_id } = Route.useRouteContext();
	const { data: profile } = useProfile(profile_id);

	return (
		<div className="flex flex-col max-w-lg gap-2">
			<ErrorBoundary fallback={<div>Failed to load groups.</div>}>
				<Suspense fallback={<Spinner />}>
					<H4>Welcome back, {profile.first_name}!</H4>
					<MyGroupsCard />
					<MyInvitesCard />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
