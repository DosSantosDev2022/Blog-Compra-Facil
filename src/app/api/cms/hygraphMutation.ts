export const HygraphMutation = async <T>(
	mutation: string,
	variables?: Record<string, unknown>,
): Promise<T> => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_HYGRAPH_API_ENDPOINT || '',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
				},
				body: JSON.stringify({ query: mutation, variables }),
			},
		)

		// Verifique se a resposta foi bem-sucedida (códigos 2xx)
		if (!response.ok) {
			const errorBody = await response.json()
			console.error('Erro na mutation Hygraph:', errorBody)
			throw new Error(
				`Erro na mutation: ${response.statusText} (Código: ${response.status}) - Detalhes: ${JSON.stringify(errorBody)}`,
			)
		}

		const { data, errors } = await response.json()

		if (errors && errors.length > 0) {
			console.error('Erros retornados pela API Hygraph:', errors)
			throw new Error(
				`Erros na resposta da API Hygraph: ${JSON.stringify(errors)}`,
			)
		}

		return data as T
	} catch (error) {
		console.error('Erro ao realizar a mutation Hygraph:', error)
		throw error
	}
}
