'use client'

import { useEffect } from 'react'
import { getFavoriteTracks } from '../../services/tracks/tracksApi'
import { setFavoriteTracks } from '../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

export default function FetchFavorites() {
	const dispatch = useAppDispatch()
	const { access } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (!access) return

		const fetchFavorites = async () => {
			try {
				const data = await getFavoriteTracks(access)
				dispatch(setFavoriteTracks(data))
			} catch (err) {
				console.error('Ошибка загрузки избранных треков:', err)
			}
		}

		fetchFavorites()
	}, [access, dispatch])

	return null
}
