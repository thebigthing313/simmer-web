import { Bold, Italic, Link, Underline } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import { InputGroup, InputGroupAddon, InputGroupText } from '../ui/input-group';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { TextInput } from './text-input';

interface StylableTextAreaInputProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	className?: string;
	value?: string;
	onChange?: (e: { target: { value: string } }) => void;
}
export const StylableTextAreaInput = forwardRef<
	HTMLDivElement,
	StylableTextAreaInputProps
>(({ className, value, onChange, ...props }, ref) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [activeStyles, setActiveStyles] = useState<string[]>([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [savedRange, setSavedRange] = useState<Range | null>(null);

	// Determines the active styles (bold, italic, underline, link) based on the current text selection.
	// Traverses the DOM to find if the selection is within styled elements.
	const getCurrentStyles = useCallback(() => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return [];
		const range = selection.getRangeAt(0);
		const styles: string[] = [];
		let element = range.commonAncestorContainer as HTMLElement;
		if (element.nodeType === Node.TEXT_NODE && element.parentElement)
			element = element.parentElement;
		if (element?.closest('b')) styles.push('b');
		if (element?.closest('i')) styles.push('i');
		if (element?.closest('u')) styles.push('u');
		if (element?.closest('a')) styles.push('a');
		return styles;
	}, []);

	// Listens for selection changes to update activeStyles state, enabling toolbar buttons to reflect current selection.
	useEffect(() => {
		const handleSelectionChange = () => {
			setActiveStyles(getCurrentStyles());
		};
		document.addEventListener('selectionchange', handleSelectionChange);
		return () =>
			document.removeEventListener('selectionchange', handleSelectionChange);
	}, [getCurrentStyles]);

	// Removes a specific style tag from the selected text by unwrapping the element and preserving the text content.
	const removeStyle = (tag: string) => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;
		const range = selection.getRangeAt(0);
		let element = range.commonAncestorContainer as HTMLElement;
		if (element.nodeType === Node.TEXT_NODE && element.parentElement)
			element = element.parentElement;
		const styledElement = element?.closest(tag) as HTMLElement;
		if (styledElement) {
			const text = styledElement.textContent || '';
			const textNode = document.createTextNode(text);
			styledElement.replaceWith(textNode);
			range.selectNodeContents(textNode);
			selection.removeAllRanges();
			selection.addRange(range);
		}
		handleInput();
		divRef.current?.focus();
	};

	// Handles attaching a link URL to the previously selected text range, restoring the selection and applying the link style.
	const handleAttachLink = (url: string) => {
		if (url.trim() && savedRange) {
			const selection = window.getSelection();
			if (selection) {
				selection.removeAllRanges();
				selection.addRange(savedRange);
				applyStyle('a', url.trim());
			}
		}
		setDialogOpen(false);
		setSavedRange(null);
	};

	// Manages toggling of styles via the toolbar: adds new styles or removes deselected ones, handling link specially with a dialog.
	const handleToggleChange = (newValues: string[]) => {
		const added = newValues.filter((v) => !activeStyles.includes(v));
		const removed = activeStyles.filter((v) => !newValues.includes(v));
		added.forEach((tag) => {
			if (tag === 'a') {
				const selection = window.getSelection();
				if (selection && selection.rangeCount > 0) {
					setSavedRange(selection.getRangeAt(0).cloneRange());
				}
				setDialogOpen(true);
			} else {
				applyStyle(tag);
			}
		});
		removed.forEach((tag) => {
			removeStyle(tag);
		});
		setActiveStyles(newValues);
	};

	// Sanitizes HTML input to allow only specific tags (b, i, u, a, br), converting block elements to line breaks and unwrapping disallowed elements.
	// Prevents XSS and maintains clean, editable content.
	const cleanHTML = (html: string) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		// Check if body exists
		if (!doc.body) {
			return '';
		}

		const allowedTags = ['b', 'i', 'u', 'a', 'br'];

		// First pass: convert block elements to text + br
		const blockElements = Array.from(
			doc.body.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6'),
		);
		blockElements.forEach((el) => {
			// Add a line break before replacing
			const br = doc.createElement('br');
			el.parentNode?.insertBefore(br, el);
		});

		// Second pass: unwrap all non-allowed elements
		const elements = Array.from(doc.body.querySelectorAll('*'));
		elements.forEach((el) => {
			const tag = el.tagName.toLowerCase();
			if (!allowedTags.includes(tag)) {
				// Instead of removing, unwrap the element (keep its content)
				const parent = el.parentNode;
				if (parent && parent !== doc) {
					// Create a document fragment to hold the children
					const fragment = doc.createDocumentFragment();
					while (el.firstChild) {
						fragment.appendChild(el.firstChild);
					}
					// Replace the element with its children
					parent.replaceChild(fragment, el);
				}
			} else {
				el.removeAttribute('style');
			}
		});

		// Get the cleaned HTML
		let cleaned = doc.body?.innerHTML ?? '';

		// Clean up excessive line breaks
		cleaned = cleaned.replace(/(<br\s*\/?>){3,}/gi, '<br><br>');
		// Remove leading/trailing breaks
		cleaned = cleaned.replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/gi, '');

		return cleaned;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <cleanHTML does not need to be in deps>
	useEffect(() => {
		const div = divRef.current;

		// Ensure div is available and value is defined before proceeding.
		if (!div || value === undefined) {
			return;
		}

		const cleanedNewValue = cleanHTML(String(value));
		const currentCleanedValue = cleanHTML(div.innerHTML);

		// Only update innerHTML if the cleaned values actually differ
		// This prevents cursor jumping when user is typing
		if (currentCleanedValue !== cleanedNewValue) {
			div.innerHTML = cleanedNewValue;
		}
	}, [value]);

	// Triggers the onChange callback with the cleaned HTML content whenever the user edits the text.
	const handleInput = () => {
		if (!divRef.current) return;
		if (onChange) {
			const cleanedValue = cleanHTML(divRef.current.innerHTML);
			onChange({
				target: { value: cleanedValue },
				currentTarget: { value: cleanedValue },
			} as React.ChangeEvent<HTMLTextAreaElement>);
		}
	};

	// Handles paste events by inserting plain text only, preventing rich content and maintaining clean HTML.
	const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.deleteContents();
			const textNode = document.createTextNode(text);
			range.insertNode(textNode);
			range.setStartAfter(textNode);
			range.setEndAfter(textNode);
			selection.removeAllRanges();
			selection.addRange(range);
		}
		handleInput();
		divRef.current?.focus();
	};

	// Applies a style (tag) to the currently selected text, wrapping it in the appropriate HTML element and updating the selection.
	const applyStyle = (tag: string, url?: string) => {
		const div = divRef.current;
		if (!div) return;

		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const range = selection.getRangeAt(0);
		const selectedText = range.toString();
		if (!selectedText) return;

		let element: HTMLElement;
		if (tag === 'a') {
			if (!url) return;
			element = document.createElement('a');
			element.setAttribute('href', url);
			element.setAttribute('target', '_blank');
		} else {
			element = document.createElement(tag);
		}
		element.textContent = selectedText;

		range.deleteContents();
		range.insertNode(element);

		// Move cursor after the inserted element
		range.setStartAfter(element);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);

		// Trigger onChange
		handleInput();
		div.focus();
	};

	// Renders the component: a contentEditable div for text input, styled with CSS, and a toolbar for applying styles via ToggleGroup.
	// Includes a dialog for link insertion.
	return (
		<>
			<style>
				{`
					.stylable-textarea a {
						color: #3b82f6;
						text-decoration: underline;
					}
					.stylable-textarea a:hover {
						color: #2563eb;
					}
				`}
			</style>
			<InputGroup className={className}>
				<div
					ref={(el) => {
						divRef.current = el;
						if (ref) {
							if (typeof ref === 'function') {
								ref(el);
							} else {
								(ref as React.RefObject<HTMLDivElement | null>).current = el;
							}
						}
					}}
					contentEditable
					className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 min-h-16 w-full rounded-none border-0 bg-transparent py-3 text-base shadow-none transition-[color,box-shadow] outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none p-4 text-left stylable-textarea"
					onInput={handleInput}
					onPaste={handlePaste}
					{...props}
				/>
				<InputGroupAddon className="border-b" align="block-start">
					<InputGroupText>Styling</InputGroupText>
					<ToggleGroup
						variant="outline"
						type="multiple"
						value={activeStyles}
						onValueChange={handleToggleChange}
					>
						<ToggleGroupItem value="b" aria-label="Toggle bold">
							<Bold />
						</ToggleGroupItem>
						<ToggleGroupItem value="i" aria-label="Toggle italic">
							<Italic />
						</ToggleGroupItem>
						<ToggleGroupItem value="u" aria-label="Toggle underline">
							<Underline />
						</ToggleGroupItem>
						<ToggleGroupItem value="a" aria-label="Toggle link">
							<Link />
						</ToggleGroupItem>
					</ToggleGroup>
				</InputGroupAddon>
				<URLDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					onAttach={handleAttachLink}
				/>
			</InputGroup>
		</>
	);
});

interface URLDialogProps {
	onAttach: (url: string) => void;
}

function URLDialog({
	open,
	onOpenChange,
	onAttach,
}: URLDialogProps & React.ComponentPropsWithoutRef<typeof Dialog>) {
	const [url, setUrl] = useState('');

	useEffect(() => {
		if (!open) setUrl('');
	}, [open]);

	const handleAttach = () => {
		if (!url.trim()) return;
		onAttach(url);
		setUrl('');
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Insert Link</DialogTitle>
					<DialogDescription>Enter the URL for the link.</DialogDescription>
				</DialogHeader>
				<TextInput
					type="text"
					placeholder="https://example.com"
					showPaste
					showClear
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<DialogFooter>
					<Button variant="default" onClick={handleAttach}>
						Attach Link
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
