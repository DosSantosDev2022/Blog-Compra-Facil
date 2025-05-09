// Em src/services/getProducts.ts
import { HygraphQuery } from "@/app/api/cms/hygraph";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: {
    url: string;
  };
  url: string;
}

type ProductResponse = {
  products: Product[];
};

export const getProducts = async (category?: string): Promise<ProductResponse> => {
  let query = `
    query MyQuery {
      products {
        id
        name
        description
        category
        image {
          url
        }
        url
      }
    }
  `;

  if (category && category !== 'Todos') {
    query = `
      query MyQuery($category: String!) {
        products(where: { category: $category }) {
          id
          name
          description
          category
          image {
            url
          }
          url
        }
      }
    `;
    const variables = { category };
    const { products } = await HygraphQuery<ProductResponse>(query, variables);
    return { products };
  // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    const { products } = await HygraphQuery<ProductResponse>(query);
    return { products };
  }
};