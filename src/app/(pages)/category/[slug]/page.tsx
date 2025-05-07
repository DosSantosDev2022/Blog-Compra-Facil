import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Button } from '@/components/ui'
import { getArticles } from '@/services/getArticles'

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const categoryName = (await params).slug
		? (await params).slug.charAt(0).toUpperCase() +
			(await params).slug.slice(1)
		: 'Categoria'
	console.log(categoryName)
	const { articles } = await getArticles({
		where: 'category',
		categoryName,
		pageSize: 100,
	})

	return (
		<div className='grid lg:grid-cols-12 grid-cols-1 gap-4'>
			<div className='container mx-auto col-span-10 py-8 6'>
				<SectionTitle path='' title={`Categoria: ${categoryName}`} />

				{/* Espaço para anúncio no topo da página de categoria */}
				<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mt-6'>
					{/* Anúncio aqui */}
					Anúncio
				</div>

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
				<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mt-8'>
					{/* Anúncio aqui */}
					Anúncio
				</div>

				{/* Adicionar paginação aqui (se necessário) */}
				<div className='mt-8 flex justify-center'>
					<Button variants='outline' className='mr-2'>
						Anterior
					</Button>
					<Button variants='outline'>Próximo</Button>
				</div>
			</div>

			<div className='col-span-2 py-8'>
				<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mb-6'>
					{/* Anúncio aqui */}
					Anúncio
				</div>
				<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mb-6'>
					{/* Anúncio aqui */}
					Anúncio
				</div>
				<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mb-6'>
					{/* Anúncio aqui */}
					Anúncio
				</div>
				<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mb-6'>
					{/* Anúncio aqui */}
					Anúncio
				</div>
			</div>
		</div>
	)
}
