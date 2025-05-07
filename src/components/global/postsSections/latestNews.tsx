import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { SmallCard } from '../posts/smalCard'
import { getArticles } from '@/services/getArticles'

const LatestNews = async () => {
	const { articles } = await getArticles({
		orderBy: 'createdAt_DESC',
		pageSize: 1000,
	})
	return (
		<div>
			<SectionTitle path='/noticias/recentes' title='Últimas Notícias' />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
				{/* Espaço para anúncio 3 */}
				<div className='w-full h-full bg-zinc-200 flex items-center justify-center text-gray-500'>
					{/* Futuro anúncio aqui */}
					Anúncio
				</div>
				<ul className='overflow-x-scroll max-h-64 space-y-3 '>
					{articles.map((article) => (
						<SmallCard
							key={article.id}
							title={article.title}
							coverImage={article.coverImage.url || ''}
							description={article.description}
							slug={article.slug}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export { LatestNews }
