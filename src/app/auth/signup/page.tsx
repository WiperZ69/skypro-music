'use client'

import { AxiosError } from 'axios'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { getTokens, registerUser } from '../../../services/auth/authApi'
import { setCredentials } from '../../../store/features/authSlice'
import { useAppDispatch } from '../../../store/store'
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

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMessage('')

		if (!email || !username || !password || !repeatPassword) {
			return (
				setErrorMessage('Заполните все поля'),
				toast.warn('Заполните все поля')
			)
		}

		if (password !== repeatPassword) {
			return (
				setErrorMessage('Пароли не совпадают'),
				toast.warn('Пароли не совпадают')
			)
		}

		setIsLoading(true)

		try {
			const user = await registerUser({ email, password, username })
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
					setErrorMessage(
						error.response.data.message || toast.error('Ошибка регистрации'),
					)
				} else if (error.request) {
					setErrorMessage('Проблема с интернетом')
					toast.error('Проблема с интернетом')
				} else {
					setErrorMessage('Неизвестная ошибка')
					toast.error('Неизвестная ошибка')
				}
			} else {
				setErrorMessage('Ошибка сервера')
				toast.error('Ошибка сервера')
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
					type='text'
					name='username'
					placeholder='Имя пользователя'
					autoComplete='username'
					value={username}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setUsername(e.target.value)
					}
				/>

				<input
					className={styles.modal__input}
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
					autoComplete='new-password'
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
				/>

				<input
					className={styles.modal__input}
					type='password'
					name='repeatPassword'
					placeholder='Повторите пароль'
					autoComplete='new-password'
					value={repeatPassword}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setRepeatPassword(e.target.value)
					}
				/>

				<div className={styles.errorContainer}>{errorMessage}</div>

				<button
					type='submit'
					disabled={isLoading}
					className={styles.modal__btnSignupEnt}
				>
					{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
				</button>
			</form>

			<Link href='/auth/signin' className={styles.modal__btnSignup}>
				Уже есть аккаунт? Войдите
			</Link>
		</div>
	)
}
