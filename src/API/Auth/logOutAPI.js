import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess } from 'services/toastNotification';

axios.defaults.baseURL = '';

export default createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      axios.defaults.headers.common.Authorization = '';
      toastSuccess('Log out successful. Come back sooner');
    } catch (error) {
      axios.defaults.headers.common.Authorization = '';
      toastSuccess('Log out successful. Come back sooner');
      return rejectWithValue(error.message);
    }
  }
);
