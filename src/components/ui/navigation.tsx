'use client'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { createContext, useContext, useState, forwardRef } from 'react'
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
				aria-label='navigation'
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
			...props
		},
		ref,
	) => {
		const { openDropdown, setOpenDropdown } = useNavigationContext()
		const isOpen = openDropdown === id

		const handleMouseEnter = () => {
			if (isDrop && id) setOpenDropdown(id)
		}

		const handleMouseLeave = () => {
			if (isDrop && id) setOpenDropdown(null)
		}

		const handleClick = () => {
			if (isDrop && id) {
				setOpenDropdown(isOpen ? null : id)
			}
		}

		const hoverClasses =
			hoverType === 'text'
				? 'hover:text-primary-hover'
				: 'hover:bg-primary-hover'

		return (
			<li
				id={id}
				role={isDrop ? 'menuitem' : undefined}
				aria-haspopup={isDrop ? 'true' : undefined}
				aria-expanded={isDrop ? isOpen : undefined}
				aria-controls={isDrop ? `dropdown-${id}` : undefined}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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
				{children}

				{isDrop && (
					<LuChevronDown
						className={twMerge(
							'ml-1 duration-300 transition-transform',
							isOpen ? 'rotate-180' : '',
						)}
					/>
				)}

				{isDrop && isOpen && dropdownItems && (
					<ul
						role='menu'
						id={`dropdown-${id}`}
						aria-label='dropdown'
						className={twMerge(
							'absolute top-full lg:right-0 bg-background border border-border z-50 ',
							'lg:w-4xl w-xs mt-1 rounded-md shadow-md p-2 transition-all duration-300 ease-in',
							'grid grid-cols-1 lg:grid-cols-3',
						)}
					>
						{dropdownItems.map((item, index) => (
							<li
								key={index}
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

interface NavigationLinkProps extends LinkProps {
	className?: string
	children?: ReactNode
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
	({ className, children, href, ...props }, ref) => {
		return (
			<Link
				className={twMerge('', className)}
				ref={ref}
				{...props}
				href={href || ''}
				passHref
				legacyBehavior
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
	NavigationList,
}
