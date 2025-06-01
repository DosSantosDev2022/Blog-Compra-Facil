import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Pagination } from '@/components/ui'
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
	const categoryName = articles[0]?.category?.name || 'Categoria'
	const categoryDescription = `Artigos sobre ${categoryName}`

	return {
		title: `onTech Blog | ${categoryName}`,
		description: categoryDescription,
		openGraph: {
			title: `onTech Blog | ${categoryName}`,
			description: categoryDescription,
			url: `${dominio}${categorySlug}`,
		},
	}
}

export default async function CategoryPage({
	params,
	searchParams,
}: CategoryPageParams) {
	const categorySlug = (await params).slug
	const currentPage = Number((await searchParams).page || 1)
	const pageSize = 50
	const { articles, totalCount } = await getArticles({
		where: 'category',
		categorySlug,
		pageSize,
		page: currentPage,
	})

	// Garante que articles[0]?.category e articles[0]?.category.view existam antes de chamar updateCategoryViewCount
	if (articles.length > 0 && articles[0]?.category) {
		await updateCategoryViewCount(
			articles[0].category.id,
			articles[0].category.view + 1,
		)
	}

	return (
		<div className='container mx-auto py-8 lg:mt-32 mt-8'>
			{/* Contêiner principal flex para posts e anúncios */}
			<div className='flex flex-col lg:flex-row gap-8 mt-6 relative'>
				{/* Seção dos Posts (ocupa a maior parte do espaço) */}
				<div className='flex-1'>
					<SectionTitle
						title={`Categoria: ${articles[0]?.category?.name.toUpperCase() || 'Carregando Categoria...'}`}
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8'>
						{articles.length > 0 ? (
							articles.map((article) => (
								<CardSimple
									id={article.id}
									title={article.title}
									slug={article.slug}
									coverImage={article.coverImage.url}
									createdAt={article.createdAt}
									alt={article.title}
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
					<div className='w-full flex justify-end px-2 py-3 mt-10'>
						<Pagination
							page={currentPage}
							limit={pageSize}
							total={totalCount}
						/>
					</div>
					{/* Removido o AdBanner horizontal duplicado aqui, pois agora está na coluna lateral */}
				</div>

				{/* Seção de Anúncios (fixa à direita em telas maiores) */}
				<div className='lg:w-80 w-full lg:sticky lg:top-32 lg:h-fit block'>
					<div className='mb-8'>
						<p className='text-sm text-gray-500 mb-2 space-y-2'>
							Anúncios
						</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
						<AdBanner dataAdFormat='auto' dataAdSlot='5170095842' />
					</div>
				</div>
			</div>
		</div>
	)
}
