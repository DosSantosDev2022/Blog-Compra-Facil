'use client'

import {
	Button,
	Input,
	Navigation,
	NavigationItem,
	NavigationLink,
	NavigationList,
} from '@/components/ui'
import { useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	const links = [
		{ label: 'Home', url: '/#' },
		{ label: 'About', url: '/#' },
		{ label: 'Blog', url: '/#' },
		{ label: 'Contact', url: '/#' },
	]

	const categories = [
		{ label: 'Política', slug: 'politica' },
		{ label: 'Economia', slug: 'economia' },
		{ label: 'Mundo', slug: 'mundo' },
		{ label: 'Esportes', slug: 'esportes' },
		{ label: 'Tecnologia', slug: 'tecnologia' },
		{ label: 'Saúde', slug: 'saude' },
		{ label: 'Entretenimento', slug: 'entretenimento' },
		{ label: 'Ciência', slug: 'ciencia' },
		{ label: 'Educação', slug: 'educacao' },
		{ label: 'Cultura', slug: 'cultura' },
		{ label: 'Viagem', slug: 'viagem' },
		{ label: 'Gastronomia', slug: 'gastronomia' },
		{ label: 'Automobilismo', slug: 'automobilismo' },
		{ label: 'Cinema', slug: 'cinema' },
		{ label: 'Música', slug: 'musica' },
	]

	return (
		<header className='w-full px-4 lg:px-10 py-5 border border-border bg-primary text-primary-foreground'>
			<div className='flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10'>
				{/* Logo + Toggle Mobile */}
				<div className='flex items-center justify-between w-full lg:w-auto'>
					<h1 className='text-4xl font-bold'>Atualiza News</h1>
					<Button
						onClick={handleOpenMenu}
						sizes='icon'
						className='lg:hidden'
						aria-label='Toggle menu'
					>
						{isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
					</Button>
				</div>

				{/* Navegação */}
				<div
					className={`
						transition-all duration-300 ease-in-out
						 p-1
						w-full lg:w-auto
						${isOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 '}
						lg:!max-h-none lg:!opacity-100 lg:!translate-y-0 lg:flex
						flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10
					`}
				>
					<Navigation>
						<NavigationList>
							{links.map((link, index) => (
								<NavigationItem key={index}>
									<NavigationLink href={link.url}>
										{link.label}
									</NavigationLink>
								</NavigationItem>
							))}

							<NavigationItem
								isDrop
								id='dropdown1'
								dropdownItems={categories.map((category, index) => (
									<NavigationLink key={index} href={category.slug}>
										{category.label}
									</NavigationLink>
								))}
							>
								Categorias
							</NavigationItem>
						</NavigationList>
					</Navigation>
					<Input placeholder='Buscar...' />
				</div>
			</div>
		</header>
	)
}

export default Header
