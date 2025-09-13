import { Track } from '@/types/track'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
	tracks: Track[]
	shuffledTracks: Track[]
	currentTrack: null | Track
	currentIndex: number
	isPlay: boolean
	isRepeat: boolean
	isShuffle: boolean
	volume: number
}

const initialState: initialStateType = {
	tracks: [],
	shuffledTracks: [],
	currentTrack: null,
	currentIndex: -1,
	isPlay: false,
	isRepeat: false,
	isShuffle: false,
	volume: 0.5,
}

const trackSlice = createSlice({
	name: 'tracks',
	initialState,
	reducers: {
		setTracks: (state, action: PayloadAction<Track[]>) => {
			state.tracks = action.payload
			state.shuffledTracks = [...state.tracks].sort(() => Math.random() * 0.5)
		},
		setCurrentTrack: (state, action: PayloadAction<Track>) => {
			state.currentTrack = action.payload
			state.currentIndex = state.tracks.findIndex(
				t => t._id === action.payload._id,
			)
		},
		setCurrentTrackByIndex: (state, action: PayloadAction<number>) => {
			if (action.payload >= 0 && action.payload < state.tracks.length) {
				state.currentIndex = action.payload
				state.currentTrack = state.tracks[action.payload]
			}
		},
		setIsPlay: (state, action: PayloadAction<boolean>) => {
			state.isPlay = action.payload
		},
		toggleRepeat: state => {
			state.isRepeat = !state.isRepeat
		},
		setRepeat: (state, action: PayloadAction<boolean>) => {
			state.isRepeat = action.payload
		},
		toggleShuffle: state => {
			state.isShuffle = !state.isShuffle
			if (state.isShuffle) {
				state.shuffledTracks = [...state.tracks].sort(() => Math.random() - 0.5)
				if (state.currentTrack) {
					state.currentIndex = state.shuffledTracks.findIndex(
						t => t._id === state.currentTrack!._id,
					)
				}
			} else {
				if (state.currentTrack) {
					state.currentIndex = state.tracks.findIndex(
						t => t._id === state.currentTrack!._id,
					)
				}
			}
		},
		playNext: state => {
			const playlist = state.isShuffle ? state.shuffledTracks : state.tracks

			if (playlist.length === 0) return

			let nextIndex = state.currentIndex + 1
			if (nextIndex >= playlist.length) nextIndex = 0
			state.currentIndex = nextIndex
			state.currentTrack = playlist[nextIndex]
			state.isPlay = true
		},
		playPrev: state => {
			const playlist = state.isShuffle ? state.shuffledTracks : state.tracks
			if (playlist.length === 0) return

			let prevIndex = state.currentIndex - 1
			if (prevIndex < 0) prevIndex = playlist.length - 1
			state.currentIndex = prevIndex
			state.currentTrack = playlist[prevIndex]
			state.isPlay = true
		},
		setVolume: (state, action: PayloadAction<number>) => {
			state.volume = action.payload
		},
	},
})

export const {
	setTracks,
	setCurrentTrack,
	setCurrentTrackByIndex,
	setIsPlay,
	setVolume,
	toggleRepeat,
	toggleShuffle,
	playNext,
	playPrev,
} = trackSlice.actions
export const trackSliceReducer = trackSlice.reducer
