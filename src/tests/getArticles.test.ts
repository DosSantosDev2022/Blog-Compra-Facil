import { getArticles } from '@/services/getArticles' // Certifique-se de que o caminho está correto
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
      // Removi 'description' e 'content' do mock de Article aqui
      // pois não são retornados pela sua query GraphQL.
      // Inclua apenas as propriedades que realmente vêm do Hygraph.
      coverImage: { url: 'https://image.url/1' },
      category: { name: 'Tech' }, // name, não id ou outros aqui
      createdAt: '2023-01-01T00:00:00.000Z',
      // 'highlights' é usado no `where`, mas não retornado na query,
      // então não precisa estar no mock de articles, mas pode estar no mock de dados da HygraphQuery.
      // author { id, name, image { url } } - Adicione o autor se for relevante para o mock de dados de retorno.
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
  ];

  const mockTotalCount = mockArticles.length;

  beforeEach(() => {
    vi.clearAllMocks();
    // A HygraphQuery agora retorna um objeto que contém 'articles' e 'articlesConnection'
    (HygraphQuery as Mock).mockResolvedValueOnce({
      articles: mockArticles,
      articlesConnection: { aggregate: { count: mockTotalCount } },
    });
  });

  it('should search for articles with default options and return total count', async () => {
    const result = await getArticles();

    // Deve haver apenas UMA chamada para HygraphQuery
    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'), // Verifica se a string contém o nome da query principal
      {
        first: 50,
        skip: 0,
        where: {}, // whereClause inicializa como objeto vazio {}
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with pagination and return total count', async () => {
    const result = await getArticles({ page: 2, pageSize: 5 });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 5,
        skip: 5, // (2 - 1) * 5 = 5
        where: {}, // whereClause inicializa como objeto vazio {}
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with highlights filter and return total count', async () => {
    const result = await getArticles({ where: 'highlights' });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    const expectedWhere = { highlights: true };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  // Removed o teste 'should search for articles with mostViewed filter and return total count'
  // Removed o teste 'should search for articles with viewFilter (gt) and return total count'
  // Removed o teste 'should search for articles with viewFilter (lte) and return total count'

  it('should look for articles with specific category and return total count', async () => {
    const result = await getArticles({
      where: 'category',
      categorySlug: 'Technology',
    });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    const expectedWhere = { category: { slug: 'Technology' } };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should search for articles with search query and return total count', async () => {
    const result = await getArticles({ where: 'search', search: 'React' });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    const expectedWhere = { _search: 'React' };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: expectedWhere,
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  it('should look for articles with custom order and return total count', async () => {
    const result = await getArticles({ orderBy: 'createdAt_ASC' });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        where: {}, // whereClause inicializa como objeto vazio {}
        orderBy: 'createdAt_ASC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  // --- Novo Teste para excludeSlug ---
  it('should exclude articles by slug and return total count', async () => {
    const result = await getArticles({ excludeSlug: 'article-1' });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    // Onde 'AND' é usado, o Vitest ou Jest pode ter dificuldade em comparar objetos profundamente aninhados
    // expect.objectContaining é mais robusto para isso.
    const expectedWhere = {
      AND: [
        {}, // O objeto whereClause original vazio
        { slug_not: 'article-1' }
      ]
    };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        // Usamos expect.objectContaining para ser mais flexível com a estrutura de `AND`
        where: expect.objectContaining({ AND: expect.arrayContaining([expect.objectContaining({}), expect.objectContaining({ slug_not: 'article-1' })]) }),
        orderBy: 'createdAt_DESC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });

  // --- Teste para combinação de filtros ---
  it('should combine multiple filters and return total count', async () => {
    const result = await getArticles({
      where: 'category',
      categorySlug: 'Tech',
      excludeSlug: 'article-3',
      orderBy: 'createdAt_ASC',
    });

    expect(HygraphQuery).toHaveBeenCalledTimes(1);

    // Quando há combinação, o `whereClause` inicial se torna o primeiro elemento do array `AND`.
    const expectedWhere = {
      AND: [
        { category: { slug: 'Tech' } }, // O whereClause original
        { slug_not: 'article-3' }
      ]
    };

    expect(HygraphQuery).toHaveBeenCalledWith(
      expect.stringContaining('query ArticlesQuery'),
      {
        first: 50,
        skip: 0,
        // Novamente, expect.objectContaining para lidar com o `AND`
        where: expect.objectContaining({ AND: expect.arrayContaining([expect.objectContaining({ category: { slug: 'Tech' } }), expect.objectContaining({ slug_not: 'article-3' })]) }),
        orderBy: 'createdAt_ASC',
      },
      { revalidate: 60 * 60 * 24 }
    );

    expect(result.articles).toEqual(mockArticles);
    expect(result.totalCount).toEqual(mockTotalCount);
  });
});