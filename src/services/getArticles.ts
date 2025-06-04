import type { Article, ArticleQueryResponse } from '@/@types/hygraphTypes'
import { HygraphQuery } from '@/app/api/cms/hygraph'

interface ArticleQueryOptions {
	page?: number
	pageSize?: number
	where?: 'highlights' | 'category' | 'search'
	categorySlug?: string
	search?: string
	excludeSlug?: string
	orderBy?: 'createdAt_ASC' | 'createdAt_DESC'
}

export const getArticles = async (
	options: ArticleQueryOptions = {},
): Promise<ArticleQueryResponse> => {
	const {
		page = 1,
		pageSize = 50,
		where,
		search,
		categorySlug,
		excludeSlug,
	} = options

	const skip = (page - 1) * pageSize

	const query = `
    query ArticlesQuery(
      $first: Int!, 
      $skip: Int!,
      $where: ArticleWhereInput,
      $orderBy: ArticleOrderByInput
    ) {
      articles (
        first: $first,
        skip: $skip,
        where: $where,
        orderBy: $orderBy
      ) {
        id
        slug
        title
        category {
         name
        }
        coverImage {
          url
        }
      author {
        id
        name
        image {
          url
          }
        }
        createdAt
      }
      articlesConnection(where: $where) {
        aggregate {
        count
      }
    }
   }
  `
	
	// Mapeia dinamicamente o filtro `where`
  let whereClause: Record<string, unknown> = {}

  const orderBy: string = options.orderBy || 'createdAt_DESC'

  // Lógica para mapear dinamicamente o filtro `where` e a ordenação
  if (where === 'highlights') {
    whereClause = { highlights: true }
  } else if (where === 'category') {
    whereClause = { category: { slug: categorySlug } }
  } else if (where === 'search') {
    whereClause = { _search: search }
  }
 
  // Se excludeSlug estiver presente, adicione ao whereClause
  if (excludeSlug) {
    // Usar 'AND' para combinar com outros filtros existentes
    whereClause = {
      AND: [
        whereClause, // Inclui os filtros anteriores
        { slug_not: excludeSlug },
      ],
    }
  }

	const variables: Record<string, unknown> = {
		first: pageSize,
		skip,
		where: whereClause,
		orderBy: orderBy,
	}

	 const responseData = await HygraphQuery<{
    articles: Article[];
    articlesConnection: { aggregate: { count: number } };
  }>(query, variables, {
    revalidate: 60 * 60 * 24, // revalida a página a cada 24h
  });;

	const articles = responseData?.articles || [];
  const totalCount = responseData?.articlesConnection?.aggregate?.count || 0;

  return { articles, totalCount };
}
