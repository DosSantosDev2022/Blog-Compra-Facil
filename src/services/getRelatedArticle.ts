import { HygraphQuery } from '@/app/api/cms/hygraph'
import type { RelatedArticleResponse } from '@/@types/hygraphTypes'


export const getRelatedArticle = async (
	categoryName: string,
	currentSlug: string,
): Promise<RelatedArticleResponse> => {
	const query = `
    query RelatedArticles($name: String!, $currentSlug: String!) {
      articles(
        where: {
          category: { name: $name },
          slug_not: $currentSlug
        },
        orderBy: createdAt_DESC,
        first: 10
      ) {
        id
        title
        slug
        createdAt
        coverImage {
          url
        }
      }
    }
   `
   const variables = { name: categoryName, currentSlug }
	return HygraphQuery(query, variables, {
		revalidate: 60 * 60 * 60 ,
	})
}