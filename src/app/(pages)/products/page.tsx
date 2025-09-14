// app/products/page.tsx
import { AdBanner } from '@/components/global/google';
import { SectionTitle } from '@/components/global/sectionTitle';
import { ProductsListInfinite } from '@/components/pages/product/productsListInfinite';
import { productsMetaData } from '@/metadata/productsMetaData';
import { getProducts } from '@/services/getProducts';
import Link from 'next/link';

export const revalidate = 86400;

interface ProductsPageParams {
	searchParams: Promise<{ category?: string }>;
}

export const metadata = productsMetaData;

export default async function ProductsPage({
	searchParams,
}: ProductsPageParams) {
	const category = (await searchParams).category || 'Todos';

	// Busque apenas a primeira página de produtos no servidor
	const { products: initialProducts, categoryProducts, hasMore: initialHasMore } = await getProducts({
		category: category,
		page: 1,
		limit: 12, // O mesmo limite que você usará no Client Component
	});

	return (
		<div className='py-8 lg:mt-32 mt-8'>
			<SectionTitle title='Produtos recomendados' />
			{/* menu de categorias */}
			<div className='sticky top-0 z-10 flex w-full items-center justify-between h-14 text-primary-foreground lg:px-12 lg:py-8 p-2 my-6'>
				<ul className='flex items-center gap-2 overflow-x-auto p-2'>
					<li
						aria-label='todos-produtos'
						className={`text-xs lg:text-sm flex-shrink-0 duration-300 transition-all px-3 py-1.5 rounded-2xl ${category === 'Todos' ? 'bg-primary-hover' : 'bg-primary hover:bg-primary-hover'}`}
					>
						<Link aria-label='link-todos-produtos' href={'/products'}>
							Todos produtos
						</Link>
					</li>
					{categoryProducts.map((cat) => (
						<li
							aria-label={cat.name}
							key={cat.id}
							className={`text-xs lg:text-sm flex-shrink-0 duration-300 transition-all px-3 py-1.5 rounded-2xl ${category === cat.name ? 'bg-primary-hover' : 'bg-primary hover:bg-primary-hover'}`}
						>
							<Link
								aria-label={`link-${cat.name}`}
								href={`/products${cat.name === 'Todos' ? '' : `?category=${cat.name}`}`}
							>
								{cat.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			{/* lista de produtos */}
			<div className='flex-grow overflow-y-auto scrollbar-custom lg:p-3 border border-border rounded-xl bg-secondary/20'>
				{/* Renderiza o Client Component com os dados iniciais */}
				<ProductsListInfinite
					initialProducts={initialProducts}
					initialHasMore={initialHasMore}
					currentCategory={category}
				/>
			</div>

			<div className='p-2 mb-8'>
				{/* anúncio horizontal 2 */}
				<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
			</div>
		</div>
	);
}