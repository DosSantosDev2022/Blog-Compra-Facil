import React, { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardImageProps {
	image: string
	title?: string
	description?: string
}

const CardTitle = React.forwardRef<
	HTMLHeadingElement,
	ComponentProps<'h3'> & { label: string }
>(({ className, label, ...props }, ref) => {
	return (
		<h3
			ref={ref}
			{...props}
			className={twMerge(
				'text-2xl font-bold leading-tight text-secondary-foreground',
				className,
			)}
		>
			{label}
		</h3>
	)
})

CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	ComponentProps<'p'> & { label: string }
>(({ className, label, ...props }, ref) => {
	return (
		<p
			ref={ref}
			{...props}
			className={twMerge(
				'text-base font-normal leading-tight text-accent-foreground lg:text-lg',
				className,
			)}
		>
			{label}
		</p>
	)
})

CardDescription.displayName = 'CardDescription'

const CardImage = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CardImageProps
>(({ className, image, title, description, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={twMerge(
				'group relative overflow-hidden rounded-2xl p-0 shadow-sm',
				'',
				className,
			)}
			{...props}
		>
			{/* Imagem de fundo com efeito hover */}
			<div
				className={twMerge(
					'flex h-full flex-col justify-end gap-3 p-4',
					' transform transition-transform duration-300 ease-in group-hover:scale-105',
					'rounded-md bg-cover bg-center bg-no-repeat',
				)}
				style={{ backgroundImage: `url(${image})` }}
			/>
			{/* Gradiente sobre a imagem */}
			<div className='absolute inset-0 bg-gradient-to-t from-secondary' />

			{/* Conteúdo */}
			<div className='absolute inset-0 flex flex-col justify-end gap-2 p-4'>
				<CardTitle label={title || ''} />
				<CardDescription className='text-xs' label={description || ''} />
			</div>
		</div>
	)
})

CardImage.displayName = 'CardImage'

export { CardImage }
