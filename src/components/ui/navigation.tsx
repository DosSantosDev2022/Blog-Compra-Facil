'use client'

import type { ComponentPropsWithRef, ReactNode } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { createContext, useContext, useState, forwardRef, useRef } from 'react' // Importar useRef
import { twMerge } from 'tailwind-merge'
import Link, { type LinkProps } from 'next/link'

interface NavigationContextProps {
	openDropdown: string | null
	setOpenDropdown: (id: string | null) => void
}

const NavigationContext = createContext<
	NavigationContextProps | undefined
>(undefined)

const useNavigationContext = () => {
	const context = useContext(NavigationContext)
	if (!context) {
		throw new Error(
			'Navigation components must be used within a Navigation provider',
		)
	}
	return context
}

const NavigationProvider = ({ children }: { children: ReactNode }) => {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)

	return (
		<NavigationContext.Provider value={{ openDropdown, setOpenDropdown }}>
			{children}
		</NavigationContext.Provider>
	)
}

const Navigation = forwardRef<HTMLElement, ComponentPropsWithRef<'nav'>>(
	({ className, ...props }, ref) => (
		<NavigationProvider>
			<nav
				aria-label='Navegação principal do site'
				className={twMerge(
					'h-full w-full space-y-1 flex',
					'sm:space-y-2 lg:space-y-4',
					className,
				)}
				{...props}
				ref={ref}
			/>
		</NavigationProvider>
	),
)

Navigation.displayName = 'Navigation'

const NavigationList = forwardRef<
	HTMLUListElement,
	ComponentPropsWithRef<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		role="menubar"
		className={twMerge('flex flex-col lg:flex-row p-2 gap-2', className)}
		{...props}
		ref={ref}
	/>
))

NavigationList.displayName = 'NavigationList'

interface NavigationItemProps extends ComponentPropsWithRef<'li'> {
	id?: string
	isDrop?: boolean
	dropdownItems?: ReactNode[]
	hoverType?: 'text' | 'background'
	label?: string
}

const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
	(
		{
			className,
			isDrop,
			dropdownItems,
			id,
			children,
			hoverType = 'background',
			label,
			...props
		},
		ref,
	) => {
		const { openDropdown, setOpenDropdown } = useNavigationContext()
		const isOpen = openDropdown === id
		const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null) // Ref para o timeout

		const DROPDOWN_CLOSE_DELAY = 200 // Milissegundos de atraso para fechar

		const clearCloseTimeout = () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current)
				closeTimeoutRef.current = null
			}
		}

		const handleMouseEnter = () => {
			clearCloseTimeout() // Limpa qualquer timeout de fechamento pendente
			if (isDrop && id) {
				setOpenDropdown(id)
			}
		}

		const handleMouseLeave = () => {
			if (isDrop && id) {
				// Inicia um timeout para fechar o dropdown
				closeTimeoutRef.current = setTimeout(() => {
					setOpenDropdown(null)
				}, DROPDOWN_CLOSE_DELAY)
			}
		}

		// Adicionado para lidar com a entrada do mouse no dropdown em si
		const handleDropdownMouseEnter = () => {
			clearCloseTimeout() // Cancela o fechamento se o mouse entrar no dropdown
		}

		// Adicionado para lidar com a saída do mouse do dropdown em si
		const handleDropdownMouseLeave = () => {
			if (isDrop && id) {
				// Fecha o dropdown se o mouse sair da área do submenu
				setOpenDropdown(null)
			}
		}


		const handleClick = () => {
			clearCloseTimeout(); // Limpa timeout ao clicar
			if (isDrop && id) {
				setOpenDropdown(isOpen ? null : id)
			}
		}

		const handleKeyDown = (event: React.KeyboardEvent) => {
			if (isDrop && id) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					setOpenDropdown(isOpen ? null : id)
				} else if (event.key === 'Escape') {
					setOpenDropdown(null)
				}
			}
		}

		const hoverClasses =
			hoverType === 'text'
				? 'hover:text-primary-hover'
				: 'hover:bg-primary-hover'

		return (
			// biome-ignore lint/a11y/useValidAriaRole: <explanation>
			<li
				role="none"
				className={twMerge(
					'flex items-center justify-start lg:justify-center rounded-md px-2 py-1.5 relative',
					'sm:min-w-24 cursor-pointer transition-all duration-300',
					hoverClasses,
					isOpen && 'hover:text-inherit',
					className,
				)}
				{...props}
				ref={ref}
			>
				{isDrop ? (
					// biome-ignore lint/a11y/useButtonType: <explanation>
					<button
						id={id}
						onClick={handleClick}
						onMouseEnter={handleMouseEnter} // Evento de mouse no botão principal
						onMouseLeave={handleMouseLeave} // Evento de mouse no botão principal
						onKeyDown={handleKeyDown}
						role="menuitem"
						aria-haspopup="true"
						aria-expanded={isOpen}
						aria-controls={isDrop ? `dropdown-${id}` : undefined}
						className="flex items-center justify-between w-full"
						aria-label={label}
					>
						{children}
						<LuChevronDown
							aria-hidden="true"
							className={twMerge(
								'ml-1 duration-300 transition-transform',
								isOpen ? 'rotate-180' : '',
							)}
						/>
					</button>
				) : (
					// Para itens de navegação sem dropdown, o children é o link
					<div
						onMouseEnter={handleMouseEnter} // Garante que o hover behavior ainda funcione para itens sem dropdown
						onMouseLeave={handleMouseLeave}
						className="flex items-center w-full"
					>
						{children}
					</div>
				)}

				{isDrop && isOpen && dropdownItems && (
					<ul
						role='menu'
						id={`dropdown-${id}`}
						aria-label={label ? `Submenu de ${label}` : 'Submenu'}
						onMouseEnter={handleDropdownMouseEnter} // Adicionado: Mouse entra no UL do dropdown
						onMouseLeave={handleDropdownMouseLeave} // Adicionado: Mouse sai do UL do dropdown
						className={twMerge(
							'absolute top-full lg:right-0 bg-background border border-border z-50 ',
							'lg:w-4xl w-xs mt-1 rounded-md shadow-md p-2 transition-all duration-300 ease-in',
							'grid grid-cols-1 lg:grid-cols-3',
						)}
					>
						{dropdownItems.map((item, index) => (
							// biome-ignore lint/a11y/useValidAriaRole: <explanation>
							<li
								key={index} // Idealmente, use um ID único para a key
								role="none"
								className='text-sm w-auto px-2 py-1.5 rounded hover:bg-muted-hover text-foreground'
							>
								{item}
							</li>
						))}
					</ul>
				)}
			</li>
		)
	},
)

NavigationItem.displayName = 'NavigationItem'

// ... (Restante do NavigationLink e NavigationIcon permanece o mesmo)
interface NavigationLinkProps extends LinkProps {
	className?: string
	children?: ReactNode
	role?: 'menuitem' | 'button' | undefined;
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
	({ className, children, href, role, ...props }, ref) => {
		return (
			<Link
				className={twMerge('block w-full', className)}
				ref={ref}
				{...props}
				href={href || ''}
				passHref
				legacyBehavior
				role={role}
			>
				{children}
			</Link>
		)
	},
)

NavigationLink.displayName = 'NavigationLink'

const NavigationIcon = forwardRef<
	HTMLSpanElement,
	ComponentPropsWithRef<'span'>
>(({ className, ...props }, ref) => (
	<span
		className={twMerge('text-muted', className)}
		{...props}
		ref={ref}
	/>
))

NavigationIcon.displayName = 'NavigationIcon'

export {
	Navigation,
	NavigationIcon,
	NavigationItem,
	NavigationLink,
	NavigationList
}