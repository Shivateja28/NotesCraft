import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : 'users',
    initialState:[],
    reducers:{
        addUser: (state, action) => [
            action.payload
        ],
        removeUser: (state, action) => [
            
        ]
    }
})

export const {addUser, removeUser} = userSlice.actions

export default userSlice.reducer
