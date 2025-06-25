const fetch = require('node-fetch')

const HYGRAPH_API_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_API_ENDPOINT
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN

if (!HYGRAPH_API_ENDPOINT || !HYGRAPH_TOKEN) {
	console.error(
		'ERRO: Variáveis de ambiente HYGRAPH_API_ENDPOINT ou HYGRAPH_TOKEN não definidas para o sitemap!',
	)
	throw new Error(
		'Variáveis de ambiente Hygraph ausentes. Verifique seu .env ou configuração de deploy.',
	)
}

// Query GraphQL mais otimizada para o sitemap
const ARTICLES_SITEMAP_QUERY = `
  query ArticlesSitemapQuery($first: Int!, $skip: Int!) {
    articles (
      first: $first,
      skip: $skip,
      orderBy: createdAt_DESC 
    ) {
      slug
      createdAt
      updatedAt 
    }
    articlesConnection {
      aggregate {
        count
      }
    }
  }
`

/**
 * Função para fazer a consulta GraphQL ao Hygraph
 * @param {string} query A string da query GraphQL
 * @param {Object} variables Variáveis para a query
 * @returns {Promise<Object>} Os dados da resposta da API
 */
async function hygraphQuery(query, variables) {
	try {
		const response = await fetch(HYGRAPH_API_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${HYGRAPH_TOKEN}`,
			},
			body: JSON.stringify({ query, variables }),
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			throw new Error(
				`Erro ao buscar dados do Hygraph: ${response.statusText} (Código: ${response.status}). Detalhes: ${JSON.stringify(errorData)}`,
			)
		}

		const { data, errors } = await response.json()

		if (errors) {
			console.error('Erros na consulta Hygraph:', errors)
			throw new Error(
				`Erros na consulta Hygraph: ${JSON.stringify(errors)}`,
			)
		}

		return data
	} catch (error) {
		console.error('Erro ao realizar a consulta Hygraph:', error)
		throw error
	}
}

/**
 * Busca todos os artigos do Hygraph com paginação.
 * @returns {Promise<Array<Object>>} Um array de objetos de artigo (slug, createdAt, updatedAt)
 */
async function getAllHygraphArticlesForSitemap() {
	let allArticles = []
	let page = 1
	const pageSize = 50 // Artigos por requisição
	let totalCount = 0
	let hasMore = true

	try {
		while (hasMore) {
			const variables = {
				first: pageSize,
				skip: (page - 1) * pageSize,
			}

			const responseData = await hygraphQuery(
				ARTICLES_SITEMAP_QUERY,
				variables,
			)

			const articles = responseData?.articles || []
			const currentTotalCount =
				responseData?.articlesConnection?.aggregate?.count || 0

			allArticles = allArticles.concat(articles)

			if (page === 1) {
				// Apenas na primeira requisição, obtemos o total geral
				totalCount = currentTotalCount
			}

			if (allArticles.length >= totalCount || articles.length === 0) {
				hasMore = false // Parar se todos os artigos foram buscados ou se não houver mais
			} else {
				page++ // Próxima página
			}
		}
		return allArticles
	} catch (error) {
		console.error(
			'Erro fatal ao coletar todos os artigos para o sitemap:',
			error,
		)
		throw error
	}
}

module.exports = {
	getAllHygraphArticlesForSitemap,
}
