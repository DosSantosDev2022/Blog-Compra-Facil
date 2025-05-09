import { NewsLetterForm } from '@/components/global/newsletterForm'
import Link from 'next/link'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

const Footer = () => {
	const socialLinks = [
		{
			icon: <RiInstagramFill className='w-6 h-6' />,
			url: '/#',
		},
		{
			icon: <BsTwitterX className='w-6 h-6' />,
			url: '/#',
		},
		{
			icon: <FaFacebook className='w-6 h-6' />,
			url: '/#',
		},
	]

	return (
		<footer className='px-4 py-8 md:px-8 bg-primary text-primary-foreground'>
			<div className='h-72  w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center'>
				{/* Logo / About */}
				<div className=' max-w-sm  p-2'>
					<h2 className='text-6xl font-bold'>onTech</h2>
					<p className='mt-2 text-lg'>
						Receba nóticias todos os dias e se mantenha atualizado sobre o
						mundo de tecnologia !
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
									<li className='bg-accent hover:scale-95 text-primary duration-500 transition-colors rounded-full p-0.5 w-10 h-10 flex items-center justify-center'>
										{list.icon}
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
					<NewsLetterForm />
				</div>
			</div>
			{/* Copyright */}
			<div className='mt-8 h-10 border-t border-border pt-4 text-xs text-center text-muted'>
				© {new Date().getFullYear()} onTech. Todos os direitos reservados
			</div>
		</footer>
	)
}

export { Footer }
