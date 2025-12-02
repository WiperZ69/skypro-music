'use client'

import { ToastContainer } from 'react-toastify'
import { Bar } from '../../components/Bar/Bar'
import FetchingFavorites from '../../components/FetchingTracks/FetchingFavorites'
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
					<FetchingFavorites />
					<Nav />
					{children}
					<ToastContainer
						position='top-right'
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						pauseOnHover
						draggable
						theme='dark'
						toastClassName='my-toast'
					/>
					<Sidebar />
				</main>
				<Bar />
				<footer className='footer'></footer>
			</div>
		</div>
	)
}
