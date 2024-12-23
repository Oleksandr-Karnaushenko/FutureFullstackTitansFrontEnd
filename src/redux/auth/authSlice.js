import { createSlice } from '@reduxjs/toolkit';
import {
  logOutAPI,
  signInAPI,
  signUpAPI,
  changeUserAvatarAPI,
  changeUserDataAPI,
  editDailyNormAPI,
  fetchUserDataAPI,
  refreshUserAPI,
} from './authOperation';

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    avatarURL: null,
    dailyNorm: null,
    gender: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isRefreshUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      // auth

      //signUpAPI
      .addCase(signUpAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(signUpAPI.fulfilled, state => {
        state.isRefreshing = false;
      })
      .addCase(signUpAPI.rejected, (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
      })
      //signInAPI
      .addCase(signInAPI.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(signInAPI.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.token = payload.accessToken;
        state.user._id = payload._id;
      })
      .addCase(signInAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //logOutAPI
      .addCase(logOutAPI.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(logOutAPI.fulfilled, state => {
        state.isRefreshing = false;
        state.token = null;
        state.isLoggedIn = false;
        state.user = { ...initialState.user };
      })
      .addCase(logOutAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })

      //user

      //refreshUser
      .addCase(refreshUserAPI.pending, state => {
        state.isRefreshUser = true;
        state.error = null;
      })
      .addCase(refreshUserAPI.fulfilled, (state, { payload }) => {
        state.user._id = payload;
        state.isLoggedIn = true;
        state.isRefreshUser = false;
      })
      .addCase(refreshUserAPI.rejected, (state, { payload }) => {
        state.isRefreshUser = false;
        state.error = payload;
      })
      //fetchUserData
      .addCase(fetchUserDataAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchUserDataAPI.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isRefreshing = false;
      })
      .addCase(fetchUserDataAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //changeUserData
      .addCase(changeUserDataAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(changeUserDataAPI.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isRefreshing = false;
      })
      .addCase(changeUserDataAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //changeUserAvatarAPI
      .addCase(changeUserAvatarAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(changeUserAvatarAPI.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload.avatarURL;
        state.isRefreshing = false;
      })
      .addCase(changeUserAvatarAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //editDailyNorm
      .addCase(editDailyNormAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(editDailyNormAPI.fulfilled, (state, { payload }) => {
        state.user.dailyNorm = payload.dailyNorm;
        state.isRefreshing = false;
      })
      .addCase(editDailyNormAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;

export const selectDailyNorm = state => state.auth.user.dailyNorm;
