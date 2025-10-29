import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
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

type RootState = ReturnType<AppStore['getState']>
type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
