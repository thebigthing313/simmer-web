import { Link, type LinkProps } from '@tanstack/react-router';
import { LayoutDashboard, MapPin, VectorSquare } from 'lucide-react';
import { useState } from 'react';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

type SidebarItem = {
	label: string;
	icon: React.ReactElement;
	link: LinkProps;
};

type SidebarGroupItems = {
	label: string;
	items: Array<SidebarItem>;
};

const sidebarItems: Array<SidebarGroupItems> = [
	{
		label: 'Main',
		items: [
			{
				label: 'Dashboard',
				icon: <LayoutDashboard />,
				link: { from: '/$groupSlug', to: '.' },
			},
		],
	},
	{
		label: 'GIS Data',
		items: [
			{
				label: 'Locations',
				icon: <MapPin />,
				link: { from: '/$groupSlug', to: '/$groupSlug/locations' },
			},
			{
				label: 'Regions',
				icon: <VectorSquare />,
				link: { from: '/$groupSlug', to: '/$groupSlug/regions' },
			},
		],
	},
];

export function SidebarContents() {
	const [activeButton, setActiveButton] = useState<string | null>(null);

	return (
		<>
			{sidebarItems.map((group) => (
				<SidebarGroup key={`${group.label}-group`}>
					<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
					<SidebarMenu>
						{group.items.map((item) => (
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
			))}
		</>
	);
}
