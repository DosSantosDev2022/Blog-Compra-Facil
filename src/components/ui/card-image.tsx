import React, { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Badge } from './badge'
import {
	Avatar,
	AvatarContainer,
	AvatarLabel,
	AvatarName,
	AvatarWrapper,
} from './avatar'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

interface CardImageProps {
	image: string
	title?: string
	description?: string
	authorName?: string
	authorImage?: string
	createdAt?: string
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
				'text-lg font-bold leading-tight text-primary-foreground',
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
		{
			className,
			image,
			title,
			description,
			authorName,
			authorImage,
			createdAt,
			category,
			...props
		},
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
					<div className='flex flex-col items-center space-y-6'>
						<AvatarContainer>
							<Avatar name={authorName} src={authorImage || ''} />
							<AvatarWrapper>
								<AvatarName>{authorName}</AvatarName>
								<AvatarLabel>{createdAt}</AvatarLabel>
							</AvatarWrapper>
						</AvatarContainer>
					</div>
				</div>
			</div>
		)
	},
)

CardImage.displayName = 'CardImage'

export { CardImage }
