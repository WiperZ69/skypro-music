import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'

export type User = {
	email: string
	username: string
	_id: number
}

export type AuthState = {
	user: User | null
	access: string | null
	refresh: string | null
	isAuthenticated: boolean
}

const initialState: AuthState = {
	user: null,
	access: null,
	refresh: null,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{ user: User; access?: string; refresh?: string }>,
		) => {
			const { user, access, refresh } = action.payload

			state.user = user
			state.access = access ?? state.access
			state.refresh = refresh ?? state.refresh
			state.isAuthenticated = true

			if (typeof window !== 'undefined') {
				localStorage.setItem('user', JSON.stringify(user))
				if (access) localStorage.setItem('access', access)
				if (refresh) localStorage.setItem('refresh', refresh)
			}
		},
		logout: state => {
			state.user = null
			state.access = null
			state.refresh = null
			state.isAuthenticated = false

			if (typeof window !== 'undefined') {
				localStorage.removeItem('user')
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')
			}
		},
		restoreSession: state => {
			if (typeof window !== 'undefined') {
				const user = localStorage.getItem('user')
				const access = localStorage.getItem('access')
				const refresh = localStorage.getItem('refresh')

				if (user && access && refresh) {
					state.user = JSON.parse(user)
					state.access = access
					state.refresh = refresh
					state.isAuthenticated = true
				}
			}
		},
	},
})

export const { setCredentials, logout, restoreSession } = authSlice.actions
export const authReducer = authSlice.reducer

export const restoreSessionAsync = () => (dispatch: AppDispatch) => {
	if (typeof window !== 'undefined') {
		const user = localStorage.getItem('user')
		const access = localStorage.getItem('access')
		const refresh = localStorage.getItem('refresh')

		if (user && (access || refresh)) {
			dispatch(
				setCredentials({
					user: JSON.parse(user),
					access: access ?? undefined,
					refresh: refresh ?? undefined,
				}),
			)
			return true
		}
	}

	return false
}
