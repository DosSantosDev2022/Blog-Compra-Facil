import { AdBanner } from '@/components/global/google'
import { FeaturedCategories } from '@/components/global/postsSections/featuredCategories'
import { HeroSection } from '@/components/global/postsSections/hero'
import { VariableArticle } from '@/components/global/postsSections/variableArticle'
import { MostViewedPosts } from '@/components/global/postsSections/mostViewedPosts'
import { SectionBanner } from '@/components/global/postsSections/sectionBanner'
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
		<div className='space-y-8 lg:mt-20 mt-8'>
			<SectionBanner />
			<div className='px-2 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8'>
				{/* Seção de Conteúdo Principal */}
				{/* Ordem 1 em mobile e desktop para aparecer primeiro */}
				<main className='order-1 space-y-8'>
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

					<div className='mb-8'>
						<p className='text-sm text-muted-foreground mb-2 space-y-2'>
							Anúncio
						</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>

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
				<aside className='order-2 lg:block space-y-8'>
					<div className='p-4 rounded-lg'>
						<div className='space-y-4'>
							<div className='border-b border-border pb-4'>
								<p className='text-sm text-muted-foreground mb-2'>
									Anúncio
								</p>
								<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
							</div>
							<div className='border-b border-border pb-4'>
								<p className='text-sm text-muted-foreground mb-2'>
									Anúncio
								</p>
								<AdBanner dataAdFormat='auto' dataAdSlot='1234567890' />
							</div>
							{/* categorias recomendadas */}
							<div>
								<p className='text-sm text-muted-foreground mb-2'>
									Categorias recomendadas
								</p>
								<div className='flex flex-wrap gap-2'>
									{categories.map((category) => (
										<Link
											className='w-full lg:w-32 text-center p-2 border border-border rounded-xl hover:bg-muted transition-all duration-300'
											key={category.id}
											href={`/category/${category.slug}`}
										>
											{category.name}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='p-4 rounded-lg'>
						<p className='text-sm text-gray-500 mb-2'>Anúncio</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>
					<div className='p-4 rounded-lg'>
						<p className='text-sm text-gray-500 mb-2'>Anúncio</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>
					<div>
						<p className='text-sm text-muted-foreground mb-2'>
							Produtos recomendadas
						</p>
					</div>
				</aside>
			</div>
		</div>
	)
}
