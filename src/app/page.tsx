import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { LatestNews } from '@/components/global/postsSections/latestNews'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { VariableArticles } from '@/components/global/postsSections/variableArticles'
import {
	getHeroArticles,
	getLatestArticles,
	getMostViewedArticles,
} from '@/services/getArticlesByCriteria'

export default async function Home() {
	const heroArticlesData = await getHeroArticles()
	const mostViewedArticlesData = await getMostViewedArticles()
	const latestArticlesData = await getLatestArticles()
	return (
		<div className='space-y-8'>
			{/* seção hero posts */}
			<HeroSection articles={heroArticlesData.articles} />
			{/* Espaço para anúncio 1 */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			{/* posts mais vistos */}
			<MostViewedPosts articles={mostViewedArticlesData.articles} />

			{/* Espaço para anúncio 2 */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			{/* seção de categorias em destaque */}
			<FeaturedCategories />

			{/* Espaço para anúncio 3 */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews articles={latestArticlesData.articles} />

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews articles={latestArticlesData.articles} />

			{/* Espaço para anúncio 3 */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			<VariableArticles articles={latestArticlesData.articles} />

			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>
		</div>
	)
}
