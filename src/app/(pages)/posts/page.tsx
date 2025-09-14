import { SidebarAdBlock } from '@/components/global/google'
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
		<div className='container mx-auto py-8 lg:mt-24 mt-8'>
			<SectionTitle title={'Todos os posts'} />

			{/* Contêiner principal para posts e anúncios */}
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative'>
				{/* Seção dos Posts (ocupa a maior parte do espaço) */}
				<div className='lg:col-span-9'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
						{articles.map((article) => (
							<CardSimple
								id={article.id}
								title={article.title || ''}
								slug={article.slug || ''}
								coverImage={article.coverImage?.url || ''}
								createdAt={article.createdAt || ''}
								alt={article.title || ''}
								key={article.id}
								authorImage={article.author.image.url || ''}
								authorName={article.author.name}
							/>
						))}
					</div>
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

				{/* Seção da Barra Lateral (agora fixa) */}
				<aside className='lg:col-span-3 mb-8 space-y-8 w-full p-4 lg:sticky lg:top-20 lg:self-start lg:h-fit lg:max-h-screen overflow-y-auto scrollbar-custom'>
					<SidebarAdBlock slot='1597748894' />
				</aside>
			</div>
		</div>
	)
}