import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'
import { getArticles } from '@/services/getArticles'
import { CardSimple } from '../posts/cardSimple'
import type { Article } from '@/@types/hygraphTypes'

interface MostViewedPostsProps {
	mostViewdArticles: Article[]
}

const MostViewedPosts = async ({
	mostViewdArticles,
}: MostViewedPostsProps) => {
	return (
		<section aria-label='Posts mais vistos'>
			<SectionTitle title='Posts mais vistos' />
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3'>
				{mostViewdArticles.map((article) => (
					<CardSimple
						id={article.id}
						key={article.id}
						slug={article.slug || ''}
						createdAt={article.createdAt || ''}
						alt={`card do posts: ${article.title}`}
						coverImage={article.coverImage?.url || ''}
						title={article.title || ''}
					/>
				))}
			</div>
		</section>
	)
}

export { MostViewedPosts }
