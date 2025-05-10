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

interface PagePostProps {
	params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PagePostProps) {
	const slug = (await params).slug
	const { article } = await getDetailsArticle(slug)
	await updateViewCount(article.id, article.view + 1)
	// Verifica se existe uma categoria associada
	const { articles: relatedArticles } = article.category
		? await getRelatedArticle(article.category.name, article.slug)
		: { articles: [] }

	return (
		<div className='container mx-auto py-8'>
			{/* Header com foto de destaque */}
			<div className='relative w-full lg:h-[520px] h-48 rounded-lg overflow-hidden'>
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
						<h1 className='text-3xl font-bold'>{article.title}</h1>
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

					{/* Espaço para anúncio no meio do conteúdo */}
					{/*  anúncio In-article */}
					<AdBanner dataAdFormat='fluid' dataAdSlot='6057711657' />

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
