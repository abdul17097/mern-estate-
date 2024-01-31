import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInRequest: (state,action)=>{
            state.loading = true;
        },
        signInSuccess: (state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFail: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.currentUser = null;
        }
    }
})

export const {signInRequest, signInSuccess, signInFail} = userSlice.actions;

export default userSlice.reducer;