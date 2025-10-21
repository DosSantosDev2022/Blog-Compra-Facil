import { HygraphQuery } from '@/app/api/cms/hygraph'
import type { RichTextContent } from '@graphcms/rich-text-types'

export interface Category {
  name: string
  slug:string
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
   affiliateLinks: string
  videoReviewUrl: string
  technicalsheet: {
    raw: RichTextContent
  }
}

export interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  description: string
  image: {
    url: string;
  };
}

type ProductResponse = {
  product: Product;
  relatedProducts: RelatedProduct[];
}

export const getDetailsProducts = async (slug?: string): Promise<ProductResponse> => {
  if (!slug) {
    return {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      product: null as any,
      relatedProducts: [],
    };
  }

  const productQuery = `
    query ($slug: String) {
      product(where: { slug: $slug }) {
        id
        name
        description
        category {
          name
          slug
        }
        image {
          url
        }
         affiliateLink
        videoReviewUrl
        technicalsheet {
          raw
        }
      }
    }
  `;

  const productData = await HygraphQuery<{ product: Product }>(productQuery, { slug }, { revalidate: 60 * 60 * 24 });
  const product = productData?.product;

  if (!product?.category?.slug) {
    return {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      product: product || null as any,
      relatedProducts: [],
    };
  }

  const relatedProductsQuery = `
    query ($categorySlug: String) {
      products(
        where: { category: { slug: $categorySlug } }
        first: 10
        orderBy: createdAt_DESC
      ) {
        id
        name
        slug
        description
        image {
          url
        }
      }
    }
  `;

  const relatedProductsData = await HygraphQuery<{ products: RelatedProduct[] }>(
    relatedProductsQuery,
    { categorySlug: product.category.slug },
    { revalidate: 0 }
  );

  const relatedProducts = relatedProductsData?.products?.filter(p => p.slug !== slug) || [];

  return {
    product,
    relatedProducts,
  };
};