import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'
import { Badge } from '@/components/ui'
import { CategoryBlock } from './categoryBlock'
import type { Category } from '@/@types/hygraphTypes'

interface FeaturedCategoriesProps {
	categories: Category[]
}

const FeaturedCategories = async ({
	categories,
}: FeaturedCategoriesProps) => {
	return (
		<div className='space-y-4 px-2'>
			<SectionTitle title='Categorias em Destaque' />
			<div className='flex justify-center items-center gap-2 mt-3 overflow-x-auto max-w-[1320px] scrollbar-custom'>
				{categories.map((category) => (
					<Link
						key={category.slug}
						href={`/category/${category.slug}`}
						className='h-32 sm:h-48 w-full flex items-center justify-center rounded-md bg-cover bg-center relative'
						style={{
							backgroundImage: `url('${category.coverImage?.url || ''}')`,
						}}
					>
						<div className='absolute inset-0 bg-gradient-to-t from-primary/80' />
						<div className='px-10 z-10 '>
							<Badge className='text-center text-xs lg:text-xl w-40'>
								{category.name}
							</Badge>
						</div>
					</Link>
				))}
			</div>
			{categories.map((category) => (
				<div
					key={category.id}
					className='overflow-y-auto scrollbar-custom w-full p-2'
				>
					<CategoryBlock
						title={category.name || ''}
						categorySlug={category.slug || ''}
					/>
				</div>
			))}
		</div>
	)
}

export { FeaturedCategories }
