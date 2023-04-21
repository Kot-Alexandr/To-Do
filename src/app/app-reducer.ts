import { Dispatch } from 'redux'
import { authAPI } from '../api/todolists-api'
import { authActions } from '../features/Login/auth-reducer'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './store'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status:RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized:boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }

    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions


export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        } else {

        }

        dispatch(appActions.setAppInitialized({ isInitialized: true }));
    })
}

