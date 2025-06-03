import { AdBanner } from '@/components/global/google'
import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { VariableArticle } from '@/components/global/postsSections/variableArticle'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { SectionBanner } from '@/components/global/postsSections/sectionBanner'
import { homeMetaData } from '@/metadata/homeMetaData'
import { getHomePageData } from '@/services/getHomePageData'

export const revalidate = 86400

export const metadata = homeMetaData

export default async function Home() {
	const {
		categories,
		highlightArticles,
		mostViewedArticles,
		recentArticles,
	} = await getHomePageData()

	return (
		<div className='space-y-8 lg:mt-20 mt-8'>
			<SectionBanner />
			<div className='container mx-auto px-2'>
				{/* seção hero posts */}
				<HeroSection highlightArticles={highlightArticles} />
				<div className='mb-8'>
					<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>

				{/* posts mais vistos */}
				<MostViewedPosts mostViewdArticles={mostViewedArticles} />

				<div className='mb-8'>
					<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>

				{/* seção de últimas notícias em formato de lista */}
				<VariableArticle
					title='Posts recentes'
					recentArticles={recentArticles}
				/>

				<div className='mb-8'>
					<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>

				{/* seção de categorias em destaque */}
				<FeaturedCategories categories={categories} />

				<div className='mb-8'>
					<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>
			</div>
		</div>
	)
}
