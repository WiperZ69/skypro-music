'use client'

import { ProtectedRoute } from '../ProtectedRoute'

export default function MusicPage({ children }: { children: React.ReactNode }) {
	return <ProtectedRoute>{children}</ProtectedRoute>
}
