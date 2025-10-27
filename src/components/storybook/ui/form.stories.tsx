import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { Textarea } from '../../ui/textarea';

const meta: Meta = {
	title: 'UI/Form',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A form component built on react-hook-form with validation and accessibility features.\n\n**Theming classes applied:**\n\n**FormItem:**\n- `grid` → Uses CSS grid layout.\n- `gap-2` → Adds gap between grid items.\n\n**FormLabel:**\n- `data-[error=true]:text-destructive` → Sets destructive text color when field has error.\n\n**FormDescription:**\n- `text-muted-foreground` → Sets muted text color.\n- `text-sm` → Sets small text size.\n\n**FormMessage:**\n- `text-destructive` → Sets destructive text color.\n- `text-sm` → Sets small text size.',
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

const profileSchema = z.object({
	username: z.string().min(2, 'Username must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	bio: z.string().max(160, 'Bio must not exceed 160 characters').optional(),
	notifications: z.boolean().default(false),
	theme: z.enum(['light', 'dark', 'system']),
	country: z.string().min(1, 'Please select a country'),
});

function LoginForm() {
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
							</FormControl>
							<FormDescription>
								We'll never share your email with anyone else.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Your password must be at least 6 characters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

function ProfileForm() {
	const form = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			username: '',
			email: '',
			bio: '',
			notifications: false,
			theme: 'light' as const,
			country: '',
		},
	});

	function onSubmit(values: z.infer<typeof profileSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="johndoe" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="john@example.com" {...field} />
							</FormControl>
							<FormDescription>
								We'll use this email for account notifications.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us about yourself..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								You can write up to 160 characters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="notifications"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Email notifications</FormLabel>
								<FormDescription>
									Receive email notifications about your account activity.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Theme</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a theme" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">System</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>Choose your preferred theme.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a country" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="us">United States</SelectItem>
									<SelectItem value="ca">Canada</SelectItem>
									<SelectItem value="uk">United Kingdom</SelectItem>
									<SelectItem value="de">Germany</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Select your country of residence.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update profile</Button>
			</form>
		</Form>
	);
}

export const Login: Story = {
	render: () => <LoginForm />,
};

export const Profile: Story = {
	render: () => <ProfileForm />,
};

export const WithErrors: Story = {
	render: () => {
		const form = useForm({
			resolver: zodResolver(loginSchema),
			defaultValues: {
				email: 'invalid-email',
				password: '123',
			},
		});

		// Trigger validation on mount
		React.useEffect(() => {
			form.trigger();
		}, [form]);

		function onSubmit(values: z.infer<typeof loginSchema>) {
			console.log(values);
		}

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Enter your email" {...field} />
								</FormControl>
								<FormDescription>
									We'll never share your email with anyone else.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Your password must be at least 6 characters.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		);
	},
};
