import type { Article } from '@/@types/hygraphTypes'
import { CardImage } from '@/components/ui'
import { SectionTitle } from '../sectionTitle'
import { getArticles } from '@/services/getArticles'
import Link from 'next/link'

interface VariableArticlesProps {
	title: string
	categoryName: string
}

const VariableArticles = async ({
	title,
	categoryName,
}: VariableArticlesProps) => {
	const { articles } = await getArticles({
		orderBy: 'createdAt_DESC',
		where: 'category',
		categoryName,
		pageSize: 50,
	})
	return (
		<div className='space-y-3'>
			<SectionTitle title={title} />
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full h-auto'>
				{articles.map((article) => (
					<Link href={`/article/${article.slug}`} key={article.id}>
						<CardImage
							image={article.coverImage?.url}
							title={article.title}
							className=' h-64 md:h-74'
						/>
					</Link>
				))}
			</div>
		</div>
	)
}

export { VariableArticles }
