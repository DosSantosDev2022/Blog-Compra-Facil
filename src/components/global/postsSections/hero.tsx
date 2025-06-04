import { CardImage } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Article } from '@/@types/hygraphTypes'

interface HeroSectionProps {
	highlightArticles: Article[]
}

const HeroSection = async ({ highlightArticles }: HeroSectionProps) => {
	return (
		<section aria-label='Posts em destaque' className='mt-8'>
			<SectionTitle title='Posts em destaque' />
			<div className='flex flex-col lg:flex-row gap-4 w-full  p-2 mt-6'>
				{/* Renderiza o primeiro post com destaque */}
				<div className='w-full h-72 lg:h-auto'>
					{highlightArticles[0] && ( // Garante que há pelo menos um artigo
						<Link
							href={`/article/${highlightArticles[0].slug}`}
							key={highlightArticles[0].id}
							className='lg:col-span-2'
						>
							<CardImage
								image={
									highlightArticles[0].coverImage?.url ||
									'https://placehold.co/600x400'
								}
								title={highlightArticles[0].title}
								category={highlightArticles[0].category?.name}
								authorImage={highlightArticles[0].author?.image.url}
								authorName={highlightArticles[0].author.name}
								createdAt={format(
									highlightArticles[0]?.createdAt || '',
									'dd/MM/yyyy',
									{
										locale: ptBR,
									},
								)}
								className={'h-full'} // Use h-full para o card maior preencher a altura
							/>
						</Link>
					)}
				</div>

				{/* Renderiza os posts restantes */}
				<div className='w-full grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 h-auto overflow-y-scroll max-h-[628px] scrollbar-custom'>
					{highlightArticles.slice(1, 12).map((article) => (
						<Link
							href={`/article/${article.slug}`}
							key={article.id}
							className='lg:col-span-1'
						>
							<CardImage
								image={
									article.coverImage?.url || 'https://placehold.co/600x400'
								}
								title={article.title}
								category={article.category?.name || ''}
								authorImage={article.author?.image.url}
								authorName={article.author.name || ''}
								createdAt={format(article.createdAt || '', 'dd/MM/yyyy', {
									locale: ptBR,
								})}
								className={'h-74'}
							/>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}

export { HeroSection }
