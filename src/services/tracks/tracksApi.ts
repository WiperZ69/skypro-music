import axios from 'axios'
import { BASE_API_URL } from '../constants'

export const getTracks = async (
	selectionId?: string,
	token?: string,
): Promise<any> => {
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
