import { AdBanner } from '@/components/global/google'
import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { LatestNews } from '@/components/global/postsSections/latestNews'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { VariableArticles } from '@/components/global/postsSections/variableArticles'
import { categories } from '@/config/links'

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

			{categories.map((category) => (
				<div key={category.id} className='border border-border shadow p-2'>
					{/* anúncio horizontal 4 */}
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					<div className=' max-h-[768px] overflow-y-scroll w-full '>
						<VariableArticles
							title={category.name}
							categoryName={category.name}
						/>
					</div>
				</div>
			))}
		</div>
	)
}
