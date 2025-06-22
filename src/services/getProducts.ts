import { HygraphQuery } from '@/app/api/cms/hygraph'

export interface Category {
	name: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: Category
  image: {
    url: string
  }
   affiliateLinks: {
      id: string
      name: string
      link : string
      icon: {
        url: string
      }
    }[]
  videoReviewUrl: string
}

interface CategoryProduct {
	id: string
	name: string
	slug: string
}

type ProductResponse = {
	products: Product[]
	categoryProducts: CategoryProduct[]
}

export const getProducts = async (
	category?: string,
): Promise<ProductResponse> => {
	let query: string
	const variables: { category?: string } = {}

	if (category && category !== 'Todos') {
		query = `
      query ProductsByCategory($category: String) {
        products(where: { category: { name: $category }}, first : 200 ) {
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
    `
		variables.category = category
	} else {
		query = `
      query AllProducts {
        products (first : 200) {
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
        categoryProducts {
          id
          name
          slug
        }
      }
    `
	}

	const data = await HygraphQuery<ProductResponse>(query, variables, {
		revalidate: 60 * 60 * 24,  // revalida a página a cada 24h
	})

	return {
		products: data?.products || [],
		categoryProducts: data?.categoryProducts || [],
	}
}
