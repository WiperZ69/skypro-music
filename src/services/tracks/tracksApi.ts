import axios from 'axios'
import { SelectionResponse, Track } from '../../types/track'
import { BASE_API_URL } from '../constants'

export const getTracks = async (access?: string): Promise<Track[]> => {
	const config = access
		? {
				headers: {
					Authorization: `Bearer ${access}`,
				},
			}
		: {}

	const res = await axios.get(`${BASE_API_URL}/catalog/track/all/`, config)
	return res.data.data
}

export const getSelection = async (
	selectionId: string,
	token?: string,
): Promise<SelectionResponse> => {
	const res = await axios.get(
		`${BASE_API_URL}/catalog/selection/${selectionId}/`,
		{
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		},
	)
	return res.data.data
}

export const addLike = (access: string, id: number) => {
	return axios.post(
		BASE_API_URL + `/catalog/track/${id}/favorite/`,
		{},
		{
			headers: {
				Authorization: `Bearer ${access}`,
			},
		},
	)
}

export const removeLike = (access: string, id: number) => {
	return axios.delete(`${BASE_API_URL}/catalog/track/${id}/favorite/`, {
		headers: {
			Authorization: `Bearer ${access}`,
		},
	})
}

export const getFavoriteTracks = async (access: string): Promise<Track[]> => {
	try {
		const res = await axios.get(`${BASE_API_URL}/catalog/track/favorite/all`, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		})
		return res.data.data || []
	} catch (err) {
		console.error('Ошибка при получении избранных треков:', err)
		throw err
	}
}
