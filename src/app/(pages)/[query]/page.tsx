import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'

interface SearchResultsPageParms {
	searchParams: {
		query: string
	}
}

export default function SearchResultsPage({
	searchParams,
}: SearchResultsPageParms) {
	// Simulando os resultados da busca (você buscará isso do seu backend com base na 'query')
	const searchResults = [
		{
			id: '7',
			title: `Resultados para: ${searchParams.query} - Artigo 1`,
			excerpt: 'Breve descrição do artigo encontrado para a sua busca...',
			slug: '',
		},
		{
			id: '8',
			title: `Resultados para: ${searchParams.query} - Artigo 2`,
			excerpt: 'Mais informações relevantes sobre o termo de busca...',
			slug: '',
		},
		{
			id: '9',
			title: `Resultados para: ${searchParams.query} - Artigo 3`,
			excerpt:
				'Um outro artigo que corresponde aos seus critérios de busca...',
			slug: '',
		},
		// Mais resultados da busca
	]

	const hasResults = searchResults && searchResults.length > 0

	return (
		<div className='container mx-auto py-8'>
			<SectionTitle
				path=''
				title={`Resultados da Busca para: "${searchParams.query}"`}
			/>

			{/* Espaço para anúncio no topo da página de resultados */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mt-3 mb-6'>
				{/* Anúncio aqui */}
				Anúncio
			</div>

			{hasResults ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
					{searchResults.map((article, index) => (
						<CardSimple
							id={article.id}
							title={article.title}
							slug={article.slug}
							excerpt={article.excerpt}
							key={index}
						/>
					))}
				</div>
			) : (
				<p className='mt-6 text-lg text-gray-700'>
					Nenhum resultado encontrado para a sua busca.
				</p>
			)}

			{/* Espaço para anúncio após os resultados da busca */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md mt-8'>
				{/* Anúncio aqui */}
				Anúncio
			</div>

			{/* Adicionar paginação aqui (se necessário) */}
			<div className='mt-8 flex justify-center'>
				{/* <Button variant='outline' className='mr-2'>Anterior</Button>
        <Button variant='outline'>Próximo</Button> */}
			</div>
		</div>
	)
}
