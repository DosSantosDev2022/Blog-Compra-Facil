import { Badge } from '@/components/ui'
import { Carousel } from '@/components/ui/carousel'
import { getArticles } from '@/services/getArticles'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

const SectionBanner = async () => {
	const { articles } = await getArticles()

	return (
		<>
			<div className='mx-auto mt-8 w-full max-w-full'>
				<Carousel autoPlay>
					{articles.map((article) => (
						<div
							key={article.id}
							className='relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden'
						>
							{' '}
							{/* Adicionamos 'relative' para posicionar o texto */}
							<Image
								width={1280}
								height={720}
								alt={article.title}
								src={article.coverImage?.url}
								className='object-cover w-full h-full'
								style={{
									maxWidth: '100%',
									height: 'auto%',
									display: 'block',
								}}
							/>
							{/* Adicionando a sobreposição de texto */}
							<div className='absolute inset-0 z-10 bg-gradient-to-t from-primary via-transparent to-transparent flex items-end p-6 text-white'>
								<div className='max-w-3xl'>
									{/* Categoria */}
									{article.category?.name && (
										<Badge>{article.category.name}</Badge>
									)}
									{/* Título */}
									<h2 className='mt-2 text-2xl font-bold leading-tight'>
										{article.title}
									</h2>
									{/* Data */}
									{article.createdAt && (
										<p className='mt-1 text-sm text-gray-400'>
											{format(article.createdAt, 'dd/MM/yyyy', {
												locale: ptBR,
											})}
										</p>
									)}
								</div>
							</div>
						</div>
					))}
				</Carousel>
			</div>
		</>
	)
}

export { SectionBanner }
