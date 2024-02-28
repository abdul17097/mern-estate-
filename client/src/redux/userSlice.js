import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInRequest: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    updateUserRequest: (state, action) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state, action) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutUserRequest: (state, action) => {
      state.loading = true;
    },
    signoutUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    signoutUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  signoutUserRequest,
  signoutUserSuccess,
  signoutUserFail,
} = userSlice.actions;

export default userSlice.reducer;
