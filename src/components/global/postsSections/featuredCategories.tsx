import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { getCategories } from '@/services/getCategories'
import { Badge } from '@/components/ui'

const FeaturedCategories = async () => {
	const { categories } = await getCategories()

	return (
		<div className=''>
			<SectionTitle title='Categorias em Destaque' />
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3 overflow-x-auto scrollbar-custom'>
				{categories.map((category) => (
					<Link
						key={category.slug}
						href={`/category/${category.slug}`}
						className='h-32 sm:h-48 flex items-center justify-center rounded-md bg-cover bg-center relative'
						style={{
							backgroundImage: `url('${category.coverImage?.url || ''}')`,
						}}
					>
						<div className='absolute inset-0 bg-gradient-to-t from-primary/70' />
						<div className='bg-secondary bg-opacity-50 rounded-md p-2 z-10'>
							<Badge size='md'>{category.name}</Badge>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export { FeaturedCategories }
