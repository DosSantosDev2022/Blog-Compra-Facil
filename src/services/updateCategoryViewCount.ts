import { HygraphMutation } from '@/app/api/cms/hygraphMutation';

interface UpdateCategoryViewCountVariables {
  id: string;
  view: number;
}

interface UpdateCategoryViewCountResponse {
  updateCategory: {
    id: string;
    view: number;
  };
  publishCategory: { 
    id: string;
    stage: string;
  };
}

export const updateCategoryViewCount = async (
  id: string,
  currentViewCount: number
): Promise<UpdateCategoryViewCountResponse | null> => {
  const mutation = `
    mutation UpdateCategoryViewCount($id: ID!, $view: Int!) {
      updateCategory(where: { id: $id }, data: { view: $view }) {
        id
        view
      }
      publishCategory(where: { id: $id }, to: PUBLISHED) { 
        id
        stage
      }
    }
  `;

  const variables = {
    id,
    view: currentViewCount,
  };

  try {
    const data = await HygraphMutation<UpdateCategoryViewCountResponse>(mutation, variables);
    console.log(`Contagem de visualização da categoria com ID ${id} atualizada e republicada com sucesso.`);
    return data;
  } catch (error) {
    console.error('Erro ao atualizar e republicar a contagem de visualizações da categoria:', error);
    return null;
  }
};