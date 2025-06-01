import { AdBanner } from '@/components/global/google'
import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { VariableArticle } from '@/components/global/postsSections/variableArticle'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { SectionBanner } from '@/components/global/postsSections/sectionBanner'
import { CategoryBlock } from '@/components/global/postsSections/categoryBlock'
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
			<div className='mb-8'>
				<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{/* posts mais vistos */}
			<MostViewedPosts />

			<div className='mb-8'>
				<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{/* seção de últimas notícias em formato de lista */}
			<VariableArticle title='Posts em alta' />

			{/* seção de últimas notícias em formato de lista */}
			{/* <VariableArticle /> */}

			<div className='mb-8'>
				<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>

			{/* seção de categorias em destaque */}
			<FeaturedCategories />

			{categories.map((category) => (
				<div
					key={category.id}
					className=' max-h-[768px] overflow-y-scroll scrollbar-custom w-full p-2'
				>
					<CategoryBlock
						title={category.name}
						categorySlug={category.slug}
					/>
				</div>
			))}

			{/* anúncio horizontal 2 */}

			<div className='mb-8'>
				<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}
