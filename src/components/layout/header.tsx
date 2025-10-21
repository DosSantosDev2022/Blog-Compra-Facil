/**
 * @file header.tsx
 * @description Componente de cabeçalho responsivo para navegação principal e busca.
 */

'use client'

import { chakra } from '@/assets/fonts'
import {
	Button,
	Navigation,
	NavigationItem,
	NavigationLink,
	NavigationList,
} from '@/components/ui'
import data from '@/config/categories.json'
import Link from 'next/link'
import { useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'
import { InputSearch } from '../global/search'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	const links = [
		{ label: 'Home', url: '/' },
		{ label: 'Posts', url: '/posts' },
		{ label: 'Produtos recomendados', url: '/products' },
	]

	return (
		<header className="fixed top-0 z-50 w-full border-b border-border bg-background px-4 py-5 text-foreground lg:px-10 lg:py-6">
			<div className="mx-auto flex w-full flex-col items-center justify-between lg:h-10 lg:flex-row lg:gap-10">
				{/* Logo e Botão do menu */}
				<div className="flex w-full items-center justify-between lg:w-auto">
					<Link
						href="/"
						aria-label="Página inicial do OnTech Blog"
						title="Ir para a página inicial do OnTech Blog"
						className={twMerge(
							chakra.className,
							'text-5xl font-bold text-foreground transition-colors hover:text-primary lg:text-3xl',
						)}
					>
						Compra Fácil
					</Link>
					<Button
						onClick={handleOpenMenu}
						sizes="icon"
						variants="primary"
						className="rounded-full lg:hidden"
						aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
					>
						{isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
					</Button>
				</div>

				{/* Navegação e Busca */}
				<div
					className={twMerge(
						'flex flex-col items-start gap-5 transition-all duration-300 ease-in-out lg:flex-row lg:items-center lg:gap-4',
						isOpen
							? 'pointer-events-auto mt-4 max-h-[500px] opacity-100'
							: 'pointer-events-none -translate-y-2 max-h-0 opacity-0',
						'lg:pointer-events-auto lg:mt-0 lg:max-h-none lg:translate-y-0 lg:opacity-100',
					)}
				>
					<Navigation>
						<NavigationList>
							{links.map((link) => (
								<NavigationItem key={link.label}>
									<NavigationLink onClick={handleOpenMenu} href={link.url}>
										<span className="whitespace-nowrap">{link.label}</span>
									</NavigationLink>
								</NavigationItem>
							))}
							<NavigationItem
								isDrop
								id="dropdown1"
								label="Categorias"
								dropdownItems={data.categories.map((cat) => (
									<NavigationLink
										onClick={handleOpenMenu}
										key={cat.slug || cat.name}
										href={`/category/${cat.slug || ''}`}
									>
										{cat.name}
									</NavigationLink>
								))}
							>
								Categorias
							</NavigationItem>
						</NavigationList>
					</Navigation>
					<InputSearch />
				</div>
			</div>
		</header>
	)
}

export { Header }

