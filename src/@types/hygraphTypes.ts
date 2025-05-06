import type { RichTextContent } from '@graphcms/rich-text-types'
export interface Category {
  id: string; // Ou number, dependendo do seu backend
  name: string;
  slug: string;
}

export interface CategoryResponse {
  categories?: Category[]; // O '?' indica que 'categories' pode ser undefined enquanto os dados estão sendo carregados
}

export interface Article {
  id: string
  slug: string
  title : string
  description : string
  coverImage:{
    url: string
  }
  category: {
    name: string
  }
  createdAt: string
  highlights: boolean
  content: {
    raw : RichTextContent
  }
}

export type ArticleQueryResponse = {
  articles: Article[]
}
