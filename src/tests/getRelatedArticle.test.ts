import { getRelatedArticle } from '@/services/getRelatedArticle'
import { HygraphQuery } from '@/app/api/cms/hygraph'
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest'

vi.mock('@/app/api/cms/hygraph', () => ({
	HygraphQuery: vi.fn(),
}))

describe('getRelatedArticle', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should search for related articles, excluding the current one by slug', async () => {
		const mockResponse = {
			articles: [
				{
					id: '1',
					title: 'Related 1',
					slug: 'related-1',
					createdAt: '2023-01-01T00:00:00.000Z',
					coverImage: { url: 'https://image1.url' },
				},
				{
					id: '2',
					title: 'Related 2',
					slug: 'related-2',
					createdAt: '2023-01-02T00:00:00.000Z',
					coverImage: { url: 'https://image2.url' },
				},
			],
		}
		;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

		const result = await getRelatedArticle('Tech', 'current-article')

		expect(HygraphQuery).toHaveBeenCalledTimes(1)

		expect(HygraphQuery).toHaveBeenCalledWith(
			expect.stringContaining('slug_not: $currentSlug'),
			{
				name: 'Tech',
				currentSlug: 'current-article',
			},
			{
				revalidate: 60 * 60 * 24,
			},
		)

		expect(result.articles).toEqual(mockResponse.articles)
	})

	it('should throw an error if HygraphQuery fails', async () => {
		;(HygraphQuery as Mock).mockRejectedValueOnce(new Error('CMS Error'))

		await expect(getRelatedArticle('Tech', 'broken-slug')).rejects.toThrow(
			'CMS Error',
		)
	})

	it('should use correct variables for category and currentSlug', async () => {
		const mockResponse = { articles: [] }
		;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

		const category = 'Business'
		const current = 'article-slug'

		await getRelatedArticle(category, current)

		expect(HygraphQuery).toHaveBeenCalledWith(
			expect.any(String),
			{ name: category, currentSlug: current },
			expect.any(Object),
		)
	})
})
