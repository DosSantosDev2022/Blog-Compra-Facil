import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'
import { getArticles } from '@/services/getArticles'

const MostViewedPosts = async () => {
	const { articles } = await getArticles({ where: 'view', pageSize: 10 })
	return (
		<div className=''>
			<SectionTitle title='Posts mais vistos' />
			<div className='overflow-x-auto'>
				<div className='flex gap-4 w-auto mt-3'>
					{articles.map((article) => (
						<CardImage
							key={article.id}
							className='h-74 min-w-72'
							image={article.coverImage.url || ''}
							title={article.title}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export { MostViewedPosts }
