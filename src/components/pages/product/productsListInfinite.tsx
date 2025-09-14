// components/products/ProductsListInfinite.tsx
'use client'; // Marca como Client Component

import type { Products } from '@/@types/hygraphTypes';
import { Button, Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui';
import { getProducts } from '@/services/getProducts'; // Sua função getProducts
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


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
          <Card key={product.id} className='w-full max-w-xl p-4 flex flex-col justify-between'>
            <div className='relative w-full h-46 overflow-hidden rounded-md'>
              <Image
                src={product.image.url}
                alt={product.name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <CardContent className='p-0 space-y-2'>
              <CardTitle className='lg:text-base pt-2'>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <CardFooter className='p-0'>
                {product.affiliateLinks.map((affiliateLink) => (
                  <Button key={affiliateLink.id} variants='primary' sizes='full' asChild>
                    <Link target='_blank' href={affiliateLink.link}>
                      Comprar no {affiliateLink.name}
                    </Link>
                  </Button>
                ))}
              </CardFooter>
            </CardContent>
          </Card>
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