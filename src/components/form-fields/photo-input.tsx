import { useId, forwardRef, useRef, useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FieldInfo } from '@/components/blocks/field-info';
import { cn } from '@/lib/utils';

/**
 * Props for the PhotoInput component.
 * @typedef {Object} PhotoInputProps
 * @property {string} [label] - The label for the input.
 * @property {string|string[]} [errorMsg] - Error message(s) to display.
 * @property {string|string[]} [helperMsg] - Helper message(s) to display.
 * @property {string} [id] - Optional id for the input.
 * @property {string} [className] - Additional class names for the container.
 * @property {File|null} [value] - The selected file.
 * @property {(file: File|null) => void} onChange - Callback when file changes.
 */
type PhotoInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'type' | 'value' | 'onChange'
> & {
  label?: string;
  errorMsg?: string | string[];
  helperMsg?: string | string[];
  id?: string;
  className?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
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
      errorMsg,
      helperMsg,
      id: idProp,
      className,
      onChange,
      value,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp || generatedId;
    const hasHelper = helperMsg && !errorMsg;
    const hasError = !!errorMsg;
    const descIds =
      [hasHelper ? `${id}-helper` : null, hasError ? `${id}-error` : null]
        .filter(Boolean)
        .join(' ') || undefined;

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Sets both the local and forwarded refs.
     * @param {HTMLInputElement} node
     */
    const setRefs = useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
      },
      [ref]
    );

    /**
     * Handles file input change event.
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file =
        e.target.files && e.target.files[0] ? e.target.files[0] : null;
      onChange(file); // Call the parent's onChange directly with the File object
    }

    /**
     * Handles file drop event.
     * @param {React.DragEvent<HTMLDivElement>} e
     */
    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      setDragActive(false);
      const file =
        e.dataTransfer.files && e.dataTransfer.files[0] ?
          e.dataTransfer.files[0]
        : null;

      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        onChange(file); // Call the parent's onChange directly
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
      <div className={cn('flex flex-col gap-2', className)}>
        {label && (
          <Label htmlFor={id} className='w-full'>
            {label}
          </Label>
        )}
        <div
          className={cn(
            'relative flex flex-col items-center justify-center w-full h-full min-h-[180px] rounded-md border-3 border-dashed transition-colors cursor-pointer',
            dragActive ? 'border-primary bg-muted/30' : 'border-primary/15'
          )}
          tabIndex={0}
          onClick={handleBrowseClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          aria-describedby={descIds}
          aria-invalid={!!errorMsg}
        >
          <input
            id={id}
            ref={setRefs}
            type='file'
            accept='image/jpeg, image/png'
            className='hidden'
            onChange={handleChange}
            tabIndex={-1}
            {...Object.fromEntries(
              Object.entries(rest).filter(([k]) => k !== 'value')
            )}
          />

          {value ?
            <PhotoPreview file={value} />
          : <div className='flex flex-col items-center gap-2 text-center px-4'>
              <span className='text-muted-foreground'>
                Drag and drop your JPG or PNG file or...
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
              >
                Browse for file
              </Button>
            </div>
          }
        </div>
        <FieldInfo helperMsg={helperMsg} errorMsg={errorMsg} />
      </div>
    );
  }
);
PhotoInput.displayName = 'PhotoInput';

/**
 * Props for the PhotoPreview component.
 * @typedef {Object} PhotoPreviewProps
 * @property {File|null} file - The file to preview.
 */
interface PhotoPreviewProps {
  file: File | null;
}

/**
 * Renders a preview of the selected photo file.
 * @param {PhotoPreviewProps} props
 * @returns {JSX.Element|null}
 */
function PhotoPreview({ file }: PhotoPreviewProps) {
  if (!file) return null;
  return (
    <img
      className='object-cover rounded-md w-full h-full max-h-[320px] max-w-[320px]'
      src={URL.createObjectURL(file)}
      alt='Preview'
    />
  );
}
