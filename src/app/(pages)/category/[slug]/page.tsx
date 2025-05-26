import page from '@/app/page'
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

	await updateCategoryViewCount(
		articles[0]?.category.id,
		articles[0]?.category.view + 1,
	)

	return (
		<div className='w-full'>
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			<div className='py-10 lg:mt-36 mt-12'>
				<SectionTitle
					title={`Categoria: ${articles[0].category.name.toUpperCase()}`}
				/>
				<div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 mt-8'>
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
				<div className='w-full flex justify-end px-2 py-3 mt-10'>
					<Pagination
						page={currentPage}
						limit={pageSize}
						total={totalCount}
					/>
				</div>
				{/* anúncio horizontal 2 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />{' '}
			</div>
		</div>
	)
}
