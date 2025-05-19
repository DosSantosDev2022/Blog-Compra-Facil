import React, { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Badge } from './badge'

interface CardImageProps {
	image: string
	title?: string
	description?: string
	label?: string
	category?: string
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
				'text-xl font-bold leading-tight text-primary-foreground',
				className,
			)}
		>
			{label}
		</h3>
	)
})

CardTitle.displayName = 'CardTitle'

const CardLabel = React.forwardRef<
	HTMLParagraphElement,
	ComponentProps<'span'> & { label: string }
>(({ className, label, ...props }, ref) => {
	return (
		<span
			ref={ref}
			{...props}
			className={twMerge(
				'text-sm font-light leading-tight text-muted dark:text-primary-foreground lg:text-base',
				className,
			)}
		>
			{label}
		</span>
	)
})

CardLabel.displayName = 'CardLabel'

const CardImage = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CardImageProps
>(
	(
		{ className, image, title, description, label, category, ...props },
		ref,
	) => {
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
				<div className='absolute inset-0 bg-gradient-to-t from-primary/75' />

				{/* Conteúdo */}
				<div className='absolute inset-0 flex flex-col justify-end gap-2 p-4'>
					<div>
						<Badge size='md'>{category}</Badge>
					</div>
					<CardTitle label={title || ''} />
					<CardLabel label={label || ''} />
				</div>
			</div>
		)
	},
)

CardImage.displayName = 'CardImage'

export { CardImage }
