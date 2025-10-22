/**
 * @file Home Page Component
 * @description Renders the home page with a a list of posts
 * and a sidebar
 */
import { CardSimple, SectionTitle } from '@/components/global'
import { Button, CardImage } from '@/components/ui'
import { categories } from '@/config/categories.json'
import { homeMetaData } from '@/metadata/homeMetaData'
import { getHomePageData } from '@/services/getHomePageData'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'

export const revalidate = 86400

export const metadata = homeMetaData

export default async function Home() {
	const { highlightArticles, mostViewedArticles } =
		await getHomePageData()

	// Otimização: Acessa o primeiro artigo de destaque e o restante separadamente.
	const [mainHighlightArticle, ...otherHighlightArticles] = highlightArticles

	return (
		<div className="space-y-12 pb-16 lg:mt-20">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<main className="order-1 space-y-12 lg:col-span-9">
					{/* Seção de Destaques */}
					<section aria-label="Posts em destaque" className="space-y-6">
						<SectionTitle title="Posts em destaque" />
						<div className="flex flex-col gap-4 lg:flex-row">
							{/* Renderiza o primeiro destaque (se existir) */}
							{mainHighlightArticle && (
								<div className="w-full lg:h-auto">
									<Link href={`/article/${mainHighlightArticle.slug}`}>
										<CardImage
											alt={mainHighlightArticle.title || ''}
											image={
												mainHighlightArticle.coverImage?.url ||
												'https://placehold.co/600x400'
											}
											title={mainHighlightArticle.title}
											category={mainHighlightArticle.category?.name}
											createdAt={format(
												mainHighlightArticle?.createdAt || '',
												'dd/MM/yyyy',
												{ locale: ptBR },
											)}
											className="h-full"
										/>
									</Link>
								</div>
							)}
							{/* Renderiza os destaques restantes */}
							<div className="grid w-full gap-4 lg:overflow-y-scroll lg:max-h-[628px] lg:grid-cols-1 scrollbar-custom">
								{otherHighlightArticles.slice(0, 11).map((article) => (
									<Link
										href={`/article/${article.slug}`}
										key={article.id}
										className="w-full"
									>
										<CardImage
											alt={article.title || ''}
											image={
												article.coverImage?.url || 'https://placehold.co/600x400'
											}
											title={article.title}
											category={article.category?.name || ''}
											createdAt={format(article.createdAt || '', 'dd/MM/yyyy', {
												locale: ptBR,
											})}
											className="h-74"
										/>
									</Link>
								))}
							</div>
						</div>
					</section>
					{/* Seção de Posts Mais Vistos */}
					<section aria-label="Posts mais vistos" className="space-y-6">
						<SectionTitle title="Posts mais vistos" />
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{mostViewedArticles.map((article) => (
								<CardSimple
									id={article.id}
									key={article.id}
									slug={article.slug || ''}
									createdAt={article.createdAt || ''}
									alt={`card do posts: ${article.title}`}
									coverImage={article.coverImage?.url || ''}
									title={article.title || ''}
								/>
							))}
						</div>
					</section>
				</main>
				{/* Sidebar */}
				<aside className="order-2 space-y-8 p-4 lg:sticky lg:top-20 lg:col-span-3 lg:block lg:h-fit lg:max-h-[calc(100vh-220px)] lg:self-start lg:overflow-y-auto scrollbar-custom">
					<div className="space-y-4">
						<p className="text-sm text-muted-foreground">Categorias</p>
						<div className="flex flex-wrap justify-center gap-2">
							{categories.map((category) => (
								<Button className='w-full hover:scale-105 duration-300 transition-all' variants='secondary' asChild key={category.name}>
									<Link
										href={`/category/${category.slug}`}
									>
										{category.name}
									</Link>
								</Button>

							))}
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}