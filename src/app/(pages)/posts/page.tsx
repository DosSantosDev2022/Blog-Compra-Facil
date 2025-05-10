import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { getArticles } from '@/services/getArticles'

export default async function AllPosts() {
	const { articles } = await getArticles()

	return (
		<div className='container mx-auto py-8 lg:mt-32 mt-8'>
			<SectionTitle title={'Todos os posts'} />

			{/* anúncio horizontal 1 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6'>
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

			{/* anúncio horizontal 2 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{/* Adicionar paginação aqui (se necessário) */}
			<div className='mt-8 flex justify-center'>
				{/* <Button variant='outline' className='mr-2'>Anterior</Button>
        <Button variant='outline'>Próximo</Button> */}
			</div>
		</div>
	)
}
