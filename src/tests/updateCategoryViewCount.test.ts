import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { updateCategoryViewCount } from '@/services/updateCategoryViewCount'
import { HygraphMutation } from '@/app/api/cms/hygraphMutation'

vi.mock('@/app/api/cms/hygraphMutation', () => ({
  HygraphMutation: vi.fn(),
}))

describe('updateCategoryViewCount', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should update and publish the category successfully', async () => {
    const mockResponse = {
      updateNomeDoSeuModelDeCategoria: {
        id: 'cat123',
        view: 99,
      },
      publishNomeDoSeuModelDeCategoria: {
        id: 'cat123',
        stage: 'PUBLISHED',
      },
    }

    ;(HygraphMutation as Mock).mockResolvedValueOnce(mockResponse)

    const result = await updateCategoryViewCount('cat123', 99)

    expect(HygraphMutation).toHaveBeenCalledTimes(1)
    expect(HygraphMutation).toHaveBeenCalledWith(
      expect.stringContaining('mutation UpdateCategoryViewCount'),
      { id: 'cat123', view: 99 }
    )

    expect(result).toEqual(mockResponse)
  })

  it('should return null and log error upon failure', async () => {
    const error = new Error('Falha na mutação')
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    ;(HygraphMutation as Mock).mockRejectedValueOnce(error)

    const result = await updateCategoryViewCount('fail123', 100)

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao atualizar e republicar a contagem de visualizações da categoria:',
      error
    )

    consoleErrorSpy.mockRestore()
  })

  it('should send the correct variables to HygraphMutation', async () => {
    const mockResponse = {
      updateNomeDoSeuModelDeCategoria: { id: 'abc123', view: 50 },
      publishNomeDoSeuModelDeCategoria: { id: 'abc123', stage: 'PUBLISHED' },
    }

    ;(HygraphMutation as Mock).mockResolvedValueOnce(mockResponse)

    await updateCategoryViewCount('abc123', 50)

    expect(HygraphMutation).toHaveBeenCalledWith(
      expect.any(String),
      { id: 'abc123', view: 50 }
    )
  })
})
