import { describe, expect, test, vi } from 'vitest'
import { getProducts } from '@/services/getProducts'
import * as cms from '@/app/api/cms/hygraph'

describe('getProducts', () => {
	test('retorna os produtos filtrados pela categoria', async () => {
		vi.spyOn(cms, 'HygraphQuery').mockResolvedValue({
			products: [
				{
					id: '1',
					name: 'Produto 1',
					category: { name: 'Eletrônicos', slug: 'eletronicos' },
				},
				{
					id: '2',
					name: 'Produto 2',
					category: { name: 'Eletrônicos', slug: 'eletronicos' },
				},
			],
		})

		const result = await getProducts('eletronicos')

		expect(result.products).toHaveLength(2)
		expect(result.products[0].name).toBe('Produto 1')
		expect(result.products[1].category.name).toBe('Eletrônicos')
	})
})
