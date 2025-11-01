import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

interface GroupButtonProps {
	name?: string;
	role?: string;
	logo_url?: string;
	onClick?: () => void;
}

export function GroupButton({
	name,
	role,
	logo_url,
	onClick,
}: GroupButtonProps) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					onClick={onClick}
				>
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<img
							src={logo_url ?? '/simmer-favicon.svg'}
							alt={`${name ?? 'simmer'} logo`}
							className="size-8"
						/>
					</div>

					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{name ?? 'SIMMER'}</span>

						<span className="truncate text-xs">
							{role ? `Role: ${role}` : 'Integrated Mosquito Management'}
						</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
