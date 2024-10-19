import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../services/toastNotification.js';

axios.defaults.baseURL = 'https://watertrackerbackend-1b9z.onrender.com';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const cleareAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

//auth

export const signUpAPI = createAsyncThunk(
  'auth/signUpAPI',

  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', user);

      // setAuthHeader(data.token);
      // toastSuccess(
      //   'We have sent email verification on your email. Please, check it'
      // );

      return data;
    } catch (error) {
      toastError('Something went wrong. Please try again or log in');
      return rejectWithValue(error.message);
    }
  }
);

export const signInAPI = createAsyncThunk(
  'auth/signInAPI',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', user);

      const backEndData = data.data;

      setAuthHeader(backEndData.accessToken);

      toastSuccess('Log in successful. Welcome back ');

      return backEndData;
    } catch (error) {
      toastError(error.response.data.message);
      return rejectWithValue('Not valid email or password. Please, try again');
    }
  }
);

export const logOutAPI = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/auth/logout');

      cleareAuthHeader();

      toastSuccess('Log out successful. Come back sooner');
    } catch (error) {
      cleareAuthHeader();
      toastSuccess('Log out successful. Come back sooner');
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

    try {
      const { data } = await axios.get('/auth/refresh');

      setAuthHeader(data.token);

      return data;
    } catch (error) {
      axios.defaults.headers.common.Authorization = '';
      toastError(
        'Auth state is old. Please enter to your personal cabinet again'
      );
      return rejectWithValue(error.message);
    }
  }
);

//user

export const fetchUserDataAPI = createAsyncThunk(
  'auth/userData',
  async ({ userId, token }, { rejectWithValue }) => {
    setAuthHeader(token);
    try {
      const { data } = await axios.get(`/users/${userId}`);

      const backEndData = data.data;

      toastSuccess('User info download successful');

      return backEndData;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const changeUserAvatarAPI = createAsyncThunk(
  'auth/changeUserAvatarAPI',
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/users/avatar/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const backEndData = data.data;

      toastSuccess('Avatar changed successful');
      return backEndData;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const editDailyNormAPI = createAsyncThunk(
  'auth/editDailyNorm',
  async ({ waterNorma, userId, token }, { rejectWithValue }) => {
    setAuthHeader(token);
    try {
      const { data } = await axios.patch(
        `/users/waterRate/${userId}`,
        waterNorma
      );

      const backEndData = data.data;

      toastSuccess('Daile water norm changed successful');

      return backEndData;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.message);
    }
  }
);

export const changeUserDataAPI = createAsyncThunk(
  'auth/changeUserData',
  async ({ userNewData, userId }, { rejectWithValue }) => {
    try {
      await axios.patch(`/users/${userId}`, userNewData);

      toastSuccess('User info changed successful ');

      const { data } = await axios.get(`/users/${userId}`);

      const backEndData = data.data;

      return backEndData;
    } catch (error) {
      toastError('Invalid password');
      return rejectWithValue(error.message);
    }
  }
);
