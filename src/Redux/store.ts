import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'
import logger from 'redux-logger';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch();
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store