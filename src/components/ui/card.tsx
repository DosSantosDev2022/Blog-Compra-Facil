import React from 'react'
import { twMerge } from 'tailwind-merge'

const Card = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={twMerge(
				'space-y-3 rounded-lg border border-border bg-background p-4 shadow-sm',
				className,
			)}
			{...props}
		/>
	)
})

Card.displayName = 'Card'

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={twMerge('flex flex-col space-y-1.5', className)}
		{...props}
	/>
))

CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentPropsWithoutRef<'h3'>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={twMerge(
			'text-2xl font-semibold leading-none tracking-tight text-primary',
			className,
		)}
		{...props}
	/>
))

CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={twMerge('text-sm text-muted-foreground', className)}
		{...props}
	/>
))

CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={twMerge('flex flex-col items-start', className)}
		{...props}
	/>
))

CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={twMerge('flex items-center gap-2 sm:gap-3', className)}
		{...props}
	/>
))

CardFooter.displayName = 'CardFooter'

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
}
