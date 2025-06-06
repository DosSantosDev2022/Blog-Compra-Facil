import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

const REVALIDATION_SECRET = process.env.HYGRAPH_REVALIDATION_SECRET;

interface HygraphWebhookPayload {
  data: {
    __typename: string;
    slug?: string;
    id?: string;
  };
  operation?: string;
  model?: {
    apiId: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verificação da Chave Secreta
    const secret = request.headers.get('x-hygraph-revalidation-secret');
    if (secret !== REVALIDATION_SECRET) {
      console.warn('Tentativa de revalidação com chave secreta inválida.');
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    // 2. Parse do Payload do Webhook
    const payload: HygraphWebhookPayload = await request.json();
    console.log('Webhook Hygraph recebido:', JSON.stringify(payload));

    // 3. Revalidação com base no Payload
    const modelApiId = payload.model?.apiId;
    const itemSlug = payload.data?.slug;

    if (modelApiId === 'Article') {
      // Revalida a página específica do artigo
      if (itemSlug) {
        revalidatePath(`/article/${itemSlug}`);
        console.log(`Revalidada a página do artigo: /article/${itemSlug}`);
      }
    
      revalidatePath('/'); 
      console.log('Revalidada a página inicial: /');
      revalidatePath('/articles');
      console.log('Revalidada a página de posts: /posts');

      revalidateTag('articles');
      console.log('Revalidada a tag: articles');
    } 
    else if (modelApiId === 'Category') {
      if (itemSlug) {
        revalidatePath(`/category/${itemSlug}`);
        console.log(`Revalidada a página da categoria: /category/${itemSlug}`);
      }
      revalidateTag('categories');
      console.log('Revalidada a tag: categories');
    }
  

    // 4. Retorno de Sucesso
    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 });

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (err: any) {
    console.error('Erro na API de revalidação:', err.message, err.stack);
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}