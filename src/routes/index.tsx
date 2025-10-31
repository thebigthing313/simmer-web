import { createFileRoute, redirect } from '@tanstack/react-router';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { capitalize } from '@/lib/utils';
import { getClaims } from '@/simmerbase/auth/get-claims';

export const Route = createFileRoute('/')({
	beforeLoad: async () => {
		const claims = getClaims();
		const returnClaims = await claims();
		if (returnClaims.user_id === null) {
			throw redirect({ to: '/login' });
		}
		const { user_id, user_email, profile_id, groups } = returnClaims;
		return { user_id, user_email, profile_id, groups };
	},
	component: App,
});

function App() {
	const { theme } = useTheme();
	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<div className="flex justify-center">
				<img src="/simmer-logo.svg" alt="Simmer Logo" className="w-[150px]" />
			</div>

			<Tabs defaultValue="groups" className="w-full">
				<TabsList className="flex w-full justify-center">
					<TabsTrigger value="groups">Groups</TabsTrigger>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>
				<TabsContent value="groups">
					<Card className="h-[500px]  overflow-auto">
						<CardContent>Groups Content</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="profile">
					<Card className="h-[500px]  overflow-auto">
						<CardContent>Profile Content</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="settings">
					<Card className="h-[500px]  overflow-auto">
						<CardContent>
							<div className="flex flex-row gap-2">
								<ThemeModeToggle />
								<span>Current Theme: {capitalize(theme)}</span>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
