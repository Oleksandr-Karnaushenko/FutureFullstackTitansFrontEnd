import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../services/toastNotification';

axios.defaults.baseURL = 'http://localhost:3000';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const cleareAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUpAPI = createAsyncThunk(
  'signUp/signUpAPI',

  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/register', user);
      setAuthHeader(data.token);
      toastSuccess(
        'We have sent email verification on your email. Please, check it'
      );
      return data;
    } catch (error) {
      toastError('Something went wrong. Please try again or log in');
      return rejectWithValue(error.message);
    }
  }
);
export const signInAPI = createAsyncThunk(
  'signIn/signInAPI',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', user);

      setAuthHeader(data.token);

      toastSuccess('Log in successful. Welcome back ');
      return data;
    } catch (error) {
      toastError(error.response.data.message);
      return rejectWithValue('Not valid email or password. Please, try again');
    }
  }
);
export const logaut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      cleareAuthHeader();
      toastSuccess('Log out successful. Come back sooner');
    } catch (error) {
      cleareAuthHeader();
      toastSuccess('Log out successful. Come back sooner');
      return rejectWithValue(error.message);
    }
  }
);

export const changeUserAvatarAPI = createAsyncThunk(
  'auth/changeUserAvatarAPI',
  async (formData, { rejectWithValue }) => {
    try {
      const {
        data: { avatarURL },
      } = await axios.patch('/users/avatars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toastSuccess('Avatar changed successful ');
      return avatarURL;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const editDailyNorm = createAsyncThunk(
  'auth/editDailyNorm',
  async (data, { rejectWithValue }) => {
    try {
      const {
        data: { norm },
      } = await axios.patch('/water/norm', data);

      toastSuccess('Deleted successful ');
      return norm;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserData = createAsyncThunk(
  'auth/userData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/info');
      return data;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const changeUserData = createAsyncThunk(
  'auth/changeUserData',
  async (user, { rejectWithValue }) => {
    try {
      await axios.patch('/users/info', user);
      toastSuccess('User info changed successful ');
      const { data } = await axios.get('/users/info');
      return data;
    } catch (error) {
      toastError('Invalid password');
      return rejectWithValue(error.message);
    }
  }
);
export const fetchCurrentUserAPI = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { token: currentToken } = getState().auth;

    if (currentToken === null) {
      return rejectWithValue('Without token');
    }

    axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
    try {
      const { data: user } = await axios.get('/users/current');

      return user;
    } catch (error) {
      axios.defaults.headers.common.Authorization = '';
      toastError(
        'Auth state is old. Please enter to your personal cabinet again'
      );
      return rejectWithValue(error.message);
    }
  }
);
export default createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { token: currentToken } = getState().auth;

    if (currentToken === null) {
      return rejectWithValue('Without token');
    }

    axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
    try {
      const { data: user } = await axios.get('/users/current');

      return user;
    } catch (error) {
      axios.defaults.headers.common.Authorization = '';
      toastError(
        'Auth state is old. Please enter to your personal cabinet again'
      );
      return rejectWithValue(error.message);
    }
  }
);
