import { createSlice } from '@reduxjs/toolkit';
import logOutAPI from '../../API/Auth/logOutAPI';
import signInAPI from '../../API/Auth/signInAPI';
import signUpAPI from '../../API/Auth/signUpAPI';
import fetchCurrentUserAPI from '../../API/Auth/fetchCurrentUserAPI';
import { changeUserAvatarAPI } from '../../API/Auth/changeUserAvatarAPI';
import { changeUserData } from '../../API/Auth/changeUserDataAPI';

const initialState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
    norm: null,
    gender: null,
  },
  token: null,
  authIsLoading: false,
  isLoadingChangeAvatar: false,
  isDataUpdating: false,
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

      .addCase(signInAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(signInAPI.fulfilled, (state, { payload }) => {
        state.authIsLoading = false;
        state.user = { ...payload.user };
        state.token = payload.token;
      })
      .addCase(signInAPI.rejected, state => {
        state.authIsLoading = false;
      })

      .addCase(signUpAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(signUpAPI.fulfilled, state => {
        state.authIsLoading = false;
      })
      .addCase(signUpAPI.rejected, state => {
        state.authIsLoading = false;
      })

      .addCase(logOutAPI.fulfilled, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })
      .addCase(logOutAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(logOutAPI.rejected, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })

      .addCase(fetchCurrentUserAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(fetchCurrentUserAPI.fulfilled, (state, { payload }) => {
        state.authIsLoading = false;
        state.user = { ...payload.user };
      })
      .addCase(fetchCurrentUserAPI.rejected, state => {
        state.authIsLoading = false;
        state.user = { ...initialState.user };
        state.token = null;
      })

      .addCase(changeUserAvatarAPI.fulfilled, (state, { payload }) => {
        state.isLoadingChangeAvatar = false;
        state.user.avatarURL = payload;
      })
      .addCase(changeUserAvatarAPI.pending, state => {
        state.isLoadingChangeAvatar = true;
      })
      .addCase(changeUserAvatarAPI.rejected, state => {
        state.isLoadingChangeAvatar = false;
      })

      .addCase(changeUserData.pending, state => {
        state.isDataUpdating = true;
      })
      .addCase(changeUserData.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload.user };
        state.isDataUpdating = false;
      })
      .addCase(changeUserData.rejected, state => {
        state.isDataUpdating = false;
      });
  },
});
export const { change } = authSlice.actions;
export default authSlice.reducer;
