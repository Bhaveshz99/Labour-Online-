import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: rootReducer,
    // devTools: process.env.REACT_APP_NODE_ENV,
    middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch();
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store