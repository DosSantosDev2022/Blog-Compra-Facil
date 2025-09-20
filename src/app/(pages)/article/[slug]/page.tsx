/**
 * @file article-page.tsx
 * @description Renders a single article page with rich content and related posts.
 */

import {
	AdBanner,
	ProductCard,
	RichText,
	SectionTitle,
	defaultRenders,
} from '@/components/global'
import { ShareButtons } from '@/components/pages/article/shareButtons'
import {
	Avatar,
	AvatarContainer,
	AvatarLabel,
	AvatarName,
	AvatarWrapper,
	CardImage,
} from '@/components/ui'
import { getDetailsArticle } from '@/services/getDetailsArticle'
import { getRelatedArticle } from '@/services/getRelatedArticle'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
	params: Promise<{ slug: string }>
}

const dominio = 'https://www.ontech.blog/'

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { article } = await getDetailsArticle((await params).slug)

	if (!article) {
		return {}
	}

	const title = `onTech Blog | ${article.title}`
	const description =
		article.description?.slice(0, 150) ||
		'Confira este artigo completo do Blog onTech sobre tecnologia, dicas, tutoriais e novidades.'

	const imageUrl = article.coverImage?.url || '/og-image.png'

	return {
		title,
		description,
		keywords: [
			article.title || '',
			article.category?.name || 'categoria',
			'artigo sobre tecnologia',
			'blog de tecnologia',
			'tutoriais tech',
			'dicas de produtos',
			'novidades tecnológicas',
			...(article.product?.map((p) => p.name) ?? []),
		],
		openGraph: {
			title,
			description,
			url: `${dominio}article/${(await params).slug}`,
			siteName: 'onTech Blog',
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: article.title,
				},
			],
			locale: 'pt_BR',
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [imageUrl],
		},
		metadataBase: new URL(dominio),
	}
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { article } = await getDetailsArticle((await params).slug)

	if (!article) {
		notFound()
	}

	const { articles: relatedArticles } = await getRelatedArticle(
		article.category?.name || '',
		article.slug || '',
	)

	return (
		<div className="mx-auto mt-12 w-full max-w-7xl px-4 lg:py-8">
			{/* Header com foto de destaque */}
			<div className="relative h-48 mt-20 lg-mt-0 w-full overflow-hidden rounded-lg sm:h-64 md:h-80 lg:h-[520px]">
				<Image
					src={article.coverImage?.url || ''}
					alt={article.title || 'Capa do artigo'}
					fill
					className="object-cover"
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
					unoptimized
				/>
			</div>

			<div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
				{/* Conteúdo principal do artigo */}
				<div className="lg:col-span-2">
					<article className="prose prose-lg mx-auto max-w-none space-y-6">
						<h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
							{article.title}
						</h1>

						<div className="flex items-center justify-between">
							<AvatarContainer>
								<Avatar
									name={article.author.name}
									src={article.author.image.url || ''}
								/>
								<AvatarWrapper>
									<AvatarName>{article.author.name}</AvatarName>
									<AvatarLabel>{`Publicado em: ${format(article.createdAt || '', 'dd/MM/yyyy', { locale: ptBR })}`}</AvatarLabel>
								</AvatarWrapper>
							</AvatarContainer>
						</div>

						<AdBanner
							dataAdFormat="auto"
							dataAdSlot="9849617003"
							label="Anúncio"
						/>

						<div className="prose prose-sm prose-p:my-4 prose-a:text-primary prose-a:hover:text-primary-hover max-w-none text-foreground lg:prose-lg">
							{article.content?.raw ? (
								<RichText
									content={article.content.raw}
									renderers={defaultRenders}
								/>
							) : (
								<p className="text-muted-foreground">Conteúdo não disponível.</p>
							)}
						</div>

						<ShareButtons slug={article.slug || ''} title={article.title || ''} />
					</article>

					{/* Seção de produtos e anúncios */}
					{article.product && article.product.length > 0 && (
						<div className="mt-12 space-y-6">
							<SectionTitle title="Produtos recomendados" />
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
								{article.product.map((product) => (
									<ProductCard
										key={product.id}
										name={product.name}
										description={product.description}
										imageUrl={product.image.url}
										affiliateLinks={product.affiliateLinks}
									/>
								))}
							</div>
						</div>
					)}

					<div className="mt-12 space-y-6">
						<AdBanner
							dataAdFormat="auto"
							dataAdSlot="9849617003"
							label="Anúncio"
						/>
					</div>
				</div>

				{/* Sidebar com artigos relacionados */}
				<aside className="space-y-6 lg:col-span-1 lg:sticky lg:top-24 lg:h-fit">
					<SectionTitle title="Artigos Relacionados" />
					<div className="flex flex-col gap-4">
						{relatedArticles.map((relatedArticle) => (
							<Link
								href={`/article/${relatedArticle.slug}`}
								key={relatedArticle.id}
							>
								<CardImage
									alt={relatedArticle.title}
									image={relatedArticle.coverImage?.url || ''}
									title={relatedArticle.title}
									category={relatedArticle.category?.name || ''}
									className="h-48 md:h-52"
									authorImage={relatedArticle.author.image.url || ''}
									authorName={relatedArticle.author.name}
									createdAt={format(relatedArticle.createdAt || '', 'dd/MM/yyyy', {
										locale: ptBR,
									})}
								/>
							</Link>
						))}
					</div>
				</aside>
			</div>
		</div>
	)
}