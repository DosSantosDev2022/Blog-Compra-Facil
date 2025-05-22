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
			<Carousel autoPlay>
				{articles.map((article) => (
					<div key={article.id} className='relative w-full'>
						<Image
							src={article.coverImage.url}
							alt={article.title}
							fill
							className='object-cover object-center'
							quality={100} // ajuste conforme necessidade
							priority // se for importante no primeiro load
						/>
						<div className='absolute inset-0  p-8 flex flex-col justify-center items-start lg:items-center gap-3 z-10'>
							<div className='border max-w-full lg:max-w-7xl'>
								{article.category?.name && (
									<Badge size='lg'>{article.category.name}</Badge>
								)}
								<h2 className='mt-2 text-2xl lg:text-6xl font-bold leading-tight'>
									{article.title}
								</h2>
								{article.createdAt && (
									<p className='mt-1 text-lg'>
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
		</>
	)
}

export { SectionBanner }
