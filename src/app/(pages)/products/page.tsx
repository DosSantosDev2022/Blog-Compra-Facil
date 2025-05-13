import { AdBanner } from '@/components/global/google'
import { ProductCard } from '@/components/global/products'
import { SectionTitle } from '@/components/global/sectionTitle'
import { getProducts } from '@/services/getProducts'
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
		<div className='py-8 lg:mt-32 mt-8'>
			<SectionTitle title='Produtos recomendados' />
			<div className='flex w-full items-center justify-between h-10 rounded-2xl border border-border text-primary-foreground px-12 py-8 mt-6'>
				<ul className='flex items-center gap-2 overflow-x-auto scrollbar-none'>
					<li
						aria-label='todos-produtos'
						className='text-xs lg:text-sm flex-shrink-0 hover:scale-95 duration-300 transition-all bg-primary-hover px-3 py-1.5 rounded-2xl'
					>
						<Link aria-label='link-todos-produtos' href={'/products'}>
							Todos produtos
						</Link>
					</li>
					{categoryProducts.map((category) => (
						<li
							aria-label={category.name}
							key={category.id}
							className='text-xs lg:text-sm flex-shrink-0 hover:scale-95 duration-300 bg-primary-hover transition-all px-3 py-1.5 rounded-2xl'
						>
							<Link
								aria-label={`link-${category.name}`}
								href={`/products${category.name === 'Todos' ? '' : `?category=${category.name}`}`}
							>
								{category.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='grid lg:grid-cols-4 grid-cols-1 gap-3 p-3 border border-border rounded-2xl shadow mt-16'>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						imageUrl={product.image.url}
						description={product.description}
						LinkUrl={product.url}
					/>
				))}
			</div>

			{/* anúncio horizontal 2 */}
			{/* 	<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' /> */}
		</div>
	)
}
