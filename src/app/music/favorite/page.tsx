'use client'

import { useEffect, useState } from 'react'
import { CenterBlock } from '../../../components/CenterBlock/CenterBlock'
import { getFavoriteTracks } from '../../../services/tracks/tracksApi'
import { setFavoriteTracks } from '../../../store/features/trackSlice'
import { useAppSelector } from '../../../store/store'
import { Track } from '../../../types/track'

export default function FavoritePage() {
	const { access } = useAppSelector(state => state.auth)
	const [tracks, setTracks] = useState<Track[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchFavorites = async () => {
			setIsLoading(true)
			setError('')

			if (!access) {
				setError('Чтобы просматривать избранные треки, войдите в аккаунт')
				setTracks([])
				setIsLoading(false)
				return
			}

			try {
				const data = await getFavoriteTracks(access)
				if (data.length === 0) {
					setError('У вас пока нет избранных треков')
				}
				setFavoriteTracks(data)
				setTracks(data)
			} catch {
				setError('Ошибка при загрузке избранных треков')
			} finally {
				setIsLoading(false)
			}
		}

		fetchFavorites()
	}, [access])

	return (
		<CenterBlock
			tracks={tracks}
			title='Мои избранные треки'
			error={error}
			isLoading={isLoading}
		/>
	)
}
