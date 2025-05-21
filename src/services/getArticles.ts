import type { Article, ArticleQueryResponse } from '@/@types/hygraphTypes'
import { HygraphQuery } from '@/app/api/cms/hygraph'

interface ArticleQueryOptions {
	page?: number
	pageSize?: number
	where?: 'highlights' | 'view' | 'category' | 'search'
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
		orderBy = 'createdAt_DESC',
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
        description
        coverImage {
          url
        }
        category {
          id
          slug
					name
          view
        }
        createdAt
        highlights
        content {
          raw
        }
      }
    }
  `
	 // Consulta para obter o total de artigos
  const totalCountQuery = `
    query ArticlesCountQuery($where: ArticleWhereInput) {
      articlesConnection(where: $where) {
        aggregate {
          count
        }
      }
    }
  `;

	// Mapeia dinamicamente o filtro `where`
	const whereClause =
		where === 'highlights'
			? { highlights: true }
			: where === 'view'
				? { view_gt: 1 } // ou alguma lógica condicional futura
				: where === 'category'
					? { category: { slug: categorySlug } }
					: where === 'search'
						? { _search: search }
						: undefined

	const variables: Record<string, unknown> = {
		first: pageSize,
		skip,
		where: whereClause,
		orderBy: orderBy,
	}

	const totalCountVariables: Record<string, unknown> = {
    where: whereClause,
  };

	const [articlesData, totalCountData] = await Promise.all([
    HygraphQuery<{ articles: Article[] }>(query, variables, {
      revalidate: 60 * 60 * 24, // revalida a página a cada 24h
    }),
    HygraphQuery<{ articlesConnection: { aggregate: { count: number } } }>(
      totalCountQuery,
      totalCountVariables,
      {
        revalidate: 60 * 60 * 24, // revalida a página a cada 24h
      },
    ),
  ]);

	const articles = articlesData?.articles || [];
  const totalCount = totalCountData?.articlesConnection?.aggregate?.count || 0;

  return { articles, totalCount };
}
