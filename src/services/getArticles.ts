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
	where?: 'highlights' | 'category' | 'search' | 'mostViewed';
	categorySlug?: string
	search?: string
	excludeSlug?: string
	orderBy?: 'createdAt_ASC' | 'createdAt_DESC' | 'view_ASC' | 'view_DESC'
  viewFilter?: ArticleViewFilter;
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
        coverImage {
          url
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
   let whereClause: Record<string, unknown> = {};
  let orderBy: string = options.orderBy || 'createdAt_DESC';
  // Lógica para mapear dinamicamente o filtro `where` e a ordenação
  if (where === 'highlights') {
    whereClause = { highlights: true };
  } else if (where === 'category') {
    whereClause = { category: { slug: categorySlug } };
  } else if (where === 'search') {
    whereClause = { _search: search };
  } else if (where === 'mostViewed') {
    orderBy = 'view_DESC';
  }

  // Adiciona o filtro de view SE ele foi passado e não estamos no caso 'mostViewed'
  // que já gerencia a ordenação por views
  if (viewFilter && where !== 'mostViewed') {
    const viewKey = `view_${viewFilter.operator}`;
    whereClause[viewKey] = viewFilter.value;
  }

  // Se excludeSlug estiver presente, adicione ao whereClause
 if (excludeSlug) {
    // Usar 'AND' para combinar com outros filtros existentes
    whereClause = {
      AND: [
        whereClause, // Inclui os filtros anteriores
        { slug_not: excludeSlug }
      ]
    };
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
