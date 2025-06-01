import type { Article } from '@/@types/hygraphTypes'
import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'
import { getArticles } from '@/services/getArticles'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface VariableArticlesProps {
	title: string
	categorySlug: string
}

const CategoryBlock = async ({
	title,
	categorySlug,
}: VariableArticlesProps) => {
	const { articles } = await getArticles({
		orderBy: 'createdAt_DESC',
		where: 'category',
		categorySlug,
		pageSize: 10,
	})
	return (
		<div className='space-y-3'>
			<SectionTitle title={title} />
			<div className='flex flex-col lg:flex-row gap-4 w-full  p-2 mt-6'>
				<div className='w-full h-72 lg:h-auto'>
					{articles[0] && ( // Garante que há pelo menos um artigo
						<Link
							href={`/article/${articles[0].slug}`}
							key={articles[0].id}
							className='lg:col-span-2'
						>
							<CardImage
								image={
									articles[0].coverImage?.url ||
									'https://placehold.co/600x400'
								}
								title={articles[0].title}
								category={articles[0].category.name}
								label={format(articles[0].createdAt, 'dd/MM/yyyy', {
									locale: ptBR,
								})}
								className={'h-full'} // Use h-full para o card maior preencher a altura
							/>
						</Link>
					)}
				</div>

				{/* Renderiza os posts restantes */}
				<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 h-auto lg:h-[628px] overflow-y-scroll max-h-[628px] scrollbar-custom'>
					{articles.slice(1, 5).map((article) => (
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
								category={article.category.name}
								label={format(article.createdAt, 'dd/MM/yyyy', {
									locale: ptBR,
								})}
								className={'h-74'}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export { CategoryBlock }
