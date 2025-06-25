import { chakra } from '@/assets/fonts'
import { NewsLetterForm } from '@/components/global/newsletterForm'
import Link from 'next/link'
import { BsPinterest } from 'react-icons/bs'
import { FaYoutube } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

const Footer = () => {
	const socialLinks = [
		{
			label: 'Instagram do OnTech Blog',
			icon: <RiInstagramFill className='w-8 h-8' />,
			url: 'https://www.instagram.com/ontechblog/',
		},
		{
			label: 'Canal Youtube do OnTech Blog',
			icon: <FaYoutube className='w-8 h-8' />,
			url: 'https://www.youtube.com/channel/UCD80XkyM8H6OIV2bxztiYYQ',
		},
		{
			label: 'Pinterest do OnTech Blog',
			icon: <BsPinterest className='w-8 h-8' />,
			url: 'https://br.pinterest.com/ontechblog2025/',
		},
	]

	const navLinks = [
		{
			label: 'Política de Privacidade',
			url: '/privacyPolicy',
		},
		{
			label: 'Sobre Nós',
			url: '/about',
		},
	]

	return (
		<footer className='px-4 py-8 md:px-8 bg-primary dark:bg-secondary text-primary-foreground'>
			<div className='max-w-full grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start'> {/* Ajustei o grid para 4 colunas */}
				{/* Logo / About */}
				<div className='max-w-sm p-2 md:col-span-1'>
					<Link className={`${chakra.className} text-5xl font-bold`} href="/" aria-label="Página inicial do OnTech Blog" title="Ir para a página inicial">
						onTech
					</Link>
					<p className='mt-2 text-base md:text-lg'>
						Receba notícias todos os dias e se mantenha atualizado sobre o
						mundo de tecnologia!
					</p>
				</div>

				{/* Links de Navegação */}
				<div className='md:col-span-1 w-full'>
					<nav aria-label="Links de Navegação do Rodapé">
						<h3 className='text-lg font-semibold mb-2'>
							Navegação
						</h3>
						<ul className='space-y-1 text-sm'>
							{navLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.url}
										title={`Ir para ${link.label}`}
										aria-label={`Ir para a página de ${link.label}`}
										className="hover:underline"
										target='_blank'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Social */}
				<div className='md:col-span-1 w-full'>
					<nav aria-label="Redes Sociais do OnTech Blog">
						<h3 className='text-lg font-semibold mb-2'>
							Siga nossas redes sociais
						</h3>
						<ul className='flex gap-2 space-y-1 text-sm'>
							{socialLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.url}
										title={link.label}
										aria-label={link.label}
									>
										{link.icon}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Newsletter */}
				<div className='md:col-span-1 mt-6 w-full md:mt-0'>
					<div className='space-y-2'>
						<h3 className='text-xl md:text-2xl font-semibold mb-2'>
							Inscreva-se para receber novidades
						</h3>
						<NewsLetterForm />
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className='mt-8 h-10 border-t border-border dark:border-muted-foreground pt-4 text-xs text-center text-primary-foreground'>
				<>© {new Date().getFullYear()} onTech Blog. Todos os direitos reservados</>
			</div>
		</footer>
	)
}

export { Footer }