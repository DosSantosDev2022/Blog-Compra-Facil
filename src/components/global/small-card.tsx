/**
 * @file small-card.tsx
 * @description Componente de card pequeno para posts, exibindo título e uma breve descrição.
 */

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { LuArrowRight } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

export interface SmallCardProps {
	title?: string
	description?: string
	slug?: string
}

const SmallCard = ({ description, slug, title }: SmallCardProps) => {
	return (
		<Link href={`/article/${slug}`} className="block">
			<Card
				className={twMerge(
					'group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-background/50 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-background hover:shadow-lg',
				)}
			>
				<CardContent className="flex flex-1 flex-col justify-between p-4">
					<h3 className="line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary lg:text-lg">
						{title}
					</h3>
					<p className="line-clamp-3 pt-2 text-sm text-muted-foreground">
						{description}
					</p>
					<div className="mt-4 flex items-center justify-end text-sm font-medium text-muted-foreground">
						<span className="pr-1">Ler mais</span>
						<LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}

export { SmallCard }

