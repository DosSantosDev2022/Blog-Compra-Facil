import { Button, Input } from '@/components/ui'
import Link from 'next/link'

const Footer = () => {
	const socialLinks = [
		{
			label: 'Dr',
			url: '/#',
		},
		{
			label: 'Be',
			url: '/#',
		},
		{
			label: 'Tw',
			url: '/#',
		},
		{
			label: 'Ig',
			url: '/#',
		},
	]

	return (
		<footer className='px-4 py-8 md:px-8 bg-primary text-primary-foreground'>
			<div className='h-72  w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center'>
				{/* Logo / About */}
				<div>
					<h2 className='text-2xl font-bold'>Atualiza News</h2>
					<p className='mt-2 text-sm'>
						Receba nóticias todos os dias e se mantenha atualizado !
					</p>
				</div>

				{/* Social */}
				<div>
					<nav>
						<h3 className='text-lg font-semibold mb-2'>
							Siga nossas redes sociais
						</h3>
						<ul className='flex gap-2 space-y-1 text-sm'>
							{socialLinks.map((list, index) => (
								<Link key={index} href={list.url}>
									<li className='bg-accent hover:bg-accent-hover duration-300 transition-colors rounded-full p-2 w-10 h-10 text-center'>
										{list.label}
									</li>
								</Link>
							))}
						</ul>
					</nav>
				</div>

				{/* newsletter */}
				<div className='space-y-2'>
					<h3 className='text-2xl font-semibold mb-2'>
						Inscreva-se para receber novidades
					</h3>
					<label htmlFor=''>Seu Email</label>
					<Input placeholder='Digite o seu e-mail' />
					<Button variants='ghost' sizes='full'>
						Inscreva-se
					</Button>
				</div>
			</div>
			{/* Copyright */}
			<div className='mt-8 h-10 border-t border-border pt-4 text-xs text-center text-muted'>
				© {new Date().getFullYear()} Atualiza News. Todos os direitos
				reservados
			</div>
		</footer>
	)
}

export { Footer }
