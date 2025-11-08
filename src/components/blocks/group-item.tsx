import { parsePhoneNumber } from 'libphonenumber-js/min';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

/**
 * Props for the GroupCard component.
 */
interface GroupCardProps {
	/** URL of the group's logo (optional). */
	logo_url?: string;
	/** Name of the group. */
	group_name: string;
	/** Address of the group. */
	address: string;
	/** Phone number of the group. */
	phone: string;
}

export function GroupCard({
	logo_url,
	group_name,
	address,
	phone,
	className,
	ref,
}: GroupCardProps & React.ComponentPropsWithRef<'div'>) {
	const parsedPhone = parsePhoneNumber(phone, 'US').formatNational();

	return (
		<Item
			key={`group-card-${group_name}`}
			variant="outline"
			className={cn('min-w-xs max-w-md bg-card', className)}
			ref={ref}
		>
			<ItemMedia className="size-20 bg-card" variant="image">
				<Avatar className="size-20">
					<AvatarImage src={logo_url} alt={group_name} />
					<AvatarFallback>{group_name.charAt(0).toUpperCase()}</AvatarFallback>
				</Avatar>
			</ItemMedia>

			<ItemContent>
				<ItemTitle>{group_name}</ItemTitle>
				<ItemDescription className="tracking-tight">{address}</ItemDescription>
				<ItemDescription className="tracking-tight">
					{parsedPhone}
				</ItemDescription>
			</ItemContent>
		</Item>
	);
}

export function GroupCardGroup({
	className,
	children,
	ref,
	...props
}: React.ComponentPropsWithRef<'div'>) {
	return (
		<ItemGroup
			className={cn('min-w-xs max-w-md', className)}
			{...props}
			ref={ref}
		>
			{children}
		</ItemGroup>
	);
}
