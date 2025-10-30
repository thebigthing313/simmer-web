import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/')({ component: App });

function App() {
	return (
		<div className="drop-shadow drop-shadow-muted/50 flex w-full max-w-2xl flex-col gap-4">
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
						<CardContent>Settings Content</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
