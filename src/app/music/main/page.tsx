'use client'

import { getTracks } from '@/services/tracks/tracksApi'
import { Track } from '@/types/track'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { MusicTemplate } from '../MusicTemplate'

export default function Home() {
	const [tracks, setTracks] = useState<Track[]>([])
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [categoryName, setCategoryName] = useState<string>('Треки')

	useEffect(() => {
		setIsLoading(true)
		getTracks()
			.then(res => {
				setTracks(res)
				setError('')
			})
			.catch(error => {
				if (error instanceof AxiosError) {
					if (error.response) setError(error.response.data)
					else if (error.request) setError('Что-то с интернетом')
					else setError('Неизвестная ошибка')
				}
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<MusicTemplate
			categoryName={categoryName}
			tracks={tracks}
			error={error}
			isLoading={isLoading}
		/>
	)
}
