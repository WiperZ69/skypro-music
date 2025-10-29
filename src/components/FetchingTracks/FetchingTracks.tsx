'use client'

import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { withReauth } from '../../app/hooks/withReAuth'
import { getTracks } from '../../services/tracks/tracksApi'
import {
	setAllTracks,
	setFetchError,
	setFetchIsLoading,
} from '../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

export default function FetchingTracks() {
	const dispatch = useAppDispatch()
	const { allTracks } = useAppSelector(state => state.tracks)
	const { access, refresh } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (allTracks.length) {
			dispatch(setAllTracks(allTracks))
			return
		}

		const fetchData = async () => {
			dispatch(setFetchIsLoading(true))

			try {
				const data = await withReauth(
					async (access: string) => await getTracks(access),
					refresh,
					dispatch,
				)
				dispatch(setAllTracks(data))
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response) {
						dispatch(setFetchError(error.response.data))
					} else if (error.request) {
						dispatch(setFetchError('Произошла ошибка. Попробуйте позже'))
					} else {
						dispatch(setFetchError('Неизвестная ошибка'))
					}
				} else {
					dispatch(setFetchError('Ошибка при загрузке треков'))
				}
			} finally {
				dispatch(setFetchIsLoading(false))
			}
		}

		fetchData()
	}, [dispatch, allTracks, refresh])

	return null
}
