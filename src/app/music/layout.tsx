'use client'

import { Bar } from '../../components/Bar/Bar'
import FetchingTracks from '../../components/FetchingTracks/FetchingTracks'
import { Nav } from '../../components/Nav/Nav'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useInitAuth } from '../hooks/useInitAuth'
import { ProtectedRoute } from '../ProtectedRoute'
import styles from './layout.module.scss'

export default function MusicPage({ children }: { children: React.ReactNode }) {
	useInitAuth()
	return (
		<ProtectedRoute>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<main className={styles.main}>
						<FetchingTracks />
						<Nav />
						{children}
						<Sidebar />
					</main>
					<Bar />
					<footer className='footer'></footer>
				</div>
			</div>
		</ProtectedRoute>
	)
}
