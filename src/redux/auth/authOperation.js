import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../services/toastNotification.js';
import { store } from '../store';
import { setToken } from './authSlice.js';

axios.defaults.baseURL = 'https://watertrackerbackend-1b9z.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: 'https://watertrackerbackend-1b9z.onrender.com',
  // baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
  request => {
    const state = store.getState();
    const accessToken = state.auth.token;
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.data.message === 'Access token expired'
    ) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        // Make a request to your auth server to refresh the token.
        const { data } = await axios.post(
          '/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        );
        const { accessToken } = data.data;
        console.log('ac');
        console.log(accessToken);
        if (accessToken) {
          store.dispatch(setToken(accessToken));
          setAuthHeader(accessToken);
        }
        setAuthHeader(accessToken);

        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

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
      toastError(error.response.data.data.message);
      return rejectWithValue(
        'Something went wrong. Please try again or log in'
      );
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

      toastSuccess('Log in successful. Welcome back ');

      return backEndData;
    } catch (error) {
      toastError(error.response.data.data.message);
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

//user

export const refreshUserAPI = createAsyncThunk(
  'auth/refresh',

  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await axios.get('/users/curent');

      const backEndData = data.data;

      return backEndData;
    } catch (error) {
      toastError(
        'Auth state is old. Please enter to your personal cabinet again'
      );
      return rejectWithValue(error.response.data.data.message);
    }
  }
);

export const fetchUserDataAPI = createAsyncThunk(
  'auth/userData',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);

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
      const { data } = await axiosInstance.patch(
        `/users/avatar/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

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
      const { data } = await axiosInstance.patch(
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
      await axiosInstance.patch(`/users/${userId}`, userNewData);

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
