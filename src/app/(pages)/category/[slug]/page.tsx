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
	const categoryName = (await params).slug
		? (await params).slug.charAt(0).toUpperCase() +
			(await params).slug.slice(1)
		: 'Categoria'

	const { articles } = await getArticles({
		where: 'category',
		categoryName,
		pageSize: 100,
	})

	await updateCategoryViewCount(
		articles[0].category.id,
		articles[0].category.view + 1,
	)

	return (
		<div className='grid lg:grid-cols-12 grid-cols-1 gap-4'>
			<div className='container mx-auto col-span-10 py-8 6'>
				<SectionTitle title={`Categoria: ${categoryName}`} />

				{/* Espaço para anúncio no topo da página de categoria */}
				{/* anúncio horizontal 1 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
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

				{/* Espaço para anúncio após a lista de artigos */}
				{/* anúncio horizontal 2 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

				{/* Adicionar paginação aqui (se necessário) */}
				{/* 				<div className='w-full flex justify-between px-2 py-3'>
					<Pagination page={page} limit={first} total={10} />
				</div> */}
			</div>

			<div className='col-span-2 py-8'>
				{/* anúncio In-feed */}
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
				<AdBanner dataAdFormat='fluid' dataAdSlot='5170095842' />
			</div>
		</div>
	)
}
