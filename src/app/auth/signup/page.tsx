'use client'

import { getTokens, registerUser } from '@/services/auth/authApi'
import { setCredentials } from '@/store/features/authSlice'
import { useAppDispatch } from '@/store/store'
import { AxiosError } from 'axios'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, MouseEvent, useState } from 'react'
import styles from './signup.module.css'

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const dispatch = useAppDispatch()

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setErrorMessage('')

		if (
			!email.trim() ||
			!username.trim() ||
			!password.trim() ||
			!repeatPassword.trim()
		) {
			return setErrorMessage('Заполните все поля')
		}

		if (password !== repeatPassword) {
			return setErrorMessage('Пароли не совпадают')
		}

		setIsLoading(true)

		try {
			const user = await registerUser({ email, password, username })

			const tokens = await getTokens({ email, password })

			localStorage.setItem('token', tokens.access)
			localStorage.setItem('refresh', tokens.refresh)
			localStorage.setItem('user', JSON.stringify(user))

			dispatch(setCredentials({ user, token: tokens.access }))

			router.push('/music/main')
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					setErrorMessage(error.response.data.message || 'Ошибка регистрации')
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
		<>
			<Link href='/music/main'>
				<div className={styles.modal__logo}>
					<img src='/Image/logo_modal.png' alt='logo' />
				</div>
			</Link>

			<input
				className={classNames(styles.modal__input, styles.login)}
				type='text'
				name='username'
				placeholder='Имя пользователя'
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setUsername(e.target.value)
				}
			/>
			<input
				className={styles.modal__input}
				type='text'
				name='email'
				placeholder='Почта'
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
			/>
			<input
				className={styles.modal__input}
				type='password'
				name='password'
				placeholder='Пароль'
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<input
				className={styles.modal__input}
				type='password'
				name='repeatPassword'
				placeholder='Повторите пароль'
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRepeatPassword(e.target.value)
				}
			/>

			<div className={styles.errorContainer}>{errorMessage}</div>

			<button
				disabled={isLoading}
				onClick={onSubmit}
				className={styles.modal__btnSignupEnt}
			>
				{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
			</button>
		</>
	)
}
