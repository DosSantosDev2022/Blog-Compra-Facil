'use client'

import {
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	WhatsappIcon,
	XIcon,
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
	TwitterShareButton,
} from 'react-share'

interface ToShareProps {
	slug: string
	title?: string
}

const ShareButtons = ({ slug, title }: ToShareProps) => {
	const baseUrl =
		typeof window !== 'undefined'
			? window.location.hostname === 'localhost'
				? 'http://localhost:3000/' // Para desenvolvimento (localhost)
				: window.location.origin // Para produção (domínio correto)
			: '' // Caso não tenha acesso ao window (no servidor)

	// Criação da URL completa para compartilhamento
	const shareUrl = `${baseUrl}/Post/${slug}`

	return (
		<>
			<div className='w-full flex flex-col items-start justify-center gap-3'>
				<h4 className='text-mycolor-900 font-bold text-sm lg:text-lg'>
					Compartilhe com seus amigos !
				</h4>
				<div className='flex  items-center justify-start gap-3 w-full'>
					<EmailShareButton url={shareUrl} title={title}>
						<EmailIcon size={36} className='rounded-full' />
					</EmailShareButton>

					<FacebookShareButton url={shareUrl} title={title}>
						<FacebookIcon size={36} className='rounded-full' />
					</FacebookShareButton>

					<LinkedinShareButton url={shareUrl} title={title}>
						<LinkedinIcon size={36} className='rounded-full' />
					</LinkedinShareButton>

					<WhatsappShareButton url={shareUrl} title={title}>
						<WhatsappIcon size={36} className='rounded-full' />
					</WhatsappShareButton>

					<TwitterShareButton url={shareUrl} title={title}>
						<XIcon size={36} className='rounded-full' />
					</TwitterShareButton>
				</div>
			</div>
		</>
	)
}

export { ShareButtons }
