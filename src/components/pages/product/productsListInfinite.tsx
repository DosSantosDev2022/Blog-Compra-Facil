// components/products/ProductsListInfinite.tsx
'use client'; // Marca como Client Component

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { ProductCard } from '@/components/global/products'; // Seu ProductCard
import { getProducts } from '@/services/getProducts'; // Sua função getProducts
import type { Products } from '@/@types/hygraphTypes';


interface ProductsListInfiniteProps {
  initialProducts: Products[]; // Produtos iniciais carregados pelo Server Component
  initialHasMore: boolean; // Se há mais produtos inicialmente
  currentCategory: string; // Categoria atual selecionada
}

export function ProductsListInfinite({ initialProducts, initialHasMore, currentCategory }: ProductsListInfiniteProps) {
  const { ref, inView } = useInView({
    threshold: 0, // Quando o elemento está visível 0% já dispara
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['products', currentCategory], // Chave de cache para o React Query
    queryFn: async ({ pageParam = 1 }) => { // pageParam é o número da página
      const { products, hasMore } = await getProducts({
        category: currentCategory,
        page: pageParam,
        limit: 50, // Defina o limite de produtos por requisição
      });
      return { products, hasMore, currentPage: pageParam };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Retorna o número da próxima página se houver mais, senão undefined
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialData: {
      pages: [{ products: initialProducts, hasMore: initialHasMore, currentPage: 1 }],
      pageParams: [1],
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache "stale"
  });

  useEffect(() => {
    // Quando o ref (elemento sentinel) entra em vista e há próxima página
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Achata os dados de todas as páginas em um único array de produtos
  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  if (isLoading && allProducts.length === 0) {
    return <p className="text-center text-muted-foreground">Carregando produtos...</p>;
  }

  if (isError) {
    console.error("Erro ao carregar produtos:", error);
    return <p className="text-center text-red-500">Erro ao carregar produtos: {(error as Error).message}</p>;
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:p-3 p-2'>
        {allProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            imageUrl={product.image.url}
            description={product.description}
            slug={product.slug}
          />
        ))}
      </div>

      {/* Elemento sentinel para o Intersection Observer */}
      <div ref={ref} className="flex justify-center p-4">
        {isFetchingNextPage && (
          <p className="text-center text-primary">Carregando mais produtos...</p>
        )}
        {!hasNextPage && allProducts.length > 0 && !isFetchingNextPage && (
          <p className="text-center text-muted-foreground">Você chegou ao final da lista de produtos.</p>
        )}
      </div>
    </>
  );
}