import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import { authReducer } from './features/authSlice'
import { trackSliceReducer } from './features/trackSlice'

export const makeStore = () => {
	return configureStore({
		reducer: combineReducers({
			tracks: trackSliceReducer,
			auth: authReducer,
		}),
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
