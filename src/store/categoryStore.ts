import { create } from 'zustand';
import type { Category } from '@/@types/hygraphTypes';

interface CategoryState {
  categories: Category[]; // Mudamos para Category[] já que a API Route retorna um array
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [], // Inicializamos como um array vazio
  fetchCategories: async () => {
    console.log('Fetching categories from API Route...');
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data: Category[] = await response.json(); // Tipamos a resposta como Category[]
      set(() => ({ categories: data }));
      console.log('Categories fetched and updated in store:', data);
    } catch (error) {
      console.error('Error fetching categories in store:', error);
    }
  },
}));