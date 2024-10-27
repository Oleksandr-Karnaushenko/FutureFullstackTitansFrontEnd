import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../services/toastNotification.js';

axios.defaults.baseURL = 'https://watertrackerbackend-1b9z.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'accessToken'
)}`;

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

      const backEndData = data.data;

      return backEndData;
    } catch (error) {
      toastError('Something went wrong. Please try again or log in');
      return rejectWithValue(error.response.data.data.message);
    }
  }
);

export const signInAPI = createAsyncThunk(
  'auth/signInAPI',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', user, {
        withCredentials: true,
      });

      const backEndData = data.data;

      setAuthHeader(backEndData.accessToken);
      localStorage.setItem('userId', backEndData._id);

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

      localStorage.removeItem('userId');

      toastSuccess('Log out successful. Come back sooner');
    } catch (error) {
      cleareAuthHeader();
      toastSuccess('Log out successful. Come back sooner');
      return rejectWithValue(error.response.data.data.message);
    }
  }
);

export const fetchCurrentUserAPI = createAsyncThunk(
  'auth/refresh',

  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      toastError('Session not found. Please Log In!');
      return rejectWithValue('Session not found. Please Log In!');
    }

    try {
      const { data } = await axios.post('/auth/refresh', _, {
        withCredentials: true,
      });
      const backEndData = data.data;

      setAuthHeader(backEndData.accessToken);
      backEndData.userId = localStorage.getItem('userId');

      return backEndData;
    } catch (error) {
      toastError(
        'Auth state is old. Please enter to your personal cabinet again'
      );
      return rejectWithValue(error.response.data.data.message);
    }
  }
);

//user

export const fetchUserDataAPI = createAsyncThunk(
  'auth/userData',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/users/${userId}`);

      const backEndData = data.data;

      toastSuccess('User info download successful');

      return backEndData;
    } catch (error) {
      toastError('Something went wrong');
      return rejectWithValue(error.resp);
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
      return rejectWithValue(error.response.data.data.message);
    }
  }
);

export const editDailyNormAPI = createAsyncThunk(
  'auth/editDailyNorm',
  async ({ waterNorma, userId }, { rejectWithValue }) => {
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
      return rejectWithValue(error.response.data.data.message);
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
      return rejectWithValue(error.response.data.data.message);
    }
  }
);
