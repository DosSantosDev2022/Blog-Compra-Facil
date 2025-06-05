/** @type {import('next-sitemap').IConfig} */

console.log(
	'DEBUG [next-sitemap.config.js]: Carregando configuração do next-sitemap...',
)

const {
	getAllHygraphArticlesForSitemap,
} = require('./scripts/fetchHygraphArticles')
console.log(
	'DEBUG [next-sitemap.config.js]: `fetchHygraphArticles` importado com sucesso.',
)

module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ontech.blog',
	generateRobotsTxt: true,
	sitemapSize: 500,
	outDir: './public',
	exclude: ['/admin*', '/404', '/api/*'],

	additionalPaths: async (config) => {
		console.log(
			'DEBUG [next-sitemap.config.js]: Iniciando `additionalPaths`...',
		)
		try {
			const articles = await getAllHygraphArticlesForSitemap()
			console.log(
				`DEBUG [next-sitemap.config.js]: ${articles.length} artigos obtidos.`,
			)

			const paths = articles.map((article) => ({
				loc: `${config.siteUrl}/article/${article.slug}`,
				lastmod: new Date(
					article.updatedAt || article.createdAt,
				).toISOString(),
				changefreq: 'weekly',
				priority: 0.7,
			}))
			console.log(
				'DEBUG [next-sitemap.config.js]: Paths do sitemap gerados com sucesso.',
			)
			return paths
		} catch (error) {
			console.error(
				'ERRO [next-sitemap.config.js]: Erro ao gerar sitemap dos artigos:',
				error.message,
			)
			return []
		}
	},
}
