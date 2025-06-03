import { AdBanner } from '@/components/global/google'
import { ProductCard } from '@/components/global/products'
import { SectionTitle } from '@/components/global/sectionTitle'
import { productsMetaData } from '@/metadata/productsMetaData'
import { getProducts } from '@/services/getProducts'
import Link from 'next/link'

export const revalidate = 86400

interface ProductsPageParams {
	searchParams: Promise<{ category: string }>
}

export const metadata = productsMetaData

export default async function ProductsPage({
	searchParams,
}: ProductsPageParams) {
	const category = (await searchParams).category
	const { products, categoryProducts } = await getProducts(category)

	return (
		<div className='py-8 lg:mt-32 mt-8'>
			<SectionTitle title='Produtos recomendados' />
			<div className='flex w-full items-center justify-between h-10 text-primary-foreground px-12 py-8 mt-6'>
				<ul className='flex items-center gap-2 overflow-x-auto scrollbar-none'>
					<li
						aria-label='todos-produtos'
						className='text-xs lg:text-sm flex-shrink-0 bg-primary  duration-300 transition-all hover:bg-primary-hover px-3 py-1.5 rounded-2xl'
					>
						<Link aria-label='link-todos-produtos' href={'/products'}>
							Todos produtos
						</Link>
					</li>
					{categoryProducts.map((category) => (
						<li
							aria-label={category.name}
							key={category.id}
							className='text-xs lg:text-sm flex-shrink-0 duration-300 bg-primary hover:bg-primary-hover transition-all px-3 py-1.5 rounded-2xl'
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
			<div className='flex flex-wrap gap-4 p-3 mt-16'>
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

			<div className='p-2  mb-8'>
				{/* anúncio horizontal 2 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}
