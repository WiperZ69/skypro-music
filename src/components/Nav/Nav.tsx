'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Nav.module.scss'

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__logo}>
				<Image
					width={250}
					height={170}
					className={styles.logo__image}
					src='/Image/logo.png'
					alt={'logo'}
				/>
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
						<Link href='#' className={styles.menu__link}>
							Главное
						</Link>
					</li>
					<li className={styles.menu__item}>
						<Link href='#' className={styles.menu__link}>
							Мой плейлист
						</Link>
					</li>
					<li className={styles.menu__item}>
						<Link href='../signin.html' className={styles.menu__link}>
							Войти
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
