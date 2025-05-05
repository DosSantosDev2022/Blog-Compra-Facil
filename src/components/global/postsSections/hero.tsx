const HeroSection = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-5 gap-4 w-full h-auto'>
			{/* Post Principal */}
			<div className='bg-gray-300 h-96 lg:h-full lg:col-span-2'>
				{/* Conteúdo do post principal aqui */}
			</div>

			{/* Container para os posts menores */}
			<div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div className='bg-gray-300 h-64 md:h-74'>
					{/* Conteúdo do post 2 aqui */}
				</div>
				<div className='bg-gray-300 h-64 md:h-74'>
					{/* Conteúdo do post 3 aqui */}
				</div>
				<div className='bg-gray-300 h-64 md:h-74'>
					{/* Conteúdo do post 4 aqui */}
				</div>
				<div className='bg-gray-300 h-64 md:h-74'>
					{/* Conteúdo do post 5 aqui */}
				</div>
			</div>
		</div>
	)
}

export { HeroSection }
