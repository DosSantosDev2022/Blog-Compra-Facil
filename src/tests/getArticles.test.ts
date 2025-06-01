import { getArticles } from '@/services/getArticles'
import { HygraphQuery } from '@/app/api/cms/hygraph'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

// Mock do módulo HygraphQuery
vi.mock('@/app/api/cms/hygraph', () => ({
  HygraphQuery: vi.fn(),
}))

describe('getArticles', () => {
  const mockArticles = [
    {
      id: '1',
      slug: 'article-1',
      title: 'Article 1',
      description: 'Description 1',
      coverImage: { url: 'https://image.url/1' },
      category: { id: 'cat-1', name: 'Tech', view: 50 },
      createdAt: '2023-01-01T00:00:00.000Z',
      highlights: true,
      content: { raw: { children: [{ type: 'paragraph', children: [{ text: 'Content 1' }] }] } },
    },
    {
      id: '2',
      slug: 'article-2',
      title: 'Article 2',
      description: 'Description 2',
      coverImage: { url: 'https://image.url/2' },
      category: { id: 'cat-2', name: 'Politica', view: 150 },
      createdAt: '2023-01-02T00:00:00.000Z',
      highlights: false,
      content: { raw: { children: [{ type: 'paragraph', children: [{ text: 'Content 2' }] }] } },
    },
    {
      id: '3',
      slug: 'article-3',
      title: 'Article 3',
      description: 'Description 3',
      coverImage: { url: 'https://image.url/3' },
      category: { id: 'cat-1', name: 'Tech', view: 10 },
      createdAt: '2023-01-03T00:00:00.000Z',
      highlights: true,
      content: { raw: { children: [{ type: 'paragraph', children: [{ text: 'Content 3' }] }] } },
    },
  ];

  const mockTotalCount = mockArticles.length;

  beforeEach(() => {
    // Limpa os mocks antes de cada teste para garantir isolamento
    vi.clearAllMocks();
    // Define os mocks padrões para ambas as chamadas HygraphQuery
    // A primeira é para os artigos
    (HygraphQuery as Mock).mockResolvedValueOnce({ articles: mockArticles });
    // A segunda é para a contagem total
    (HygraphQuery as Mock).mockResolvedValueOnce({
      articlesConnection: { aggregate: { count: mockTotalCount } },
    });
  });

  it('should search for articles with default options and return total count', async () => {
    // Ajustamos o beforeEach para já mockar as duas chamadas, então não precisamos mockar aqui novamente.

    const result = await getArticles();

    // Primeira chamada para buscar os artigos
    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'), // Verifica se a string contém o nome da query principal
      {
        first: 50,
        skip: 0,
        where: undefined,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    // Segunda chamada para buscar a contagem total
    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'), // Verifica se a string contém o nome da query de contagem
      { where: undefined },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with pagination and return total count', async () => {
    // Mockar respostas específicas para este teste, se necessário, ou usar os mocks padrão do beforeEach
    // Como os mocks padrão retornam mockArticles e mockTotalCount, eles são adequados para este teste.

    const result = await getArticles({ page: 2, pageSize: 5 });

    // Primeira chamada para buscar os artigos com paginação
    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 5,
        skip: 5, // (2 - 1) * 5 = 5
        where: undefined,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    // Segunda chamada para buscar a contagem total (sem paginação, apenas filtro)
    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: undefined },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with highlights filter and return total count', async () => {
    // Mockar respostas específicas para este teste, se necessário.
    const result = await getArticles({ where: 'highlights' });

    // Espera que o filtro de destaques seja aplicado em ambas as chamadas
    const expectedWhere = { highlights: true };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  // --- Novos Testes para o filtro de View ---
  it('should search for articles with view filter (gt) and return total count', async () => {
    const result = await getArticles({ viewFilter: { operator: 'gt', value: 100 } });

    const expectedWhere = { view_gt: 100 };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with view filter (eq) and return total count', async () => {
    const result = await getArticles({ viewFilter: { operator: 'eq', value: 50 } });

    const expectedWhere = { view_eq: 50 };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with view filter (lte) and return total count', async () => {
    const result = await getArticles({ viewFilter: { operator: 'lte', value: 70 } });

    const expectedWhere = { view_lte: 70 };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });
  // --- Fim dos novos testes de view ---

  it('should look for articles with specific category and return total count', async () => {
    const result = await getArticles({
      where: 'category',
      categorySlug: 'Technology',
    });

    const expectedWhere = { category: { slug: 'Technology' } };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with search query and return total count', async () => {
    const result = await getArticles({ where: 'search', search: 'React' });

    const expectedWhere = { _search: 'React' };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should look for articles with custom order and return total count', async () => {
    const result = await getArticles({ orderBy: 'createdAt_ASC' });

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: undefined,
        orderBy: 'createdAt_ASC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    // O orderBy não afeta a query de contagem
    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: undefined },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  // --- Novo Teste para excludeSlug ---
  it('should exclude articles by slug and return total count', async () => {
    const result = await getArticles({ excludeSlug: 'article-1' });

    const expectedWhere = { slug_not: 'article-1' };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  // --- Teste para combinação de filtros ---
  it('should combine multiple filters and return total count', async () => {
    const result = await getArticles({
      where: 'category',
      categorySlug: 'Tech',
      viewFilter: { operator: 'gte', value: 20 },
      excludeSlug: 'article-3',
      orderBy: 'createdAt_ASC',
    });

    const expectedWhere = {
      category: { slug: 'Tech' },
      view_gte: 20,
      slug_not: 'article-3',
    };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_ASC',
      },
      { revalidate: 60 * 60 * 3 }
    );

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesCountQuery'),
      { where: expectedWhere },
      { revalidate: 60 * 60 * 3 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });
});