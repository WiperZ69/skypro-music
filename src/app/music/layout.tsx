'use client'

import { Bar } from '../../components/Bar/Bar'
import FetchFavorites from '../../components/FetchingTracks/FavoriteTracks'
import FetchingTracks from '../../components/FetchingTracks/FetchingTracks'
import { Nav } from '../../components/Nav/Nav'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useInitAuth } from '../hooks/useInitAuth'
import styles from './layout.module.scss'

export default function MusicPage({ children }: { children: React.ReactNode }) {
	useInitAuth()
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<main className={styles.main}>
					<FetchingTracks />
					<FetchFavorites />
					<Nav />
					{children}
					<Sidebar />
				</main>
				<Bar />
				<footer className='footer'></footer>
			</div>
		</div>
	)
}
