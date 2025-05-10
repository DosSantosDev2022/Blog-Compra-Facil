import { HygraphMutation } from '@/app/api/cms/hygraphMutation'

interface UpdateViewCountVariables {
	id: string
	view: number
}

interface UpdateArticleViewCountResponse {
	updateArticle: {
		id: string
		view: number
	}
	publishArticle: {
		// Adicionando o tipo para a resposta da publicação
		id: string
		stage: string
	}
}

export const updateViewCount = async (
	id: string,
	currentViewCount: number,
): Promise<UpdateArticleViewCountResponse | null> => {
	const mutation = `
    mutation UpdateArticleViewCount($id: ID!, $view: Int!) {
      updateArticle(where: { id: $id }, data: { view: $view }) {
        id
        view
      }
      publishArticle(where: { id: $id }, to: PUBLISHED) {
        id
        stage
      }
    }
  `

	const variables = {
		id,
		view: currentViewCount,
	}

	try {
		const data = await HygraphMutation<UpdateArticleViewCountResponse>(
			mutation,
			variables,
		)
		console.log(
			`Contagem de visualização do artigo com ID ${id} atualizada e republicada com sucesso.`,
		)
		return data
	} catch (error) {
		console.error(
			'Erro ao atualizar e republicar a contagem de visualizações do artigo:',
			error,
		)
		return null
	}
}
