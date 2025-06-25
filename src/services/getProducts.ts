// services/getProducts.ts
import type { Products } from '@/@types/hygraphTypes';
import { HygraphQuery } from '@/app/api/cms/hygraph';

interface CategoryProduct {
  id: string;
  name: string;
  slug: string;
}

type ProductResponse = {
  products: Products[];
  categoryProducts: CategoryProduct[];
  hasMore: boolean;
};

interface GetProductsOptions {
  category?: string;
  page?: number;
  limit?: number;
}

export const getProducts = async ({
  category,
  page = 1,
  limit = 30,
}: GetProductsOptions): Promise<ProductResponse> => {
  const skip = (page - 1) * limit;

  const includeCategoryFilter = category && category !== 'Todos';

  const queryVariables: string[] = [];
  let categoryWhereClauseContent = ''; // Conteúdo da cláusula where, sem os 'where: {}'

  queryVariables.push('$limit: Int!', '$skip: Int!');

  if (includeCategoryFilter) {
    queryVariables.push('$categoryName: String!');
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    categoryWhereClauseContent = `category: { name: $categoryName }`;
  }

  const operationVariables = queryVariables.join(', ');

  const query = `
    query GetProductsPaginated(${operationVariables}) {
      productsConnection${categoryWhereClauseContent ? `(where: { ${categoryWhereClauseContent} })` : ''} {
        aggregate {
          count
        }
      }
      products(
        first: $limit,
        skip: $skip,
        orderBy: createdAt_DESC
        ${categoryWhereClauseContent ? `, where: { ${categoryWhereClauseContent} }` : ''}
      ) {
        id
        name
        slug
        description
        category {
          name
        }
        image {
          url
        }
        videoReviewUrl
        affiliateLinks {
          id
          name
          link
          icon {
            url
          }
        }
      }
      categoryProducts {
        id
        name
        slug
      }
    }
  `;

  const variables: { limit: number; skip: number; categoryName?: string } = {
    limit,
    skip,
  };

  if (includeCategoryFilter) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    variables.categoryName = category!;
  }

  const data = await HygraphQuery<{
    products: Products[];
    productsConnection: { aggregate: { count: number } };
    categoryProducts: CategoryProduct[];
  }>(query, variables, {
    revalidate: 60 * 60 * 24,
  });

  const totalProducts = data?.productsConnection?.aggregate?.count || 0;
  const currentProductsCount = (data?.products?.length || 0) + skip;

  const hasMore = currentProductsCount < totalProducts;

  return {
    products: data?.products || [],
    categoryProducts: data?.categoryProducts || [],
    hasMore,
  };
};