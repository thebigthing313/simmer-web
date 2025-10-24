import { forwardRef, useCallback, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { uploadPhoto } from "@/db/storage/upload-utils";
import { cn } from "@/lib/utils";

/**
 * Props for the PhotoInput component.
 * @typedef {Object} PhotoInputProps
 * @property {string} [label] - The label for the input.
 * @property {string} [description] - Description text.
 * @property {Array<{ message?: string }>} [errors] - Error messages.
 * @property {string} [id] - Optional id for the input.
 * @property {string} [className] - Additional class names for the container.
 * @property {string|null} [value] - The URL of the selected photo.
 * @property {(url: string|null) => void} onChange - Callback when URL changes.
 * @property {'logos'|'avatars'|'profile_photos'} [bucket] - The storage bucket for the photo.
 * @property {string} [fileName] - Optional custom file name for the uploaded photo.
 * @property {boolean} [isValid] - Whether the field is valid.
 * @property {boolean} [isLoading] - Whether the field is loading.
 */
type PhotoInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "value" | "onChange"
> & {
  label?: string;
  description?: string;
  errors?: Array<{ message?: string } | undefined>;
  id?: string;
  className?: string;
  value?: string | null;
  onChange: (url: string | null) => void;
  bucket?: "logos" | "avatars" | "profile_photos";
  fileName?: string;
  isValid?: boolean;
  isLoading?: boolean;
};

/**
 * PhotoInput component allows users to upload a photo via drag-and-drop or file picker.
 * Supports JPG and PNG files.
 *
 * @param {PhotoInputProps} props - The props for the component.
 * @param {React.Ref<HTMLInputElement>} ref - Ref to the input element.
 * @returns {JSX.Element}
 */
export const PhotoInput = forwardRef<HTMLInputElement, PhotoInputProps>(
  (
    {
      label,
      description,
      errors,
      id: idProp,
      className,
      onChange,
      value,
      bucket = "logos",
      fileName,
      isValid = true,
      isLoading,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Sets both the local and forwarded refs.
     * @param {HTMLInputElement} node
     */
    const setRefs = useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
      },
      [ref],
    );

    /**
     * Handles file input change event.
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files && e.target.files[0];
      if (file) {
        await uploadFile(file);
      }
    }

    /**
     * Handles file drop event.
     * @param {React.DragEvent<HTMLDivElement>} e
     */
    async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];

      if (file.type === "image/jpeg" || file.type === "image/png") {
        await uploadFile(file);
      }
    }

    /**
     * Uploads the file to Supabase and updates the value.
     * @param {File} file
     */
    async function uploadFile(file: File) {
      setUploading(true);
      setUploadError(null);
      try {
        const url = await uploadPhoto(file, bucket, fileName);
        onChange(url);
      } catch (error) {
        setUploadError(
          error instanceof Error ? error.message : "Upload failed",
        );
      } finally {
        setUploading(false);
      }
    }

    /**
     * Handles drag over event.
     * @param {React.DragEvent<HTMLDivElement>} e
     */
    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      setDragActive(true);
    }

    /**
     * Handles drag leave event.
     * @param {React.DragEvent<HTMLDivElement>} e
     */
    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      setDragActive(false);
    }

    /**
     * Triggers the file input click.
     */
    function handleBrowseClick() {
      inputRef.current?.click();
    }

    return (
      <Field data-invalid={!isValid} className={className}>
        <FieldContent>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>

        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-full min-h-[180px] rounded-md border-3 border-dashed transition-colors cursor-pointer",
            dragActive ? "border-primary bg-muted/30" : "border-primary/15",
          )}
          tabIndex={0}
          onClick={handleBrowseClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          aria-invalid={!isValid}
        >
          <input
            id={id}
            ref={setRefs}
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleChange}
            tabIndex={-1}
            {...Object.fromEntries(
              Object.entries(rest).filter(([k]) => k !== "value"),
            )}
          />

          {value ? (
            <PhotoPreview url={value} />
          ) : uploading ? (
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <span className="text-muted-foreground">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <span className="text-muted-foreground">
                Drag and drop your JPG or PNG file or...
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
                disabled={uploading}
              >
                Browse for file
              </Button>
            </div>
          )}
        </div>
        {uploadError && (
          <p className="text-sm text-destructive">{uploadError}</p>
        )}
        {errors && <FieldError errors={errors} />}
      </Field>
    );
  },
);
PhotoInput.displayName = "PhotoInput";

/**
 * Props for the PhotoPreview component.
 * @typedef {Object} PhotoPreviewProps
 * @property {string|null} url - The URL of the photo to preview.
 */
interface PhotoPreviewProps {
  url: string | null;
}

/**
 * Renders a preview of the selected photo URL.
 * @param {PhotoPreviewProps} props

 */
function PhotoPreview({ url }: PhotoPreviewProps) {
  if (!url) return null;
  return (
    <img
      className="object-cover rounded-md w-full h-full max-h-[320px] max-w-[320px]"
      src={url}
      alt="Preview"
    />
  );
}
