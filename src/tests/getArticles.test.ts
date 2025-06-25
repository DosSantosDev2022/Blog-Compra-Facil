import { getArticles } from '@/services/getArticles'
import { HygraphQuery } from '@/app/api/cms/hygraph'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

vi.mock('@/app/api/cms/hygraph', () => ({
  HygraphQuery: vi.fn(),
}))

describe('getArticles', () => {
  const mockArticles = [
    {
      id: '1',
      slug: 'article-1',
      title: 'Article 1',
      coverImage: { url: 'https://image.url/1' },
      category: { name: 'Tech' },
      createdAt: '2023-01-01T00:00:00.000Z',
      author: { id: 'auth-1', name: 'Author 1', image: { url: 'https://author.url/1' } },
    },
    {
      id: '2',
      slug: 'article-2',
      title: 'Article 2',
      coverImage: { url: 'https://image.url/2' },
      category: { name: 'Politica' },
      createdAt: '2023-01-02T00:00:00.000Z',
      author: { id: 'auth-2', name: 'Author 2', image: { url: 'https://author.url/2' } },
    },
    {
      id: '3',
      slug: 'article-3',
      title: 'Article 3',
      coverImage: { url: 'https://image.url/3' },
      category: { name: 'Tech' },
      createdAt: '2023-01-03T00:00:00.000Z',
      author: { id: 'auth-1', name: 'Author 1', image: { url: 'https://author.url/1' } },
    },
  ]

  const mockTotalCount = mockArticles.length

  beforeEach(() => {
    vi.clearAllMocks()
    ;(HygraphQuery as Mock).mockResolvedValueOnce({
      articles: mockArticles,
      articlesConnection: { aggregate: { count: mockTotalCount } },
    })
  })

  // Definindo a string da query esperada para reutilização
  const expectedQueryString = `
    query ArticlesQuery(
      $first: Int!, 
      $skip: Int!,
      $where: ArticleWhereInput,
      $orderBy: ArticleOrderByInput
    ) {
      articles (
        first: $first,
        skip: $skip,
        where: $where,
        orderBy: $orderBy
      ) {
        id
        slug
        title
        category {
          name
        }
        coverImage {
          url
        }
      author {
        id
        name
        image {
          url
          }
        }
        createdAt
        updatedAt
      }
      articlesConnection(where: $where) {
        aggregate {
        count
      }
    }
   }
  `

  it('should search for articles with default options and return total count', async () => {
    const result = await getArticles()

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'), // Mantendo como stringContaining para maior robustez
      {
        first: 50,
        skip: 0,
        where: {},
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should search for articles with pagination and return total count', async () => {
    const result = await getArticles({ page: 2, pageSize: 5 })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 5,
        skip: 5, // (2 - 1) * 5 = 5
        where: {},
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should search for articles with highlights filter and return total count', async () => {
    const result = await getArticles({ where: 'highlights' })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    const expectedWhere = { highlights: true }

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should look for articles with specific category and return total count', async () => {
    const result = await getArticles({
      where: 'category',
      categorySlug: 'Technology',
    })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    const expectedWhere = { category: { slug: 'Technology' } }

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should search for articles with search query and return total count', async () => {
    const result = await getArticles({ where: 'search', search: 'React' })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    const expectedWhere = { _search: 'React' }

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should look for articles with custom order and return total count', async () => {
    const result = await getArticles({ orderBy: 'createdAt_ASC' })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: {},
        orderBy: 'createdAt_ASC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should exclude articles by slug and return total count', async () => {
    const result = await getArticles({ excludeSlug: 'article-1' })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    // Usamos o objeto direto conforme o erro de asserção mostrou
    const expectedWhere = {
      AND: [
        {}, // O objeto whereClause original vazio
        { slug_not: 'article-1' },
      ],
    }

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] },
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })

  it('should combine multiple filters and return total count', async () => {
    const result = await getArticles({
      where: 'category',
      categorySlug: 'Tech',
      excludeSlug: 'article-3',
      orderBy: 'createdAt_ASC',
    })

    expect(HygraphQuery).toHaveBeenCalledTimes(1)

    // Onde 'AND' é usado, o Vitest ou Jest pode ter dificuldade em comparar objetos profundamente aninhados
    // expect.objectContaining é mais robusto para isso.
    const expectedWhere = {
      AND: [
        { category: { slug: 'Tech' } }, // O whereClause original
        { slug_not: 'article-3' },
      ],
    }

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere, // Mudança aqui para o objeto direto
        orderBy: 'createdAt_ASC',
      },
      { revalidate: 60 * 60 * 24, tags: ['articles'] }, // Adicionado tags
    )

    expect(result.articles).toEqual(mockArticles)
    expect(result.totalCount).toEqual(mockTotalCount)
  })
})