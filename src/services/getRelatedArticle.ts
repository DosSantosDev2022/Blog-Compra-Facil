import { HygraphQuery } from '@/app/api/cms/hygraph'
import type {RelatedArticle, RelatedArticleResponse } from '@/@types/hygraphTypes'

export const getRelatedArticle = async (
	categoryName: string,
	excludeSlug: string,
): Promise<RelatedArticleResponse> => {
	const query = `
    query RelatedArticles($name: String!, $excludeSlug: String!) {
      articles(
        where: {
          category: { name: $name },
          slug_not: $excludeSlug
        },
        orderBy: createdAt_DESC,
        first: 5
      ) {
        id
        title
        slug
        createdAt
        coverImage {
          url
        }
        category {
         name
        }
      }
    }
   `
	const variables = { name: categoryName, excludeSlug }
  const data = await HygraphQuery<{ articles: RelatedArticle[] }>(query, variables, {
    revalidate: 60 * 60 * 4, // revalida a cada 4 horas
  })
	return {articles: data?.articles || []}
}
