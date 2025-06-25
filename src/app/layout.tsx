import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { poppins } from '@/assets/fonts'
import { ToggleTheme } from '@/components/global/toggleTheme'
import { QueryClientProviderWrapper } from '@/providers/queryClientProviderWrapper'; // Vamos criar este arquivo


export const metadata: Metadata = {
	title: 'onTech Blog',
	description: 'Seu blog de tecnologia, dicas, tutoriais e novidades.',
	icons: {
		icon: '/favicon.svg', // Caminho para o seu favicon SVG
	},
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
				<meta
					name='google-site-verification'
					content='BQ3BsKxQv9wmjdsELFbZEa887IFYp_9gIOeMQ_mgnZc'
				/>
			</head>
			<body
				className={`${poppins.className} bg-background text-foreground antialiased scrollbar-custom overflow-x-hidden`}
			>
				<QueryClientProviderWrapper>
					<Header />
					<main className='lg:px-14 px-4 py-6'>{children}</main>
					<Footer />
					<ToggleTheme />
				</QueryClientProviderWrapper>

			</body>
		</html>
	)
}
