import { HygraphQuery } from '@/app/api/hygraph';
import { NextResponse } from 'next/server';
import type { Category, CategoryResponse } from '@/@types/hygraphTypes';

export async function GET() {
  try {
    const categoriesData = await HygraphQuery<{ categories: Category[] }>(`
      query MyQuery {
        categories {
          id
          name
          slug
        }
      }
    `);
    return NextResponse.json(categoriesData);
    
  } catch (error) {
    console.error('Erro na API Route de categorias:', error);
    return NextResponse.error();
  }
}