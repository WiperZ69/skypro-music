import { AxiosError } from 'axios'
import { refreshToken } from '../../services/auth/authApi'
import { setCredentials } from '../../store/features/authSlice'
import { AppDispatch } from '../../store/store'

export const withReauth = async <T>(
	apiFunction: (access: string) => Promise<T>,
	refresh: string,
	dispatch: AppDispatch,
	access?: string,
): Promise<T> => {
	try {
		return await apiFunction(access || '')
	} catch (error) {
		const axiosError = error as AxiosError

		if (axiosError.response?.status === 401 && refresh) {
			try {
				const newTokens = await refreshToken(refresh)

				dispatch(
					setCredentials({
						user: JSON.parse(localStorage.getItem('user') || '{}'),
						access: newTokens.access,
						refresh: newTokens.refresh,
					}),
				)

				return await apiFunction(newTokens.access)
			} catch (refreshError) {
				console.error('Ошибка при обновлении токена', refreshError)
				throw refreshError
			}
		} else {
			throw error
		}
	}
}
