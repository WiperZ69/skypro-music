'use client'

import { getTracks } from '@/services/tracks/tracksApi'
import { setAllTracks, setTracks } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Track } from '@/types/track'
import { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MusicTemplate } from '../../MusicTemplate'

export default function CategoryPage() {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
	const { allTracks } = useAppSelector(state => state.tracks)
	const { token } = useAppSelector(state => state.auth)

	const [tracks, setLocalTracks] = useState<Track[]>([])
	const [categoryName, setCategoryName] = useState<string>('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!id) return

		const fetchData = async () => {
			setIsLoading(true)
			setError('')

			try {
				const selectionData = await getTracks(id, token)
				setCategoryName(selectionData.name)
				const trackIds: string[] = selectionData.items

				let tracksData: Track[] = allTracks
				if (!allTracks.length) {
					tracksData = await getTracks()
					dispatch(setAllTracks(tracksData))
				}

				const filtered = tracksData.filter(track =>
					trackIds.includes(track._id),
				)
				setLocalTracks(filtered)
				dispatch(setTracks(filtered))
			} catch (err) {
				if (err instanceof AxiosError) {
					if (err.response) setError(err.response.data)
					else if (err.request) setError('Проблемы с интернетом')
					else setError('Неизвестная ошибка')
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [id, token, allTracks, dispatch])

	return (
		<MusicTemplate
			tracks={tracks}
			categoryName={categoryName}
			error={error}
			isLoading={isLoading}
		/>
	)
}
