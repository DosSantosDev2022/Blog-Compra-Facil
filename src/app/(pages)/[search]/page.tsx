import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Pagination } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import type { Metadata } from 'next'

interface SearchResultsPageParms {
	searchParams: Promise<{ query: string | undefined; page: string }>
}

const dominio = 'https://on-tech-rho.vercel.app/'

export async function generateMetadata({
	searchParams,
}: SearchResultsPageParms): Promise<Metadata> {
	const { query } = await searchParams
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
	const currentPage = Number((await searchParams).page || 1)
	const pageSize = 10
	const { articles, totalCount } = await getArticles({
		where: 'search',
		search: query,
		pageSize,
		page: currentPage,
	})

	const hasResults = articles && articles.length > 0

	return (
		<div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 lg:mt-36 mt-8'>
			<SectionTitle title={`Resultados da Busca para: "${query}"`} />
			<div className='mb-6'> </div>

			<div className='p-2  mb-8'>
				{/* anúncio horizontal 1 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{hasResults ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-6'>
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
				<p className='mt-6 text-lg text-gray-700 text-center'>
					Nenhum resultado encontrado para a sua busca.
				</p>
			)}

			{/* Adicionar paginação aqui (se necessário) */}
			<div className='w-full flex justify-end px-2 py-3 mt-10'>
				<Pagination
					page={currentPage}
					limit={pageSize}
					total={totalCount}
				/>
			</div>

			{/* anúncio horizontal 2 */}
			<div className='p-2  mt-8'>
				{' '}
				{/* Adicionada margem superior */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}
