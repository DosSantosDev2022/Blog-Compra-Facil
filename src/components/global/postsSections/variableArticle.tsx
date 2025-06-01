import { SectionTitle } from '../sectionTitle'
import { SmallCard } from '../posts/smalCard'
import { getArticles } from '@/services/getArticles'
import { AdBanner } from '../google'

interface VariableArticleProps {
	title: string
}

const VariableArticle = async ({ title }: VariableArticleProps) => {
	const { articles } = await getArticles({
		viewFilter: {
			operator: 'gt',
			value: 5,
		},
		pageSize: 100,
	})
	return (
		<div className=''>
			<SectionTitle title={title} />
			<div className='grid grid-cols-1 md:grid-cols-3 items-start justify-between gap-6 mt-3'>
				{/* Espaço para anúncio 3 */}
				<div className='md:col-span-1 p-1'>
					<div className='p-2'>
						<p className='text-sm text-gray-500 mb-2 space-y-2'>
							Anúncios
						</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
					</div>
				</div>
				<ul className='md:col-span-2 overflow-y-scroll max-h-[768px] space-y-3 scrollbar-custom grid grid-cols-1 gap-2 lg:grid-cols-2'>
					{articles.map((article) => (
						<SmallCard
							key={article.id}
							title={article.title}
							coverImage={article.coverImage?.url || ''}
							description={article.description}
							slug={article.slug}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export { VariableArticle }
