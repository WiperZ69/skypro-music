import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import ReduxProvider from '../store/ReduxProvider'
import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Skypro Music',
	description: 'Listen your favorite songs',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ReduxProvider>
			<html lang='ru'>
				<body className={`${montserrat.variable}`}>{children}</body>
			</html>
		</ReduxProvider>
	)
}
