import { keywords } from '@/metadata/keyWords';
import type { Metadata } from "next";

const dominio = 'https://www.comprafacil.blog/posts'
const title = 'Compra Fácil | Todos os Reviews e Guias'

export const postsMetaData: Metadata = {
  title: title,
  description: 'Explore todos os reviews, análises e guias de compra do Blog Compra Fácil. Encontre o produto ideal, com o melhor custo-benefício, e faça a sua Compra Fácil e informada.',
  keywords: keywords,
  authors: [{ name: 'Compra Fácil', url: dominio }],
  openGraph: {
    title: title,
    description: 'Veja todos os reviews de produtos, análises e guias de compra para fazer a melhor escolha.',
    url: dominio,
    siteName: 'Compra Fácil',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Capa do Blog Compra Fácil com diversos reviews de produtos',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compra Fácil - Reviews e Guias de Compra',
    description: 'Explore todos os reviews de produtos e guias de compra.',
    creator: '@CompraFacilBlog',
    images: ['/og-image.png'],
  },
  metadataBase: new URL(dominio),
}