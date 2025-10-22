import { supabase } from '@/db/client'

/**
 * Compresses an image file using canvas and returns a new File.
 * @param file - The original file.
 * @param maxWidth - Maximum width.
 * @param maxHeight - Maximum height.
 * @param quality - JPEG quality (0-1).
 * @returns Promise<File> - The compressed file.
 */
async function compressImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.8,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas not supported'))
        return
      }

      // Calculate new dimensions
      let { width, height } = img
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw the image
      ctx.drawImage(img, 0, 0, width, height)

      // Check for transparency
      const imageData = ctx.getImageData(0, 0, width, height)
      let hasAlpha = false
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] < 255) {
          hasAlpha = true
          break
        }
      }

      // Compress and create blob
      const mimeType = hasAlpha ? 'image/png' : 'image/jpeg'
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Compression failed'))
          }
        },
        mimeType,
        hasAlpha ? undefined : quality,
      )
    }
    img.onerror = () => reject(new Error('Image load failed'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Uploads a photo file to Supabase storage and returns the public URL.
 * @param file - The file to upload.
 * @param bucket - The storage bucket name.
 * @param fileName - Optional custom file name.
 * @returns Promise<string> - The public URL of the uploaded file.
 */
export async function uploadPhoto(
  file: File,
  bucket: 'logos' | 'avatars' | 'profile_photos' = 'logos',
  fileName?: string,
): Promise<string> {
  // Determine dimensions based on bucket
  let maxWidth: number, maxHeight: number
  switch (bucket) {
    case 'logos':
      maxWidth = 300
      maxHeight = 300
      break
    case 'avatars':
      maxWidth = 150
      maxHeight = 150
      break
    case 'profile_photos':
      maxWidth = 600
      maxHeight = 600
      break
    default:
      maxWidth = 800
      maxHeight = 800
  }

  // Compress the image
  const compressedFile = await compressImage(file, maxWidth, maxHeight)

  // Generate a unique path
  const filePath = fileName || `${Date.now()}-${compressedFile.name}`

  // Upload the file
  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, compressedFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  // Get the public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return urlData.publicUrl
}
