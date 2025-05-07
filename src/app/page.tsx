import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { LatestNews } from '@/components/global/postsSections/latestNews'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { VariableArticles } from '@/components/global/postsSections/variableArticles'

export default async function Home() {
	return (
		<div className='space-y-8'>
			{/* seção hero posts */}
			<HeroSection />
			{/* Espaço para anúncio 1 */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			{/* posts mais vistos */}
			<MostViewedPosts />

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
			<LatestNews />

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews />

			{/* Espaço para anúncio 3 */}
			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			<VariableArticles title='Esportes' categoryName='Esportes' />

			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			<VariableArticles
				title='Automobilismo'
				categoryName='Automobilismo'
			/>

			<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500'>
				{/* Futuro anúncio aqui */}
				Anúncio
			</div>

			<VariableArticles title='Política' categoryName='Politica' />
		</div>
	)
}
