import { createSlice } from '@reduxjs/toolkit';
import {
  logOutAPI,
  signInAPI,
  signUpAPI,
  fetchCurrentUserAPI,
  changeUserAvatarAPI,
  changeUserData,
  editDailyNorm,
  fetchUserData,
} from './authOperation';

const initialState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
    norm: null,
    gender: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  bottleXY: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    change(state, action) {
      switch (action.payload.operation) {
        case 'changeBottleXY':
          state.bottleXY = action.payload.data;
          break;
        default:
          break;
      }
    },
  },

  extraReducers: builder => {
    builder

      // auth

      //signUpAPI
      .addCase(signUpAPI.pending, state => {
        state.error = null;
      })
      .addCase(signUpAPI.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUpAPI.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //signInAPI
      .addCase(signInAPI.pending, state => {
        state.error = null;
      })
      .addCase(signInAPI.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.token = payload.token;
      })
      .addCase(signInAPI.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //logOutAPI
      .addCase(logOutAPI.pending, state => {
        state.error = null;
      })
      .addCase(logOutAPI.fulfilled, state => {
        state.token = null;
        state.isLoggedIn = false;
        state.user = { ...initialState.user };
      })
      .addCase(logOutAPI.rejected, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })
      //fetchCurrentUserAPI
      .addCase(fetchCurrentUserAPI.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(fetchCurrentUserAPI.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isRefreshing = false;
      })
      .addCase(fetchCurrentUserAPI.rejected, (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
      })

      //user

      //fetchUserData
      .addCase(fetchUserData.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isRefreshing = false;
      })
      .addCase(fetchUserData.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //changeUserData
      .addCase(changeUserData.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(changeUserData.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isRefreshing = false;
      })
      .addCase(changeUserData.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //changeUserAvatarAPI
      .addCase(changeUserAvatarAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(changeUserAvatarAPI.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload;
        state.isRefreshing = false;
      })
      .addCase(changeUserAvatarAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //editDailyNorm
      .addCase(editDailyNorm.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(editDailyNorm.fulfilled, (state, { payload }) => {
        state.dayInfo.norm = payload.norm;
        state.isRefreshing = false;
      })
      .addCase(editDailyNorm.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
