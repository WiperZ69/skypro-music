'use client'

import { useRouter } from 'next/navigation'
import { logout } from '../../store/features/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import styles from './Sidebar.module.scss'

export const SidebarPersonal = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.auth.user)

	const handleLogout = () => {
		dispatch(logout())
	}

	const handleLogin = () => {
		router.replace('/auth/signin')
		router.refresh()
	}

	return (
		<div className={styles.sidebar__personal}>
			<p className={styles.sidebar__personalName}>
				{user ? user.username : 'Пользователь'}
			</p>
			{user ? (
				<div className={styles.sidebar__icon} onClick={handleLogout}>
					<svg>
						<use xlinkHref='/Image/icon/sprite.svg#logout'></use>
					</svg>
				</div>
			) : (
				<div className={styles.sidebar__icon} onClick={handleLogin}>
					<svg>
						<use xlinkHref='/Image/icon/sprite.svg#login'></use>
					</svg>
				</div>
			)}
		</div>
	)
}
