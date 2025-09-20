/**
 * @file card-simple.tsx
 * @description Componente de card simples para posts, exibindo imagem, título e informações do autor.
 */

import { Badge, CardContent } from '@/components/ui'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export interface CardSimpleProps {
	id: string
	title: string
	alt: string
	coverImage: string
	slug: string
	createdAt: string
	authorName: string
	authorImage: string
	category?: string
}

const CardSimple = ({
	alt,
	coverImage,
	title,
	slug,
	createdAt,
	authorImage,
	authorName,
	category,
}: CardSimpleProps) => {
	return (
		<Link
			href={`/article/${slug}`}
			className={twMerge(
				'group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:shadow-lg',
			)}
		>
			{/* Imagem do Card */}
			<div className="relative h-48 w-full">
				<Image
					src={coverImage}
					alt={alt}
					fill
					className="rounded-t-2xl object-cover transition-transform duration-500 group-hover:scale-105"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				{category && (
					<div className="absolute left-4 top-4 z-10">
						<Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
							{category}
						</Badge>
					</div>
				)}
			</div>

			{/* Conteúdo do Card */}
			<CardContent className="flex flex-1 flex-col p-4">
				<h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
					{title}
				</h3>
				<span className="mt-2 text-sm text-muted-foreground">
					Publicado em: {format(new Date(createdAt), 'dd/MM/yyyy', { locale: ptBR })}
				</span>
				<div className="mt-auto flex items-center gap-3 pt-4">
					<Image
						src={authorImage}
						alt={authorName}
						width={32}
						height={32}
						className="h-8 w-8 rounded-full object-cover"
					/>
					<span className="text-sm font-medium text-muted-foreground">{authorName}</span>
				</div>
			</CardContent>
		</Link>
	)
}

export { CardSimple }

