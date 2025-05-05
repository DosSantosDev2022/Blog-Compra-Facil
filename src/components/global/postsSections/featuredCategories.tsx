import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'

const FeaturedCategories = () => {
	return (
		<div className=''>
			<SectionTitle path='/categorias' title='Categorias em Destaque' />
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3'>
				<Link
					href='/categoria/politica'
					className='bg-gray-300 h-32 sm:h-48 flex items-center justify-center rounded-md'
				>
					<h3 className='font-semibold text-lg text-center'>Política</h3>
				</Link>
				<Link
					href='/categoria/economia'
					className='bg-gray-300 h-32 sm:h-48 flex items-center justify-center rounded-md'
				>
					<h3 className='font-semibold text-lg text-center'>Economia</h3>
				</Link>
				<Link
					href='/categoria/esportes'
					className='bg-gray-300 h-32 sm:h-48 flex items-center justify-center rounded-md'
				>
					<h3 className='font-semibold text-lg text-center'>Esportes</h3>
				</Link>
				<Link
					href='/categoria/tecnologia'
					className='bg-gray-300 h-32 sm:h-48 flex items-center justify-center rounded-md'
				>
					<h3 className='font-semibold text-lg text-center'>Tecnologia</h3>
				</Link>
			</div>
		</div>
	)
}

export { FeaturedCategories }
