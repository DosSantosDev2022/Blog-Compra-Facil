import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Pagination } from '@/components/ui'
import { postsMetaData } from '@/metadata/postsMetaData'
import { getArticles } from '@/services/getArticles'

interface AllPostsParams {
	searchParams: Promise<{ page?: string }>
}

export const metadata = postsMetaData

export default async function AllPosts({ searchParams }: AllPostsParams) {
	const currentPage = Number((await searchParams).page || 1)
	const pageSize = 2
	const { articles, totalCount } = await getArticles({
		pageSize,
		page: currentPage,
	})

	return (
		<div className='container mx-auto py-8 lg:mt-32 mt-8'>
			<SectionTitle title={'Todos os posts'} />
			<div className='mb-6'> </div>

			<div className='p-2  mb-8'>
				{/* anúncio horizontal 1 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-6'>
				{articles.map((article, index) => (
					<CardSimple
						id={article.id}
						title={article.title}
						slug={article.slug}
						coverImage={article.coverImage.url}
						createdAt={article.createdAt}
						alt={article.title}
						key={article.id}
					/>
				))}
			</div>

			<div className='w-full flex justify-end px-2 py-3 mt-10'>
				<Pagination
					page={currentPage}
					limit={pageSize}
					total={totalCount}
				/>
			</div>

			{/* anúncio horizontal 2 */}
			<div className='p-2 mb-8'>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}
