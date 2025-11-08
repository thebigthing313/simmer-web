import { Link, type LinkProps } from '@tanstack/react-router';
import { HomeIcon, Settings2Icon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

type SidebarItem = {
	label: string;
	icon: React.ReactElement;
	link: LinkProps;
};

const sidebarItems: Array<SidebarItem> = [
	{
		label: 'Home',
		icon: <HomeIcon />,
		link: { to: '/' },
	},
	{
		label: 'Profile',
		icon: <UserIcon />,
		link: { to: '/profile' },
	},
	{
		label: 'Settings',
		icon: <Settings2Icon />,
		link: { to: '/settings' },
	},
];

export function SidebarContents() {
	const [activeButton, setActiveButton] = useState<string | null>(null);

	return (
		<SidebarGroup>
			<SidebarMenu>
				{sidebarItems.map((item) => (
					<SidebarMenuItem key={`${item.label}-item`}>
						<Link {...item.link}>
							<SidebarMenuButton
								isActive={activeButton === item.label}
								key={`${item.label}-button`}
								tooltip={item.label}
								size="default"
								onClick={() => setActiveButton(item.label)}
							>
								{item.icon} <span>{item.label}</span>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
