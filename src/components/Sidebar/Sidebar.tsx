'use client'
import { logout } from '@/app/auth/logout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
	const router = useRouter()
	const [username, setUsername] = useState<string>('')
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)

		const userData = localStorage.getItem('user')
		if (userData) {
			try {
				const parsed = JSON.parse(userData)
				if (parsed.username) setUsername(parsed.username)
			} catch {
				console.error('Неправильная дата в локальном хранилище')
			}
		}
	}, [])

	const handleLogout = () => {
		logout()
		setUsername('')
		router.replace('/auth/signin')
		router.refresh()
	}

	if (!isMounted) return null

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar__personal}>
				<p className={styles.sidebar__personalName}>{username}</p>
				<div className={styles.sidebar__icon} onClick={handleLogout}>
					<svg>
						<use xlinkHref='/Image/icon/sprite.svg#logout'></use>
					</svg>
				</div>
			</div>
			<div className={styles.sidebar__block}>
				<div className={styles.sidebar__list}>
					<div className={styles.sidebar__item}>
						<Link className={styles.sidebar__link} href='/music/category/2'>
							<Image
								className={styles.sidebar__Image}
								src='/Image/playlist01.png'
								alt="day's playlist"
								width={250}
								height={170}
								priority
							/>
						</Link>
					</div>
					<div className={styles.sidebar__item}>
						<Link className={styles.sidebar__link} href='/music/category/3'>
							<Image
								className={styles.sidebar__Image}
								src='/Image/playlist02.png'
								alt="day's playlist"
								width={250}
								height={170}
							/>
						</Link>
					</div>
					<div className={styles.sidebar__item}>
						<Link className={styles.sidebar__link} href='/music/category/4'>
							<Image
								className={styles.sidebar__Image}
								src='/Image/playlist03.png'
								alt="day's playlist"
								width={250}
								height={170}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
