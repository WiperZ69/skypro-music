'use client'

export const logout = () => {
	localStorage.removeItem('access')
	localStorage.removeItem('refresh')
	localStorage.removeItem('user')
}
