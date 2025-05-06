import type { Article } from '@/@types/hygraphTypes'
import { CardImage } from '@/components/ui'

interface HeroSectionProps {
	articles: Article[]
}

const HeroSection = ({ articles }: HeroSectionProps) => {
	const articleshighlights = articles.find((a) => a.highlights === true)

	return (
		<div className='grid grid-cols-1 lg:grid-cols-5 gap-4 w-full h-auto'>
			{/* Post Principal */}
			<CardImage
				image={articleshighlights?.coverImage.url || ''}
				title={articleshighlights?.title}
				className=' h-96 lg:h-full lg:col-span-2'
			/>

			{/* Container para os posts menores */}
			<div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-scroll max-h-[628px] '>
				{articles.map((article) => (
					<CardImage
						key={article.id}
						image={article.coverImage?.url}
						title={article.title}
						className=' h-64 md:h-74'
					/>
				))}
				<CardImage
					image='https://placehold.co/600x400'
					title='Post de destaque'
					className=' h-64 md:h-74'
				/>
				<CardImage
					image='https://placehold.co/600x400'
					title='Post de destaque'
					className=' h-64 md:h-74'
				/>
				<CardImage
					image='https://placehold.co/600x400'
					title='Post de destaque'
					className=' h-64 md:h-74'
				/>
			</div>
		</div>
	)
}

export { HeroSection }
