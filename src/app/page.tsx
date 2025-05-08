import { AdBanner } from '@/components/global/google'
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
			{/* anúncio horizontal */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{/* posts mais vistos */}
			<MostViewedPosts />

			{/* anúncio horizontal 2 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{/* seção de categorias em destaque */}
			<FeaturedCategories />

			{/* anúncio horizontal 3 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews />

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews />

			{/* anúncio horizontal 4 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			<VariableArticles title='Esportes' categoryName='Esportes' />

			{/* anúncio horizontal 4 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{/* anúncio horizontal 5 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			<VariableArticles
				title='Automobilismo'
				categoryName='Automobilismo'
			/>

			{/* anúncio horizontal 6 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			<VariableArticles title='Política' categoryName='Politica' />

			<VariableArticles title='Saúde' categoryName='Saude' />

			{/* anúncio horizontal 7 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
		</div>
	)
}
