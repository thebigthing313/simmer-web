import { getSupabaseUrl } from '@/simmerbase/storage/get-supabase-url';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface UserButtonProps {
	imageUrl?: string;
	fallback?: string;
	onClick?: () => void;
}
export function UserButton({ imageUrl, fallback, onClick }: UserButtonProps) {
	const imageSrc = !imageUrl ? undefined : getSupabaseUrl(imageUrl);
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onClick}
					variant="outline"
					className="rounded-full"
					size="icon"
				>
					<Avatar>
						<AvatarImage src={imageSrc} alt="" />
						<AvatarFallback>{fallback ?? 'S'}</AvatarFallback>
					</Avatar>
				</Button>
			</TooltipTrigger>
			<TooltipContent>My Profile</TooltipContent>
		</Tooltip>
	);
}
