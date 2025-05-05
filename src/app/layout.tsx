import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	weight: ['200', '300', '400', '500', '600'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Atualiza news App',
	description: 'O seu portal de nóticias atualizado',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${poppins.className} antialiased`}>
				{children}
			</body>
		</html>
	)
}
