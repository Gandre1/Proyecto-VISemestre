import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}


const sliceReducers = createSlice({
    name: 'sidebar',
    initialState,
    reducers:{
        sidebarShowReducer: (state, action)=>{
            state.sidebarShow= action.payload.sidebarShow
        }
    }
})

export const {sidebarShowReducer} = sliceReducers.actions
export default sliceReducers.reducer