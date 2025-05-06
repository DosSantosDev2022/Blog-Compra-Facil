import type { Article, ArticleQueryResponse } from '@/@types/hygraphTypes'
import { HygraphQuery } from '@/app/api/hygraph'

export const getArticleCategories = async (
	slug: string,
	page: number,
	pageSize: number,
): Promise<ArticleQueryResponse> => {
	const query = `
      query MyQuery($slug: String!, $first: Int, $skip: Int) {
      articles(where: {category: {_search: $slug}}, first: $first, skip: $skip)  {
        id
        slug
        title
        description
        coverImage {
          url
        }
        category {
          name
        }
        createdAt
        highlights
        content {
          raw
        }
      }
    }
  `

	const skip = (page - 1) * pageSize
	const variables = { slug, first: pageSize, skip }
	const {articles} =
		await HygraphQuery<ArticleQueryResponse>(query, variables,{cache: 'no-cache', revalidate: 0})

	return {articles}
}