import { AdBanner, SidebarAdBlock } from '@/components/global/google'
import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { SectionBanner } from '@/components/global/postsSections/sectionBanner'
import { VariableArticle } from '@/components/global/postsSections/variableArticle'
import { homeMetaData } from '@/metadata/homeMetaData'
import { getHomePageData } from '@/services/getHomePageData'
import Link from 'next/link'

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
		<div className='space-y-8 lg:mt-20 mt-0'>
			<SectionBanner />
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				{/* Seção de Conteúdo Principal */}
				{/* Ordem 1 em mobile e desktop para aparecer primeiro */}
				<main className='order-1 space-y-8 lg:col-span-9'>
					{/* seção hero posts */}
					<HeroSection highlightArticles={highlightArticles} />

					<div className='mb-8'>
						<p className='text-sm text-muted-foreground mb-2 space-y-2'>
							Anúncio
						</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>

					{/* posts mais vistos */}
					<MostViewedPosts mostViewdArticles={mostViewedArticles} />

					<div className='mb-8'>
						<p className='text-sm text-muted-foreground mb-2 space-y-2'>
							Anúncio
						</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>

					{/* seção de últimas notícias em formato de lista */}
					<VariableArticle
						title='Posts recentes'
						recentArticles={recentArticles}
					/>


					{/* seção de categorias em destaque */}
					<FeaturedCategories categories={categories} />

					<div className='mb-8'>
						<p className='text-sm text-muted-foreground mb-2 space-y-2'>
							Anúncio
						</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>
				</main>

				{/* Seção da Barra Lateral (Anúncios/Outros) */}
				{/* Ordem 2 em mobile e desktop para aparecer depois do conteúdo principal */}
				<aside className='order-2 lg:block lg:col-span-3 p-4 lg:sticky lg:top-20 lg:self-start lg:h-fit lg:max-h-screen overflow-y-auto scrollbar-custom'>
					<div className='space-y-4'>
						<SidebarAdBlock slot='9849617003' />
						{/* categorias recomendadas */}
						<div className='space-y-4'>
							<p className='text-sm text-muted-foreground mb-2'>
								Categorias
							</p>
							<div className='flex flex-wrap justify-center gap-2'>
								{categories.map((category) => (
									<Link
										className='lg:w-full xl-w-44 w-full text-center p-2 border border-border rounded-xl hover:bg-muted transition-all duration-300'
										key={category.id}
										href={`/category/${category.slug}`}
									>
										{category.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<SidebarAdBlock slot='9849617003' />
				</aside>
			</div>
		</div>
	)
}