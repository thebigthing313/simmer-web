import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import type React from 'react';
import { signOut } from '@/simmerbase/auth/sign-out';
import { ThemeModeToggle } from '../blocks/theme-mode-toggle';
import { UserButton } from '../blocks/user-button';
import { Separator } from '../ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from '../ui/sidebar';
import { GroupButton } from './group-button';
import { SharedBreadcrumb } from './shared-breadcrumb';

export function SharedLayout({ children }: React.ComponentPropsWithRef<'div'>) {
	return <SidebarProvider>{children}</SidebarProvider>;
}

interface SharedSidebarProps {
	groupProps?: React.ComponentPropsWithoutRef<typeof GroupButton>;
}

export function SharedSidebar({
	groupProps,
	children,
}: SharedSidebarProps & React.ComponentPropsWithRef<typeof SidebarContent>) {
	const navigate = useNavigate();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				{groupProps && <GroupButton {...groupProps} />}
			</SidebarHeader>
			<SidebarContent>{children}</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Sign Out"
							variant="default"
							onClick={() => {
								signOut();
								navigate({ to: '/login' });
							}}
						>
							<LogOut />
							<span>Sign Out</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

interface SharedSidebarInsetProps {
	userButtonProps?: React.ComponentPropsWithoutRef<typeof UserButton>;
}

export function SharedSidebarInset({
	userButtonProps,
	children,
}: SharedSidebarInsetProps & React.ComponentPropsWithRef<'div'>) {
	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex w-full justify-between">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<SharedBreadcrumb />
					</div>
					<div className="flex items-center gap-2 px-4">
						<ThemeModeToggle />
						<UserButton {...userButtonProps} />
					</div>
				</div>
			</header>
			<Separator orientation="horizontal" decorative={true} />
			<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
		</SidebarInset>
	);
}
