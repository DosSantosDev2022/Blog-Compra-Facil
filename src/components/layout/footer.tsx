import { chakra } from '@/assets/fonts'
import { NewsLetterForm } from '@/components/global/newsletterForm'
import Link from 'next/link'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

const Footer = () => {
	const socialLinks = [
		{
			label: 'Instagram',
			icon: <RiInstagramFill className='w-6 h-6' />,
			url: '/#',
		},
		{
			label: 'TwitterX',
			icon: <BsTwitterX className='w-6 h-6' />,
			url: '/#',
		},
		{
			label: 'Facebook',
			icon: <FaFacebook className='w-6 h-6' />,
			url: '/#',
		},
	]

	return (
		<footer className='px-4 py-8 md:px-8 bg-primary text-primary-foreground'>
			<div className='max-w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center'>
				{/* Logo / About */}
				<div className='max-w-sm p-2 md:col-span-1'>
					<h6
						aria-label='Logo onTech blog'
						className={`${chakra.className} text-5xl font-bold`}
					>
						onTech
					</h6>
					<p className='mt-2 text-base md:text-lg'>
						Receba notícias todos os dias e se mantenha atualizado sobre o
						mundo de tecnologia!
					</p>
				</div>

				{/* Social */}
				<div className='md:col-span-1  w-full'>
					<nav>
						<h3 className='text-lg font-semibold mb-2'>
							Siga nossas redes sociais
						</h3>
						<ul className='flex gap-2 space-y-1 text-sm'>
							{socialLinks.map((link, index) => (
								<li aria-label={link.label} key={index}>
									<Link href={link.url}>{link.icon}</Link>
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
				© {new Date().getFullYear()} onTech. Todos os direitos reservados
			</div>
		</footer>
	)
}

export { Footer }
