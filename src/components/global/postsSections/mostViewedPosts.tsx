import { SectionTitle } from '../sectionTitle'

const MostViewedPosts = () => {
	return (
		<div className=''>
			<SectionTitle path='' title='Posts mais vistos' />
			<div className='overflow-x-auto'>
				<div className='flex gap-4 w-auto mt-3'>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 1 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 2 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 3 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 4 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 5 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 6 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 7 aqui */}
					</div>
					<div className='bg-gray-300 h-74 min-w-64'>
						{/* Conteúdo do post 8 aqui */}
					</div>
					{/* Adicione quantos posts forem necessários */}
				</div>
			</div>
		</div>
	)
}

export { MostViewedPosts }
