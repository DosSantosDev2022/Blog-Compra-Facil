import { HygraphQuery } from '@/app/api/cms/hygraph'

interface Category {
   categories: {
    id: string
    name: string
    slug: string
    coverImage : {
      url : string
    }
    view: number
   }[]
}


export const getCategories = async (
 
): Promise<Category> => {
  const query = `
   query MyQuery {
      categories(orderBy: view_DESC, where: {view_gt: 1 }) {
        id
        name
        slug
        coverImage {
          url
        }
        view
      }
    }
   `

  return HygraphQuery(query, {
    cache: 'no-cache',
    revalidate: 60 * 60 * 24,
  })
}