import { AdBanner, CardSimple, SectionTitle } from '@/components/global'
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
	const categoryName = articles[0]?.category?.name || 'Categoria Não Encontrada'
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

export const revalidate = 86400

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
		<div className="mx-auto w-full max-w-7xl px-4 py-8 lg:py-24">
			{/* Título da Seção */}
			<div className="mb-6">
				<SectionTitle title={`Categoria: ${currentCategoryName}`} />
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
				{/* Conteúdo principal: Lista de Artigos */}
				<div className="lg:col-span-9">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
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
							<div className="col-span-full flex items-center justify-center py-12 text-muted-foreground">
								<p className="text-2xl italic">Nenhum artigo encontrado por enquanto.</p>
							</div>
						)}
					</div>

					{/* Paginação */}
					{totalCount > pageSize && (
						<div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
							<span className="text-sm font-light text-muted-foreground">
								Mostrando {Math.min(pageSize, totalCount - (currentPage - 1) * pageSize)} de {totalCount} artigos
							</span>
							<Pagination
								page={currentPage}
								limit={pageSize}
								total={totalCount}
							/>
						</div>
					)}
				</div>

				{/* Sidebar */}
				<aside className="space-y-6 lg:col-span-3 lg:sticky lg:top-24 lg:h-fit">
					<AdBanner dataAdFormat="auto" dataAdSlot="9849617003" />
				</aside>
			</div>

			{/* Anúncio Inferior */}
			<div className="mt-12">
				<AdBanner dataAdFormat="auto" dataAdSlot="9849617003" />
			</div>
		</div>
	)
}