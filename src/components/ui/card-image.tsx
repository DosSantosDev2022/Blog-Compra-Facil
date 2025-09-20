/**
 * @file card-image.tsx
 * @description Componente de card de imagem para posts e outros conteúdos
 * com efeito de hover e informações do post.
 */
import Image from 'next/image'
import React, { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Badge } from './badge'

interface CardImageProps {
	image: string
	title?: string
	description?: string
	authorName?: string
	authorImage?: string
	createdAt?: string
	category?: string
	alt: string
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
				'line-clamp-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-primary lg:text-xl',
				className,
			)}
		>
			{label}
		</h3>
	)
})

CardTitle.displayName = 'CardTitle'

const CardImage = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CardImageProps
>(
	(
		{
			className,
			image,
			title,
			authorName,
			authorImage,
			createdAt,
			category,
			alt,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={twMerge(
					'group relative w-full overflow-hidden rounded-3xl p-0 shadow-xl transition-all duration-300 hover:shadow-2xl',
					className,
				)}
				{...props}
			>
				{/* Imagem de fundo com efeito de zoom */}
				<div className="relative h-full w-full">
					<Image
						src={image}
						alt={alt}
						fill
						className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				{/* Gradiente sobre a imagem para escurecer o fundo e aumentar a legibilidade do texto */}
				<div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-t from-gray-950/80 to-transparent p-6" />

				{/* Conteúdo do Card */}
				<div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
					{category && (
						<div className="mb-2">
							<Badge
								variant="secondary"
								className="backdrop-blur-sm"
							>
								{category}
							</Badge>
						</div>
					)}
					<CardTitle label={title || ''} />
					{/* Informações de Autor e Data */}
					<div className="mt-2 flex items-center justify-between text-white/70">
						<div className="flex items-center gap-2">
							{authorImage && (
								<Image
									src={authorImage}
									alt={authorName || 'Author'}
									width={24}
									height={24}
									className="h-6 w-6 rounded-full object-cover"
								/>
							)}
							{authorName && (
								<span className="text-sm font-medium">{authorName}</span>
							)}
						</div>
						{createdAt && (
							<span className="text-xs">{createdAt}</span>
						)}
					</div>
				</div>
			</div>
		)
	},
)

CardImage.displayName = 'CardImage'

export { CardImage, type CardImageProps }

