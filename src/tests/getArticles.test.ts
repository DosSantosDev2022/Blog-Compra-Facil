import { getArticles } from '@/services/getArticles';
import { HygraphQuery } from '@/app/api/cms/hygraph';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('@/app/api/cms/hygraph', () => ({
  HygraphQuery: vi.fn(),
}));

describe('getArticles', () => {
  const mockArticles = [
    {
      id: '1',
      slug: 'article-1',
      title: 'Article 1',
      description: 'Description',
      coverImage: { url: 'https://image.url' },
      category: { id: 'cat-1', name: 'Tech', view: 50 },
      createdAt: '2023-01-01',
      highlights: true,
      content: { raw: {} },
    },
    {
      id: '2',
      slug: 'article-2',
      title: 'Article 2',
      description: 'Description',
      coverImage: { url: 'https://image.url' },
      category: { id: 'cat-2', name: 'politica', view: 150 },
      createdAt: '2023-01-01',
      highlights: false,
      content: { raw: {} },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should search for articles with default options', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles();

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 10,
      skip: 0,
      where: undefined,
      orderBy: 'createdAt_DESC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });

  it('should search for articles with pagination', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles({ page: 2, pageSize: 5 });

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 5,
      skip: 5,
      where: undefined,
      orderBy: 'createdAt_DESC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });

  it('should search for articles with highlights filter', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles({ where: 'highlights' });

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 10,
      skip: 0,
      where: { highlights: true },
      orderBy: 'createdAt_DESC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });

  it('should search for articles with view filter', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles({ where: 'view' });

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 10,
      skip: 0,
      where: { view_gt: 10 },
      orderBy: 'createdAt_DESC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });

  it('should look for articles with specific category', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles({ where: 'category', categoryName: 'Technology' });

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 10,
      skip: 0,
      where: { category: { name: 'Technology' } },
      orderBy: 'createdAt_DESC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });

  it('should search for articles with search query', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles({ where: 'search', search: 'React' });

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 10,
      skip: 0,
      where: { _search: 'React' },
      orderBy: 'createdAt_DESC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });

  it('should look for articles with custom order', async () => {
    const mockResponse = { articles: mockArticles };
    (HygraphQuery as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getArticles({ orderBy: 'createdAt_ASC' });

    expect(HygraphQuery).toHaveBeenCalledWith(expect.any(String), {
      first: 10,
      skip: 0,
      where: undefined,
      orderBy: 'createdAt_ASC',
    }, expect.any(Object));

    expect(result.articles).toEqual(mockResponse.articles);
  });
});
