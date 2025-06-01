export const HygraphQuery = async <T>(
	query: string,
	variables?: Record<string, unknown>,
	options?: { cache?: RequestCache; revalidate?: number },
): Promise<T> => {
	const { cache = 'force-cache', revalidate } = options || {}

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
				cache,
				next: revalidate ? { revalidate } : undefined,
				body: JSON.stringify({ query, variables }),
			},
		)

		// Verifique se a resposta foi bem-sucedida
		if (!response.ok) {
			throw new Error(
				`Erro ao buscar dados: ${response.statusText} (Código: ${response.status})`,
			)
		}

		// Tente obter o JSON da resposta
		const { data, errors } = await response.json()

		return data
	} catch (error) {
		console.error('Erro ao realizar a consulta Hygraph:', error)
		throw error
	}
}
