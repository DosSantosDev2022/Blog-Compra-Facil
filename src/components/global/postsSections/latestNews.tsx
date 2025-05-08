import { SectionTitle } from '../sectionTitle'
import { SmallCard } from '../posts/smalCard'
import { getArticles } from '@/services/getArticles'
import { AdBanner } from '../google'

const LatestNews = async () => {
	const { articles } = await getArticles({
		orderBy: 'createdAt_DESC',
		pageSize: 1000,
	})
	return (
		<div>
			<SectionTitle title='Últimas Notícias' />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
				{/* Espaço para anúncio 3 */}
				<div className=''>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
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
