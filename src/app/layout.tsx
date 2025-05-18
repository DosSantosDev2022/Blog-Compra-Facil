import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { poppins } from '@/assets/fonts'

export const metadata: Metadata = {
	title: 'onTech Blog',
	description:
		'Fique por dentro de tudo sobre o mundo da tecnologia com onTech blog.',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<head>
				<script
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2827166560948178'
					crossOrigin='anonymous'
				/>
				<link
					rel='icon'
					href='/favicon.svg'
					type='image/<generated>'
					sizes='<generated>'
				/>
			</head>
			<body
				className={`${poppins.className} bg-background text-foreground antialiased scrollbar-custom`}
			>
				<Header />
				<main className='lg:px-24 px-4 py-6'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
