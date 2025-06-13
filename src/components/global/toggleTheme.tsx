'use client'
import { Button } from '@/components/ui'
import { useCallback, useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { MdSunny } from 'react-icons/md'

const ToggleTheme = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
		}
		return 'light'
	})

	const applyThemeToIframe = useCallback(() => {
		const iframe = document.querySelector('iframe')
		if (iframe?.contentDocument) {
			const iframehtml = iframe.contentDocument.documentElement
			if (iframehtml) {
				iframehtml.classList.toggle('dark', theme === 'dark')
			}
		}
	}, [theme])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
		applyThemeToIframe()
	}, [theme, applyThemeToIframe])

	const handleThemeToggle = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const savedTheme =
			(localStorage.getItem('theme') as 'light' | 'dark') || 'light'
		setTheme(savedTheme)
	}, [setTheme])

	// Define o texto do label para acessibilidade e a dica do botão.
	const buttonAriaLabel =
		theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'
	const buttonTitle =
		theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'

	return (
		<div className='fixed bottom-5 right-5 z-50'>
			{' '}
			{/* Container flutuante */}
			<Button
				variants={theme === 'light' ? 'primary' : 'secondary'}
				aria-label={buttonAriaLabel}
				onClick={handleThemeToggle}
				title={buttonTitle}
				sizes='icon'
				className='rounded-full shadow-md active:scale-75 duration-500 transition-all'
			>
				{theme === 'light' ? <MdSunny size={18} aria-hidden="true" /> : <FaMoon size={18} aria-hidden="true" />}
			</Button>
		</div>
	)
}

export { ToggleTheme }
