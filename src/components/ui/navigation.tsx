/**
 * @file navigation.tsx
 * @description Componentes de navegação e dropdown para o cabeçalho.
 */

'use client'

import Link, { type LinkProps } from 'next/link'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { createContext, forwardRef, useContext, useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

interface NavigationContextProps {
	openDropdown: string | null
	setOpenDropdown: (id: string | null) => void
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
	undefined,
)

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
				aria-label="Navegação principal do site"
				className={twMerge('h-full w-full', className)}
				{...props}
				ref={ref}
			/>
		</NavigationProvider>
	),
)

Navigation.displayName = 'Navigation'

const NavigationList = forwardRef<HTMLUListElement, ComponentPropsWithRef<'ul'>>(
	({ className, ...props }, ref) => (
		<ul
			role="menubar"
			className={twMerge(
				'flex flex-col gap-2 p-2 lg:flex-row lg:p-0',
				className,
			)}
			{...props}
			ref={ref}
		/>
	),
)

NavigationList.displayName = 'NavigationList'

interface NavigationItemProps extends ComponentPropsWithRef<'li'> {
	id?: string
	isDrop?: boolean
	dropdownItems?: ReactNode[]
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
			label,
			...props
		},
		ref,
	) => {
		const { openDropdown, setOpenDropdown } = useNavigationContext()
		const isOpen = openDropdown === id

		const handleToggle = () => {
			if (isDrop && id) {
				setOpenDropdown(isOpen ? null : id)
			}
		}

		return (
			// biome-ignore lint/a11y/useValidAriaRole: <explanation>
			<li
				role="none"
				className={twMerge(
					'relative flex items-center justify-start rounded-md px-2 py-1.5',
					'cursor-pointer transition-all duration-300',
					'hover:bg-accent hover:text-primary',
					className,
				)}
				{...props}
				ref={ref}
			>
				{isDrop ? (
					<button
						id={id}
						type='button'
						onClick={handleToggle}
						role="menuitem"
						aria-haspopup="true"
						aria-expanded={isOpen}
						aria-controls={isDrop ? `dropdown-${id}` : undefined}
						className="flex w-full items-center justify-between cursor-pointer"
						aria-label={label}
					>
						{children}
						<LuChevronDown
							aria-hidden="true"
							className={twMerge(
								'ml-1 transition-transform duration-300',
								isOpen ? 'rotate-180' : '',
							)}
						/>
					</button>
				) : (
					<div className="flex w-full items-center">{children}</div>
				)}

				{isDrop && isOpen && dropdownItems && (
					<ul
						role="menu"
						id={`dropdown-${id}`}
						aria-label={label ? `Submenu de ${label}` : 'Submenu'}
						className={twMerge(
							'absolute left-0 top-full z-[100] mt-1 rounded-md border border-border bg-background p-2 shadow-lg transition-all duration-300 ease-in',
							'w-44 lg:w-56',
						)}
					>
						{dropdownItems.map((item, index) => (
							// biome-ignore lint/a11y/useValidAriaRole: <explanation>
							<li
								key={index}
								role="none"
								className="w-auto rounded px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
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

interface NavigationLinkProps extends LinkProps {
	className?: string
	children?: ReactNode
	role?: 'menuitem' | 'button' | undefined
	onClick?: () => void
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
	({ className, children, href, role, onClick, ...props }, ref) => {
		const { setOpenDropdown } = useNavigationContext()
		const handleClick = () => {
			setOpenDropdown(null)
			if (onClick) {
				onClick()
			}
		}

		return (
			<Link
				className={twMerge(
					'block w-full text-foreground hover:text-primary',
					className,
				)}
				ref={ref}
				href={href || ''}
				role={role}
				{...props}
				onClick={handleClick}
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
	<span className={twMerge('text-muted', className)} {...props} ref={ref} />
))

NavigationIcon.displayName = 'NavigationIcon'

export {
	Navigation,
	NavigationIcon,
	NavigationItem,
	NavigationLink,
	NavigationList
}
