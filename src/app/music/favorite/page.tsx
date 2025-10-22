'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CenterBlock } from '../../../components/CenterBlock/CenterBlock'
import { useAppSelector } from '../../../store/store'
import { Track } from '../../../types/track'

export default function FavoritePage() {
	const { favoriteTracks } = useAppSelector(state => state.tracks)
	const { access } = useAppSelector(state => state.auth)

	const [tracks, setTracks] = useState<Track[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

	const router = useRouter()

	useEffect(() => {
		setIsLoading(true)
		setError('')

		if (!access) {
			setError('Чтобы просматривать избранные треки, войдите в аккаунт')
			router.push('/music/main')
			setTracks([])
			setIsLoading(false)
			return
		}

		if (favoriteTracks.length === 0) {
			setError('У вас пока нет избранных треков')
			setTracks([])
		} else {
			setTracks(favoriteTracks)
		}

		setIsLoading(false)
	}, [access, favoriteTracks])

	return (
		<CenterBlock
			tracks={tracks}
			title='Мои избранные треки'
			error={error}
			isLoading={isLoading}
		/>
	)
}
