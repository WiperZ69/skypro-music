import axios from 'axios'
import { Track } from '../../types/track'
import { BASE_API_URL } from '../constants'

export const getTracks = async (
	selectionId?: string,
	token?: string,
): Promise<Track[]> => {
	try {
		if (!selectionId) {
			const res = await axios.get(`${BASE_API_URL}/catalog/track/all/`)
			return res.data.data || []
		}

		const res = await axios.get(
			`${BASE_API_URL}/catalog/selection/${selectionId}/`,
			{
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			},
		)
		return res.data.data
	} catch (err) {
		throw err
	}
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
