import type { Category } from '@/@types/hygraphTypes'
import { useEffect, useState } from 'react'

export const useCategories = () => {
	const [data, setData] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/'

	useEffect(() => {
		fetch(`${baseUrl}/api/categories`)
			.then((res) => res.json())
			.then((json) => setData(json.categories))
			.catch((err) => {
				console.error('Erro ao buscar categorias:', err)
				setData([])
			})
			.finally(() => setLoading(false))
	}, [baseUrl])

	return { data, loading }
}
