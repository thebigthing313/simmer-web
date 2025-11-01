import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface UserButtonProps {
	imageUrl?: string;
	fallback?: string;
	onClick?: () => void;
}
export function UserButton({ imageUrl, fallback, onClick }: UserButtonProps) {
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
						<AvatarImage src={imageUrl} alt="" />
						<AvatarFallback>{fallback ?? 'S'}</AvatarFallback>
					</Avatar>
				</Button>
			</TooltipTrigger>
			<TooltipContent>My Profile</TooltipContent>
		</Tooltip>
	);
}
