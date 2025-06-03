import type { Metadata } from "next";

const dominio = 'https://www.ontech.blog/products'
const title = 'OnTech Blog | Produtos Recomendados'

export const productsMetaData: Metadata = {
title: title,
  description:
    'Confira nossa seleção de produtos recomendados sobre tecnologia: smartphones, notebooks, periféricos, acessórios e mais.',
  keywords: [
    'produtos de tecnologia',
    'smartphones',
    'notebooks',
    'acessórios tech',
    'gadgets',
    'produtos recomendados',
    'tecnologia',
    'hardware',
    'periféricos',
    'review de produtos',
    'dicas de compra',
    'comparativo de produtos',
    'melhores produtos de tecnologia',
    'promoções',
    'recomendações tech',
    'fones bluetooth',
    'teclado mecânico',
    'mouse gamer',
    'monitor',
    'setup gamer',
    'carregadores',
    'powerbank',
    'tecnologia para o dia a dia',
    'wearables',
    'dispositivos inteligentes',
    'produtos para home office',
    'compras online',
    'produtos para produtividade'
  ],
  openGraph: {
    title: 'Produtos Recomendados | Blog Tech',
    description:
      'Veja os melhores produtos de tecnologia recomendados pelo Blog onTech. Atualizado regularmente com novidades e promoções.',
    url: dominio,
    siteName: 'OnTech Blog',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Produtos de tecnologia recomendados pelo Blog onTech',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description:
      'Conheça os melhores produtos de tecnologia recomendados pelo Blog onTech.',
    images: ['/og-image.png'],
    creator: '@SeuTwitter',
  },
  metadataBase: new URL(dominio),
}