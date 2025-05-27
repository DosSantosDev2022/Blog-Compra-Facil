import { AdBanner } from '@/components/global/google'
import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { LatestNews } from '@/components/global/postsSections/latestNews'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { SectionBanner } from '@/components/global/postsSections/sectionBanner'
import { CategoryBlock } from '@/components/global/postsSections/variableArticles'
import { getCategories } from '@/services/getCategories'
import { homeMetaData } from '@/metadata/homeMetaData'

export const metadata = homeMetaData

export default async function Home() {
	const { categories } = await getCategories()

	return (
		<div className='space-y-8 lg:mt-20 mt-8'>
			<SectionBanner />
			{/* seção hero posts */}
			<HeroSection />
			{/* anúncio horizontal */}
			<div className='p-2  mb-8'>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{/* posts mais vistos */}
			<MostViewedPosts />

			{/* anúncio horizontal 3 */}
			<div className='p-2  mb-8'>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews />

			{/* seção de últimas notícias em formato de lista */}
			<LatestNews />

			{/* anúncio horizontal 4 */}
			<div className='p-2  mb-8'>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{/* seção de categorias em destaque */}
			<FeaturedCategories />

			{categories.map((category) => (
				<div key={category.id} className='overflow-y-hidden w-full p-2'>
					<CategoryBlock
						title={category.name}
						categorySlug={category.slug}
					/>
				</div>
			))}

			{/* anúncio horizontal 2 */}
			<div className='p-2  mb-8'>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}
