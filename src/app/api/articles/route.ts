import { HygraphQuery } from '@/app/api/hygraph';
import { NextResponse } from 'next/server';
import type { Article } from '@/@types/hygraphTypes';

export async function GET() {
  try {
    const {articles} = await HygraphQuery<{ articles: Article[] }>(`
        query MyQuery {
          articles {
            id
            slug
            title
            description
            coverImage {
              url
            }
            category {
              name
            }
            createdAt
            highlights
            content {
              raw
            }
          }
        }
    `);
    return NextResponse.json(articles);
    
  } catch (error) {
    console.error('Erro na API Route de Artigos:', error);
    return NextResponse.error();
  }
}