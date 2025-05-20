import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'
import { getArticles } from '@/services/getArticles'
import { CardSimple } from '../posts/cardSimple'

const MostViewedPosts = async () => {
	const { articles } = await getArticles({ where: 'view', pageSize: 10 })
	return (
		<section aria-label='Posts mais vistos'>
			<SectionTitle title='Posts mais vistos' />
			<div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-4 p-2 overflow-x-auto scrollbar-custom mt-3'>
				{articles.map((article) => (
					<CardSimple
						id={article.id}
						key={article.id}
						slug={article.slug}
						createdAt={article.createdAt}
						alt={`card do posts: ${article.title}`}
						coverImage={article.coverImage.url || ''}
						title={article.title}
					/>
				))}
			</div>
		</section>
	)
}

export { MostViewedPosts }
