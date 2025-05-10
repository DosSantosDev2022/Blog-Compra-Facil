import { AdBanner } from '@/components/global/google'
import { ProductCard } from '@/components/global/products'
import { SectionTitle } from '@/components/global/sectionTitle'
import { getProducts, type Product } from '@/services/getProducts'
import Link from 'next/link'

interface ProductsPageParams {
	searchParams: Promise<{ category: string }>
}

export default async function ProductsPage({
	searchParams,
}: ProductsPageParams) {
	const category = (await searchParams).category
	const { products, categoryProducts } = await getProducts(category)

	return (
		<div className='py-8 mt-32'>
			<SectionTitle title='Produtos recomendados' />
			<div className='flex w-full items-center justify-between h-10 rounded-2xl border border-border text-primary-foreground px-12 py-8 mt-6'>
				<ul className='flex items-center space-x-4'>
					<li className='hover:scale-95 duration-300 transition-all bg-primary-hover px-2 py-1.5 rounded-2xl'>
						<Link href={'/products'}>Todos produtos</Link>
					</li>
					{categoryProducts.map((category) => (
						<li
							className='hover:scale-95 duration-300 bg-primary-hover transition-all px-2 py-1.5 rounded-2xl'
							key={category.id}
						>
							<Link
								href={`/products${category.name === 'Todos' ? '' : `?category=${category.name}`}`}
							>
								{category.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='grid grid-cols-4 gap-3 p-3 border border-border rounded-2xl shadow mt-16'>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						imageUrl={product.image.url}
						description={product.description}
					/>
				))}
			</div>

			{/* anúncio horizontal 2 */}
			<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />

			{/* Adicionar paginação aqui (se necessário) */}
			<div className='mt-8 flex justify-center'>
				{/* <Button variant='outline' className='mr-2'>Anterior</Button>
        <Button variant='outline'>Próximo</Button> */}
			</div>
		</div>
	)
}
