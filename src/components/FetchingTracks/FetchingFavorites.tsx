'use client'

import { useEffect } from 'react'
import { withReauth } from '../../app/hooks/withReAuth'
import { getFavoriteTracks } from '../../services/tracks/tracksApi'
import { setFavoriteTracks } from '../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

export default function FetchingFavorites() {
	const dispatch = useAppDispatch()
	const { access, refresh } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (!refresh) return

		const fetchFavorites = async () => {
			try {
				const data = await withReauth(
					async (access: string) => await getFavoriteTracks(access),
					refresh,
					dispatch,
					access,
				)
				dispatch(setFavoriteTracks(data))
			} catch (err) {
				console.error('Ошибка загрузки избранных треков:', err)
			}
		}

		fetchFavorites()
	}, [access, refresh, dispatch])

	return null
}
