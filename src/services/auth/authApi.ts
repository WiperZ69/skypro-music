import axios from 'axios'
import { BASE_API_URL } from '../constants'

type AuthUserProps = {
	email: string
	password: string
}

type RegisterUserProps = {
	email: string
	password: string
	username: string
}

export type AuthResponse = {
	email: string
	username: string
	_id: number
}

export type AccessTokenResponse = {
	access: string
}

export type RefreshTokenResponse = {
	refresh: string
}

export type TokenResponse = AccessTokenResponse & RefreshTokenResponse

export const authUser = (data: AuthUserProps): Promise<AuthResponse> => {
	return axios
		.post(BASE_API_URL + '/user/login/', data, {
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.data)
}

export const registerUser = (
	data: RegisterUserProps,
): Promise<AuthResponse> => {
	return axios
		.post(BASE_API_URL + '/user/signup/', data, {
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.data)
}

export const getTokens = (data: AuthUserProps): Promise<TokenResponse> => {
	return axios
		.post(BASE_API_URL + '/user/token/', data, {
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.data)
}

export const refreshToken = (refresh: string): Promise<TokenResponse> => {
	return axios
		.post(
			BASE_API_URL + '/user/token/refresh/',
			{
				refresh,
			},
			{
				headers: { 'Content-Type': 'application/json' },
			},
		)
		.then(res => res.data)
}
