import { updateViewCount } from '@/services/updateViewCount'
import { HygraphMutation } from '@/app/api/cms/hygraphMutation'
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest'

vi.mock('@/app/api/cms/hygraphMutation', () => ({
	HygraphMutation: vi.fn(),
}))

describe('updateViewCount', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should update and publish the article view count successfully', async () => {
		const mockResponse = {
			updateArticle: {
				id: 'abc123',
				view: 42,
			},
			publishArticle: {
				id: 'abc123',
				stage: 'PUBLISHED',
			},
		}

		;(HygraphMutation as Mock).mockResolvedValueOnce(mockResponse)

		const result = await updateViewCount('abc123', 42)

		expect(HygraphMutation).toHaveBeenCalledTimes(1)
		expect(HygraphMutation).toHaveBeenCalledWith(
			expect.stringContaining('mutation UpdateArticleViewCount'),
			{ id: 'abc123', view: 42 },
		)

		expect(result).toEqual(mockResponse)
	})

	it('should return null and log error if mutation fails', async () => {
		const error = new Error('Mutation failed')
		const consoleSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		;(HygraphMutation as Mock).mockRejectedValueOnce(error)

		const result = await updateViewCount('def456', 100)

		expect(result).toBeNull()
		expect(HygraphMutation).toHaveBeenCalledTimes(1)
		expect(consoleSpy).toHaveBeenCalledWith(
			'Erro ao atualizar e republicar a contagem de visualizações do artigo:',
			error,
		)

		consoleSpy.mockRestore()
	})

	it('should send correct GraphQL variables', async () => {
		const mockResponse = {
			updateArticle: { id: 'xyz999', view: 10 },
			publishArticle: { id: 'xyz999', stage: 'PUBLISHED' },
		}

		;(HygraphMutation as Mock).mockResolvedValueOnce(mockResponse)

		await updateViewCount('xyz999', 10)

		expect(HygraphMutation).toHaveBeenCalledWith(expect.any(String), {
			id: 'xyz999',
			view: 10,
		})
	})
})
