import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'

const FeaturedCategories = () => {
	const categoriesData = [
		{
			name: 'Política',
			slug: 'politica',
			imageUrl:
				'https://us-west-2.graphassets.com/cmab14f0g14v907lqfxega1a9/cmacuipomevna07mxi2mkvngh',
		},
		{
			name: 'Economia',
			slug: 'economia',
			imageUrl:
				'https://us-west-2.graphassets.com/cmab14f0g14v907lqfxega1a9/cmacuippgevng07mx6m50seki',
		},
		{
			name: 'Esportes',
			slug: 'esportes',
			imageUrl:
				'https://us-west-2.graphassets.com/cmab14f0g14v907lqfxega1a9/cmacuipp2exsk07n8fm2ntnav',
		},
		{
			name: 'Tecnologia',
			slug: 'tecnologia',
			imageUrl:
				'https://us-west-2.graphassets.com/cmab14f0g14v907lqfxega1a9/cmacuipp5exso07n88zgfab3s',
		},
		// ... outras categorias
	]

	return (
		<div className=''>
			<SectionTitle path='/categorias' title='Categorias em Destaque' />
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3'>
				{categoriesData.map((category) => (
					<Link
						key={category.slug}
						href={`/category/${category.slug}`}
						className='h-32 sm:h-48 flex items-center justify-center rounded-md bg-cover bg-center relative'
						style={{ backgroundImage: `url('${category.imageUrl}')` }}
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
