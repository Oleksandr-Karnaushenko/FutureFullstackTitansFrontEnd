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
  authIsLoading: false,
  isLoadingChangeAvatar: false,
  isDataUpdating: false,
  bottleXY: {},
};

export const authSlice = createSlice({
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
      //signInAPI
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
      //signUpAPI
      .addCase(signUpAPI.pending, state => {
        state.authIsLoading = true;
      })
      .addCase(signUpAPI.fulfilled, state => {
        state.authIsLoading = false;
      })
      .addCase(signUpAPI.rejected, state => {
        state.authIsLoading = false;
      })
      //logOutAPI
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
      //fetchCurrentUserAPI
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
      //changeUserAvatarAPI
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
      //changeUserData
      .addCase(changeUserData.pending, state => {
        state.isDataUpdating = true;
      })
      .addCase(changeUserData.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload.user };
        state.isDataUpdating = false;
      })
      .addCase(changeUserData.rejected, state => {
        state.isDataUpdating = false;
      })
      .addCase(editDailyNorm.fulfilled, (state, { payload }) => {
        state.dayInfo.norm = payload.norm;
        state.dayInfo.percent = payload.percent;
        state.isEditingNorm = false;
      })
      .addCase(editDailyNorm.pending, state => {
        state.isEditingNorm = true;
      })
      .addCase(editDailyNorm.rejected, state => {
        state.isEditingNorm = false;
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(fetchUserData.pending, state => state)
      .addCase(fetchUserData.rejected, state => {
        state.user = initialState.user;
      });
    //editDailyNorm
    // .addCase(editDailyNorm.fulfilled, (state, { payload }) => {
    //   state.dayInfo.norm = payload.norm;
    //   state.dayInfo.percent = payload.percent;
    //   state.isEditingNorm = false;
    // })
    // .addCase(editDailyNorm.pending, state => {
    //   state.isEditingNorm = true;
    // })
    // .addCase(editDailyNorm.rejected, state => {
    //   state.isEditingNorm = false;
    // });

    // Ми добову норму води записумо юзеру в norm:
    // Треба переробити
  },
});
export const { change } = authSlice.actions;

// export const changeUserData = createAsyncThunk(
//   'auth/changeUserData',
//   async (user, { rejectWithValue }) => {
//     try {
//       await axios.patch('/users/info', user);
//       toastSuccess('User info changed successful ');
//       const { data } = await axios.get('/users/info');
//       return data;
//     } catch (error) {
//       toastError('Invalid password');
//       return rejectWithValue('Something went wrong');
//     }
//   }
// );
