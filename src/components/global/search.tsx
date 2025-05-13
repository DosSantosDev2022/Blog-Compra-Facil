'use client'
import { Input } from '@/components/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

export function InputSearch() {
	const router = useRouter()
	const query = router.push
	const searchParams = new URLSearchParams(query as unknown as string)
	const [searchTerm, setSearchTerm] = useState('')

	function handleSearch(search: string) {
		if (search) {
			searchParams.set('query', search)
		} else {
			searchParams.delete('query')
		}

		router.push(`/search?${searchParams.toString()}`)

		// Limpar o valor do campo de busca após submeter a busca
		setSearchTerm('')
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				const target = e.target as typeof e.target & {
					search: { value: string }
				}
				const search = target.search.value
				handleSearch(search)
			}}
			className='flex gap-2 w-full'
		>
			<Input
				className='lg:w-96 w-full'
				type='text'
				id='search'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				required
				icon={<CiSearch />}
				placeholder='Buscar...'
			/>
		</form>
	)
}
