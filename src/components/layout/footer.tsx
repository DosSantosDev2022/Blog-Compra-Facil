import { chakra } from '@/assets/fonts'
import { NewsLetterForm } from '@/components/global'
import Link from 'next/link'
import { BsPinterest } from 'react-icons/bs'
import { FaYoutube } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

const Footer = () => {
	const socialLinks = [
		{
			label: 'Instagram do OnTech Blog',
			icon: <RiInstagramFill className="h-6 w-6" />,
			url: 'https://www.instagram.com/ontechblog/',
		},
		{
			label: 'Canal Youtube do OnTech Blog',
			icon: <FaYoutube className="h-6 w-6" />,
			url: 'https://www.youtube.com/channel/UCD80XkyM8H6OIV2bxztiYYQ',
		},
		{
			label: 'Pinterest do OnTech Blog',
			icon: <BsPinterest className="h-6 w-6" />,
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
		<footer className="w-full bg-card px-4 py-12 text-foreground md:px-8">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
				{/* Logo / About */}
				<div className="space-y-4">
					<Link
						className={twMerge(
							chakra.className,
							'text-5xl font-bold transition-colors hover:text-primary',
						)}
						href="/"
						aria-label="Página inicial do OnTech Blog"
						title="Ir para a página inicial"
					>
						onTech
					</Link>
					<p className="max-w-xs text-sm text-muted-foreground md:text-base">
						Receba notícias e se mantenha atualizado sobre o mundo de tecnologia!
					</p>
				</div>

				{/* Links de Navegação */}
				<div className="lg:col-span-1">
					<nav aria-label="Links de Navegação do Rodapé">
						<h3 className="mb-4 text-xl font-semibold">Navegação</h3>
						<ul className="space-y-3">
							{navLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.url}
										title={`Ir para ${link.label}`}
										aria-label={`Ir para a página de ${link.label}`}
										className="text-base text-muted-foreground transition-colors hover:text-foreground hover:underline"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Social */}
				<div className="lg:col-span-1">
					<nav aria-label="Redes Sociais do OnTech Blog">
						<h3 className="mb-4 text-xl font-semibold">Redes Sociais</h3>
						<ul className="flex items-center gap-4">
							{socialLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.url}
										title={link.label}
										aria-label={link.label}
										className="text-muted-foreground transition-colors hover:text-foreground"
										target="_blank"
										rel="noopener noreferrer"
									>
										{link.icon}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Newsletter */}
				<div className="lg:col-span-1">
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							Inscreva-se para receber novidades
						</h3>
						<NewsLetterForm />
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="mt-12 text-center text-xs text-muted-foreground">
				© {new Date().getFullYear()} onTech Blog. Todos os direitos reservados.
			</div>
		</footer>
	)
}

export { Footer }
