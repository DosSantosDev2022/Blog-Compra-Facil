

const HYGRAPH_API_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_API_ENDPOINT;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

// Definição das opções para a função HygraphQuery
interface HygraphQueryOptions {
  cache?: RequestCache; // Opção de cache do fetch
  revalidate?: number;  // Intervalo de revalidação para ISR (Incremental Static Regeneration)
  tags?: string[];      // Tags para revalidação on-demand
}

export const HygraphQuery = async <T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: HygraphQueryOptions, // Use a interface definida
): Promise<T> => {
  // Desestruture as opções, com 'force-cache' como padrão para `cache`
  const { cache = 'force-cache', revalidate, tags } = options || {};

  // Validação das variáveis de ambiente críticas
  if (!HYGRAPH_API_ENDPOINT || !HYGRAPH_TOKEN) {
    throw new Error('Variáveis de ambiente HYGRAPH_API_ENDPOINT ou HYGRAPH_TOKEN não definidas para a consulta Hygraph.');
  }

  try {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    };

    // Adiciona a opção 'cache' se ela for definida (padrão é 'force-cache')
    if (cache) {
      fetchOptions.cache = cache;
    }

    // Adiciona as opções 'revalidate' e 'tags' para o `next` do fetch,
    // que controla o cache do Next.js
    fetchOptions.next = {};
    if (revalidate !== undefined) {
      fetchOptions.next.revalidate = revalidate;
    }
    if (tags !== undefined) {
      fetchOptions.next.tags = tags;
    }
    // Se nem revalidate nem tags forem definidos, podemos remover 'next' para evitar um objeto vazio,
    // mas o Next.js lida bem com `next: {}`
    if (Object.keys(fetchOptions.next).length === 0) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete fetchOptions.next;
    }

    const response = await fetch(HYGRAPH_API_ENDPOINT, fetchOptions);

    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Erro ao buscar dados do Hygraph: ${response.statusText} (Código: ${response.status}). Detalhes: ${JSON.stringify(errorData)}`
      );
    }

    // Tente obter o JSON da resposta
    const { data, errors } = await response.json();

    if (errors) {
      console.error('Erros na consulta Hygraph:', errors);
      throw new Error(`Erros na consulta Hygraph: ${JSON.stringify(errors)}`);
    }

    return data;
  } catch (error) {
    console.error('Erro ao realizar a consulta Hygraph:', error);
    // Propaga o erro para que a função chamadora possa lidar com ele
    throw error;
  }
};