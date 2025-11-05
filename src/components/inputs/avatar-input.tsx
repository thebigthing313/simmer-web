import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getSupabaseUrl } from '@/simmerbase/storage/get-supabase-url';

interface AvatarInputProps {
	id: string;
	className?: string;
	value?: string | null;
	onClick?: () => void;
}

export function AvatarInput({
	id,
	className,
	value,
	onClick,
}: AvatarInputProps) {
	const imageSrc = !value ? '/placeholder-img.png' : getSupabaseUrl(value);
	return (
		<div
			id={id}
			className={cn(
				'flex items-center gap-4 ring-ring ring-1 rounded-md p-4',
				className,
			)}
		>
			<img
				src={imageSrc}
				alt="Avatar preview"
				className="w-16 h-16 object-cover shrink-0 rounded-sm"
			/>
			<div className="flex-1">
				<h3 className="text-sm font-medium">Image Upload</h3>
				<p className="text-xs text-muted-foreground mb-2">
					Please select a square image for the best results.
				</p>
				<Button type="button" variant="outline" size="sm" onClick={onClick}>
					Change Image
				</Button>
			</div>
		</div>
	);
}
