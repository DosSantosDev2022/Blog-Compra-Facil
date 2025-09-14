import { AdBanner, SidebarAdBlock } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Pagination } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import type { Metadata } from 'next'

interface CategoryPageParams {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({
	params,
}: CategoryPageParams): Promise<Metadata> {
	const categorySlug = (await params).slug
	const { articles } = await getArticles({
		where: 'category',
		categorySlug: categorySlug,
		pageSize: 1,
		page: 1,
	})

	const dominio = 'https://www.ontech.blog/'
	const categoryName =
		articles[0]?.category?.name || 'Categoria Não Encontrada'
	const categoryDescription = `Artigos sobre ${categoryName}`

	return {
		title: `onTech Blog | ${categoryName}`,
		description: categoryDescription,
		openGraph: {
			title: `onTech Blog | ${categoryName}`,
			description: categoryDescription,
			url: `${dominio}category/${categorySlug}`,
		},
	}
}

export default async function CategoryPage({
	params,
	searchParams,
}: CategoryPageParams) {
	const categorySlug = (await params).slug
	const currentPage = Number((await searchParams).page || 1)
	const pageSize = 10
	const { articles, totalCount } = await getArticles({
		where: 'category',
		categorySlug,
		pageSize,
		page: currentPage,
	})

	const currentCategoryName =
		articles[0]?.category?.name || 'Esta categoria ainda não existe'

	return (
		<div className='container mx-auto py-8 lg:mt-24 mt-8'>
			<SectionTitle title={`Categoria: ${currentCategoryName}`} />
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative'>
				<div className='lg:col-span-9'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
						{articles.length > 0 ? (
							articles.map((article) => (
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
							))
						) : (
							<div className='col-span-full flex justify-center items-center py-8 text-muted-foreground'>
								<p className='text-2xl italic'>
									Nenhum artigo encontrado por enquanto.
								</p>
							</div>
						)}
					</div>

					{/* Paginação */}
					{totalCount > pageSize && (
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
					)}
				</div>

				{/* seção com anunicos */}
				<aside className='lg:col-span-3 mb-8 space-y-8 w-full p-4 lg:sticky lg:top-20 lg:self-start lg:h-fit lg:max-h-screen overflow-y-auto'>
					<SidebarAdBlock slot='1597748894' />
				</aside>
			</div>
			<div className='mb-8 mt-12'>
				<p className='text-sm text-muted-foreground mb-2 space-y-2'>
					Anúncio
				</p>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}