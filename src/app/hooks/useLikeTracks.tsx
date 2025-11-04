'use client'

import { AxiosError } from 'axios'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { addLike, removeLike } from '../../services/tracks/tracksApi'
import {
	addLikedTracks,
	removeLikedTracks,
} from '../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Track } from '../../types/track'
import { withReauth } from './withReAuth'

type returnTypeHook = {
	isLoading: boolean
	errorMsg: string | null
	toggleLike: () => void
	isLike: boolean
}

export const useLikeTrack = (track: Track | null): returnTypeHook => {
	const { favoriteTracks } = useAppSelector(state => state.tracks)
	const { access, refresh } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()

	const isLike = useMemo(
		() => favoriteTracks.some(t => t._id === track?._id),
		[favoriteTracks, track],
	)

	const [isLoading, setIsLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const toggleLike = () => {
		if (!access) {
			toast.info('Нет авторизации')
			setErrorMsg('Нет авторизации')
			return
		}
		if (!track) return

		const apiCall = isLike ? removeLike : addLike
		const reduxAction = isLike ? removeLikedTracks : addLikedTracks

		setIsLoading(true)
		setErrorMsg(null)

		withReauth(
			newToken => apiCall(newToken || access, track._id),
			refresh,
			dispatch,
		)
			.then(() => {
				dispatch(reduxAction(track))
			})
			.catch(error => {
				if (error instanceof AxiosError) {
					if (error.response) {
						setErrorMsg(
							error.response.data?.message ||
								toast.error('Ошибка при добавлении трека'),
						)
					} else if (error.request) {
						toast.error('Проблема с соединением')
						setErrorMsg('Проблема с соединением')
					} else {
						toast.error('Неизвестная ошибка')
						setErrorMsg('Неизвестная ошибка')
					}
				} else {
					toast.error('Ошибка при лайке')
					setErrorMsg('Ошибка при лайке')
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return {
		isLoading,
		errorMsg,
		toggleLike,
		isLike,
	}
}
