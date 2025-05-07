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

interface PagePostProps {
	params: {
		slug: string
	}
}

export default async function ArticlePage({ params }: PagePostProps) {
	const { article } = await getDetailsArticle(params.slug)

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
					<h1 className='text-3xl font-bold'>{article.title}</h1>
					<p className='text-muted-foreground'>
						{`Publicado em: ${format(article.createdAt, 'dd/MM/yyyy', { locale: ptBR })}`}
					</p>

					{/* Espaço para anúncio no topo do conteúdo */}
					<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md'>
						{/* Anúncio aqui */}
						Anúncio
					</div>

					<article className='space-y-4 text-lg'>
						<RichText
							content={article?.content?.raw}
							renderers={defaultRenders}
						/>
					</article>

					{/* Espaço para anúncio no meio do conteúdo */}
					<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md'>
						{/* Anúncio aqui */}
						Anúncio
					</div>

					{/* Área de compartilhamento */}
					<div className='mt-8 border-t border-gray-200 py-4'>
						<h3 className='text-lg font-semibold mb-2'>Compartilhe:</h3>
						<ShareButtons />
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
					{/* Espaço para anúncio na sidebar */}
					<div className='w-full h-48 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md'>
						{/* Anúncio aqui */}
						Anúncio
					</div>
				</aside>
			</div>
		</div>
	)
}
