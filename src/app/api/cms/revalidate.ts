// /pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'MY_SECRET_TOKEN'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { secret, type, slug } = req.body

  if (secret !== REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    console.log(`🌀 Revalidating type: ${type}, slug: ${slug}`)

    // Revalidar páginas conforme o tipo de conteúdo
    switch (type) {
      case 'article':
        await res.revalidate(`/artigos/${slug}`)
        break

      case 'category':
        await res.revalidate(`/category/${slug}`)
        break

      // Revalide rotas adicionais se necessário
      default:
        // Revalide página inicial e listagens por padrão
        await res.revalidate('/')
        await res.revalidate('article')
        await res.revalidate('category')
        await res.revalidate('/posts')
        await res.revalidate('/products')
        break
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error revalidating' })
  }
}
