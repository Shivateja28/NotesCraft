import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name : 'user',
    initialState:{
        login: false,
        userObj: {},
        notes: [],
        allNotes: []
    },
    reducers:{
        addUser: (state, action) => {
            state.login= true;
            state.userObj= action.payload;
            return state;
        },
        removeUser: (state, action) => {
            state.login = false;
            state.notes = [];
            state.userObj = {};
            state.allNotes = [];

            return state;
        },
        addNotes: (state, action) => {
            state.notes = action.payload;
            state.allNotes = action.payload;
            return state;
        },
        deleteNotes: (state, action)=>{
            state.notes = state.notes.filter((note)=>
                note.title !== action.payload
            );
            return state;
        },
        searchNotes: (state, action) => {
            state.notes = state.allNotes.filter((note) =>
                note.title.toLowerCase().includes(action.payload.toLowerCase())
            );
            return state;
        },
        sortNotesByDateTime: (state, action) => {
            state.notes = state.notes.sort((a, b) => {
              const date1 = new Date(a.createddatetime);
              const date2 = new Date(b.createddatetime);
              return action.payload ? date1 - date2 : date2 - date1;
            })
            return state;
        }
    }
})

export const {addUser, removeUser, addNotes, searchNotes, sortNotesByDateTime, deleteNotes} = userSlice.actions

export default userSlice.reducer
