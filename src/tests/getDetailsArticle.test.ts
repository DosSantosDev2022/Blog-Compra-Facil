import { getDetailsArticle } from '@/services/getDetailsArticle'
import { HygraphQuery } from '@/app/api/cms/hygraph'
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest'

vi.mock('@/app/api/cms/hygraph', () => ({
	HygraphQuery: vi.fn(),
}))

describe('getDetailsArticle', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should fetch article details for a given slug', async () => {
		const mockResponse = {
			article: {
				id: '123',
				title: 'Sample Article',
				slug: 'sample-article',
				description: 'An article description',
				category: { name: 'Tech' },
				coverImage: { url: 'https://image.url' },
				content: { raw: {} },
				createdAt: '2023-01-01T00:00:00.000Z',
				view: 123,
			},
		}
		;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

		const slug = 'sample-article'
		const result = await getDetailsArticle(slug)

		expect(HygraphQuery).toHaveBeenCalledTimes(1)

		expect(HygraphQuery).toHaveBeenCalledWith(
			expect.stringContaining('article(where: {slug: $slug})'),
			{ slug },
			{
				revalidate: 60 * 60 * 24,
			},
		)

		expect(result).toEqual(mockResponse)
	})

	it('should throw an error if HygraphQuery fails', async () => {
		;(HygraphQuery as Mock).mockRejectedValueOnce(
			new Error('Hygraph error'),
		)

		await expect(getDetailsArticle('broken-slug')).rejects.toThrow(
			'Hygraph error',
		)
	})

	it('should search with the correct slug variable', async () => {
		const mockResponse = {
			article: {
				id: '456',
				title: 'Other Article',
				slug: 'other-article',
				description: 'Another description',
				category: { name: 'Business' },
				coverImage: { url: 'https://other.url' },
				content: { raw: {} },
				createdAt: '2023-02-01T00:00:00.000Z',
				view: 88,
			},
		}
		;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

		const slug = 'other-article'
		const result = await getDetailsArticle(slug)

		expect(HygraphQuery).toHaveBeenCalledWith(
			expect.any(String),
			{ slug },
			expect.any(Object),
		)
		expect(result.article.slug).toBe(slug)
	})
})
