'use client'

import React, { useState, type ComponentPropsWithRef } from 'react'
import { twMerge } from 'tailwind-merge'

const AvatarContainer = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={twMerge('flex w-full items-start space-x-2', className)}
		{...props}
	/>
))
AvatarContainer.displayName = 'AvatarContainer'

const AvatarWrapper = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={twMerge('grid flex-1 text-left leading-tight', className)}
		{...props}
	/>
))
AvatarWrapper.displayName = 'AvatarWrapper'

const AvatarName = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithRef<'span'>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={twMerge(
			'truncate text-sm font-semibold text-primary-foreground ',
			className,
		)}
		{...props}
	/>
))
AvatarName.displayName = 'AvatarName'

const AvatarLabel = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithRef<'span'>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={twMerge(
			'truncate text-xs font-normal text-primary-foreground ',
			className,
		)}
		{...props}
	/>
))
AvatarLabel.displayName = 'AvatarLabel'

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
	src?: string
	name?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	({ className, src, name = '?', ...props }, ref) => {
		const [hasError, setHasError] = useState(false)

		return (
			<div
				ref={ref}
				className={twMerge(
					'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
					className,
				)}
				{...props}
			>
				{!hasError && src ? (
					<img
						src={src}
						alt={name}
						className='aspect-square h-full w-full object-cover'
						onError={() => setHasError(true)}
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center rounded-full bg-muted-foreground text-white font-medium'>
						{name.charAt(0).toUpperCase()}
					</div>
				)}
			</div>
		)
	},
)
Avatar.displayName = 'Avatar'

export { Avatar, AvatarContainer, AvatarWrapper, AvatarName, AvatarLabel }
