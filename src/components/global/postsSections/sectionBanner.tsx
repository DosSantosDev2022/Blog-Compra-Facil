import { Badge } from '@/components/ui'
import { Carousel } from '@/components/ui/carousel'
import { getArticles } from '@/services/getArticles'
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
							quality={80}
							priority
							loading="eager"
							unoptimized
						/>
						<div className='absolute inset-0 bg-black opacity-50 z-0' />
						<div className='absolute inset-0 lg:p-10 flex flex-col justify-center items-start lg:items-center gap-3'>
							<div className='w-full lg:max-w-6xl p-4'>
								{article.category?.name && (
									<Badge size='lg' >{article.category.name}</Badge>
								)}
								<h2 className='mt-2 text-base lg:text-6xl font-bold text-primary-foreground'>
									{article.title}
								</h2>
							</div>
						</div>
					</Link>
				))}
			</Carousel>
		</>
	)
}

export { SectionBanner }
