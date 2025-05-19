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
				'flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm max-w-xl lg:w-xs',
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
		className={twMerge('flex flex-col space-y-2 mb-4', className)}
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
			'lg:text-lg text-base font-semibold leading-tight tracking-tight text-primary dark:text-primary-foreground',
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
		className={twMerge('text-sm text-muted-foreground mt-1', className)}
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
		className={twMerge('flex flex-col space-y-4 py-4', className)}
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
		className={twMerge('flex items-center gap-2 sm:gap-3 mt-4', className)}
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
