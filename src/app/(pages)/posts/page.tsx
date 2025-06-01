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
	const pageSize = 12
	const { articles, totalCount } = await getArticles({
		pageSize,
		page: currentPage,
	})

	return (
		<div className='container mx-auto py-8 lg:mt-32 mt-8'>
			<SectionTitle title={'Todos os posts'} />

			{/* Contêiner principal para posts e anúncios */}
			<div className='flex flex-col lg:flex-row gap-8 mt-6 relative'>
				{/* Seção dos Posts (ocupa a maior parte do espaço) */}
				<div className='flex-1'>
					<div className='flex flex-wrap gap-4'>
						{articles.map((article) => (
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
						{/* Paginação */}
						<div className='w-full flex items-center gap-3 justify-start px-2 py-3 mt-10'>
							<span className='font-light text-muted-foreground'>
								Mostrando{' '}
								{Math.min(
									pageSize,
									totalCount - (currentPage - 1) * pageSize,
								)}{' '}
								de {totalCount}
							</span>
							<Pagination
								page={currentPage}
								limit={pageSize}
								total={totalCount}
							/>
						</div>
					</div>
				</div>

				<div className='mb-8'>
					<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>
			</div>
		</div>
	)
}
