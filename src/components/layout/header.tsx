'use client'

import {
	Button,
	Navigation,
	NavigationItem,
	NavigationList,
	NavigationLink // Importar NavigationLink
} from '@/components/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import { InputSearch } from '../global/search'
import data from '@/config/categories.json' // Assumo que 'data' é usado para categorias
import { chakra } from '@/assets/fonts'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIsMobile = () => {
			setIsOpen(window.innerWidth < 1024)
		}
		checkIsMobile()

		window.addEventListener('resize', checkIsMobile)

		return () => window.removeEventListener('resize', checkIsMobile)
	}, [])

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	const links = [
		{ label: 'Home', url: '/' },
		{ label: 'Posts', url: '/posts' },
		{ label: 'Produtos recomendados', url: '/products' },
	]

	return (
		<header className='w-full lg:fixed top-0 z-50 px-4 py-5 lg:px-10 lg:py-6 border border-border bg-primary dark:bg-secondary text-primary-foreground'>
			<div className='flex flex-col lg:h-10 lg:flex-row items-center justify-between lg:gap-10'>
				{/* Logo + Toggle Mobile */}
				<div className='flex items-center justify-between w-full lg:w-auto'>
					{/* O logo agora é um Link */}
					<Link
						href="/"
						aria-label="Página inicial do OnTech Blog"
						title="Ir para a página inicial do OnTech Blog"
						className={`${chakra.className} text-5xl font-bold`}
					>
						onTech
					</Link>
					<Button
						onClick={handleOpenMenu}
						sizes='icon'
						className='lg:hidden'
						aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} // Rótulo dinâmico para o botão
					>
						{isOpen ? (
							<IoClose aria-hidden="true" size={28} /> // Ícone decorativo
						) : (
							<IoMenu aria-hidden="true" size={28} /> // Ícone decorativo
						)}
					</Button>
				</div>

				{/* Navegação */}
				<div
					aria-hidden={!isOpen}
					tabIndex={!isOpen && isMobile ? -1 : 0}
					className={`
            transition-all duration-300 ease-in-out
            p-1 z-50
            w-full lg:w-auto
            ${isOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
            lg:!max-h-none lg:!opacity-100 lg:!translate-y-0 lg:flex
            flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10
          `}
				>
					<Navigation>
						<NavigationList>
							{links.map((link) => ( // Removido 'index' como key
								<NavigationItem
									key={link.label} // Usando a URL como key, se for única
									className='truncate'
									onClick={handleOpenMenu} // Fecha o menu mobile ao clicar no link
									tabIndex={!isOpen && isMobile ? -1 : 0}
								>
									{/* Renderizando NavigationLink como filho direto do NavigationItem */}
									<NavigationLink href={link.url}>
										{link.label}
									</NavigationLink>
								</NavigationItem>
							))}

							<NavigationItem
								isDrop
								id='dropdown1'
								label="Categorias" // Passa o rótulo para o NavigationItem para uso no aria-label do botão
								tabIndex={!isOpen && isMobile ? -1 : 0}
								dropdownItems={data.categories.map((cat) => (
									<NavigationLink // Usando NavigationLink para os itens do dropdown
										onClick={handleOpenMenu}
										key={cat.slug || cat.name}
										href={`/category/${cat.slug || ''}`}
										role="menuitem"
									>
										{cat.name}
									</NavigationLink>
								))}
							>
								Categorias
							</NavigationItem>
						</NavigationList>
					</Navigation>
					<InputSearch tabIndex={!isOpen && isMobile ? -1 : 0} />
				</div>
			</div>
		</header>
	)
}

export { Header }