import { ShareButtons } from '@/components/pages/article/shareButtons'
import { getDetailsArticle } from '@/services/getDetailsArticle'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RichText } from '@/components/global/posts/richText'
import { defaultRenders } from '@/components/global/richTextRenders'
import Link from 'next/link'
import { CardImage } from '@/components/ui'
import { getRelatedArticle } from '@/services/getRelatedArticle'
import { AdBanner } from '@/components/global/google'
import { ProductCard } from '@/components/global/products'
import { SectionTitle } from '@/components/global/sectionTitle'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
	Avatar,
	AvatarContainer,
	AvatarLabel,
	AvatarName,
	AvatarWrapper,
} from '@/components/ui/avatar'

interface PagePostProps {
	params: Promise<{ slug: string }>
}

const dominio = 'https://www.ontech.blog/'

export async function generateMetadata({
	params,
}: PagePostProps): Promise<Metadata> {
	const slug = (await params).slug

	const { article } = await getDetailsArticle(slug)

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
			url: `${dominio}article/${slug}`,
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

export default async function ArticlePage({ params }: PagePostProps) {
	const slug = (await params).slug

	const { article } = await getDetailsArticle(slug)

	if (!article) {
		notFound()
	}

	const [relatedArticlesData] = await Promise.all([
		article.category
			? getRelatedArticle(article.category.name, article.slug || '')
			: { articles: [] },
	])

	const relatedArticles = relatedArticlesData.articles

	return (
		<div className='container mx-auto lg:py-8'>
			{/* Header com foto de destaque */}
			<div className='relative w-full lg:h-[520px] h-48 rounded-lg overflow-hidden mt-12'>
				<Image
					src={article.coverImage?.url || ''}
					alt={article.title || 'Capa do artigo'}
					fill
					className='object-cover w-full h-full'
					priority
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw'
					unoptimized
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
				{/* Conteúdo principal do artigo */}
				<div className='lg:col-span-2 space-y-6'>
					<div className='space-y-3'>
						<h1 className='lg:text-3xl text-2xl font-bold'>
							{article.title}
						</h1>

						<div className='flex flex-col items-center space-y-6'>
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
					</div>

					{/*  anúncio horizontal */}
					<div className='mb-8'>
						<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>

					<article className='space-y-4 text-lg'>
						{article.content?.raw ? (
							<RichText
								content={article.content.raw}
								renderers={defaultRenders}
							/>
						) : (
							<p className='text-muted-foreground'>
								Conteúdo não disponível.
							</p>
						)}
					</article>
					<div className='space-y-6'>
						<SectionTitle title='Produtos recomendados' />
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
							{article?.product?.map((product) => (
								<ProductCard
									key={product.id}
									name={product.name}
									description={product.description}
									imageUrl={product.image.url}
									slug={product.slug}
								/>
							))}
						</div>
					</div>

					{/* Área de compartilhamento */}
					<div className='mt-8 border-t border-border py-4'>
						<ShareButtons
							slug={article.slug || ''}
							title={article.title || ''}
						/>
					</div>

					<div className='mb-8'>
						<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
						<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
					</div>
				</div>

				{/* Artigos relacionados (Sidebar) */}
				<aside className='space-y-6'>
					<h2 className='text-lg text-center flex items-center font-semibold h-8 rounded-2xl bg-primary text-primary-foreground px-4 py-6'>
						Artigos Relacionados
					</h2>
					<div className='flex flex-col gap-3  p-3'>
						{relatedArticles.map((article) => (
							<Link href={`/article/${article.slug}`} key={article.id}>
								<CardImage
									image={article.coverImage?.url || ''}
									title={article.title}
									category={article.category?.name || ''}
									className=' h-48 md:h-52'
									authorImage={article.author.image.url || ''}
									authorName={article.author.name}
									createdAt={`Publicado em: ${format(article.createdAt || '', 'dd/MM/yyyy', { locale: ptBR })}`}
								/>
							</Link>
						))}
					</div>
					<div className='mb-8'>
						<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
						<div className='flex flex-col gap-2'>
							<AdBanner dataAdFormat='auto' dataAdSlot='2302299472' />
							<AdBanner dataAdFormat='auto' dataAdSlot='2302299472' />
							<AdBanner dataAdFormat='auto' dataAdSlot='2302299472' />
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}
