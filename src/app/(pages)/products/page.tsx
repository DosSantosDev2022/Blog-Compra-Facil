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
			{/* menu de categorias */}
			<div className='sticky top-0 z-10 flex w-full items-center justify-between h-14 text-primary-foreground lg:px-12 lg:py-8 p-2 my-6'>
				<ul className='flex items-center gap-2 overflow-x-auto scrollbar-custom p-2'>
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
			{/* lista de produtos */}
			<div className='flex-grow overflow-y-auto max-h-[520px] scrollbar-custom lg:p-3 border border-border rounded-xl bg-secondary/20'>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:p-3 p-2'>
					{products.map((product) => (
						<ProductCard
							key={product.id}
							name={product.name}
							imageUrl={product.image.url}
							description={product.description}
							slug={product.slug}
						/>
					))}
				</div>
			</div>


			<div className='p-2  mb-8'>
				{/* anúncio horizontal 2 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	)
}
