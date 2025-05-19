import page from '@/app/page'
import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Button, Pagination } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import { updateCategoryViewCount } from '@/services/updateCategoryViewCount'

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const categorySlug = (await params).slug

	const { articles } = await getArticles({
		where: 'category',
		categorySlug,
		pageSize: 100,
	})

	await updateCategoryViewCount(
		articles[0]?.category.id,
		articles[0]?.category.view + 1,
	)

	return (
		<div className='grid lg:grid-cols-12 grid-cols-1 gap-4'>
			<div className='col-span-9 py-8 lg:mt-32 mt-8'>
				<SectionTitle title={`Categoria: ${categorySlug.toUpperCase()}`} />

				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6'>
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

				{/* Espaço para anúncio após a lista de artigos */}
				{/* anúncio horizontal 2 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

				{/* Adicionar paginação aqui (se necessário) */}
				{/* 				<div className='w-full flex justify-between px-2 py-3'>
					<Pagination page={page} limit={first} total={10} />
				</div> */}
			</div>
			{/* seção com anunicos */}
			<div className='col-span-3 py-8 px-4 mt-48'>
				{/* anúncio In-feed */}
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
			</div>
		</div>
	)
}
