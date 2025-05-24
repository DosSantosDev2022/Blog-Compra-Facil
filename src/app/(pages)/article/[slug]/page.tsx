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
import { updateViewCount } from '@/services/updateViewCount'
import { AdBanner } from '@/components/global/google'
import { ProductCard } from '@/components/global/products'
import { SectionTitle } from '@/components/global/sectionTitle'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PagePostProps {
	params: Promise<{ slug: string }>
}

export const dynamicParams = true

const dominio = 'https://on-tech-rho.vercel.app/'

export async function generateMetadata({
	params,
}: PagePostProps): Promise<Metadata> {
	const slug = (await params).slug

	const { article } = await getDetailsArticle(slug)

	const title = `onTech Blog | ${article.title}`
	const description =
		article.description?.slice(0, 150) ||
		'Confira este artigo completo do Blog onTech sobre tecnologia, dicas, tutoriais e novidades.'

	const imageUrl = article.coverImage?.url || '/og-image.png'

	return {
		title,
		description,
		keywords: [
			article.title,
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

	await updateViewCount(article.id, article.view + 1).catch(console.error)
	// Verifica se existe uma categoria associada
	const { articles: relatedArticles } = article.category
		? await getRelatedArticle(article.category.name, article.slug)
		: { articles: [] }
	return (
		<div className='container mx-auto py-8'>
			{/* Header com foto de destaque */}
			<div className='relative w-full lg:h-[520px] h-48 rounded-lg overflow-hidden mt-32'>
				<Image
					src={article.coverImage.url}
					alt={article.title}
					fill
					className='object-cover w-full h-full'
					priority
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
				{/* Conteúdo principal do artigo */}
				<div className='lg:col-span-2 space-y-6'>
					<div className='space-y-3'>
						<h1 className='lg:text-3xl text-2xl font-bold'>
							{article.title}
						</h1>
						<p className='text-muted-foreground'>
							{`Publicado em: ${format(article.createdAt, 'dd/MM/yyyy', { locale: ptBR })}`}
						</p>
						<span className='text-muted-foreground'>
							{`Visualizações: ${article.view}`}{' '}
						</span>
					</div>

					{/*  anúncio horizontal */}
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

					<article className='space-y-4 text-lg'>
						<RichText
							content={article?.content?.raw}
							renderers={defaultRenders}
						/>
					</article>
					<div className='space-y-6'>
						<SectionTitle title='Produtos recomendados' />
						<div className='flex flex-wrap gap-4'>
							{article.product.map((product) => (
								<ProductCard
									key={product.id}
									name={product.name}
									description={product.description}
									imageUrl={product.image.url}
									LinkUrl={product.url}
								/>
							))}
						</div>
					</div>

					{/* Área de compartilhamento */}
					<div className='mt-8 border-t border-gray-200 py-4'>
						<ShareButtons slug={article.slug} title={article.title} />
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
									image={article.coverImage?.url}
									title={article.title}
									className=' h-48 md:h-52'
								/>
							</Link>
						))}
					</div>

					{/* Anúncio vertical */}
					<AdBanner dataAdFormat='auto' dataAdSlot='2302299472' />
				</aside>
			</div>
		</div>
	)
}
