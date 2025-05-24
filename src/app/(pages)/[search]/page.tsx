import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { getArticles } from '@/services/getArticles'
import type { Metadata } from 'next'

interface SearchResultsPageParms {
	searchParams: Promise<{ query: string | undefined }>
}

const dominio = 'https://on-tech-rho.vercel.app/'

export async function generateMetadata({
	searchParams,
}: { searchParams: { query?: string } }): Promise<Metadata> {
	const query = searchParams.query?.trim()
	const title = query
		? `Resultados da busca por "${query}" |onTech Blog`
		: 'onTech Blog'
	const description = query
		? `Veja os artigos encontrados relacionados a "${query}"`
		: 'Pesquise por artigos no blog.'

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: query
				? `${dominio}busca?query=${encodeURIComponent(query)}`
				: `${dominio}`,
		},
	}
}

export default async function SearchResultsPage({
	searchParams,
}: SearchResultsPageParms) {
	const { query } = await searchParams

	const { articles } = await getArticles({
		where: 'search',
		search: query,
	})

	const hasResults = articles && articles.length > 0

	return (
		<div className='container mx-auto py-8 lg:mt-36 mt-8'>
			<SectionTitle title={`Resultados da Busca para: "${query}"`} />

			{/* anúncio horizontal 1 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{hasResults ? (
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
			) : (
				<p className='mt-6 text-lg text-gray-700'>
					Nenhum resultado encontrado para a sua busca.
				</p>
			)}

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
