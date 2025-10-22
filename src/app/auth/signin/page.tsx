'use client'

import { AxiosError } from 'axios'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { authUser, getTokens } from '../../../services/auth/authApi'
import { setCredentials } from '../../../store/features/authSlice'
import { useAppDispatch } from '../../../store/store'
import styles from './signin.module.css'

export default function Signin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const dispatch = useAppDispatch()

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMessage('')

		if (!email.trim() || !password.trim()) {
			return setErrorMessage('Заполните все поля')
		}

		setIsLoading(true)

		try {
			const user = await authUser({ email, password })
			const tokens = await getTokens({ email, password })

			localStorage.setItem('access', tokens.access)
			localStorage.setItem('refresh', tokens.refresh)
			localStorage.setItem('user', JSON.stringify(user))

			dispatch(
				setCredentials({
					user,
					access: tokens.access,
					refresh: tokens.refresh,
				}),
			)
			router.push('/music/main')
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					setErrorMessage(error.response.data.message || 'Ошибка авторизации')
				} else if (error.request) {
					setErrorMessage('Проблема с интернетом')
				} else {
					setErrorMessage('Неизвестная ошибка')
				}
			} else {
				setErrorMessage('Ошибка сервера')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.modal__form}>
			<Link href='/music/main'>
				<div className={styles.modal__logo}>
					<Image
						src='/Image/logo_modal.png'
						alt='logo'
						width={140}
						height={21}
					/>
				</div>
			</Link>

			<form onSubmit={onSubmit} autoComplete='on'>
				<input
					className={classNames(styles.modal__input, styles.login)}
					type='email'
					name='email'
					placeholder='Почта'
					autoComplete='email'
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
				/>

				<input
					className={styles.modal__input}
					type='password'
					name='password'
					placeholder='Пароль'
					autoComplete='current-password'
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
				/>

				<div className={styles.errorContainer}>{errorMessage}</div>

				<button
					type='submit'
					disabled={isLoading}
					className={styles.modal__btnEnter}
				>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</button>
			</form>

			<Link href='/auth/signup' className={styles.modal__btnSignup}>
				Зарегистрироваться
			</Link>
		</div>
	)
}
