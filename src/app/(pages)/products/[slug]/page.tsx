import { RichText } from "@/components/global/posts/richText"
import { defaultRenders } from "@/components/global/richTextRenders"
import { Badge, Button } from "@/components/ui"
import { productsMetaData } from "@/metadata/productsMetaData"
import { getDetailsProducts } from "@/services/getDetailsProduct"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 86400

interface ProductDetailsPageParams {
  params: Promise<{ slug: string }>
}

export const metadata = productsMetaData

export default async function ProductDetailsPage({ params }: ProductDetailsPageParams) {
  const { product, relatedProducts } = await getDetailsProducts((await params).slug)

  if (!product) {
    // Tratar o caso de produto não encontrado
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className='space-y-8 lg:mt-20 mt-4 px-2 sm:px-3 lg:px-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <main className='order-1 lg:col-span-8 col-span-full'>
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* header e infos principais */}
              <div className="flex flex-col w-full">
                {/* header */}
                <div className="space-y-2 p-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center justify-between">
                    <Badge size="lg">
                      {product.category.name}
                    </Badge>
                  </div>
                </div>

                {/* Imagem e Descrição */}
                <div className="flex flex-col lg:flex-row items-start p-2 gap-4">
                  <div className="w-full md:w-1/2 h-64 md:h-96 relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                      alt={product.name}
                      src={product.image.url}
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0"
                    />
                  </div>
                  {/* Infos */}
                  <div className="flex flex-col gap-4 justify-between p-2 w-full md:w-1/2 min-h-[150px] md:min-h-[384px]">
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{product.description}</p>
                    {product.affiliateLinks.map((link) => (
                      <div key={link.id}>
                        <div className="flex items-center gap-1.5 p-2 mb-2">
                          <p>{`Compre agora no ${link.name}`}</p>
                          <Image
                            alt={`logo marca do ${link.name}`}
                            src={link.icon.url}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <Button variants="shine" sizes="full" asChild>
                          <Link target="_blank" href={link.link}>
                            Comprar agora!
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* details */}
            <div className="p-2 mt-6"> {/* Espaçamento superior ajustado */}
              <div className="bg-secondary px-6 py-3 rounded-2xl mb-6"> {/* Reduzido o mb para menos espaço */}
                <p className="text-2xl sm:text-3xl font-bold">Ficha técnica</p> {/* Tamanho de texto responsivo */}
              </div>

              <article className='space-y-2 px-6 py-3  bg-secondary/40 rounded-xl text-base sm:text-lg p-2 leading-relaxed'> {/* Tamanho de texto responsivo e melhor legibilidade */}
                {product.technicalsheet?.raw ? (
                  <RichText
                    content={product.technicalsheet.raw}
                    renderers={defaultRenders}
                  />
                ) : (
                  <p className='text-muted-foreground'>
                    Conteúdo não disponível.
                  </p>
                )}
              </article>
            </div>

            {/* video review */}
            <div className="p-2 mt-6"> {/* Espaçamento superior ajustado */}
              <div className="bg-secondary px-3 py-2 rounded-2xl mb-6"> {/* Reduzido o mb para menos espaço */}
                <p className="text-2xl sm:text-3xl font-bold">Vídeo review</p> {/* Tamanho de texto responsivo */}
              </div>
              {/* player de vídeo review */}
              {product.videoReviewUrl && (
                <div className="relative aspect-video w-full">
                  <iframe
                    src={product.videoReviewUrl}
                    title="Video Review"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className='order-2 lg:block space-y-8 lg:col-span-4 col-span-full p-4'> {/* col-span-full para mobile */}
          <div className="bg-secondary px-3 py-2 rounded-2xl">
            <p className="text-lg font-semibold">Produtos relacionados</p> {/* Melhor visibilidade do texto */}
          </div>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((p) => (
              <Link href={`/products/${p.slug}`} key={p.id} className="block group">
                <div className="flex bg-secondary/30 gap-6 p-3 rounded-lg shadow-md overflow-hidden transition-transform transform group-hover:scale-105 duration-300">
                  {/* Imagem - Lado Esquerdo */}
                  <div className="relative w-1/3 h-28 flex-shrink-0"> {/* Ajustado para 1/3 da largura e altura fixa */}
                    <Image
                      src={p.image.url}
                      alt={p.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-l-lg" // Arredonda apenas o lado esquerdo
                    />
                  </div>
                  {/* Conteúdo (Título e Descrição) - Lado Direito */}
                  <div className="flex flex-col justify-center  w-2/3"> {/* Ocupa os 2/3 restantes */}
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                    {/* Se você tiver uma descrição curta para produtos relacionados, pode adicioná-la aqui */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {p.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground">Nenhum produto relacionado encontrado.</p>
          )}

          <div className='bg-secondary/40 px-2.5 py-1.5 h-10 flex items-center rounded-2xl'>
            <p className='text-sm text-muted-foreground space-y-2'>
              Anúncios
            </p>
          </div>

          <div className="mt-2">
            {/* bloc de anúncios proprios ( afiliados ) */}
          </div>
        </aside>
      </div>
    </div>
  )
}