import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'

type AuthState = {
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: {token: localStorage.getItem('token')} as AuthState,
    reducers: {
        setCredentials: (state, {payload: {token},}: PayloadAction<{ token: string | null }>,) => {
            state.token = token
            if(token != null){
                localStorage.setItem('token', token);
            }else{
                localStorage.removeItem('token');
            }
        },
    },
})

export const {setCredentials} = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth
