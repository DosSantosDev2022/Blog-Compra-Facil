import { poppins } from '@/assets/fonts';
import { CookieConsentBanner } from '@/components/global/cookieConsentBanner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { QueryClientProviderWrapper } from '@/providers/queryClientProviderWrapper'; // Vamos criar este arquivo
import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
	title: 'Compra Fácil Blog',
	description: 'Reviews e guias atualizados regularmente com as melhores ofertas do mercado.',
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
			<body
				className={`${poppins.className} bg-background text-foreground antialiased scrollbar-custom overflow-x-hidden dark`}
			>
				<QueryClientProviderWrapper>
					<Header />
					<main className='lg:px-14 px-4 py-6'>{children}</main>
					<Footer />
					<CookieConsentBanner />
				</QueryClientProviderWrapper>

			</body>
		</html>
	)
}
