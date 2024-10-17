import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../services/toastNotification';

axios.defaults.baseURL = 'watertrackerbackend-1b9z.onrender.com/';

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
      return rejectWithValue('Something went wrong');
    }
  }
);
