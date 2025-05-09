import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getCategories } from '@/services/getCategories'

const poppins = Poppins({
	weight: ['200', '300', '400', '500', '600'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Atualiza news App',
	description: 'O seu portal de nóticias atualizado',
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
			</head>
			<body
				className={`${poppins.className} bg-background text-foreground antialiased dark`}
			>
				<Header />
				<main className='lg:px-24 px-4 py-6'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
