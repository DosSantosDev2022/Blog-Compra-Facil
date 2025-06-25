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
        author: { id: 'auth1', name: 'Author Name', image: { url: 'https://author.img' } },
        createdAt: '2023-01-01T00:00:00.000Z',
        product: null,
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
        tags: [`article-${slug}`],
      },
    )

    expect(result).toEqual({ article: mockResponse.article })
  })

  it('should return null if article is not found', async () => {
    ;(HygraphQuery as Mock).mockResolvedValueOnce({ article: null })

    const slug = 'non-existent-article'
    const result = await getDetailsArticle(slug)

    expect(HygraphQuery).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ article: null })
  })

  it('should throw an error if HygraphQuery fails', async () => {
    ;(HygraphQuery as Mock).mockRejectedValueOnce(
      new Error('Hygraph error'),
    )

    await expect(getDetailsArticle('broken-slug')).rejects.toThrow(
      'Hygraph error',
    )
  })

  it('should search with the correct slug variable and return article data', async () => {
    const mockResponse = {
      article: {
        id: '456',
        title: 'Other Article',
        slug: 'other-article',
        description: 'Another description',
        category: { name: 'Business' },
        coverImage: { url: 'https://other.url' },
        content: { raw: {} },
        author: { id: 'auth2', name: 'Another Author', image: { url: 'https://anotherauthor.img' } },
        createdAt: '2023-02-01T00:00:00.000Z',
        product: { id: 'prod1', name: 'Sample Product', slug: 'sample-product', description: 'Product description', image: { url: 'https://product.img' } },
      },
    }
    ;(HygraphQuery as Mock).mockResolvedValueOnce(mockResponse)

    const slug = 'other-article'
    const result = await getDetailsArticle(slug)

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.any(String),
      { slug },
      expect.objectContaining({ tags: [`article-${slug}`] }),
    )
    expect(result.article?.slug).toBe(slug)
    expect(result).toEqual({ article: mockResponse.article })
  })
})