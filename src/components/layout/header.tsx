'use client'
import type { Category } from '@/@types/hygraphTypes'
import {
	Button,
	Input,
	Navigation,
	NavigationItem,
	NavigationLink,
	NavigationList,
} from '@/components/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import { InputSearch } from '../global/search'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [category, setCategory] = useState<Category[]>([])

	useEffect(() => {
		const fetchCategoriesClient = async () => {
			try {
				const response = await fetch('/api/categories')
				if (!response.ok) {
					throw new Error(`Erro na requisição: ${response.status}`)
				}
				const data = await response.json()
				setCategory(data.categories) // Assumindo que sua action do Zustand agora aceita os dados diretamente
			} catch (error) {
				console.error('Erro ao buscar categorias no cliente:', error)
			}
		}
		fetchCategoriesClient()
	}, [])

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	const links = [
		{ label: 'Home', url: '/#' },
		{ label: 'About', url: '/#' },
		{ label: 'Blog', url: '/#' },
		{ label: 'Newsletters', url: '/#' },
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
								dropdownItems={category.map((cat) => (
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
