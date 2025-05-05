import { Button } from '@/components/ui'
import Link from 'next/link'
import { SectionTitle } from '../sectionTitle'

const LatestNews = () => {
	return (
		<div className=''>
			<SectionTitle path='/noticias/recentes' title='Últimas Notícias' />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
				{/* Espaço para anúncio 3 */}
				<div className='w-full h-full bg-zinc-200 flex items-center justify-center text-gray-500'>
					{/* Futuro anúncio aqui */}
					Anúncio
				</div>
				<ul className='space-y-3'>
					<li className='bg-gray-300 rounded-md flex flex-col sm:flex-row items-start sm:items-center p-4'>
						<div className='w-full sm:w-32 h-24 bg-gray-400 rounded-md mr-4 mb-2 sm:mb-0'>
							{/* Imagem da notícia */}
						</div>
						<div className='flex-grow'>
							<h3 className='font-semibold'>Título da Última Notícia 1</h3>
							<p className='text-sm text-gray-600'>
								Breve descrição da notícia 1...
							</p>
						</div>
						<Button sizes='sm' asChild>
							<Link href='/noticia/1'>Ler mais</Link>
						</Button>
					</li>
					<li className='bg-gray-300 rounded-md flex flex-col sm:flex-row items-start sm:items-center p-4'>
						<div className='w-full sm:w-32 h-24 bg-gray-400 rounded-md mr-4 mb-2 sm:mb-0'>
							{/* Imagem da notícia */}
						</div>
						<div className='flex-grow'>
							<h3 className='font-semibold'>Título da Última Notícia 2</h3>
							<p className='text-sm text-gray-600'>
								Breve descrição da notícia 2...
							</p>
						</div>
						<Button sizes='sm' asChild>
							<Link href='/noticia/2'>Ler mais</Link>
						</Button>
					</li>
					<li className='bg-gray-300 rounded-md flex flex-col sm:flex-row items-start sm:items-center p-4'>
						<div className='w-full sm:w-32 h-24 bg-gray-400 rounded-md mr-4 mb-2 sm:mb-0'>
							{/* Imagem da notícia */}
						</div>
						<div className='flex-grow'>
							<h3 className='font-semibold'>Título da Última Notícia 3</h3>
							<p className='text-sm text-gray-600'>
								Breve descrição da notícia 3...
							</p>
						</div>
						<Button sizes='sm' asChild>
							<Link href='/noticia/3'>Ler mais</Link>
						</Button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export { LatestNews }
