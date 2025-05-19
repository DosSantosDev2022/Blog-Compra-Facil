import { getCategories } from '@/services/getCategories'
import { HygraphQuery } from '@/app/api/cms/hygraph'
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest'

vi.mock('@/app/api/cms/hygraph', () => ({
	HygraphQuery: vi.fn(),
}))

describe('getCategories', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should search categories with correct query and configuration', async () => {
		const mockResponse = {
			categories: [
				{
					id: '1',
					name: 'Tech',
					slug: 'tech',
					coverImage: { url: 'https://image.url' },
					view: 100,
				},
				{
					id: '2',
					name: 'Business',
					slug: 'business',
					coverImage: { url: 'https://business.url' },
					view: 80,
				},
			],
		}
		;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

		const result = await getCategories()

		expect(HygraphQuery).toHaveBeenCalledTimes(1)

		expect(HygraphQuery).toHaveBeenCalledWith(
			expect.stringContaining(
				'categories(orderBy: view_DESC, where: {view_gt: 10 })',
			),
			undefined,
			{ revalidate: 60 * 60 * 24 },
		)

		expect(result).toEqual(mockResponse)
	})

	it('should handle empty category list', async () => {
		const mockResponse = {
			categories: [],
		}
		;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

		const result = await getCategories()

		expect(result.categories).toEqual([])
	})

	it('should throw an error if HygraphQuery fails', async () => {
		;(HygraphQuery as Mock).mockRejectedValueOnce(
			new Error('Hygraph error'),
		)

		await expect(getCategories()).rejects.toThrow('Hygraph error')
	})
})
