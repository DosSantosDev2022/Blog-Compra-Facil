import { HygraphQuery } from '@/app/api/cms/hygraph';
import type { Article, Category } from '@/@types/hygraphTypes'; // Ajuste seus tipos


interface HomePageResponse {
  categories: Category[];
  highlightArticles: Article[];
  mostViewedArticles: Article[];
  recentArticles: Article[];
}

export async function getHomePageData(): Promise<HomePageResponse> {
  const query = `
    query HomePageData {
      categories(orderBy: view_DESC, where: { view_gt: 0 }) {
        id
        name
        slug
        coverImage { 
        url 
      }
        view
      }
      highlightArticles: articles(where: { highlights: true }, first: 12) {
        id 
        slug 
        title 
        coverImage { 
        url 
      } 
        category { 
        id 
        name 
      } 
       createdAt 
       highlights 
      }
      mostViewedArticles: articles(orderBy: view_DESC, first: 20) {
        id 
        slug 
        title 
        coverImage { 
         url 
        }  
         createdAt 
       }
      recentArticles: articles(orderBy: createdAt_DESC, first: 20) {
        id 
        slug 
        title 
        description 
        createdAt 
      }
    }
  `;

  const data = await HygraphQuery<HomePageResponse>(query, undefined, {
    revalidate: 60 * 60 * 24, // 24 horas
  });

  // Garante que os arrays não sejam null/undefined
  data.categories = data.categories || [];
  data.highlightArticles = data.highlightArticles || [];
  data.mostViewedArticles = data.mostViewedArticles || [];
  data.recentArticles = data.recentArticles || [];

  return data;
}
