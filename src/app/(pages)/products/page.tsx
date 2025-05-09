import { AdBanner } from '@/components/global/google'
import { ProductCard } from '@/components/global/products'
import { SectionTitle } from '@/components/global/sectionTitle'
import { getProducts, type Product } from '@/services/getProducts'
import Link from 'next/link'

interface ProductsPageParams {
	searchParams: {
		category: string
	}
}

export default async function ProductsPage({
	searchParams,
}: ProductsPageParams) {
	const { products } = (await getProducts(searchParams.category)) as {
		products: Product[]
	}

	// Vamos supor que seus produtos têm uma propriedade 'category'
	const categories = [
		...new Set(
			products.map((product) => product.category).filter(Boolean),
		),
	] as string[]
	const allCategories = ['Todos', ...categories]
	return (
		<div className='container mx-auto py-8'>
			<SectionTitle title={'Produtos recomendados'} />
			<div className='flex items-center justify-between h-10 rounded-2xl bg-primary/90 text-primary-foreground px-12 py-8 mt-6'>
				<ul className='flex space-x-4'>
					{allCategories.map((category) => (
						<li key={category}>
							<Link
								href={`/products${category === 'Todos' ? '' : `?category=${category}`}`}
								className='hover:underline'
							>
								{category}
							</Link>
						</li>
					))}
				</ul>
			</div>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					name={product.name}
					imageUrl={product.image.url}
					description={product.description}
				/>
			))}

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
