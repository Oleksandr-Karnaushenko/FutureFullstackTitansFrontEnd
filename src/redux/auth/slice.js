import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    isRefreshing: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.isError = true;
        state.isLoggedIn = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload.data.accessToken);
      })
      .addCase(logIn.rejected, (state) => {
        state.isError = true;
        state.isLoggedIn = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isError = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;
