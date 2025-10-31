import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getClaims } from '@/simmerbase/auth/get-claims';

export const Route = createFileRoute('/(auth)')({
	beforeLoad: async () => {
		const claims = getClaims();
		const returnClaims = await claims();
		const { user_id, user_email, profile_id, groups } = returnClaims;
		return { user_id, user_email, profile_id, groups };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-4 items-center">
				<img
					className="max-w-[200px]"
					src="/simmer-logo.svg"
					alt="SIMMER Logo"
				/>
				<Outlet />
			</div>
		</div>
	);
}
