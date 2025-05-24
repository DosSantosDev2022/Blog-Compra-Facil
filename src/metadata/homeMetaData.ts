import type { Metadata } from "next";
import {keywords} from '@/metadata/keyWords'

const dominio = 'https://on-tech-rho.vercel.app/'

export const homeMetaData: Metadata = {
  title: 'onTech Blog - home',
  description: 'Confira as últimas notícias, categorias em destaque e conteúdos mais vistos aqui no onTech Blog. Fique por dentro das novidades do mundo da tecnologia.',
  keywords: keywords,
  authors: [{ name: 'onTech Blog', url: dominio }],
  openGraph: {
    title: 'onTech Blog',
    description: 'Fique por dentro das últimas notícias do mundo da tecnologia.',
    url: dominio,
    siteName: 'onTech Blog',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imagem de destaque do onTech Blog',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'onTech Blog',
    description: 'Fique por dentro das últimas notícias do mundo da tecnologia',
    creator: '@onTechBlog',
    images: ['/og-image.png'],
  },
  metadataBase: new URL(dominio),
}