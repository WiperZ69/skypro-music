'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { useAppSelector } from '../store/store'

interface ProtectedRouteProps {
	children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const router = useRouter()
	const { isAuthenticated } = useAppSelector(state => state.auth)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			router.replace('/auth/signin')
		} else {
			setLoading(false)
		}
	}, [router])

	if (loading) {
		return <div>Загрузка...</div>
	}

	return <>{children}</>
}
