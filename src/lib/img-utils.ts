/**
 * Resizes an image file to fit within the specified max width and height.
 * Optionally, reduces quality to fit within maxFileSize (in bytes).
 *
 * @param {File} file - The image file to resize.
 * @param {number} maxWidth - The maximum width of the resized image.
 * @param {number} maxHeight - The maximum height of the resized image.
 * @param {number} [maxFileSize] - Optional. The maximum file size in bytes.
 * @returns {Promise<File>} A promise that resolves to a File of the resized image.
 * @throws {Error} If the image cannot be decoded or canvas context is not supported.
 */
export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  maxFileSize?: number,
): Promise<File> {
  if (!file.type.startsWith('image/')) {
    // Return a new File with the same content if not an image
    return new File([file], file.name, { type: file.type })
  }

  let img: ImageBitmap
  try {
    img = await createImageBitmap(file)
  } catch (err) {
    throw new Error('Failed to decode image')
  }

  let width = img.width
  let height = img.height

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height
      height = maxHeight
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context not supported')
  }
  ctx.drawImage(img, 0, 0, width, height)

  // Helper to create a File at a given quality
  const toFile = (quality: number): Promise<File> =>
    new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a new File from the Blob
            resolve(new File([blob], file.name, { type: 'image/jpeg' }))
          } else {
            reject(new Error('Canvas toBlob failed'))
          }
        },
        'image/jpeg',
        quality,
      )
    })

  // If no maxFileSize, just return at default quality
  if (!maxFileSize) {
    return toFile(0.9)
  }

  // Try reducing quality to fit maxFileSize
  let quality = 0.9
  const minQuality = 0.4
  const step = 0.1
  let result: File = await toFile(quality)

  while (result.size > maxFileSize && quality > minQuality) {
    quality -= step
    result = await toFile(quality)
  }

  return result
}
