import { HygraphQuery } from '@/app/api/cms/hygraph'
import type {ArticleDetail} from '@/@types/hygraphTypes'


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
        createdAt
        view
      }
    }
   `
	const variables = { slug }
	return HygraphQuery(query, variables, {
		cache: 'no-cache',
	})
}