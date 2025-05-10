import { HygraphQuery } from "@/app/api/cms/hygraph";

export interface Category {
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category; // Agora 'category' é do tipo 'Category'
  image: {
    url: string;
  };
  url: string;
}

interface CategoryProduct {
  id: string;
  name: string;
  slug: string;
}

type ProductResponse = {
  products: Product[];
  categoryProducts: CategoryProduct[];
}


export const getProducts = async (category?: string): Promise<ProductResponse> => {
  let query: string;
  const variables: { category?: string } = {};

  if (category && category !== 'Todos') {
    query = `
      query ProductsByCategory($category: String) {
        products(where: { category: { name: $category } }) {
          id
          name
          description
          category {
            name
          }
          image {
            url
          }
          url
        }
        categoryProducts {
          id
          name
          slug
        }
      }
    `;
    variables.category = category;
  } else {
    query = `
      query AllProducts {
        products {
          id
          name
          description
          category {
            name
          }
          image {
            url
          }
          url
        }
        categoryProducts {
          id
          name
          slug
        }
      }
    `;
  }

  const data = await HygraphQuery<ProductResponse>(query, variables, { cache: 'no-cache' });
  console.log("Resposta da HygraphQuery:", data);
  return { products: data?.products || [], categoryProducts: data?.categoryProducts || [] };
};