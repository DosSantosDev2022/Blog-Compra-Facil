'use client'

import {
	Button,
	Navigation,
	NavigationItem,
	NavigationList,
	NavigationLink,
} from '@/components/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import { InputSearch } from '../global/search'
import data from '@/config/categories.json'
import { chakra } from '@/assets/fonts'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false) // Estado para controlar se é mobile

	useEffect(() => {
		const checkIsMobile = () => {
			// isMobile é true se a tela for menor que 1024px
			setIsMobile(window.innerWidth < 1024)
			// Se a tela for maior ou igual a 1024px, garante que o menu esteja sempre aberto (para desktop)
			// e que o estado 'isOpen' seja redefinido para 'false' quando se torna mobile, para não iniciar aberto.
			if (window.innerWidth >= 1024) {
				setIsOpen(false)
			}
		}

		// Chama a função uma vez para definir o estado inicial
		checkIsMobile()

		// Adiciona o event listener para redimensionamento
		window.addEventListener('resize', checkIsMobile)

		// Limpa o event listener
		return () => window.removeEventListener('resize', checkIsMobile)
	}, []) // O array de dependências vazio garante que isso rode apenas uma vez na montagem

	const handleOpenMenu = () => {
		// Apenas alterna o estado isOpen.
		// Ele será false por padrão em mobile e se tornará true/false com o clique.
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
					<Link
						href='/'
						aria-label='Página inicial do OnTech Blog'
						title='Ir para a página inicial do OnTech Blog'
						className={`${chakra.className} text-5xl font-bold`}
					>
						onTech
					</Link>
					{/* O botão de menu só aparece em telas mobile */}
					{isMobile && (
						<Button
							onClick={handleOpenMenu}
							sizes='icon'
							className='lg:hidden'
							aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
						>
							{isOpen ? (
								<IoClose aria-hidden='true' size={28} />
							) : (
								<IoMenu aria-hidden='true' size={28} />
							)}
						</Button>
					)}
				</div>

				{/* Navegação */}
				<div
					aria-hidden={isMobile ? !isOpen : false}
					tabIndex={isMobile && !isOpen ? -1 : 0}
					className={`
            transition-all duration-300 ease-in-out
            p-1 z-50
            w-full lg:w-auto
            ${isMobile && !isOpen ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none' : 'max-h-[500px] opacity-100 translate-y-0'}
            lg:!max-h-none lg:!opacity-100 lg:!translate-y-0 lg:flex
            flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10
          `}
				>
					<Navigation>
						<NavigationList>
							{links.map((link) => (
								<NavigationItem
									key={link.label}
									className='truncate'
									onClick={isMobile ? handleOpenMenu : undefined} // Fecha o menu mobile ao clicar no link, apenas em mobile
									tabIndex={isMobile && !isOpen ? -1 : 0}
								>
									<NavigationLink href={link.url}>{link.label}</NavigationLink>
								</NavigationItem>
							))}

							<NavigationItem
								isDrop
								id='dropdown1'
								label='Categorias'
								tabIndex={isMobile && !isOpen ? -1 : 0}
								dropdownItems={data.categories.map((cat) => (
									<NavigationLink
										onClick={isMobile ? handleOpenMenu : undefined} // Fecha o menu mobile ao clicar no link, apenas em mobile
										key={cat.slug || cat.name}
										href={`/category/${cat.slug || ''}`}
										role='menuitem'
									>
										{cat.name}
									</NavigationLink>
								))}
							>
								Categorias
							</NavigationItem>
						</NavigationList>
					</Navigation>
					<InputSearch tabIndex={isMobile && !isOpen ? -1 : 0} />
				</div>
			</div>
		</header>
	)
}

export { Header }