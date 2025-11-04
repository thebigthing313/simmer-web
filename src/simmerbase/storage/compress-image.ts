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
		quality = 0.8,
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

/**
 * Compresses an image file to meet a target file size.
 * Uses iterative compression with decreasing quality until the target size is met.
 *
 * @param file - The original file.
 * @param maxSizeBytes - Maximum file size in bytes.
 * @param maxWidth - Maximum width.
 * @param maxHeight - Maximum height.
 * @param initialQuality - Starting JPEG quality (0-1).
 * @returns Promise<File> - The compressed file.
 */
export const compressImageToSize = createClientOnlyFn(
	async (
		file: File,
		maxSizeBytes: number,
		maxWidth: number,
		maxHeight: number,
		initialQuality = 0.9,
	): Promise<File> => {
		// If file is already under the size limit, just compress dimensions
		if (file.size <= maxSizeBytes) {
			return compressImage(file, maxWidth, maxHeight, initialQuality);
		}

		// Start with initial quality and iteratively reduce
		let quality = initialQuality;
		let compressedFile = await compressImage(
			file,
			maxWidth,
			maxHeight,
			quality,
		);

		// Iteratively reduce quality until we meet the size target
		while (compressedFile.size > maxSizeBytes && quality > 0.1) {
			quality -= 0.1;
			compressedFile = await compressImage(file, maxWidth, maxHeight, quality);
		}

		// If still too large, reduce dimensions
		if (compressedFile.size > maxSizeBytes) {
			let width = maxWidth;
			let height = maxHeight;

			while (compressedFile.size > maxSizeBytes && width > 100) {
				width = Math.floor(width * 0.8);
				height = Math.floor(height * 0.8);
				compressedFile = await compressImage(file, width, height, 0.8);
			}
		}

		return compressedFile;
	},
);
