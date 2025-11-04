import { createClientOnlyFn } from '@tanstack/react-start';

/**
 * Compresses an image file using canvas and returns a new File.
 * @param file - The original file.
 * @param maxWidth - Maximum width.
 * @param maxHeight - Maximum height.
 * @param quality - JPEG quality (0-1).
 * @returns Promise<File> - The compressed file.
 */
export const compressImage = createClientOnlyFn(
	(
		file: File,
		maxWidth: number,
		maxHeight: number,
		quality: number = 0.8,
	): Promise<File> => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) {
					reject(new Error('Canvas not supported'));
					return;
				}

				// Calculate new dimensions
				let { width, height } = img;
				if (width > height) {
					if (width > maxWidth) {
						height = (height * maxWidth) / width;
						width = maxWidth;
					}
				} else {
					if (height > maxHeight) {
						width = (width * maxHeight) / height;
						height = maxHeight;
					}
				}

				canvas.width = width;
				canvas.height = height;

				// Draw the image
				ctx.drawImage(img, 0, 0, width, height);

				// Check for transparency
				const imageData = ctx.getImageData(0, 0, width, height);
				let hasAlpha = false;
				for (let i = 0; i < imageData.data.length; i += 4) {
					if (imageData.data[i + 3] < 255) {
						hasAlpha = true;
						break;
					}
				}

				// Compress and create blob
				const mimeType = hasAlpha ? 'image/png' : 'image/jpeg';
				canvas.toBlob(
					(blob) => {
						if (blob) {
							const compressedFile = new File([blob], file.name, {
								type: mimeType,
								lastModified: Date.now(),
							});
							resolve(compressedFile);
						} else {
							reject(new Error('Compression failed'));
						}
					},
					mimeType,
					hasAlpha ? undefined : quality,
				);
			};
			img.onerror = () => reject(new Error('Image load failed'));
			img.src = URL.createObjectURL(file);
		});
	},
);
