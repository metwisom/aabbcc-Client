import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {Aspect} from "./aspect.ts";


const slice = createSlice({
    name: 'data',
    initialState: [] as Aspect[],
    reducers: {
        addData: (state, {payload}: PayloadAction<Aspect | Aspect[]>,) => {
            if(payload instanceof Array){
                state.push(...payload)
            }else{
                state.push(payload)
            }
        },
    },
})

export const {addData} = slice.actions

export default slice.reducer

export const getCurrentData = (state: RootState) => state.data
