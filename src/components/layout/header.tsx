'use client'

import {
	Button,
	Navigation,
	NavigationItem,
	NavigationList,
} from '@/components/ui'
import Link from 'next/link'
import { useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import { InputSearch } from '../global/search'
import { categories } from '@/config/categories.json'
import { chakra } from '@/assets/fonts'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	const links = [
		{ label: 'Home', url: '/' },
		{ label: 'Posts', url: '/posts' },
		{ label: 'Produtos', url: '/products' },
	]

	return (
		<header className='w-full lg:fixed top-0 z-50 px-4 py-5 lg:px-10 lg:py-6 border border-border bg-primary text-primary-foreground'>
			<div className='flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10'>
				{/* Logo + Toggle Mobile */}
				<div className='flex items-center justify-between w-full lg:w-auto'>
					<h1
						aria-label='Logo onTech blog'
						className={`${chakra.className} text-5xl font-bold`}
					>
						onTech
					</h1>
					<Button
						onClick={handleOpenMenu}
						sizes='icon'
						className='lg:hidden'
						aria-label='Toggle menu'
					>
						{isOpen ? (
							<IoClose aria-label='Toggle menu close' size={28} />
						) : (
							<IoMenu aria-label='Toggle menu open' size={28} />
						)}
					</Button>
				</div>

				{/* Navegação */}
				<div
					className={`
						transition-all duration-300 ease-in-out
						 p-1 z-50
						w-full lg:w-auto
						${isOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0  opacity-0 -translate-y-2 '}
						lg:!max-h-none lg:!opacity-100 lg:!translate-y-0 lg:flex
						flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-10
					`}
				>
					<Navigation>
						<NavigationList>
							{links.map((link, index) => (
								<NavigationItem
									onClick={handleOpenMenu}
									aria-label={link.label}
									key={index}
								>
									<Link href={link.url}>{link.label}</Link>
								</NavigationItem>
							))}

							<NavigationItem
								isDrop
								id='dropdown1'
								dropdownItems={categories.map((cat) => (
									<Link
										onClick={handleOpenMenu}
										aria-label={cat.name}
										key={cat.name}
										href={`/category/${cat.slug || ''}`}
									>
										{cat.name}
									</Link>
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
