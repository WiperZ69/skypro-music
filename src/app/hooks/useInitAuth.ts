import { useEffect } from 'react'
import { setCredentials, User } from '../../store/features/authSlice'
import { useAppDispatch } from '../../store/store'

export const useInitAuth = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		try {
			const access = localStorage.getItem('access')
			const refresh = localStorage.getItem('refresh')
			const userData = localStorage.getItem('user')

			if (userData && (access || refresh)) {
				const user: User = JSON.parse(userData)

				dispatch(
					setCredentials({
						user,
						access: access ?? null,
						refresh: refresh ?? null,
					}),
				)
			}
		} catch (err) {
			console.error('Ошибка восстановления сессии:', err)
			localStorage.removeItem('user')
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')
		}
	}, [dispatch])
}
