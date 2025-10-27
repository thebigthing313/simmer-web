/** biome-ignore-all lint/correctness/useUniqueElementIds: <storybook> */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../ui/checkbox';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from '../../ui/field';
import { Input } from '../../ui/input';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Textarea } from '../../ui/textarea';

const meta = {
	title: 'UI/Field',
	component: Field,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A field component for form inputs with labels, descriptions, and error states.\n\n**Theming classes applied:**\n\n**FieldSet:**\n- `flex` → Displays as flex container.\n- `flex-col` → Arranges children vertically.\n- `gap-6` → Adds gap between children.\n- `has-[>[data-slot=checkbox-group]]:gap-3` → Reduces gap when containing checkbox groups.\n- `has-[>[data-slot=radio-group]]:gap-3` → Reduces gap when containing radio groups.\n\n**FieldLegend:**\n- `mb-3` → Adds bottom margin.\n- `font-medium` → Applies medium font weight.\n- `data-[variant=legend]:text-base` → Sets base text size for legend variant.\n- `data-[variant=label]:text-sm` → Sets small text size for label variant.\n\n**FieldGroup:**\n- `group/field-group` → Creates a CSS group for styling child elements.\n- `@container/field-group` → Creates a container query context.\n- `flex` → Displays as flex container.\n- `w-full` → Takes full width.\n- `flex-col` → Arranges children vertically.\n- `gap-7` → Adds gap between children.\n- `data-[slot=checkbox-group]:gap-3` → Reduces gap for checkbox groups.\n- `[&>[data-slot=field-group]]:gap-4` → Adjusts gap for nested field groups.\n\n**Field (base styles):**\n- `group/field` → Creates a CSS group for styling child elements.\n- `flex` → Displays as flex container.\n- `w-full` → Takes full width.\n- `gap-3` → Adds gap between children.\n- `data-[invalid=true]:text-destructive` → Sets destructive text color when invalid.\n\n**Field (vertical orientation):**\n- `flex-col` → Arranges children vertically.\n- `[&>*]:w-full` → Makes all children full width.\n- `[&>.sr-only]:w-auto` → Allows screen reader only elements to size naturally.\n\n**Field (horizontal orientation):**\n- `flex-row` → Arranges children horizontally.\n- `items-center` → Centers items vertically.\n- `[&>[data-slot=field-label]]:flex-auto` → Makes label take available space.\n- `has-[>[data-slot=field-content]]:items-start` → Aligns to start when content is present.\n- `has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` → Adjusts checkbox/radio position.\n\n**Field (responsive orientation):**\n- `flex-col` → Arranges children vertically by default.\n- `[&>*]:w-full` → Makes all children full width by default.\n- `[&>.sr-only]:w-auto` → Allows screen reader only elements to size naturally.\n- `@md/field-group:flex-row` → Switches to horizontal on medium screens.\n- `@md/field-group:items-center` → Centers items vertically on medium screens.\n- `@md/field-group:[&>*]:w-auto` → Allows natural sizing on medium screens.\n- `@md/field-group:[&>[data-slot=field-label]]:flex-auto` → Makes label take available space on medium screens.\n- `@md/field-group:has-[>[data-slot=field-content]]:items-start` → Aligns to start when content is present on medium screens.\n- `@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` → Adjusts checkbox/radio position on medium screens.\n\n**FieldContent:**\n- `group/field-content` → Creates a CSS group for styling child elements.\n- `flex` → Displays as flex container.\n- `flex-1` → Takes remaining space.\n- `flex-col` → Arranges children vertically.\n- `gap-1.5` → Adds gap between children.\n- `leading-snug` → Sets tight line height.\n\n**FieldLabel:**\n- `group/field-label` → Creates a CSS group for styling child elements.\n- `peer/field-label` → Creates a peer relationship for styling.\n- `flex` → Displays as flex container.\n- `w-fit` → Sizes to content.\n- `gap-2` → Adds gap between children.\n- `leading-snug` → Sets tight line height.\n- `group-data-[disabled=true]/field:opacity-50` → Reduces opacity when field is disabled.\n- `has-[>[data-slot=field]]:w-full` → Expands when containing field elements.\n- `has-[>[data-slot=field]]:flex-col` → Stacks vertically when containing field elements.\n- `has-[>[data-slot=field]]:rounded-md` → Applies border radius when containing field elements.\n- `has-[>[data-slot=field]]:border` → Adds border when containing field elements.\n- `[&>*]:data-[slot=field]:p-4` → Adds padding to contained field elements.\n- `has-data-[state=checked]:bg-primary/5` → Adds background when checked.\n- `has-data-[state=checked]:border-primary` → Changes border color when checked.\n- `dark:has-data-[state=checked]:bg-primary/10` → Adds darker background in dark mode when checked.\n\n**FieldTitle:**\n- `flex` → Displays as flex container.\n- `w-fit` → Sizes to content.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between children.\n- `text-sm` → Sets small text size.\n- `leading-snug` → Sets tight line height.\n- `font-medium` → Applies medium font weight.\n- `group-data-[disabled=true]/field:opacity-50` → Reduces opacity when field is disabled.\n\n**FieldDescription:**\n- `text-muted-foreground` → Sets muted text color.\n- `text-sm` → Sets small text size.\n- `leading-normal` → Sets normal line height.\n- `font-normal` → Applies normal font weight.\n- `group-has-[[data-orientation=horizontal]]/field:text-balance` → Balances text in horizontal orientation.\n- `last:mt-0` → Removes top margin from last element.\n- `nth-last-2:-mt-1` → Adjusts margin for second-to-last element.\n- `[[data-variant=legend]+&]:-mt-1.5` → Adjusts margin after legend.\n- `[&>a:hover]:text-primary` → Changes link color on hover.\n- `[&>a]:underline` → Underlines links.\n- `[&>a]:underline-offset-4` → Sets underline offset for links.\n\n**FieldSeparator:**\n- `relative` → Positions relatively.\n- `-my-2` → Adds negative vertical margins.\n- `h-5` → Sets height.\n- `text-sm` → Sets small text size.\n- `group-data-[variant=outline]/field-group:-mb-2` → Adjusts bottom margin for outline variant.\n\n**FieldError:**\n- `text-destructive` → Sets destructive text color.\n- `text-sm` → Sets small text size.\n- `font-normal` → Applies normal font weight.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<FieldLabel>Name</FieldLabel>
				<FieldContent>
					<Input placeholder="Enter your name" />
					<FieldDescription>This is your public display name.</FieldDescription>
				</FieldContent>
			</>
		),
	},
};

export const WithError: Story = {
	args: {
		children: (
			<>
				<FieldLabel>Email</FieldLabel>
				<FieldContent>
					<Input placeholder="Enter your email" data-invalid="true" />
					<FieldDescription>
						We'll never share your email with anyone else.
					</FieldDescription>
					<FieldError>This email address is already in use.</FieldError>
				</FieldContent>
			</>
		),
	},
};

export const Horizontal: Story = {
	args: {
		orientation: 'horizontal',
		children: (
			<>
				<FieldLabel>Accept terms</FieldLabel>
				<FieldContent>
					<div className="flex items-center space-x-2">
						<Checkbox id="field-horizontal-terms" />
						<label
							htmlFor="field-horizontal-terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Accept terms and conditions
						</label>
					</div>
					<FieldDescription>
						You agree to our Terms of Service and Privacy Policy.
					</FieldDescription>
				</FieldContent>
			</>
		),
	},
};

export const Responsive: Story = {
	args: {
		orientation: 'responsive',
		children: (
			<>
				<FieldLabel>Phone</FieldLabel>
				<FieldContent>
					<Input placeholder="(555) 123-4567" />
					<FieldDescription>
						We'll use this number for account verification.
					</FieldDescription>
				</FieldContent>
			</>
		),
	},
};

export const FieldGroupExample: Story = {
	args: {
		children: (
			<FieldGroup>
				<Field>
					<FieldLabel>First Name</FieldLabel>
					<FieldContent>
						<Input placeholder="John" />
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel>Last Name</FieldLabel>
					<FieldContent>
						<Input placeholder="Doe" />
					</FieldContent>
				</Field>
				<FieldSeparator>Or</FieldSeparator>
				<Field>
					<FieldLabel>Full Name</FieldLabel>
					<FieldContent>
						<Input placeholder="John Doe" />
					</FieldContent>
				</Field>
			</FieldGroup>
		),
	},
};

export const FieldSetExample: Story = {
	args: {
		children: (
			<FieldSet>
				<FieldLegend>Account Information</FieldLegend>
				<FieldGroup>
					<Field>
						<FieldLabel>Username</FieldLabel>
						<FieldContent>
							<Input placeholder="johndoe" />
							<FieldDescription>
								This will be your public username.
							</FieldDescription>
						</FieldContent>
					</Field>
					<Field>
						<FieldLabel>Bio</FieldLabel>
						<FieldContent>
							<Textarea placeholder="Tell us about yourself..." />
							<FieldDescription>
								Brief description for your profile.
							</FieldDescription>
						</FieldContent>
					</Field>
				</FieldGroup>
			</FieldSet>
		),
	},
};

export const RadioGroupExample: Story = {
	args: {
		children: (
			<>
				<FieldLabel>Theme</FieldLabel>
				<FieldContent>
					<RadioGroup defaultValue="light">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="light" id="light" />
							<label htmlFor="light">Light</label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="dark" id="dark" />
							<label htmlFor="dark">Dark</label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="system" id="system" />
							<label htmlFor="system">System</label>
						</div>
					</RadioGroup>
					<FieldDescription>Choose your preferred theme.</FieldDescription>
				</FieldContent>
			</>
		),
	},
};
