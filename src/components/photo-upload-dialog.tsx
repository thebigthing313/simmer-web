import { useState } from 'react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';

interface PhotoUploadDialogProps {
	onSubmit: (file: File) => Promise<void>;
}

export function PhotoUploadDialog({
	open,
	onOpenChange,
	onSubmit,
}: PhotoUploadDialogProps & React.ComponentPropsWithoutRef<typeof Dialog>) {
	const [file, setFile] = useState<File | null>(null);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Photo</DialogTitle>
					<DialogDescription>
						Please note that the image will be compressed to reduce file size.
					</DialogDescription>
				</DialogHeader>
				<Input
					type="file"
					onChange={(e) => setFile(e.target.files?.[0] || null)}
				/>
				<DialogFooter>
					<Button
						onClick={() => {
							if (file) {
								onSubmit(file);
							}
						}}
					>
						Upload
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
