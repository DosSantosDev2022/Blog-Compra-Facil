import type { Article } from '@/@types/hygraphTypes'
import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'

interface VariableArticlesProps {
	articles: Article[]
}

const VariableArticles = ({ articles }: VariableArticlesProps) => {
	return (
		<div className='space-y-3'>
			<SectionTitle path='/noticias/recentes' title='Todos os artigos' />
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full h-auto'>
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
				<CardImage
					image='https://placehold.co/600x400'
					title='Post de destaque'
					className=' h-64 md:h-74'
				/>
			</div>
		</div>
	)
}

export { VariableArticles }
