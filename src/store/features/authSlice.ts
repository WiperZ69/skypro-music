import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type User = {
	email: string
	username: string
	_id: number
}

type AuthState = {
	user: User | null
	token: string | null
	isAuthenticated: boolean
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{ user: User; token?: string }>,
		) => {
			state.user = action.payload.user
			state.token = action.payload.token ?? null
			state.isAuthenticated = true

			if (typeof window !== 'undefined') {
				localStorage.setItem('user', JSON.stringify(action.payload.user))
				if (action.payload.token)
					localStorage.setItem('token', action.payload.token)
			}
		},
		logout: state => {
			state.user = null
			state.token = null
			state.isAuthenticated = false
			if (typeof window !== 'undefined') {
				localStorage.removeItem('user')
				localStorage.removeItem('token')
			}
		},
		restoreSession: state => {
			if (typeof window !== 'undefined') {
				const user = localStorage.getItem('user')
				const token = localStorage.getItem('token')
				if (user && token) {
					state.user = JSON.parse(user)
					state.token = token
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
		const token = localStorage.getItem('token')

		if (user && token) {
			dispatch(setCredentials({ user: JSON.parse(user), token }))
			return true
		}
	}

	return false
}
