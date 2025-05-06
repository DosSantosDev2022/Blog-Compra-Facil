import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'
import type { Article } from '@/@types/hygraphTypes'

interface MostViewedProps {
	articles: Article[]
}

const MostViewedPosts = ({ articles }: MostViewedProps) => {
	return (
		<div className=''>
			<SectionTitle path='' title='Posts mais vistos' />
			<div className='overflow-x-auto'>
				<div className='flex gap-4 w-auto mt-3'>
					{articles.map((article) => (
						<CardImage
							key={article.id}
							className='h-74 min-w-72'
							image={article.coverImage.url || ''}
							title={article.title}
						/>
					))}

					<CardImage
						className='h-74 min-w-72'
						image='https://placehold.co/600x400'
						title='PlaceHolder'
					/>
					<CardImage
						className='h-74 min-w-72'
						image='https://placehold.co/600x400'
						title='PlaceHolder'
					/>
					<CardImage
						className='h-74 min-w-72'
						image='https://placehold.co/600x400'
						title='PlaceHolder'
					/>
					<CardImage
						className='h-74 min-w-72'
						image='https://placehold.co/600x400'
						title='PlaceHolder'
					/>
					<CardImage
						className='h-74 min-w-72'
						image='https://placehold.co/600x400'
						title='PlaceHolder'
					/>
					{/* Adicione quantos posts forem necessários */}
				</div>
			</div>
		</div>
	)
}

export { MostViewedPosts }
