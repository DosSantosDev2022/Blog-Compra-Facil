import type { RichTextContent } from '@graphcms/rich-text-types'
export interface Category {
	id: string // Ou number, dependendo do seu backend
	name: string
	slug: string
}

export interface CategoryResponse {
	categories?: Category[] // O '?' indica que 'categories' pode ser undefined enquanto os dados estão sendo carregados
}

type Products = {
	id: string
	name: string
	url: string
	description: string
	image: {
		url: string
	}
}

export interface Article {
	id: string
	slug: string
	title: string
	description: string
	coverImage: {
		url: string
	}
	category: {
		id: string
		name: string
		slug: string
		view: number
	}
	createdAt: string
	highlights: boolean
	content: {
		raw: RichTextContent
	}
	view: number
	product: Products[]
}

export type ArticleDetail = {
	article: Article
}

export type ArticleQueryResponse = {
	articles: Article[]
	totalCount: number;
}

/* artigos relacionados type */
export interface RelatedArticle {
	id: string
	slug: string
	title: string
	coverImage: {
		url: string
	}
	category: {
		name: string
	}
	createdAt: string
}

export type RelatedArticleResponse = {
	articles: RelatedArticle[]
}
