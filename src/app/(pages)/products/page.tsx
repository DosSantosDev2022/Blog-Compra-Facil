// app/products/page.tsx
import { SectionTitle } from '@/components/global';
import { ProductsListInfinite } from '@/components/pages/product/productsListInfinite';
import { productsMetaData } from '@/metadata/productsMetaData';
import { getProducts } from '@/services/getProducts';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

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
		<div className="mx-auto w-full max-w-7xl px-4 py-8 lg:mt-24 lg:py-12">
			<SectionTitle title="Produtos recomendados" />

			{/* Menu de categorias */}
			<div className="mb-8 mt-6">
				<ul className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
					<li
						aria-label="todos-produtos"
						className={twMerge(
							'rounded-2xl px-3 py-1.5 text-sm transition-all duration-300 hover:bg-muted',
							category === 'Todos' && 'bg-accent font-semibold',
						)}
					>
						<Link aria-label="link-todos-produtos" href={'/products'}>
							Todos produtos
						</Link>
					</li>
					{categoryProducts.map((cat) => (
						<li
							aria-label={cat.name}
							key={cat.id}
							className={twMerge(
								'rounded-2xl px-3 py-1.5 text-sm transition-all duration-300 hover:bg-muted',
								category === cat.name && 'bg-accent font-semibold',
							)}
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

			{/* Lista de produtos */}
			<div className="min-h-screen">
				<ProductsListInfinite
					initialProducts={initialProducts}
					initialHasMore={initialHasMore}
					currentCategory={category}
				/>
			</div>
		</div>
	);
}