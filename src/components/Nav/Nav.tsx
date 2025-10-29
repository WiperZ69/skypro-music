'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '../../store/features/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import styles from './Nav.module.scss'

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const dispatch = useAppDispatch()
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

	const toggleMenu = () => setIsOpen(prev => !prev)

	const handleAuthClick = () => {
		if (isAuthenticated) {
			dispatch(logout())
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')
			localStorage.removeItem('user')
		} else {
			router.push('/auth/signin')
		}
		setIsOpen(false)
	}

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__logo}>
				<Link href='/music/main'>
					<Image
						width={250}
						height={170}
						className={styles.logo__image}
						src='/Image/logo.png'
						alt='logo'
					/>
				</Link>
			</div>

			<div
				className={`${styles.hamburger} ${isOpen ? styles.open : styles.closed}`}
				onClick={toggleMenu}
			>
				<div className={styles.burgerMain}>
					<div className={styles.burgerInner}>
						<span className={styles.top}></span>
						<span className={styles.mid}></span>
						<span className={styles.bot}></span>
					</div>
				</div>

				<div className={styles.svgMain}>
					<svg className={styles.svgCircle}>
						<path
							className={styles.path}
							fill='none'
							stroke='#fff'
							strokeMiterlimit='10'
							strokeWidth='4'
							d='M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2'
						/>
					</svg>
				</div>
				<div className={styles.pathBurger}>
					<div className={styles.animatePath}>
						<div className={styles.pathRotation}></div>
					</div>
				</div>
			</div>

			<div className={`${styles.nav__menu} ${isOpen ? styles.active : ''}`}>
				<ul className={styles.menu__list}>
					<li className={styles.menu__item}>
						<Link href='/music/main' className={styles.menu__link}>
							Главная
						</Link>
					</li>
					{isAuthenticated ? (
						<li className={styles.menu__item}>
							<Link href='/music/favorite' className={styles.menu__link}>
								Мой плейлист
							</Link>
						</li>
					) : (
						<></>
					)}
					<li className={styles.menu__item}>
						<button
							onClick={handleAuthClick}
							className={styles.menu__link}
							style={{ background: 'none', border: 'none', cursor: 'pointer' }}
						>
							{isAuthenticated ? 'Выйти' : 'Войти'}
						</button>
					</li>
				</ul>
			</div>
		</nav>
	)
}
