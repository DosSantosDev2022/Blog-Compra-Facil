import type { Metadata } from "next";
import {keywords} from '@/metadata/keyWords'

const dominio = 'https://www.ontech.blog/posts'
const title = 'OnTech Blog | Todos os Posts'

export const postsMetaData: Metadata = { 
  title: title,
  description: 'Explore todos os artigos do Blog onTech sobre tecnologia, programação, inteligência artificial, gadgets, e muito mais.',
  keywords: keywords,
  authors: [{ name: 'onTech Blog', url: dominio }],
  openGraph: {
    title: title,
    description: 'Veja todos os artigos sobre tecnologia, programação, IA e mais no Blog onTech.',
    url: dominio,
    siteName: 'onTech Blog',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Capa do Blog onTech com artigos de tecnologia',
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