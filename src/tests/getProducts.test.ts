import { describe, expect, test, vi, beforeEach } from 'vitest'
import { getProducts } from '@/services/getProducts'
import * as cms from '@/app/api/cms/hygraph'

describe('getProducts', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Produto 1',
      slug: 'produto-1',
      description: 'Descrição do produto 1',
      category: { name: 'Eletrônicos' },
      image: { url: 'http://image1.url' },
      videoReviewUrl: null,
      affiliateLinks: [],
    },
    {
      id: '2',
      name: 'Produto 2',
      slug: 'produto-2',
      description: 'Descrição do produto 2',
      category: { name: 'Eletrônicos' },
      image: { url: 'http://image2.url' },
      videoReviewUrl: 'http://video2.url',
      affiliateLinks: [{ id: 'link2', name: 'Loja B', link: 'http://linkb.url', icon: { url: 'http://iconb.url' } }],
    },
    {
      id: '3',
      name: 'Produto 3',
      slug: 'produto-3',
      description: 'Descrição do produto 3',
      category: { name: 'Smartphones' },
      image: { url: 'http://image3.url' },
      videoReviewUrl: null,
      affiliateLinks: [],
    },
  ]

  const mockCategoryProducts = [
    { id: 'cat1', name: 'Eletrônicos', slug: 'eletronicos' },
    { id: 'cat2', name: 'Smartphones', slug: 'smartphones' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(cms, 'HygraphQuery').mockResolvedValue({
      products: mockProducts,
      productsConnection: { aggregate: { count: mockProducts.length } },
      categoryProducts: mockCategoryProducts,
    })
  })

  test('should return products with default pagination and all categories', async () => {
    const result = await getProducts({})

    expect(cms.HygraphQuery).toHaveBeenCalledTimes(1)
    expect(cms.HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query GetProductsPaginated($limit: Int!, $skip: Int!) {'),
      {
        limit: 30,
        skip: 0,
      },
      { revalidate: 60 * 60 * 24 },
    )

    expect(result.products).toEqual(mockProducts)
    expect(result.categoryProducts).toEqual(mockCategoryProducts)
    expect(result.hasMore).toBe(false)
  })

  test('should filter products by category', async () => {
    const category = 'Eletrônicos'
    const result = await getProducts({ category })

    expect(cms.HygraphQuery).toHaveBeenCalledTimes(1)
    expect(cms.HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query GetProductsPaginated($limit: Int!, $skip: Int!, $categoryName: String!) {'),
      {
        limit: 30,
        skip: 0,
        categoryName: category,
      },
      { revalidate: 60 * 60 * 24 },
    )

    expect(result.products).toEqual(mockProducts) // O mock retorna todos, o importante é a chamada da query
    expect(result.categoryProducts).toEqual(mockCategoryProducts)
    expect(result.hasMore).toBe(false)
  })

  test('should apply pagination correctly', async () => {
    const limit = 2
    const page = 2
    const totalProductsInMock = mockProducts.length

    vi.spyOn(cms, 'HygraphQuery').mockResolvedValueOnce({
      products: [mockProducts[2]], // Simula a segunda página
      productsConnection: { aggregate: { count: totalProductsInMock } },
      categoryProducts: mockCategoryProducts,
    })

    const result = await getProducts({ page, limit })

    expect(cms.HygraphQuery).toHaveBeenCalledTimes(1)
    expect(cms.HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query GetProductsPaginated($limit: Int!, $skip: Int!) {'),
      {
        limit: limit,
        skip: (page - 1) * limit, // skip = (2 - 1) * 2 = 2
      },
      { revalidate: 60 * 60 * 24 },
    )

    expect(result.products).toEqual([mockProducts[2]])
    expect(result.categoryProducts).toEqual(mockCategoryProducts)
    expect(result.hasMore).toBe(false) // Porque 3 produtos no total, 2 na primeira página, 1 na segunda. 2+1=3. 3 não é < 3
  })

  test('should set hasMore to true if there are more products', async () => {
    const limit = 1
    const page = 1
    const totalProductsInMock = mockProducts.length // 3 produtos

    vi.spyOn(cms, 'HygraphQuery').mockResolvedValueOnce({
      products: [mockProducts[0]], // Simula apenas o primeiro produto
      productsConnection: { aggregate: { count: totalProductsInMock } },
      categoryProducts: mockCategoryProducts,
    })

    const result = await getProducts({ page, limit })

    expect(result.products).toEqual([mockProducts[0]])
    expect(result.hasMore).toBe(true) // total 3, current 1. 1 < 3 é true
  })

  test('should return empty arrays if no data is found', async () => {
    vi.spyOn(cms, 'HygraphQuery').mockResolvedValueOnce({
      products: [],
      productsConnection: { aggregate: { count: 0 } },
      categoryProducts: [],
    })

    const result = await getProducts({})

    expect(result.products).toEqual([])
    expect(result.categoryProducts).toEqual([])
    expect(result.hasMore).toBe(false)
  })

  test('should handle "Todos" category as no filter', async () => {
    const category = 'Todos'
    await getProducts({ category })

    expect(cms.HygraphQuery).toHaveBeenCalledWith(
      expect.not.stringContaining('$categoryName: String!'), // Não deve ter a variável de categoria
      expect.objectContaining({ limit: 30, skip: 0 }),
      expect.any(Object),
    )
    expect(cms.HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query GetProductsPaginated($limit: Int!, $skip: Int!) {'),
      expect.not.objectContaining({ categoryName: expect.any(String) }), // Não deve ter categoryName nas variáveis
      expect.any(Object),
    )
  })
})