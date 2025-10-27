import type React from 'react';
import { cn } from '@/lib/utils';

function H1({ className, children }: React.ComponentPropsWithRef<'h1'>) {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				className,
			)}
		>
			{children}
		</h1>
	);
}

function H2({ className, children }: React.ComponentPropsWithRef<'h2'>) {
	return (
		<h2
			className={cn(
				'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
				className,
			)}
		>
			{children}
		</h2>
	);
}

function H3({ className, children }: React.ComponentPropsWithRef<'h3'>) {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-2xl font-semibold tracking-tight',
				className,
			)}
		>
			{children}
		</h3>
	);
}

function H4({ className, children }: React.ComponentPropsWithRef<'h4'>) {
	return (
		<h4
			className={cn(
				'scroll-m-20 text-xl font-semibold tracking-tight',
				className,
			)}
		>
			{children}
		</h4>
	);
}

function P({ className, children }: React.ComponentPropsWithRef<'p'>) {
	return (
		<p className={cn('leading-7 not-first:mt-6', className)}>{children}</p>
	);
}

function Blockquote({
	className,
	children,
}: React.ComponentPropsWithRef<'blockquote'>) {
	return (
		<blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
			{children}
		</blockquote>
	);
}

function InlineCode({
	className,
	children,
}: React.ComponentPropsWithRef<'code'>) {
	return (
		<code
			className={cn(
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
				className,
			)}
		>
			{children}
		</code>
	);
}

function Lead({ className, children }: React.ComponentPropsWithRef<'p'>) {
	return (
		<p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
	);
}

function Large({ className, children }: React.ComponentPropsWithRef<'div'>) {
	return (
		<div className={cn('text-lg font-semibold', className)}>{children}</div>
	);
}

function Muted({ className, children }: React.ComponentPropsWithRef<'p'>) {
	return (
		<p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
	);
}

export { H1, H2, H3, H4, P, Lead, Large, Muted, Blockquote, InlineCode };
