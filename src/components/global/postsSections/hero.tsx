import { CardImage } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const HeroSection = async () => {
	const { articles } = await getArticles({
		where: 'highlights',
		pageSize: 50,
	})
	return (
		<section aria-label='Posts em destaque' className='lg:mt-40 mt-8'>
			<SectionTitle title='Posts em destaque' />
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-4 w-full h-auto overflow-y-scroll max-h-[628px] scrollbar-custom p-2 mt-6'>
				{/* Container para os posts menores */}
				{articles.map((article, index) => (
					<Link href={`/article/${article.slug}`} key={article.id}>
						<CardImage
							image={
								article.coverImage?.url || 'https://placehold.co/600x400'
							}
							title={article.title}
							category={article.category.name}
							label={format(article.createdAt, 'dd/MM/yyyy', {
								locale: ptBR,
							})}
							className={'h-74'}
						/>
					</Link>
				))}
			</div>
		</section>
	)
}

export { HeroSection }
