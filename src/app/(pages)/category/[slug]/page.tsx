import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Button, Pagination } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import { updateCategoryViewCount } from '@/services/updateCategoryViewCount'
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

	const dominio = 'https://on-tech-rho.vercel.app/'
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

	if (
		articles.length > 0 &&
		articles[0]?.category?.id &&
		articles[0]?.category?.view !== undefined
	) {
		await updateCategoryViewCount(
			articles[0].category.id,
			articles[0].category.view + 1,
		)
	}

	const currentCategoryName = articles[0]?.category?.name || 'Categoria'

	return (
		<div className='container mx-auto py-8 lg:mt-32 mt-8'>
			<SectionTitle
				title={`Categoria: ${currentCategoryName.toUpperCase()}`}
			/>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6 relative'>
				<div className='lg:col-span-4'>
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
					{totalCount > pageSize && ( // Renderiza a paginação apenas se houver mais de uma página
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
				<div className='lg:col-span-1 mb-8 flex flex-col items-start p-4'>
					<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncios</p>
					<div className='flex flex-col gap-4 w-full'>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>
				</div>
			</div>
		</div>
	)
}
