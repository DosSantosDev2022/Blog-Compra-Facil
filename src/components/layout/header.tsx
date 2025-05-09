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
import { categories, links } from '@/config/links'
import { useCategories } from '@/hooks/useCategory'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { data: categories, loading } = useCategories()

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header className='w-full lg:fixed z-50 px-4 py-5 lg:px-10 lg:py-12 border border-border bg-primary text-primary-foreground'>
			<div className='flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10'>
				{/* Logo + Toggle Mobile */}
				<div className='flex items-center justify-between w-full lg:w-auto'>
					<h1 className='text-6xl font-bold'>onTech</h1>
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
						 p-1 z-50
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
									<Link href={link.url}>{link.label}</Link>
								</NavigationItem>
							))}

							<NavigationItem
								isDrop
								id='dropdown1'
								dropdownItems={categories.map((cat) => (
									<Link key={cat.id} href={`/category/${cat.slug || ''}`}>
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
