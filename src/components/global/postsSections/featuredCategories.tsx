import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { getCategories } from '@/services/getCategories'

const FeaturedCategories = async () => {
	const { categories } = await getCategories()

	return (
		<div className=''>
			<SectionTitle title='Categorias em Destaque' />
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3'>
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
						<div className='bg-secondary bg-opacity-50 rounded-md p-2 z-50'>
							<h3 className='font-semibold text-lg text-center text-secondary-foreground'>
								{category.name}
							</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export { FeaturedCategories }
