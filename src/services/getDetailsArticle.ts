import { HygraphQuery } from '@/app/api/cms/hygraph'
import type { Article, ArticleDetail } from '@/@types/hygraphTypes'

export const getDetailsArticle = async (
	slug: string,
): Promise<ArticleDetail> => {
	const query = `
    query MyQuery($slug: String!) {
      article(where: {slug: $slug}) {
        id
        title
        slug
        description
        category {
          name
        }
        coverImage {
          url
        }
        content {
          raw
        }
       author{
          id
          name
          image {
            url
          }
        }
        createdAt
        product {
          id
          name
          url
          description
          image {
            url
          }
        }
      }
    }
   `
	const variables = { slug }
  
  const data = await HygraphQuery<{article: Article}>(query, variables, {
     revalidate: 60 * 60 * 24, // revalida a página a cada 24h
     tags: [`article-${slug}`],
  })
   
	return {article: data?.article || null}
}
