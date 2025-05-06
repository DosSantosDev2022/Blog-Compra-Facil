import { ShareButtons } from '@/components/pages/article/shareButtons'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default function ArticlePage() {
	return (
		<div className='container mx-auto py-8'>
			{/* Header com foto de destaque */}
			<div className='w-full h-96 bg-zinc-400 rounded-lg overflow-hidden'>
				{/* Imagem de destaque aqui */}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
				{/* Conteúdo principal do artigo */}
				<div className='lg:col-span-2 space-y-6'>
					<h1 className='text-3xl font-bold'>Título do Artigo</h1>
					<p className='text-gray-600'>
						Publicado em: [Data] | Por: [Autor]
					</p>

					{/* Espaço para anúncio no topo do conteúdo */}
					<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md'>
						{/* Anúncio aqui */}
						Anúncio
					</div>

					<div className='space-y-4 text-lg'>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
							do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud exercitation
							ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
							aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint
							occaecat cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum.
						</p>
						<p>
							Sed ut perspiciatis unde omnis iste natus error sit
							voluptatem accusantium doloremque laudantium, totam rem
							aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
							voluptatem quia voluptas sit aspernatur aut odit aut fugit,
							sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Neque porro quisquam est, qui
							dolorem ipsum quia dolor sit amet, consectetur, adipisci
							velit, sed quia non numquam eius modi tempora incidunt ut
							labore et dolore magnam aliquam quaerat voluptatem.
						</p>
						{/* Mais parágrafos do artigo */}
						<p>
							At vero eos et accusamus et iusto odio dignissimos ducimus
							qui blanditiis praesentium voluptatum deleniti atque corrupti
							quos dolores et quas molestias excepturi sint occaecati
							cupiditate non provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum fuga. Et
							harum quidem rerum facilis est et expedita distinctio. Nam
							libero tempore, cum soluta nobis est eligendi optio cumque
							nihil impedit quo minus id quod maxime placeat facere
							possimus, omnis voluptas assumenda est, omnis dolores
							repellendus. Temporibus autem quibusdam et aut officiis
							debitis aut rerum necessitatibus saepe eveniet ut et
							voluptates repudiandae sint et molestiae non recusandae.
							Itaque earum rerum hic tenetur a sapiente delectus, ut aut
							reiciendis voluptatibus maiores alias consequatur aut
							perferendis doloribus asperiores repellat.
						</p>
					</div>

					{/* Espaço para anúncio no meio do conteúdo */}
					<div className='w-full h-24 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md'>
						{/* Anúncio aqui */}
						Anúncio
					</div>

					{/* Área de compartilhamento */}
					<div className='mt-8 border-t border-gray-200 py-4'>
						<h3 className='text-lg font-semibold mb-2'>Compartilhe:</h3>
						<ShareButtons />
					</div>
				</div>

				{/* Artigos relacionados (Sidebar) */}
				<aside className='space-y-6'>
					<h2 className='text-xl font-semibold'>Artigos Relacionados</h2>
					<div className='bg-zinc-300 h-48 rounded-md'>
						{/* Artigo relacionado 1 */}
					</div>
					<div className='bg-zinc-300 h-48 rounded-md'>
						{/* Artigo relacionado 2 */}
					</div>
					<div className='bg-zinc-300 h-48 rounded-md'>
						{/* Artigo relacionado 3 */}
					</div>

					{/* Espaço para anúncio na sidebar */}
					<div className='w-full h-48 bg-zinc-200 flex items-center justify-center text-gray-500 rounded-md'>
						{/* Anúncio aqui */}
						Anúncio
					</div>
				</aside>
			</div>
		</div>
	)
}
