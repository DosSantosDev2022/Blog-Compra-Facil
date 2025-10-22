import { keywords } from '@/metadata/keyWords';
import type { Metadata } from "next";

const dominio = 'https://blog-compra-facil.vercel.app/' // Sugestão: Altere aqui para o seu novo domínio.

export const homeMetaData: Metadata = {
  title: 'Compra Fácil - Reviews e Análises de Produtos',
  description: 'Procurando o melhor produto para comprar? Confira reviews detalhados, análises honestas e guias de compra de diversos produtos. Transforme sua pesquisa em uma Compra Fácil e inteligente.',
  keywords: keywords,
  authors: [{ name: 'Compra Fácil', url: dominio }],
  openGraph: {
    title: 'Compra Fácil - Reviews e Análises de Produtos',
    description: 'Análises de produtos e guias de compra para você fazer a escolha certa.',
    url: dominio,
    siteName: 'Compra Fácil',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imagem de destaque do Compra Fácil',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compra Fácil - Reviews e Análises',
    description: 'Reviews e guias de compra para a sua próxima aquisição.',
    creator: '@CompraFacilBlog',
    images: ['/og-image.png'],
  },
  metadataBase: new URL(dominio),
}