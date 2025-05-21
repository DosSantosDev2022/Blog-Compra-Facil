import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { getCategories } from '@/services/getCategories'
import { Badge } from '@/components/ui'

const FeaturedCategories = async () => {
	const { categories } = await getCategories()

	return (
		<div className=''>
			<SectionTitle title='Categorias em Destaque' />
			<div className='flex gap-2 mt-3 overflow-x-auto scrollbar-custom'>
				{categories.map((category) => (
					<Link
						key={category.slug}
						href={`/category/${category.slug}`}
						className='h-32 sm:h-48 w-full flex items-center justify-center rounded-md bg-cover bg-center relative'
						style={{
							backgroundImage: `url('${category.coverImage?.url || ''}')`,
						}}
					>
						<div className='absolute inset-0 bg-gradient-to-t from-primary/70' />
						<div className='px-10 z-10 '>
							<Badge className='text-center text-xs lg:text-xl' size='md'>
								{category.name}
							</Badge>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export { FeaturedCategories }
