import type { Article, ArticleQueryResponse } from '@/@types/hygraphTypes'
import { HygraphQuery } from '@/app/api/cms/hygraph'

 type ArticleViewFilterOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq';

 interface ArticleViewFilter {
  operator: ArticleViewFilterOperator;
  value: number;
}

interface ArticleQueryOptions {
	page?: number
	pageSize?: number
	where?: 'highlights' | 'category' | 'search'
	categorySlug?: string
	search?: string
	excludeSlug?: string
	orderBy?: 'createdAt_ASC' | 'createdAt_DESC'
  viewFilter?: ArticleViewFilter;
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
    viewFilter
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
  let whereClause: Record<string, unknown> | undefined

  if (where === 'highlights') {
    whereClause = { highlights: true }
  } else if (where === 'category') {
    whereClause = { category: { slug: categorySlug } }
  } else if (where === 'search') {
    whereClause = { _search: search }
  }

  // Adiciona o filtro de view se viewFilter estiver presente
  if (viewFilter) {
    if (!whereClause) {
      whereClause = {}; // Inicializa se ainda não houver nenhum filtro
    }
    // Constrói a chave dinâmica para o filtro de view (ex: view_gt, view_eq)
    const viewKey = `view_${viewFilter.operator}`;
    whereClause[viewKey] = viewFilter.value;
  }

  // Se excludeSlug estiver presente, adicione ao whereClause
  if (excludeSlug) {
    if (!whereClause) {
      whereClause = {};
    }
    whereClause.slug_not = excludeSlug; // Assuming `slug_not` is the correct Hygraph filter for exclusion
  }

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
      revalidate: 60 * 60 * 3, // revalida a página a cada 3h
    }),
    HygraphQuery<{ articlesConnection: { aggregate: { count: number } } }>(
      totalCountQuery,
      totalCountVariables,
      {
        revalidate: 60 * 60 * 3, // revalida a página a cada 3h
      },
    ),
  ]);

	const articles = articlesData?.articles || [];
  const totalCount = totalCountData?.articlesConnection?.aggregate?.count || 0;

  return { articles, totalCount };
}
