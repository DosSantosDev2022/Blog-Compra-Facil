import { Badge } from '@/components/ui'
import {
	Avatar,
	AvatarContainer,
	AvatarLabel,
	AvatarName,
	AvatarWrapper,
} from '@/components/ui/avatar'
import { Carousel } from '@/components/ui/carousel'
import { getArticles } from '@/services/getArticles'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

const SectionBanner = async () => {
	const { articles } = await getArticles()

	const postsPerHour = 5

	const epochDate = new Date('2000-01-01T00:00:00Z')

	const now = new Date()

	const differenceInMilliseconds = now.getTime() - epochDate.getTime()
	const millisecondsPerHour = 1000 * 60 * 60 // 1000ms * 60s * 60min
	const hoursSinceEpoch = Math.floor(
		differenceInMilliseconds / millisecondsPerHour,
	)

	const startIndex = (hoursSinceEpoch * postsPerHour) % articles.length

	let articlesForCarousel = []

	articlesForCarousel = articles.slice(
		startIndex,
		startIndex + postsPerHour,
	)

	if (articlesForCarousel.length < postsPerHour) {
		const remainingPostsCount = postsPerHour - articlesForCarousel.length
		articlesForCarousel = [
			...articlesForCarousel,
			...articles.slice(0, remainingPostsCount),
		]
	}

	if (articlesForCarousel.length === 0) {
		return null
	}

	return (
		<>
			<Carousel autoPlay>
				{articlesForCarousel.map((article) => (
					<Link
						href={`/article/${article.slug}`}
						key={article.id}
						className='relative w-full h-full'
					>
						<Image
							src={article.coverImage?.url || ''}
							alt={article.title || ''}
							fill
							className='object-cover object-center'
							quality={100}
							priority
							unoptimized
						/>
						<div className='absolute inset-0 bg-black opacity-40 z-0' />
						<div className='absolute inset-0 p-10 flex flex-col justify-center items-start lg:items-center gap-3'>
							<div className='max-w-full lg:max-w-5xl p-4'>
								{article.category?.name && (
									<Badge size='lg'>{article.category.name}</Badge>
								)}
								<h2 className='mt-2 text-lg lg:text-5xl font-bold text-primary-foreground'>
									{article.title}
								</h2>
								<div className='flex flex-col items-center space-y-6 mt-2'>
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
						</div>
					</Link>
				))}
			</Carousel>
		</>
	)
}

export { SectionBanner }
